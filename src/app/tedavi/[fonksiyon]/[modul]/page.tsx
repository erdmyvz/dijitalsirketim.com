import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TedaviKabugu from "@/components/tedavi/TedaviKabugu";
import ModulIcerigi from "@/components/tedavi/ModulIcerigi";
import { TEDAVI_FONKSIYONLARI, modulBul } from "@/data/moduller";
import { FONKSIYONLAR, KATMAN_ETIKETLERI } from "@/data/questions";
import { IconAlertTriangle, IconCheck } from "@/components/icons";

export function generateStaticParams() {
  return TEDAVI_FONKSIYONLARI.flatMap((f) =>
    f.moduller.map((m) => ({ fonksiyon: f.slug, modul: m.id })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ fonksiyon: string; modul: string }>;
}): Promise<Metadata> {
  const { fonksiyon: fSlug, modul: mId } = await params;
  const bulunan = modulBul(fSlug, mId);
  if (!bulunan) return {};

  return {
    title: `${bulunan.modul.baslik} | Dijital Şirketim`,
    description: bulunan.modul.vaat,
    robots: { index: false, follow: false },
  };
}

export default async function ModulSayfasi({
  params,
}: {
  params: Promise<{ fonksiyon: string; modul: string }>;
}) {
  const { fonksiyon: fSlug, modul: mId } = await params;
  const bulunan = modulBul(fSlug, mId);
  if (!bulunan) notFound();

  const { fonksiyon, modul } = bulunan;

  // Modülün onardığı check-up sorularının metinlerini göster — kullanıcı
  // "bu modül bende neyi düzeltecek?" sorusunun cevabını kendi
  // cevapladığı sorularda görsün.
  const onarilanSorular = modul.onardigiSorular
    .map((soruId) => {
      for (const f of FONKSIYONLAR) {
        const soru = f.sorular.find((s) => s.id === soruId);
        if (soru) return { ...soru, fonksiyonBasligi: f.baslik };
      }
      return null;
    })
    .filter((s): s is NonNullable<typeof s> => s !== null);

  return (
    <TedaviKabugu
      kirintiYolu={[
        { etiket: "Tedavi Modülleri", href: "/tedavi" },
        { etiket: fonksiyon.baslik, href: `/tedavi/${fonksiyon.slug}` },
        { etiket: modul.baslik },
      ]}
    >
      <div className="flex flex-wrap items-center gap-2">
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

      <h1 className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-4xl">
        {modul.baslik}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-700">
        {modul.vaat}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
        <span>{modul.sure}</span>
        <span aria-hidden="true">·</span>
        <span>
          {modul.katmanlar.map((k) => KATMAN_ETIKETLERI[k]).join(" + ")}
        </span>
        <span aria-hidden="true">·</span>
        <span>Kök vida: {modul.kokVida.join(", ")}</span>
      </div>

      {onarilanSorular.length > 0 && (
        <div className="mt-10 rounded-[24px] border border-slate-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-slate-900">
            Bu modül check-up&apos;ında neyi onarır?
          </h2>
          <ul className="mt-4 space-y-3">
            {onarilanSorular.map((soru) => (
              <li key={soru.id} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-teal-100 text-teal-700">
                  <IconCheck className="h-3 w-3" strokeWidth={2.5} />
                </span>
                <span className="text-sm leading-relaxed text-slate-600">
                  {soru.metin}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t border-dashed border-slate-200 pt-4 text-xs leading-relaxed text-slate-400">
            Modülü bitirdiğinde bu soruları tekrar cevaplarsın; skorun ve
            karnendeki renk buna göre güncellenir.
          </p>
        </div>
      )}

      <ModulIcerigi fonksiyonId={fonksiyon.id} durum={modul.durum} />

      <div className="mt-10 text-center">
        <Link
          href={`/tedavi/${fonksiyon.slug}`}
          className="text-sm font-semibold text-teal-700 hover:underline"
        >
          ← {fonksiyon.baslik} modülleri
        </Link>
      </div>
    </TedaviKabugu>
  );
}
