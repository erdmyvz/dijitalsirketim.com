import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

// Check-Up başvurularını doğrulayıp Supabase'deki "basvurular"
// tablosuna kaydeder. Supabase ortam değişkenleri henüz tanımlı
// değilse (yerel geliştirme / ilk kurulum) başvuruyu sunucu
// günlüğüne yazar ve yine başarı döndürür — form ziyaretçi için
// hiçbir zaman kırılmaz.
export async function POST(request: Request) {
  const data = await request.json().catch(() => null);

  if (
    !data ||
    typeof data.adSoyad !== "string" ||
    !data.adSoyad.trim() ||
    typeof data.telefon !== "string" ||
    !data.telefon.trim()
  ) {
    return NextResponse.json(
      { ok: false, error: "Ad Soyad ve telefon zorunludur." },
      { status: 400 },
    );
  }

  const kayit = {
    ad_soyad: String(data.adSoyad).trim().slice(0, 200),
    isletme_adi: String(data.isletmeAdi ?? "").trim().slice(0, 200),
    sektor: String(data.sektor ?? "").trim().slice(0, 200),
    telefon: String(data.telefon).trim().slice(0, 50),
  };

  const supabase = createAdminClient();

  if (!supabase) {
    console.warn(
      "Supabase yapılandırılmamış (.env.local eksik) — başvuru yalnızca günlüğe yazıldı:",
      kayit,
    );
    return NextResponse.json({ ok: true });
  }

  const { error } = await supabase.from("basvurular").insert(kayit);

  if (error) {
    console.error("Başvuru Supabase'e kaydedilemedi:", error.message);
    return NextResponse.json(
      { ok: false, error: "Başvuru kaydedilemedi, lütfen tekrar deneyin." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
