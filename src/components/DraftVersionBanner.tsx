// GEÇİCİ BİLEŞEN — site yayına hazır olduğunda bu dosyayı ve
// layout.tsx'teki <DraftVersionBanner /> satırını kaldırın.
//
// Versiyon numarası ve yayın zamanı build anında next.config.ts
// tarafından hesaplanıp NEXT_PUBLIC_BUILD_VERSION / NEXT_PUBLIC_BUILD_TIME
// olarak gömülür (bkz. next.config.ts). Yani her `npm run build` +
// yeniden yayın, bu rozeti otomatik günceller — elle bir şey
// girmenize gerek yok.
export default function DraftVersionBanner() {
  const version = process.env.NEXT_PUBLIC_BUILD_VERSION ?? "dev";
  const buildTimeIso = process.env.NEXT_PUBLIC_BUILD_TIME;
  const tarih = buildTimeIso
    ? new Date(buildTimeIso).toLocaleString("tr-TR", {
        dateStyle: "long",
        timeStyle: "short",
      })
    : "bilinmiyor";

  return (
    <div className="bg-amber-400 px-4 py-1.5 text-center text-xs font-semibold text-amber-950">
      🚧 Taslak sürüm — v{version} · {tarih} tarihinde yayınlandı
    </div>
  );
}
