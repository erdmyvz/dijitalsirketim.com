import { createBrowserClient } from "@supabase/ssr";

// Tarayıcı tarafı Supabase istemcisi (admin giriş formu kullanır).
// Oturumu cookie'lerde tutar; sunucu tarafı istemci aynı cookie'leri okur.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
