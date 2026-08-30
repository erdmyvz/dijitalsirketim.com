import { NextResponse } from "next/server";

// Bu API route'u şu anda gelen başvuruyu sadece doğrulayıp başarı
// döndürüyor. Bu, "TEKNİK" başlığında belirtilen geçici çözümlerden
// biridir. Gerçek bir yayında burada şunlardan birini yapmalısınız:
//  - E-posta gönderimi (ör. Resend, Nodemailer + SMTP)
//  - Bir CRM / Google Sheets / Airtable'a kayıt
//  - Bir form servisine (Formspree, Web3Forms) yönlendirme
// Ödeme entegrasyonu (checkout, ön ödeme vb.) kasıtlı olarak sonraki
// faza bırakılmıştır — bu route sadece başvuru/lead topluyor.
// Aşağıdaki TODO satırına kendi entegrasyonunuzu ekleyin.
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

  // TODO: Gerçek e-posta / CRM entegrasyonunu buraya ekleyin.
  console.log("Yeni Dijital Check-Up başvurusu:", {
    adSoyad: data.adSoyad,
    isletmeAdi: data.isletmeAdi ?? "",
    sektor: data.sektor ?? "",
    telefon: data.telefon,
  });

  return NextResponse.json({ ok: true });
}
