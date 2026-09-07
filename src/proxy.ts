import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// /admin ve /hesap altındaki isteklerde Supabase oturumunu tazeler
// (süresi dolan access token'ı cookie üzerinden yeniler) ve oturumu
// olmayanları ilgili giriş sayfasına yönlendirir. İkisi ayrı "alan":
// /admin yalnızca is_admin=true kullanıcılar için (bu kabalık kontrolü
// burada — asıl is_admin kontrolü admin/page.tsx'te "derinlemesine
// savunma" olarak yapılır), /hesap ise herhangi bir kayıtlı müşteri
// için. Next.js 16'da middleware'in yeni adı: proxy.
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const pathname = request.nextUrl.pathname;
  const alan = pathname.startsWith("/hesap") ? "hesap" : "admin";
  const girisYolu = alan === "hesap" ? "/hesap/giris" : "/admin/giris";
  const girisAlaniYollari =
    alan === "hesap" ? ["/hesap/giris", "/hesap/kayit"] : ["/admin/giris"];
  const anaSayfa = alan === "hesap" ? "/hesap" : "/admin";

  // Supabase yapılandırılmadıysa korumalı alanı tamamen kapalı tut.
  if (!url || !anonKey) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  // getUser(), token'ı Supabase'e doğrulatır (getSession'dan güvenlidir).
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const girisSayfasindaMi = girisAlaniYollari.includes(pathname);

  if (!user && !girisSayfasindaMi) {
    return NextResponse.redirect(new URL(girisYolu, request.url));
  }
  if (user && girisSayfasindaMi) {
    return NextResponse.redirect(new URL(anaSayfa, request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/admin", "/hesap/:path*", "/hesap"],
};
