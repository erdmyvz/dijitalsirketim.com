import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// /admin altındaki isteklerde Supabase oturumunu tazeler (süresi dolan
// access token'ı cookie üzerinden yeniler) ve oturumu olmayanları giriş
// sayfasına yönlendirir. Next.js 16'da middleware'in yeni adı: proxy.
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Supabase yapılandırılmadıysa admin alanını tamamen kapalı tut.
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

  const girisSayfasi = request.nextUrl.pathname === "/admin/giris";

  if (!user && !girisSayfasi) {
    return NextResponse.redirect(new URL("/admin/giris", request.url));
  }
  if (user && girisSayfasi) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};
