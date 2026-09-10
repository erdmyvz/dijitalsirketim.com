import type { CheckupSonuc, FonksiyonSonucu, SkorSeviyesi } from "@/lib/checkup/types";

// Teşhise dayalı fiyatlama — bkz. KARARLAR.md (2026-09-10).
//
//   Aylık Ücret = Nabız tabanı + (Birim Ücret × Σ fonksiyon ağırlığı)
//
// Ağırlıklar: kırmızı 1.0 (tam tedavi), sarı 0.5 (düzeltme yeterli),
// yeşil 0 (tedavi gerekmiyor — para alınmaz).
//
// Mantık: "daha az bozuksa daha az iş, daha az ücret". Müşteri
// iyileştikçe faturası düşer; hepsi yeşile döndüğünde yalnızca Nabız
// Planı tabanı kalır (aylık kısa kontrol, erken uyarı, yıllık tam
// check-up, yeni modüller).

export const SEVIYE_AGIRLIGI: Record<SkorSeviyesi, number> = {
  kirmizi: 1,
  sari: 0.5,
  yesil: 0,
};

export type FiyatAyarlari = {
  /** Tedavi edilen her "tam" fonksiyon için taban ücret (TL). */
  birimUcret: number;
  /** İyileşmiş müşterinin sistemde kalma bedeli — Nabız Planı (TL/ay). */
  nabizTabani: number;
};

/**
 * Ayarlar tablosu okunamazsa kullanılacak değerler. Gerçek değerler
 * Supabase'deki `ayarlar` tablosundan gelir ve admin panelinden
 * değiştirilir — buradakiler yalnızca güvenli bir yedek.
 */
export const VARSAYILAN_FIYAT_AYARLARI: FiyatAyarlari = {
  birimUcret: 10_000,
  nabizTabani: 5_000,
};

export type PlanKalemi = {
  fonksiyon: FonksiyonSonucu;
  agirlik: number;
  tutar: number;
};

export type TedaviPlani = {
  /** Yalnızca tedavi gerektiren (kırmızı + sarı) fonksiyonlar. */
  kalemler: PlanKalemi[];
  toplamAgirlik: number;
  /** Nabız tabanı hariç, tedavi kalemlerinin toplamı. */
  tedaviTutari: number;
  nabizTabani: number;
  aylikTutar: number;
  /**
   * Tedavi gerektiren fonksiyon yoksa müşteri "Nabız Planı"ndadır:
   * yalnızca taban ücret ödenir.
   */
  nabizPlaniMi: boolean;
};

export function tedaviPlaniHesapla(
  sonuc: CheckupSonuc,
  ayarlar: FiyatAyarlari = VARSAYILAN_FIYAT_AYARLARI,
): TedaviPlani {
  const kalemler: PlanKalemi[] = sonuc.fonksiyonlar
    .map((fonksiyon) => {
      const agirlik = SEVIYE_AGIRLIGI[fonksiyon.seviye];
      return {
        fonksiyon,
        agirlik,
        tutar: Math.round(agirlik * ayarlar.birimUcret),
      };
    })
    // Yeşil fonksiyonlar plana hiç girmez — ödenmeyen şey listede de
    // görünmemeli.
    .filter((kalem) => kalem.agirlik > 0)
    // En bozuk olan en üstte: müşteri nereden başlayacağını görsün.
    .sort((a, b) => a.fonksiyon.puan - b.fonksiyon.puan);

  const toplamAgirlik = kalemler.reduce((t, k) => t + k.agirlik, 0);
  const tedaviTutari = kalemler.reduce((t, k) => t + k.tutar, 0);

  return {
    kalemler,
    toplamAgirlik,
    tedaviTutari,
    nabizTabani: ayarlar.nabizTabani,
    aylikTutar: tedaviTutari + ayarlar.nabizTabani,
    nabizPlaniMi: kalemler.length === 0,
  };
}

/** "45.000 TL" biçiminde — Türkçe binlik ayracı ile. */
export function tutarBicimle(tutar: number): string {
  return `${tutar.toLocaleString("tr-TR")} TL`;
}
