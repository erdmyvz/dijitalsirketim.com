import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// E-postadaki şifre sıfırlama bağlantısı buraya düşer. Tek kullanımlık
// kodu oturuma çevirmek COOKIE YAZMAYI gerektirdiği için bu iş bir Route
// Handler'da yapılıyor — Server Component'ten cookie yazılamıyor
// (bkz. src/lib/supabase/server.ts'teki not).
//
// İki bağlantı biçimi de destekleniyor:
//   - PKCE akışı            → ?code=...
//   - klasik e-posta şablonu → ?token_hash=...&type=recovery
// Hangisinin geleceği Supabase projesindeki e-posta şablonuna bağlı;
// ikisini de karşılamak bağlantının sessizce çalışmamasını önlüyor.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");

  const supabase = await createClient();

  let basarili = false;

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    basarili = !error;
  } else if (tokenHash && type === "recovery") {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: "recovery",
    });
    basarili = !error;
  }

  // Süresi dolmuş / daha önce kullanılmış / eksik bağlantı: kullanıcıyı
  // yeni bağlantı isteyebileceği sayfaya, açıklayıcı bir uyarıyla yolla.
  if (!basarili) {
    return NextResponse.redirect(
      new URL("/hesap/sifremi-unuttum?hata=baglanti", request.url),
      { status: 303 },
    );
  }

  return NextResponse.redirect(new URL("/hesap/sifre-yenile", request.url), {
    status: 303,
  });
}
