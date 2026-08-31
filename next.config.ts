import type { NextConfig } from "next";
import { execSync } from "node:child_process";
import { SITE_URL } from "./src/lib/site";

// Geçici sürüm rozeti için: her `next build` (yani her yayın) anında
// git commit sayısını "versiyon numarası", o anı da "yayın zamanı"
// olarak yakalıyoruz. Bu değerler build zamanında sabitlenir (client'ta
// yeniden hesaplanmaz), böylece rozet gerçekten "yayınlanan sürümü"
// gösterir. .git bulunamazsa (ör. sadece build çıktısı taşınmışsa)
// sessizce "dev" değerine düşer.
function getBuildVersion(): string {
  try {
    const commitCount = execSync("git rev-list --count HEAD", {
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return commitCount || "dev";
  } catch {
    return "dev";
  }
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
