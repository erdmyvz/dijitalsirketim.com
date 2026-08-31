import {
  FONKSIYONLAR,
  KATMAN_ETIKETLERI,
  MAKSIMUM_PUAN,
  type Katman,
} from "@/data/questions";
import type {
  CheckupSonuc,
  CheckupState,
  FonksiyonSonucu,
  KatmanSonucu,
  SkorSeviyesi,
} from "./types";

// Brief'teki eşikler: 0-2 kırmızı, 3-4 sarı, 5-6 yeşil (fonksiyon başına
// maksimum 6 puan — 3 soru x 2 puan).
function fonksiyonSeviyesi(puan: number): SkorSeviyesi {
  if (puan <= 2) return "kirmizi";
  if (puan <= 4) return "sari";
  return "yesil";
}

export function skorHesapla(state: CheckupState): CheckupSonuc {
  const fonksiyonlar: FonksiyonSonucu[] = FONKSIYONLAR.map((f) => {
    const puan = f.sorular.reduce(
      (toplam, soru) => toplam + (state.cevaplar[soru.id] ?? 0),
      0,
    );
    return {
      id: f.id,
      no: f.no,
      baslik: f.baslik,
      puan,
      seviye: fonksiyonSeviyesi(puan),
    };
  });

  const toplamPuan = fonksiyonlar.reduce((t, f) => t + f.puan, 0);
  const skorYuzde = Math.round((toplamPuan / MAKSIMUM_PUAN) * 100);

  const katmanSirasi: Katman[] = ["surec", "sistem", "yapi"];
  const katmanlar: KatmanSonucu[] = katmanSirasi.map((katman) => {
    const puan = FONKSIYONLAR.reduce((toplam, f) => {
      const soru = f.sorular.find((s) => s.katman === katman);
      return toplam + (soru ? (state.cevaplar[soru.id] ?? 0) : 0);
    }, 0);
    return {
      katman,
      etiket: KATMAN_ETIKETLERI[katman],
      puan,
      maksimum: FONKSIYONLAR.length * 2,
    };
  });

  // En düşük puanlı 1-2 fonksiyon "kırmızı bölge" — eşitlik durumunda
  // soru bankasındaki sırayı korur (deterministik).
  const kirmiziBolge = [...fonksiyonlar]
    .sort((a, b) => a.puan - b.puan)
    .slice(0, 2)
    .filter((f) => f.seviye === "kirmizi" || f.seviye === "sari");

  return {
    toplamPuan,
    maksimumPuan: MAKSIMUM_PUAN,
    skorYuzde,
    fonksiyonlar,
    katmanlar,
    kirmiziBolge: kirmiziBolge.length > 0 ? kirmiziBolge : fonksiyonlar.slice(0, 1),
  };
}

// Sihirbazın "İleri" ile geçilebilmesi için Bölüm 2'nin dolu olup
// olmadığını kontrol eder.
export function tumSorularCevaplandiMi(state: CheckupState): boolean {
  return FONKSIYONLAR.every((f) =>
    f.sorular.every((s) => state.cevaplar[s.id] !== undefined),
  );
}

export function fonksiyonCevaplandiMi(
  state: CheckupState,
  fonksiyonId: string,
): boolean {
  const fonksiyon = FONKSIYONLAR.find((f) => f.id === fonksiyonId);
  if (!fonksiyon) return false;
  return fonksiyon.sorular.every((s) => state.cevaplar[s.id] !== undefined);
}
