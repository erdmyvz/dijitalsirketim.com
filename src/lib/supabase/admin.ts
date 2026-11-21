import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Servis rolü anahtarıyla çalışan sunucu istemcisi. RLS'i atlar, bu
 * yüzden YALNIZCA sunucu tarafında kullanılır — anahtar tarayıcıya asla
 * gönderilmez.
 *
 * Ortam değişkenleri tanımlı değilse (yerel geliştirme, Supabase projesi
 * henüz açılmamış) `null` döner ve çağıran taraf nazikçe yedek yola
 * düşer. Böylece yapılandırma eksikliği ziyaretçiye hata olarak
 * yansımaz.
 */
export function createAdminClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key || !/^https?:\/\//i.test(url)) return null;

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
