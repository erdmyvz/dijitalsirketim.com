import type { NextConfig } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { SITE_URL } from "./src/lib/site";

// Geçici sürüm rozeti için: yayın numarasını version.json'dan, yayın
// zamanını da build anından alıyoruz. Bu değerler build zamanında
// sabitlenir, böylece rozet gerçekten yayınlanan sürümü gösterir.
//
// Neden version.json? Daha önce bu sayı "git rev-list --count HEAD"
// ile hesaplanıyordu; Vercel'in build ortamı git deposunu sığ
// (shallow) klonladığı için sayı yanlış çıkıyordu (hep "10"). Ardından
// GitHub API denendi, o da build ortamında çalışmadı. Repoda duran
// basit bir sayaç dosyası hiçbir dış bağımlılığa (git geçmişi, ağ
// erişimi, curl) ihtiyaç duymaz — her ortamda aynı sonucu verir.
//
// ÖNEMLİ: Her yeni commit'te version.json içindeki "version" değerini
// bir artırın.
function getBuildVersion(): string {
  try {
    const ham = readFileSync(join(process.cwd(), "version.json"), "utf-8");
    const { version } = JSON.parse(ham) as { version: number };
    return String(version);
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
