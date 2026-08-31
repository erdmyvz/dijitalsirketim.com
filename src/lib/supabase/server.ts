import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Sunucu tarafı Supabase istemcisi: Server Component'lerde ve Route
// Handler'larda oturumu cookie'lerden okur.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Server Component içinden çağrıldığında cookie yazılamaz;
            // oturum tazeleme proxy.ts'te yapıldığı için yok sayılabilir.
          }
        },
      },
    },
  );
}
