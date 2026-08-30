import { NextResponse } from "next/server";

// Bu API route'u şu anda gelen formu sadece doğrulayıp başarı döndürüyor.
// Gerçek bir yayında burada şunlardan birini yapmalısınız:
//  - E-posta gönderimi (ör. Resend, Nodemailer + SMTP)
//  - Bir CRM / Google Sheets / Airtable'a kayıt
//  - Bir form servisine (Formspree, Web3Forms) yönlendirme
// Aşağıdaki TODO satırına kendi entegrasyonunuzu ekleyin.
export async function POST(request: Request) {
  const data = await request.json().catch(() => null);

  if (
    !data ||
    typeof data.adSoyad !== "string" ||
    !data.adSoyad.trim() ||
    typeof data.iletisim !== "string" ||
    !data.iletisim.trim()
  ) {
    return NextResponse.json(
      { ok: false, error: "Ad Soyad ve iletişim bilgisi zorunludur." },
      { status: 400 },
    );
  }

  // TODO: Gerçek e-posta / CRM entegrasyonunu buraya ekleyin.
  console.log("Yeni ücretsiz teşhis talebi:", {
    adSoyad: data.adSoyad,
    isletme: data.isletme ?? "",
    iletisim: data.iletisim,
    site: data.site ?? "",
    mesaj: data.mesaj ?? "",
  });

  return NextResponse.json({ ok: true });
}
