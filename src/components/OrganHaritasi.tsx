import type { ComponentType, SVGProps } from "react";
import type { FonksiyonId } from "@/data/questions";
import type { CheckupSonuc, SkorSeviyesi } from "@/lib/checkup/types";
import {
  IconBanknote,
  IconFork,
  IconFunnel,
  IconGear,
  IconLayers,
  IconTag,
  IconTeam,
} from "./icons";

/**
 * Her fonksiyonun kendi ikonu. "İşletmenin 7 organı" fikri ancak
 * organlar birbirinden ayırt edilebilirse çalışır — yedisi de aynı
 * jenerik ikonla gösterilirse metafor kelimede kalır.
 */
const FONKSIYON_IKONU: Record<
  FonksiyonId,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  musteri_bulma: IconFunnel,
  satis: IconTag,
  operasyon: IconGear,
  urun_gelistirme: IconLayers,
  para_yonetimi: IconBanknote,
  karar_alma: IconFork,
  ekip_kurma: IconTeam,
};

// Renk tek başına anlam taşımıyor: her kutuda puan da yazıyor.
const SEVIYE_STILI: Record<
  SkorSeviyesi,
  { kutu: string; ikon: string; puan: string }
> = {
  kirmizi: {
    kutu: "border-red-200 bg-red-50",
    ikon: "bg-red-100 text-red-600",
    puan: "text-red-700",
  },
  sari: {
    kutu: "border-amber-200 bg-amber-50",
    ikon: "bg-amber-100 text-amber-700",
    puan: "text-amber-700",
  },
  yesil: {
    kutu: "border-emerald-200 bg-emerald-50",
    ikon: "bg-emerald-100 text-emerald-700",
    puan: "text-emerald-700",
  },
};

const NOTR_STILI = {
  kutu: "border-slate-200 bg-white",
  ikon: "bg-slate-100 text-slate-500",
  puan: "text-slate-400",
};

/**
 * 7 iş fonksiyonunun tek bakışta görülen haritası.
 *
 * `sonuc` verilirse kutular kendi puanlarıyla renklenir (örnek karne ya
 * da kullanıcının kendi karnesi); verilmezse nötr gri harita çıkar —
 * check-up yapmamış ziyaretçiye uydurma bir renk gösterilmez.
 */
export default function OrganHaritasi({
  sonuc,
  className = "",
}: {
  sonuc?: CheckupSonuc;
  className?: string;
}) {
  const satirlar = (
    sonuc?.fonksiyonlar ?? []
  ).length
    ? sonuc!.fonksiyonlar
    : null;

  return (
    <div
      className={`grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7 ${className}`}
    >
      {(satirlar ?? []).map((f) => {
        const Ikon = FONKSIYON_IKONU[f.id as FonksiyonId];
        const stil = SEVIYE_STILI[f.seviye];
        return (
          <div
            key={f.id}
            className={`rounded-[20px] border p-3.5 text-center transition-transform duration-300 ease-[var(--ease-apple)] hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${stil.kutu}`}
          >
            <span
              className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full ${stil.ikon}`}
            >
              <Ikon className="h-5 w-5" />
            </span>
            <p className="mt-2.5 text-[11px] font-medium leading-tight text-slate-700">
              {f.baslik}
            </p>
            <p
              className={`mt-1 text-xs font-semibold tabular-nums ${stil.puan}`}
            >
              {f.puan}/6
            </p>
          </div>
        );
      })}

      {!satirlar &&
        (Object.keys(FONKSIYON_IKONU) as FonksiyonId[]).map((id) => {
          const Ikon = FONKSIYON_IKONU[id];
          return (
            <div
              key={id}
              className={`rounded-[20px] border p-3.5 text-center ${NOTR_STILI.kutu}`}
            >
              <span
                className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full ${NOTR_STILI.ikon}`}
              >
                <Ikon className="h-5 w-5" />
              </span>
            </div>
          );
        })}
    </div>
  );
}
