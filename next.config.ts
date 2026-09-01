import type { NextConfig } from "next";
import { execSync } from "node:child_process";
import { SITE_URL } from "./src/lib/site";

// Geçici sürüm rozeti için: her yayında commit sayısını "versiyon
// numarası", o anı da "yayın zamanı" olarak yakalıyoruz. Bu değerler
// build zamanında sabitlenir, böylece rozet gerçekten yayınlanan
// sürümü gösterir.
//
// Birincil yöntem: GitHub API'sinden gerçek commit sayısını çekmek
// (Link header'ındaki son sayfa numarası = toplam commit sayısı).
// Bu, Vercel'in build ortamında bazı deploy senaryolarında git
// deposunu sığ (shallow) klonlaması yüzünden "git rev-list --count
// HEAD"in yanlış/eksik sayı vermesi sorununu tamamen ortadan
// kaldırıyor — API çağrısı klon derinliğinden bağımsız.
// Yedek yöntem: yerel git komutu (API'ye erişilemezse).
function getRepoSlug(): string | null {
  try {
    const url = execSync("git remote get-url origin", {
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    // https://github.com/owner/repo.git veya git@github.com:owner/repo.git
    // NOT: Repo adının kendisi nokta içerebilir (ör. "dijitalsirketim.com"),
    // bu yüzden ".git" sonekini regex yerine string işlemiyle ayıklıyoruz —
    // aksi halde repo adındaki nokta ".git" soneki sanılıp eşleşme kaçar.
    const temizUrl = url.replace(/\.git$/, "");
    const parcalar = temizUrl.split(/[/:]/).filter(Boolean);
    const repo = parcalar.pop();
    const owner = parcalar.pop();
    if (!owner || !repo) return null;
    return `${owner}/${repo}`;
  } catch {
    return null;
  }
}

function commitCountViaGitHubApi(): string | null {
  const slug = getRepoSlug();
  if (!slug) {
    console.log("[versiyon] git remote bulunamadı, GitHub API atlanıyor.");
    return null;
  }
  try {
    const headers = execSync(
      `curl -sI "https://api.github.com/repos/${slug}/commits?per_page=1&sha=main"`,
      { encoding: "utf-8" },
    );
    const linkHeader = headers
      .split("\n")
      .find((satir) => satir.toLowerCase().startsWith("link:"));
    if (!linkHeader) {
      console.log("[versiyon] GitHub API yanıtında Link header'ı yok:", headers.slice(0, 200));
      return null;
    }
    const sonSayfa = linkHeader.match(/[?&]page=(\d+)>;\s*rel="last"/);
    if (!sonSayfa) {
      console.log("[versiyon] Link header'ında 'last' sayfası bulunamadı:", linkHeader);
      return null;
    }
    console.log(`[versiyon] GitHub API'den commit sayısı alındı: ${sonSayfa[1]}`);
    return sonSayfa[1];
  } catch (err) {
    console.log("[versiyon] GitHub API isteği başarısız:", (err as Error).message);
    return null;
  }
}

function commitCountViaGit(): string | null {
  try {
    const isShallow = execSync("git rev-parse --is-shallow-repository", {
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    console.log(`[versiyon] git is-shallow-repository: ${isShallow}`);

    if (isShallow === "true") {
      try {
        execSync("git fetch --unshallow", { stdio: "pipe" });
        console.log("[versiyon] git fetch --unshallow başarılı.");
      } catch (err) {
        console.log("[versiyon] git fetch --unshallow başarısız:", (err as Error).message);
      }
    }

    const commitCount = execSync("git rev-list --count HEAD", {
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    console.log(`[versiyon] git rev-list --count HEAD: ${commitCount}`);
    return commitCount || null;
  } catch (err) {
    console.log("[versiyon] git rev-list başarısız:", (err as Error).message);
    return null;
  }
}

function getBuildVersion(): string {
  return commitCountViaGitHubApi() ?? commitCountViaGit() ?? "dev";
}

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BUILD_VERSION: getBuildVersion(),
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },

  // www -> apex kalıcı yönlendirmesi. Kanonik adresimiz (SITE_URL,
  // metadata + JSON-LD'de de kullanılıyor) apex domain — "www."
  // sürümünden gelen ziyaretçiler tek bir adrese toplansın diye.
  // NOT: Bu kural yalnızca "www" alt alan adı Vercel projesine domain
  // olarak eklenip kendi SSL sertifikası çıkarıldıktan sonra devreye
  // girer; aksi halde tarayıcı bu uygulama koduna hiç ulaşmadan TLS
  // aşamasında hata verir.
  async redirects() {
    const apexHost = new URL(SITE_URL).host;
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: `www.${apexHost}` }],
        destination: `${SITE_URL}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
