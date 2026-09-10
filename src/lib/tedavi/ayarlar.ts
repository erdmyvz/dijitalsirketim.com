import { createClient } from "@/lib/supabase/server";
import {
  VARSAYILAN_FIYAT_AYARLARI,
  type FiyatAyarlari,
} from "./fiyat";

/**
 * Fiyat ayarlarını Supabase'deki `ayarlar` tablosundan okur.
 *
 * Tablo henüz oluşturulmadıysa, satır eksikse, değer bozuksa ya da
 * Supabase erişilemiyorsa koddaki varsayılana düşer — fiyat gösteren
 * bir ekranın tamamen kaybolmasındansa varsayılanla çalışması yeğdir.
 * (Aynı savunmacı yaklaşım: sonKarne.ts, proxy.ts — bkz. KARARLAR.md
 * 2026-09-08.)
 */
export async function fiyatAyarlariniOku(): Promise<FiyatAyarlari> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("ayarlar")
      .select("anahtar, deger")
      .in("anahtar", ["birim_ucret", "nabiz_tabani"])
      .returns<{ anahtar: string; deger: string }[]>();

    if (error || !data) return VARSAYILAN_FIYAT_AYARLARI;

    const oku = (anahtar: string, varsayilan: number): number => {
      const satir = data.find((d) => d.anahtar === anahtar);
      if (!satir) return varsayilan;
      const sayi = Number(satir.deger);
      return Number.isFinite(sayi) && sayi >= 0 ? sayi : varsayilan;
    };

    return {
      birimUcret: oku("birim_ucret", VARSAYILAN_FIYAT_AYARLARI.birimUcret),
      nabizTabani: oku("nabiz_tabani", VARSAYILAN_FIYAT_AYARLARI.nabizTabani),
    };
  } catch {
    return VARSAYILAN_FIYAT_AYARLARI;
  }
}
