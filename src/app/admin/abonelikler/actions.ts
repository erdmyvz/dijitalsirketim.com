"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { adminOlmaliVeyaHata } from "@/lib/admin/yetki";
import { skorHesapla } from "@/lib/checkup/scoring";
import { karneyiCheckupStateYap } from "@/lib/checkup/karne";
import { tedaviPlaniHesapla } from "@/lib/tedavi/fiyat";
import { fiyatAyarlariniOku } from "@/lib/tedavi/ayarlar";
import { FONKSIYONLAR } from "@/data/questions";
import type { Karne } from "@/lib/checkup/types";

/**
 * Kullanıcıya N ay erişim tanır.
 *
 * Süre, varsa mevcut aboneliğin bitişinden devam eder (üst üste ödeme
 * yapan müşteri gün kaybetmesin); yoksa bugünden başlar. Kapsanan
 * fonksiyonlar ve tutar, kullanıcının EN SON karnesinden hesaplanıp
 * satıra donduruluyor — sonradan karne değişse bile ödenen dönemin
 * kapsamı sabit kalır.
 *
 * Karnesi olmayan kullanıcıya da erişim verilebilir (pilot müşteri,
 * test hesabı): o durumda 7 fonksiyonun tamamı açılır ve tutar boş
 * kalır, çünkü hesaplanacak bir teşhis yoktur.
 */
export async function aboneligeAyEkle(formData: FormData) {
  await adminOlmaliVeyaHata();

  const kullaniciId = String(formData.get("kullanici_id") ?? "");
  const ay = Number(formData.get("ay") ?? 1);
  if (!kullaniciId || !Number.isFinite(ay) || ay < 1 || ay > 24) {
    throw new Error("Geçersiz istek.");
  }

  const admin = createAdminClient();
  if (!admin) throw new Error("Supabase yapılandırılmamış.");

  const supabase = await createClient();
  const {
    data: { user: adminKullanici },
  } = await supabase.auth.getUser();

  // Kullanıcının son karnesi → plan (kapsam + tutar)
  const { data: karne } = await admin
    .from("karneler")
    .select(
      "id, created_at, isletme_adi, sektor, is_modeli, calisan_sayisi, ciro_araligi, problem_metni, cevaplar, ai_teshis, durum",
    )
    .eq("user_id", kullaniciId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle<Karne>();

  // Karne varsa kapsam ve tutar ondan hesaplanır. Karne yoksa erişim
  // yine verilebilmeli (pilot müşteri, test hesabı, jest) — o durumda
  // 7 fonksiyonun tamamı açılır ve tutar boş bırakılır, çünkü
  // hesaplanacak bir teşhis yok.
  let fonksiyonlar: string[];
  let aylikTutar: number | null;

  if (karne) {
    const ayarlar = await fiyatAyarlariniOku();
    const plan = tedaviPlaniHesapla(
      skorHesapla(karneyiCheckupStateYap(karne)),
      ayarlar,
    );
    fonksiyonlar = plan.kalemler.map((k) => k.fonksiyon.id);
    aylikTutar = plan.aylikTutar;
  } else {
    fonksiyonlar = FONKSIYONLAR.map((f) => f.id);
    aylikTutar = null;
  }

  // Mevcut aktif abonelik varsa onun bitişinden devam et.
  const { data: mevcut } = await admin
    .from("abonelikler")
    .select("bitis")
    .eq("user_id", kullaniciId)
    .gt("bitis", new Date().toISOString())
    .order("bitis", { ascending: false })
    .limit(1)
    .maybeSingle<{ bitis: string }>();

  const baslangic = mevcut ? new Date(mevcut.bitis) : new Date();
  const bitis = new Date(baslangic);
  bitis.setMonth(bitis.getMonth() + ay);

  const { error } = await admin.from("abonelikler").insert({
    user_id: kullaniciId,
    baslangic: baslangic.toISOString(),
    bitis: bitis.toISOString(),
    fonksiyonlar,
    aylik_tutar: aylikTutar,
    aciklama: karne
      ? `${ay} ay — panelden onaylandı`
      : `${ay} ay — check-up yok, tüm fonksiyonlar açıldı`,
    olusturan: adminKullanici?.id ?? null,
  });

  if (error) throw new Error(`Abonelik eklenemedi: ${error.message}`);

  revalidatePath("/admin/abonelikler");
}

/** Aboneliği hemen sonlandırır (bitişi şimdiye çeker). */
export async function aboneligiSonlandir(formData: FormData) {
  await adminOlmaliVeyaHata();

  const abonelikId = String(formData.get("abonelik_id") ?? "");
  if (!abonelikId) throw new Error("Geçersiz istek.");

  const admin = createAdminClient();
  if (!admin) throw new Error("Supabase yapılandırılmamış.");

  const { error } = await admin
    .from("abonelikler")
    .update({ bitis: new Date().toISOString() })
    .eq("id", abonelikId);

  if (error) throw new Error(`Abonelik sonlandırılamadı: ${error.message}`);

  revalidatePath("/admin/abonelikler");
}
