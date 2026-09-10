import { createClient } from "@/lib/supabase/server";
import { skorHesapla } from "@/lib/checkup/scoring";
import { karneyiCheckupStateYap } from "@/lib/checkup/karne";
import type { CheckupSonuc, Karne } from "@/lib/checkup/types";

/**
 * Giriş yapmış kullanıcının EN SON karnesini okuyup skorunu hesaplar.
 * Oturum yoksa, karne yoksa ya da Supabase erişilemiyorsa null döner —
 * çağıran sayfa bu durumda nötr içeriğini gösterir.
 *
 * Bilinçli olarak asla fırlatmaz: /tedavi herkese açık bir sayfa,
 * Supabase'deki bir aksaklık yüzünden katalogun tamamen kaybolması
 * kabul edilebilir değil (aynı hataya proxy.ts'te bir kez yakalandık —
 * bkz. KARARLAR.md 2026-09-08).
 */
export async function sonKarneSonucu(): Promise<CheckupSonuc | null> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: karne, error } = await supabase
      .from("karneler")
      .select(
        "id, created_at, isletme_adi, sektor, is_modeli, calisan_sayisi, ciro_araligi, problem_metni, cevaplar, ai_teshis, durum",
      )
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle<Karne>();

    if (error || !karne) return null;

    return skorHesapla(karneyiCheckupStateYap(karne));
  } catch {
    return null;
  }
}
