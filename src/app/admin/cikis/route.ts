import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Admin çıkışı: oturumu sonlandırıp giriş sayfasına yönlendirir.
export async function POST(request: Request) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL("/admin/giris", request.url), {
    status: 303,
  });
}
