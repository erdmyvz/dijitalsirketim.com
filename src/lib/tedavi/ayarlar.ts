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

/** Boşlukları ve ayraçları atıp büyük harfe çevirir: "tr33 0006" → "TR330006". */
export function ibanNormalle(ham: string): string {
  return ham.replace(/[^0-9A-Za-z]/g, "").toUpperCase();
}

/**
 * Türk IBAN'ı geçerli mi? TR + 24 rakam VE ISO 13616 mod-97 sağlaması.
 *
 * Sağlama şart: tek hane yanlış yazılmış bir IBAN ekranda gayet normal
 * görünür ama para gitmez. Boş-değil kontrolü yeterli değildi —
 * canlıda "TR0000" yer tutucusu müşteriye ödeme talimatı olarak
 * gösterilebiliyordu (2026-09-11'de fark edildi).
 */
export function ibanGecerliMi(ham: string): boolean {
  const iban = ibanNormalle(ham);
  if (!/^TR\d{24}$/.test(iban)) return false;

  // Mod-97: ilk 4 karakter sona alınır, harfler A=10..Z=35 ile sayıya
  // çevrilir, kalan 1 olmalı. Sayı 2^53'ü aştığı için parça parça.
  const yeniden = iban.slice(4) + iban.slice(0, 4);
  let kalan = 0;
  for (const karakter of yeniden) {
    const basamak = /\d/.test(karakter)
      ? karakter
      : String(karakter.charCodeAt(0) - 55);
    kalan = Number(String(kalan) + basamak) % 97;
  }
  return kalan === 1;
}

/** Okunabilir hâle getirir: "TR330006…" → "TR33 0006 …". */
export function ibanBicimle(ham: string): string {
  return ibanNormalle(ham).replace(/(.{4})/g, "$1 ").trim();
}

/**
 * Ödeme talimatı gösterilebilir mi?
 *
 * IBAN'ın yalnızca dolu olması yetmez, GEÇERLİ olması gerekir — yer
 * tutucu ya da yarım girilmiş bir hesap numarası müşteriye asla ödeme
 * talimatı olarak gösterilmemeli. Geçersizse ekran WhatsApp'a düşer.
 */
export function odemeBilgileriHazirMi(ayarlar: OdemeBilgileri): boolean {
  return (
    ibanGecerliMi(ayarlar.iban) && ayarlar.hesapSahibi.trim().length > 0
  );
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
