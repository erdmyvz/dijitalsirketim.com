import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Service-role istemcisi — YALNIZCA sunucuda (API route) kullanılır.
// RLS'i baypas eder; bu sayede "basvurular" tablosuna INSERT policy'si
// açmadan kayıt ekleyebiliyoruz.
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) return null; // Supabase henüz yapılandırılmadı

  return createSupabaseClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
