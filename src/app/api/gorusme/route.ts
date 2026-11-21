import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import surumBilgisi from "../../../../version.json";

/**
 * Görüşme taleplerini `gorusme_talepleri` tablosuna yazar.
 *
 * Supabase henüz yapılandırılmamışsa talebi sunucu günlüğüne yazar ve
 * YİNE başarı döner: eksik bir ortam değişkeni yüzünden ziyaretçinin
 * formu kırılmaz. Eski sitede aynı deseni kullanıyorduk ve işe
 * yaramıştı.
 */

/** Havale açıklamasına değil, takip konuşmasına yarayan kısa kod. */
function referansKoduUret(): string {
  // 0/O ve 1/I gibi karışabilecek karakterler bilerek yok.
  const alfabe = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let kod = "";
  for (let i = 0; i < 4; i++) {
    kod += alfabe[Math.floor(Math.random() * alfabe.length)];
  }
  return `DS-${kod}`;
}

const kirp = (deger: unknown, uzunluk: number) =>
  String(deger ?? "").trim().slice(0, uzunluk);

/**
 * Her yanıta derlemenin sürüm numarası ekleniyor. Vercel'de ortam
 * değişkeni değişikliği yalnızca YENİ dağıtımlara uygulandığı için,
 * "değişkeni sildim ama form hâlâ hata veriyor" durumunda tek soru
 * şu oluyor: yeni derleme indi mi, yoksa eskisi mi servis ediyor?
 * Geçersiz bir istek (400) hiçbir şey yazmadan bu başlığı döndürür.
 */
const basliklar = { "x-ds-surum": String(surumBilgisi.version) };

export async function POST(request: Request) {
  const veri = await request.json().catch(() => null);

  const adSoyad = kirp(veri?.adSoyad, 120);
  const telefon = kirp(veri?.telefon, 30);

  if (!adSoyad || !telefon) {
    return NextResponse.json(
      { ok: false, error: "Ad Soyad ve telefon zorunludur." },
      { status: 400, headers: basliklar },
    );
  }

  // "kim" alanı dışarıdan geliyor; bilinen iki değerden biri değilse
  // boş bırakılır — veritabanına serbest metin düşmesin.
  const kimHam = kirp(veri?.kim, 20);
  const kim = kimHam === "ajans" || kimHam === "isletme" ? kimHam : null;

  const referansKodu = referansKoduUret();

  const kayit = {
    ad_soyad: adSoyad,
    telefon,
    eposta: kirp(veri?.eposta, 160) || null,
    kim,
    isletme: kirp(veri?.isletme, 160) || null,
    mesaj: kirp(veri?.not, 1000) || null,
    referans_kodu: referansKodu,
  };

  const supabase = createAdminClient();

  if (!supabase) {
    console.warn(
      "Supabase yapılandırılmamış — görüşme talebi yalnızca günlüğe yazıldı:",
      kayit,
    );
    return NextResponse.json(
      { ok: true, referansKodu },
      { headers: basliklar },
    );
  }

  const { error } = await supabase.from("gorusme_talepleri").insert(kayit);

  if (error) {
    // Talebi kaybetmemek için günlüğe de düşürüyoruz: ziyaretçi
    // WhatsApp'a yönlendirilecek ama kayıt sunucu günlüğünde kalacak.
    console.error("Görüşme talebi kaydedilemedi:", error.message, kayit);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Talep kaydedilemedi. WhatsApp'tan yazarsan hemen dönüş yapabilirim.",
      },
      { status: 500, headers: basliklar },
    );
  }

  return NextResponse.json({ ok: true, referansKodu }, { headers: basliklar });
}
