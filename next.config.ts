import type { NextConfig } from "next";
import { execSync } from "node:child_process";

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
};

export default nextConfig;
