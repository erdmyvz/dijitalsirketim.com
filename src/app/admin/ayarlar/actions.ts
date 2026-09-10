"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { adminOlmaliVeyaHata } from "@/lib/admin/yetki";

const SAYISAL_ANAHTARLAR = ["birim_ucret", "nabiz_tabani"];
const METIN_ANAHTARLARI = ["iban", "hesap_sahibi"];

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
      throw new Error(`"${anahtar}" geçerli bir sayı olmalı.`);
    }
    guncellenecek.push({ anahtar, deger: String(Math.round(sayi)) });
  }

  for (const anahtar of METIN_ANAHTARLARI) {
    const ham = formData.get(anahtar);
    if (ham === null) continue;
    guncellenecek.push({ anahtar, deger: String(ham).trim() });
  }

  if (guncellenecek.length === 0) return;

  const { error } = await admin.from("ayarlar").upsert(
    guncellenecek.map((a) => ({ ...a, guncellendi: new Date().toISOString() })),
    { onConflict: "anahtar" },
  );

  if (error) throw new Error(`Ayarlar kaydedilemedi: ${error.message}`);

  // Fiyat ve IBAN birçok ekranda görünüyor — hepsi tazelensin.
  revalidatePath("/admin/ayarlar");
  revalidatePath("/hesap/plan");
  revalidatePath("/hesap/odeme");
  revalidatePath("/admin/abonelikler");
}
