import { createClient } from "@/lib/supabase/server";
import {
  VARSAYILAN_FIYAT_AYARLARI,
  type FiyatAyarlari,
} from "./fiyat";

export type OdemeBilgileri = {
  /** Boş olabilir — doldurulmadıysa ekranda IBAN gösterilmez. */
  iban: string;
  hesapSahibi: string;
};

export type Ayarlar = FiyatAyarlari & OdemeBilgileri;

export const VARSAYILAN_AYARLAR: Ayarlar = {
  ...VARSAYILAN_FIYAT_AYARLARI,
  iban: "",
  hesapSahibi: "",
};

/** IBAN ve hesap sahibi doluysa ödeme talimatı gösterilebilir. */
export function odemeBilgileriHazirMi(ayarlar: OdemeBilgileri): boolean {
  return ayarlar.iban.trim().length > 0 && ayarlar.hesapSahibi.trim().length > 0;
}

const ANAHTARLAR = ["birim_ucret", "nabiz_tabani", "iban", "hesap_sahibi"];

/**
 * Ayarları Supabase'deki `ayarlar` tablosundan okur.
 *
 * Tablo henüz oluşturulmadıysa, satır eksikse, değer bozuksa ya da
 * Supabase erişilemiyorsa koddaki varsayılana düşer — fiyat gösteren
 * bir ekranın tamamen kaybolmasındansa varsayılanla çalışması yeğdir.
 * (Aynı savunmacı yaklaşım: sonKarne.ts, proxy.ts — bkz. KARARLAR.md
 * 2026-09-08.)
 */
export async function ayarlariOku(): Promise<Ayarlar> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("ayarlar")
      .select("anahtar, deger")
      .in("anahtar", ANAHTARLAR)
      .returns<{ anahtar: string; deger: string }[]>();

    if (error || !data) return VARSAYILAN_AYARLAR;

    const metin = (anahtar: string, varsayilan: string): string =>
      data.find((d) => d.anahtar === anahtar)?.deger ?? varsayilan;

    const sayi = (anahtar: string, varsayilan: number): number => {
      const ham = data.find((d) => d.anahtar === anahtar)?.deger;
      if (ham === undefined) return varsayilan;
      const deger = Number(ham);
      return Number.isFinite(deger) && deger >= 0 ? deger : varsayilan;
    };

    return {
      birimUcret: sayi("birim_ucret", VARSAYILAN_AYARLAR.birimUcret),
      nabizTabani: sayi("nabiz_tabani", VARSAYILAN_AYARLAR.nabizTabani),
      iban: metin("iban", VARSAYILAN_AYARLAR.iban),
      hesapSahibi: metin("hesap_sahibi", VARSAYILAN_AYARLAR.hesapSahibi),
    };
  } catch {
    return VARSAYILAN_AYARLAR;
  }
}

/** Yalnızca fiyat ayarları gereken yerler için ince sarmalayıcı. */
export async function fiyatAyarlariniOku(): Promise<FiyatAyarlari> {
  const { birimUcret, nabizTabani } = await ayarlariOku();
  return { birimUcret, nabizTabani };
}
