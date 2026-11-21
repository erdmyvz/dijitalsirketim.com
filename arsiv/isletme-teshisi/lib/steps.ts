import { FONKSIYONLAR, type FonksiyonId } from "@/data/questions";

// Sihirbazın adım sırası. Bölüm 1 (profil) + Bölüm 2 (7 fonksiyon,
// fonksiyon başına 1 adım) + sonuç ekranı.
export type CheckupAdimi =
  | "profil"
  | "is-modeli"
  | "calisan-sayisi"
  | "ciro"
  | "problem"
  | FonksiyonId
  | "sonuc";

export const ADIM_SIRASI: CheckupAdimi[] = [
  "profil",
  "is-modeli",
  "calisan-sayisi",
  "ciro",
  "problem",
  ...FONKSIYONLAR.map((f) => f.id),
  "sonuc",
];

// İlerleme çubuğunda sayılan adımlar (sonuç ekranı hariç).
export const ILERLEME_ADIM_SAYISI = ADIM_SIRASI.length - 1;

export function adimIndexi(adim: CheckupAdimi): number {
  return ADIM_SIRASI.indexOf(adim);
}
