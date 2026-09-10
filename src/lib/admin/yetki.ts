import { createClient } from "@/lib/supabase/server";

/**
 * Oturumdaki kullanıcının admin olup olmadığını doğrular.
 *
 * ÖNEMLİ: Server Action'lar herkese açık HTTP uç noktalarıdır — proxy.ts
 * bir sayfayı korusa bile aksiyonun kendisi doğrudan çağrılabilir. Bu
 * yüzden servis anahtarıyla iş yapan HER aksiyon, işe başlamadan önce
 * bunu çağırmak zorunda.
 */
export async function adminMi(): Promise<boolean> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return false;

    const { data, error } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .maybeSingle<{ is_admin: boolean }>();

    return !error && Boolean(data?.is_admin);
  } catch {
    return false;
  }
}

/** Admin değilse hata fırlatır — aksiyonların ilk satırı. */
export async function adminOlmaliVeyaHata(): Promise<void> {
  if (!(await adminMi())) {
    throw new Error("Bu işlem için yönetici yetkisi gerekiyor.");
  }
}
