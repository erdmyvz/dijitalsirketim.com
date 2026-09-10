import type { Metadata } from "next";
import Link from "next/link";
import TedaviKabugu from "@/components/tedavi/TedaviKabugu";
import { TEDAVI_FONKSIYONLARI, TOPLAM_MODUL_SAYISI } from "@/data/moduller";
import { sonKarneSonucu } from "@/lib/tedavi/sonKarne";
import { SEVIYE_STILI, seviyeEtiketi } from "@/lib/tedavi/seviye";
import { IconArrowRight, IconAlertTriangle } from "@/components/icons";

export const metadata: Metadata = {
  title: "Tedavi Modülleri | Dijital Şirketim",
  description:
    "Bir işletme 7 fonksiyondan oluşur: müşteri bulma, satış, operasyon, ürün geliştirme, para yönetimi, karar alma, ekip kurma. Her birinin adım adım tedavi modülü burada.",
  alternates: { canonical: "/tedavi" },
};

export default async function TedaviHaritasi() {
  // Giriş yapmış ve check-up yapmış kullanıcı için harita kişiselleşir;
  // yapmamış olan (ve Google) nötr haritayı görür. Supabase erişilemese
  // bile sayfa katalogla ayakta kalır — bkz. sonKarneSonucu().
  const sonuc = await sonKarneSonucu();

  return (
    <TedaviKabugu kirintiYolu={[{ etiket: "Tedavi Modülleri" }]}>
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 ring-1 ring-teal-200">
          TEDAVİ
        </span>
        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-4xl">
          Bir işletme 7 organdan oluşur.
          <br className="hidden sm:block" />{" "}
          <span className="text-teal-700">Yedisinin de reçetesi burada.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
          Check-up hangi organın tıkalı olduğunu söyler. Buradaki modüller
          o tıkanıklığı adım adım açar — genel geçer tavsiye değil,
          uygulanacak iş listesi.
        </p>
      </div>

      {sonuc ? (
        <div className="mt-10 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Son check-up&apos;ına göre haritan
              </p>
              <p className="mt-0.5 text-sm text-slate-500">
                Genel skor %{sonuc.skorYuzde} ·{" "}
                {sonuc.kirmiziBolge.length > 0 ? (
                  <>
                    Önce şuradan başla:{" "}
                    <span className="font-medium text-red-600">
                      {sonuc.kirmiziBolge.map((f) => f.baslik).join(", ")}
                    </span>
                  </>
                ) : (
                  "Kırmızı bölge yok — bakım aşamasındasın."
                )}
              </p>
            </div>
            <Link
              href="/hesap"
              className="text-sm font-semibold text-teal-700 hover:underline"
            >
              Karnelerim
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-10 rounded-[28px] border border-teal-200 bg-teal-50/60 p-6 text-center">
          <p className="text-base font-medium text-slate-900">
            Hangi modülle başlayacağını check-up söyler.
          </p>
          <p className="mx-auto mt-1.5 max-w-xl text-sm leading-relaxed text-slate-600">
            21 soruluk ücretsiz check-up, 7 fonksiyonunu tek tek ölçer ve
            haritanı kişiselleştirir.
          </p>
          <Link
            href="/check-up"
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition-all duration-300 ease-[var(--ease-apple)] hover:bg-teal-700"
          >
            Ücretsiz Check-Up&apos;a Başla
            <IconArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      )}

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TEDAVI_FONKSIYONLARI.map((fonksiyon) => {
          const fonksiyonSonucu = sonuc?.fonksiyonlar.find(
            (f) => f.id === fonksiyon.id,
          );
          const stil = fonksiyonSonucu
            ? SEVIYE_STILI[fonksiyonSonucu.seviye]
            : SEVIYE_STILI.bilinmiyor;
          const acilVar = fonksiyon.moduller.some((m) => m.acil);

          return (
            <Link
              key={fonksiyon.id}
              href={`/tedavi/${fonksiyon.slug}`}
              className={`group flex flex-col rounded-[24px] border bg-white p-5 transition-all duration-300 ease-[var(--ease-apple)] hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${stil.kenar}`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-semibold tracking-widest text-slate-400">
                  {String(fonksiyon.no).padStart(2, "0")}
                </span>
                {fonksiyonSonucu ? (
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${stil.rozet}`}
                  >
                    {seviyeEtiketi(fonksiyonSonucu.seviye)} ·{" "}
                    {fonksiyonSonucu.puan}/6
                  </span>
                ) : (
                  acilVar && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 ring-1 ring-amber-200">
                      <IconAlertTriangle className="h-3 w-3" strokeWidth={2} />
                      Acil
                    </span>
                  )
                )}
              </div>

              <h2 className="mt-3 text-lg font-semibold tracking-[-0.01em] text-slate-900">
                {fonksiyon.baslik}
              </h2>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-600">
                {fonksiyon.ozet}
              </p>

              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700">
                {fonksiyon.moduller.length} modül
                <IconArrowRight
                  className="h-4 w-4 transition-transform duration-300 ease-[var(--ease-apple)] group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                  strokeWidth={2}
                />
              </span>
            </Link>
          );
        })}
      </div>

      <p className="mt-8 text-center text-sm text-slate-400">
        Toplam {TOPLAM_MODUL_SAYISI} modül · katalog büyümeye devam ediyor
      </p>
    </TedaviKabugu>
  );
}
