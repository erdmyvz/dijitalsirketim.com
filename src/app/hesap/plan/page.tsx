import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { sonKarneSonucu } from "@/lib/tedavi/sonKarne";
import { fiyatAyarlariniOku } from "@/lib/tedavi/ayarlar";
import { erisimDurumu, tarihBicimle } from "@/lib/tedavi/erisim";
import { tedaviPlaniHesapla, tutarBicimle } from "@/lib/tedavi/fiyat";
import { SEVIYE_STILI, seviyeEtiketi } from "@/lib/tedavi/seviye";
import { TEDAVI_FONKSIYONLARI } from "@/data/moduller";
import { IconAlertTriangle, IconArrowRight, IconHeartPulse } from "@/components/icons";

export const metadata = {
  title: "Tedavi Planım | Dijital Şirketim",
  robots: { index: false, follow: false },
};

const WHATSAPP_NUMARASI = "905319956930";

export default async function TedaviPlanim() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/hesap/giris");

  const sonuc = await sonKarneSonucu();

  // Check-up yapmadan plan çıkarılamaz — teşhis olmadan reçete yazılmaz.
  if (!sonuc) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-sm">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-xl text-white">
            🩺
          </span>
          <h1 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-slate-900">
            Önce teşhis, sonra plan
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Tedavi planın check-up sonucundan çıkarılıyor. 21 soruluk
            ücretsiz check-up&apos;ı tamamladığında planın burada
            oluşacak.
          </p>
          <Link
            href="/check-up"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition-all duration-300 ease-[var(--ease-apple)] hover:bg-teal-700"
          >
            Check-Up&apos;a Başla
          </Link>
        </div>
      </div>
    );
  }

  const ayarlar = await fiyatAyarlariniOku();
  const plan = tedaviPlaniHesapla(sonuc, ayarlar);
  const erisim = await erisimDurumu();

  // Plana giren fonksiyonların modülleri — müşteri ne satın aldığını
  // kalem kalem görsün.
  const kapsananModuller = plan.kalemler.flatMap((kalem) => {
    const fonksiyon = TEDAVI_FONKSIYONLARI.find(
      (f) => f.id === kalem.fonksiyon.id,
    );
    return fonksiyon
      ? fonksiyon.moduller.map((m) => ({ fonksiyon, modul: m }))
      : [];
  });

  const whatsappMesaji = encodeURIComponent(
    `Merhaba, Dijital Check-Up'ımı tamamladım. Tedavi planım aylık ${tutarBicimle(
      plan.aylikTutar,
    )} olarak çıktı. Başlamak istiyorum.`,
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link href="/hesap" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-base text-white">
              🩺
            </span>
            <span className="text-base font-semibold text-slate-900">
              Tedavi Planım
            </span>
          </Link>
          <Link
            href="/hesap"
            className="text-sm font-medium text-slate-400 transition-colors duration-200 ease-[var(--ease-apple)] hover:text-teal-700"
          >
            Panelim
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        {plan.nabizPlaniMi ? (
          /* Tedavi gerektiren fonksiyon yok — Nabız Planı. */
          <div className="rounded-[28px] border border-emerald-200 bg-emerald-50/60 p-8 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white">
              <IconHeartPulse className="h-6 w-6" strokeWidth={1.5} />
            </span>
            <h1 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-slate-900">
              Tedavi gerekmiyor — Nabız Planı
            </h1>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-slate-600">
              7 fonksiyonun da yeşil. Bu aşamada iş, iyileşmek değil
              iyi kalmak: aylık kısa nabız kontrolü, bir skor düştüğünde
              erken uyarı, yılda bir tam check-up ve yeni modüllere
              erişim.
            </p>
            <p className="mt-6 text-4xl font-semibold tracking-[-0.02em] text-slate-900">
              {tutarBicimle(plan.nabizTabani)}
              <span className="text-base font-normal text-slate-500"> / ay</span>
            </p>
          </div>
        ) : (
          <>
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-teal-600">
                REÇETE
              </span>
              <h1 className="mt-1.5 text-2xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-3xl">
                Tedavi planın hazır
              </h1>
              <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-slate-600">
                Check-up&apos;ın {plan.kalemler.length} fonksiyonda tedavi
                gerektiğini gösterdi. Yeşil fonksiyonlar plana girmiyor —
                ihtiyacın olmayan şey için ödeme yapmıyorsun.
              </p>
            </div>

            {/* Tutar */}
            <div className="mt-8 rounded-[28px] bg-slate-900 p-8 text-center">
              <p className="text-sm font-medium text-slate-300">
                Aylık tedavi planı
              </p>
              <p className="mt-2 text-5xl font-semibold tracking-[-0.02em] text-white">
                {tutarBicimle(plan.aylikTutar)}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {plan.kalemler.length} fonksiyon tedavisi (
                {tutarBicimle(plan.tedaviTutari)}) + Nabız Planı (
                {tutarBicimle(plan.nabizTabani)})
              </p>
              <p className="mx-auto mt-4 max-w-md border-t border-slate-700 pt-4 text-xs leading-relaxed text-slate-400">
                Fonksiyonların iyileştikçe bu tutar düşer. Hepsi yeşile
                döndüğünde yalnızca Nabız Planı kalır.
              </p>
            </div>

            {/* Kalemler */}
            <div className="mt-8">
              <h2 className="text-sm font-semibold text-slate-900">
                Plan kalemleri
              </h2>
              <div className="mt-3 overflow-hidden rounded-[24px] border border-slate-200 bg-white">
                {plan.kalemler.map((kalem, i) => {
                  const stil = SEVIYE_STILI[kalem.fonksiyon.seviye];
                  return (
                    <div
                      key={kalem.fonksiyon.id}
                      className={`flex items-center justify-between gap-3 px-5 py-4 ${
                        i > 0 ? "border-t border-slate-100" : ""
                      }`}
                    >
                      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-1.5">
                        <span
                          className={`flex-none rounded-full px-2.5 py-0.5 text-xs font-semibold ${stil.rozet}`}
                        >
                          {seviyeEtiketi(kalem.fonksiyon.seviye)} ·{" "}
                          {kalem.fonksiyon.puan}/6
                        </span>
                        <span className="font-medium text-slate-900">
                          {kalem.fonksiyon.baslik}
                        </span>
                      </div>
                      <span className="flex-none text-sm font-semibold text-slate-700">
                        {tutarBicimle(kalem.tutar)}
                        <span className="ml-1.5 text-xs font-normal text-slate-400">
                          (×{kalem.agirlik.toLocaleString("tr-TR")})
                        </span>
                      </span>
                    </div>
                  );
                })}
                <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-5 py-4">
                  <span className="flex items-center gap-2 font-medium text-slate-700">
                    <IconHeartPulse
                      className="h-4 w-4 text-teal-600"
                      strokeWidth={1.5}
                    />
                    Nabız Planı
                  </span>
                  <span className="text-sm font-semibold text-slate-700">
                    {tutarBicimle(plan.nabizTabani)}
                  </span>
                </div>
              </div>
              <p className="mt-2 px-1 text-xs leading-relaxed text-slate-400">
                Kırmızı fonksiyon tam tedavi (×1), sarı fonksiyon düzeltme
                (×0,5) olarak hesaplanır. Daha az bozuksa daha az iş, daha
                az ücret.
              </p>
            </div>

            {/* Açılacak modüller */}
            <div className="mt-8">
              <h2 className="text-sm font-semibold text-slate-900">
                Planınla açılacak {kapsananModuller.length} modül
              </h2>
              <div className="mt-3 space-y-2">
                {kapsananModuller.map(({ fonksiyon, modul }) => (
                  <Link
                    key={modul.id}
                    href={`/tedavi/${fonksiyon.slug}/${modul.id}`}
                    className="group flex items-start justify-between gap-3 rounded-[20px] border border-slate-200 bg-white px-5 py-4 transition-all duration-300 ease-[var(--ease-apple)] hover:border-teal-300 hover:shadow-sm"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium text-slate-900">
                          {modul.baslik}
                        </span>
                        {modul.acil && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700 ring-1 ring-amber-200">
                            <IconAlertTriangle
                              className="h-3 w-3"
                              strokeWidth={2}
                            />
                            Acil
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-slate-500">
                        {modul.vaat}
                      </p>
                    </div>
                    <IconArrowRight
                      className="mt-1 h-4 w-4 flex-none text-teal-600 transition-transform duration-300 ease-[var(--ease-apple)] group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                      strokeWidth={2}
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Başlama */}
            <div className="mt-10 rounded-[28px] border border-teal-200 bg-teal-50/60 p-6 text-center sm:p-8">
              {erisim.aktif ? (
                <>
                  <p className="text-base font-semibold text-slate-900">
                    Aboneliğin aktif
                  </p>
                  <p className="mx-auto mt-1.5 max-w-md text-sm leading-relaxed text-slate-600">
                    {tarihBicimle(erisim.bitis!)} tarihine kadar
                    ({erisim.kalanGun} gün) planındaki modüllere
                    erişebilirsin.
                  </p>
                  <Link
                    href="/tedavi"
                    className="mt-5 inline-flex items-center justify-center rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition-all duration-300 ease-[var(--ease-apple)] hover:bg-teal-700"
                  >
                    Modüllere Git
                  </Link>
                </>
              ) : (
                <>
                  <p className="text-base font-semibold text-slate-900">
                    Başlamaya hazır mısın?
                  </p>
                  <p className="mx-auto mt-1.5 max-w-md text-sm leading-relaxed text-slate-600">
                    Ödemeni yaptığında planındaki {kapsananModuller.length}{" "}
                    modül açılır. Ödeme havale/EFT ile alınıyor.
                  </p>
                  <Link
                    href="/hesap/odeme"
                    className="mt-5 inline-flex items-center justify-center rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition-all duration-300 ease-[var(--ease-apple)] hover:bg-teal-700"
                  >
                    Ödeme Bilgilerini Gör
                  </Link>
                  <p className="mt-3 text-xs text-slate-500">
                    Sorman gereken bir şey varsa{" "}
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMARASI}?text=${whatsappMesaji}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-teal-700 hover:underline"
                    >
                      WhatsApp&apos;tan yazabilirsin
                    </a>
                    .
                  </p>
                </>
              )}
            </div>
          </>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/tedavi"
            className="text-sm font-semibold text-teal-700 hover:underline"
          >
            Tüm tedavi modüllerini gör →
          </Link>
        </div>
      </main>
    </div>
  );
}
