import Link from "next/link";
import type { FonksiyonId } from "@/data/questions";
import type { Modul } from "@/data/moduller";
import { erisimDurumu, fonksiyonaErisimVarMi } from "@/lib/tedavi/erisim";
import { IconArrowRight } from "@/components/icons";
import ModulAdimlari from "./ModulAdimlari";

/**
 * Modül sayfasının içerik bölümü. Üç hâli var:
 *   1. İçerik henüz yazılmadı  → "hazırlanıyor" (kilit gösterilmez;
 *      olmayan şeyi kilitli göstermek dürüst olmaz)
 *   2. İçerik var, erişim yok  → kilit + plana yönlendirme
 *   3. İçerik var, erişim var  → adım adım uygulama ekranı
 */
export default async function ModulIcerigi({
  fonksiyonId,
  fonksiyonSlug,
  modul,
}: {
  fonksiyonId: FonksiyonId;
  fonksiyonSlug: string;
  modul: Modul;
}) {
  // "Yakında" ya da adımı yazılmamış modül: içerik yok demektir.
  if (modul.durum === "yakinda" || modul.adimlar.length === 0) {
    return (
      <div className="mt-8 rounded-[24px] border border-dashed border-slate-300 bg-slate-100/60 p-8 text-center">
        <p className="text-base font-semibold text-slate-800">
          Bu modülün içeriği hazırlanıyor.
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500">
          Adımlar, şablonlar ve bitiş kontrolü yayına alındığında burada
          görünecek.
        </p>
      </div>
    );
  }

  const erisim = await erisimDurumu();

  if (!fonksiyonaErisimVarMi(erisim, fonksiyonId)) {
    return (
      <div className="mt-8 rounded-[24px] border border-teal-200 bg-teal-50/60 p-8 text-center">
        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-teal-600 text-lg text-white">
          🔒
        </span>
        <p className="mt-4 text-base font-semibold text-slate-900">
          Bu modül tedavi planına dahil
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">
          {erisim.aktif
            ? "Aboneliğin bu fonksiyonu kapsamıyor. Planına eklemek istersen tedavi planından güncelleyebilirsin."
            : "Adımları ve şablonları görmek için tedavi planını başlatman gerekiyor. Plan, kendi check-up sonucundan hesaplanır."}
        </p>
        <Link
          href="/hesap/plan"
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition-all duration-300 ease-[var(--ease-apple)] hover:bg-teal-700"
        >
          Tedavi Planımı Gör
          <IconArrowRight className="h-4 w-4" strokeWidth={2} />
        </Link>
      </div>
    );
  }

  return (
    <ModulAdimlari
      modulId={modul.id}
      fonksiyonSlug={fonksiyonSlug}
      adimlar={modul.adimlar}
    />
  );
}
