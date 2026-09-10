import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TedaviKabugu from "@/components/tedavi/TedaviKabugu";
import { TEDAVI_FONKSIYONLARI, fonksiyonBul } from "@/data/moduller";
import { KATMAN_ETIKETLERI } from "@/data/questions";
import { sonKarneSonucu } from "@/lib/tedavi/sonKarne";
import { SEVIYE_STILI, seviyeEtiketi } from "@/lib/tedavi/seviye";
import { IconAlertTriangle, IconArrowRight } from "@/components/icons";

// 7 fonksiyonun tamamı build zamanında üretilir — katalog statik.
export function generateStaticParams() {
  return TEDAVI_FONKSIYONLARI.map((f) => ({ fonksiyon: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ fonksiyon: string }>;
}): Promise<Metadata> {
  const { fonksiyon: slug } = await params;
  const fonksiyon = fonksiyonBul(slug);
  if (!fonksiyon) return {};

  return {
    title: `${fonksiyon.baslik} Modülleri | Dijital Şirketim`,
    description: fonksiyon.ozet,
    alternates: { canonical: `/tedavi/${fonksiyon.slug}` },
  };
}

export default async function FonksiyonSayfasi({
  params,
}: {
  params: Promise<{ fonksiyon: string }>;
}) {
  const { fonksiyon: slug } = await params;
  const fonksiyon = fonksiyonBul(slug);
  if (!fonksiyon) notFound();

  const sonuc = await sonKarneSonucu();
  const fonksiyonSonucu = sonuc?.fonksiyonlar.find((f) => f.id === fonksiyon.id);
  const stil = fonksiyonSonucu
    ? SEVIYE_STILI[fonksiyonSonucu.seviye]
    : SEVIYE_STILI.bilinmiyor;

  return (
    <TedaviKabugu
      kirintiYolu={[
        { etiket: "Tedavi Modülleri", href: "/tedavi" },
        { etiket: fonksiyon.baslik },
      ]}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className="text-xs font-semibold tracking-widest text-slate-400">
            FONKSİYON {String(fonksiyon.no).padStart(2, "0")}
          </span>
          <h1 className="mt-1.5 text-3xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-4xl">
            {fonksiyon.baslik}
          </h1>
        </div>
        {fonksiyonSonucu && (
          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${stil.rozet}`}
          >
            Senin skorun: {seviyeEtiketi(fonksiyonSonucu.seviye)} ·{" "}
            {fonksiyonSonucu.puan}/6
          </span>
        )}
      </div>

      <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
        {fonksiyon.ozet}
      </p>

      <div className="mt-10 space-y-4">
        {fonksiyon.moduller.map((modul) => (
          <Link
            key={modul.id}
            href={`/tedavi/${fonksiyon.slug}/${modul.id}`}
            className="group block rounded-[24px] border border-slate-200 bg-white p-6 transition-all duration-300 ease-[var(--ease-apple)] hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold tracking-[-0.01em] text-slate-900">
                {modul.baslik}
              </h2>
              {modul.acil && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 ring-1 ring-amber-200">
                  <IconAlertTriangle className="h-3 w-3" strokeWidth={2} />
                  Acil müdahale
                </span>
              )}
              {modul.durum === "yakinda" && (
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-500 ring-1 ring-slate-200">
                  Yakında
                </span>
              )}
            </div>

            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {modul.vaat}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400">
              <span>{modul.sure}</span>
              <span aria-hidden="true">·</span>
              <span>
                {modul.katmanlar.map((k) => KATMAN_ETIKETLERI[k]).join(" + ")}
              </span>
              <span aria-hidden="true">·</span>
              <span>Kök vida: {modul.kokVida.join(", ")}</span>
              <span className="ml-auto inline-flex items-center gap-1 font-semibold text-teal-700">
                İncele
                <IconArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-300 ease-[var(--ease-apple)] group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                  strokeWidth={2}
                />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/tedavi"
          className="text-sm font-semibold text-teal-700 hover:underline"
        >
          ← Tüm fonksiyonlar
        </Link>
      </div>
    </TedaviKabugu>
  );
}
