import type { SkorSeviyesi } from "@/lib/checkup/types";

/**
 * Fonksiyon kartlarının renk dili. Karnedeki renk kodlamasıyla aynı
 * mantık (0-2 kırmızı / 3-4 sarı / 5-6 yeşil) — kullanıcı iki ekranda
 * aynı rengi görüp aynı şeyi anlasın diye tek yerde tutuluyor.
 * "bilinmiyor": henüz check-up yapılmamış, nötr.
 */
export const SEVIYE_STILI: Record<
  SkorSeviyesi | "bilinmiyor",
  { kenar: string; rozet: string }
> = {
  kirmizi: {
    kenar: "border-red-200",
    rozet: "bg-red-50 text-red-700 ring-1 ring-red-200",
  },
  sari: {
    kenar: "border-amber-200",
    rozet: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  },
  yesil: {
    kenar: "border-emerald-200",
    rozet: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  },
  bilinmiyor: {
    kenar: "border-slate-200",
    rozet: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
  },
};

export function seviyeEtiketi(seviye: SkorSeviyesi): string {
  if (seviye === "kirmizi") return "Kırmızı";
  if (seviye === "sari") return "Sarı";
  return "Yeşil";
}
