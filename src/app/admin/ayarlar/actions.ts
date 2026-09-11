"use server";

import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { adminOlmaliVeyaHata } from "@/lib/admin/yetki";
import { ibanGecerliMi, ibanNormalle } from "@/lib/tedavi/ayarlar";

const SAYISAL_ANAHTARLAR = ["birim_ucret", "nabiz_tabani"];
const METIN_ANAHTARLARI = ["iban", "hesap_sahibi"];

/**
 * Girdi hatalarını neden `throw` etmiyoruz?
 *
 * Server Action içinde fırlatılan hata, yöneticiye "A server error
 * occurred" diyen ham bir hata sayfası olarak çıkıyor — yazdığımız
 * açıklama ekrana hiç ulaşmıyor. IBAN'da bir hane yanlış yazmak sıradan
 * bir kullanıcı hatası, çökme değil; bu yüzden sayfaya bir hata koduyla
 * geri dönüyoruz. `throw` yalnızca gerçekten beklenmedik durumlar için
 * kalıyor (yetkisiz çağrı, yapılandırma eksikliği).
 */
const SAYFA = "/admin/ayarlar";

/** Fiyat ve ödeme ayarlarını günceller. */
export async function ayarlariKaydet(formData: FormData) {
  await adminOlmaliVeyaHata();

  const admin = createAdminClient();
  if (!admin) throw new Error("Supabase yapılandırılmamış.");

  const guncellenecek: { anahtar: string; deger: string }[] = [];

  for (const anahtar of SAYISAL_ANAHTARLAR) {
    const ham = formData.get(anahtar);
    if (ham === null) continue;
    const sayi = Number(String(ham).replace(/\s/g, ""));
    if (!Number.isFinite(sayi) || sayi < 0) {
      redirect(`${SAYFA}?hata=sayi`, RedirectType.replace);
    }
    guncellenecek.push({ anahtar, deger: String(Math.round(sayi)) });
  }

  for (const anahtar of METIN_ANAHTARLARI) {
    const ham = formData.get(anahtar);
    if (ham === null) continue;
    const deger = String(ham).trim();

    // IBAN ya boş bırakılır (henüz girilmedi) ya da GEÇERLİ olur.
    // Yarım/yanlış bir hesap numarasının kaydedilip müşteriye ödeme
    // talimatı olarak gösterilmesi, bu ekranın önlemesi gereken tek
    // ciddi hata. Normalleştirerek saklıyoruz: biçimlendirme okuma
    // tarafının işi.
    if (anahtar === "iban" && deger.length > 0) {
      if (!ibanGecerliMi(deger)) {
        redirect(`${SAYFA}?hata=iban`, RedirectType.replace);
      }
      guncellenecek.push({ anahtar, deger: ibanNormalle(deger) });
      continue;
    }

    guncellenecek.push({ anahtar, deger });
  }

  if (guncellenecek.length === 0) redirect(SAYFA, RedirectType.replace);

  const { error } = await admin.from("ayarlar").upsert(
    guncellenecek.map((a) => ({ ...a, guncellendi: new Date().toISOString() })),
    { onConflict: "anahtar" },
  );

  if (error) {
    console.error("[ayarlar] kaydedilemedi:", error.message);
    redirect(`${SAYFA}?hata=kayit`, RedirectType.replace);
  }

  // Fiyat ve IBAN birçok ekranda görünüyor — hepsi tazelensin.
  revalidatePath("/admin/ayarlar");
  revalidatePath("/hesap/plan");
  revalidatePath("/hesap/odeme");
  revalidatePath("/admin/abonelikler");

  redirect(`${SAYFA}?kayit=ok`, RedirectType.replace);
}
