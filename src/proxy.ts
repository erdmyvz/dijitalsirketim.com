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

  // Şifre sıfırlama bağlantısının düştüğü route, guard'ın TAMAMEN
  // dışında kalmalı: oturum yokken çalışması gerekiyor (oturumu zaten
  // o route açıyor), ama oturum varken de "giriş sayfası" sayılıp
  // /hesap'a atılmamalı — yoksa başka sekmede oturumu açık olan bir
  // kullanıcının sıfırlama bağlantısı sessizce çalışmaz.
  if (pathname === "/hesap/sifre-yenile/dogrula") {
    return response;
  }

  // /admin dışındaki her korumalı yol müşteri alanı: /hesap ve /tedavi.
  // Tedavi modülleri, içerikleri tamamlanana kadar herkese açık değil —
  // yalnızca hesap açan müşteriler görüyor (modülün İÇERİĞİ ayrıca
  // aboneliğe bağlı, bkz. ModulIcerigi.tsx).
  const alan = pathname.startsWith("/admin") ? "admin" : "hesap";
  const girisYolu = alan === "hesap" ? "/hesap/giris" : "/admin/giris";
  // Oturum açmadan girilebilen sayfalar. NOT: /hesap/sifre-yenile
  // bilerek burada DEĞİL — oturum gerektiren korumalı bir sayfa.
  const girisAlaniYollari =
    alan === "hesap"
      ? ["/hesap/giris", "/hesap/kayit", "/hesap/sifremi-unuttum"]
      : ["/admin/giris"];
  const anaSayfa = alan === "hesap" ? "/hesap" : "/admin";

  // Supabase yapılandırılmadıysa korumalı alanı tamamen kapalı tut.
  // NOT: yalnızca "tanımsız mı" değil, "http(s) ile başlıyor mu" diye de
  // bakıyoruz — @supabase/ssr bunu kontrol etmiyor, doğrudan fırlatıyor
  // ("Invalid supabaseUrl"), bu da tüm /admin ve /hesap'ı 500'e
  // düşürüyordu. Canlıda bir kez gözlemlendi: env değişkeni Vercel'e
  // muhtemelen "ANAHTAR=DEĞER" olarak (değer kutusuna anahtar adı da
  // dahil edilerek) yanlış girilmişti. Burada erken yakalayıp güvenli
  // bir önizlemeyle logluyoruz ki tekrarlarsa gerçek değeri görelim.
  if (!url || !anonKey || !/^https?:\/\//i.test(url)) {
    if (url && !/^https?:\/\//i.test(url)) {
      console.error(
        `[proxy] NEXT_PUBLIC_SUPABASE_URL "http(s)://" ile başlamıyor — uzunluk: ${url.length}, önizleme: "${url.slice(0, 20)}"`,
      );
    }
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
    // Gitmek istediği yeri koru: giriş sayfası `sonraki` parametresini
    // zaten okuyor, kullanıcı girişten sonra tıkladığı modüle döner.
    const hedef = new URL(girisYolu, request.url);
    if (alan === "hesap" && pathname !== "/hesap") {
      hedef.searchParams.set("sonraki", pathname);
    }
    return NextResponse.redirect(hedef);
  }
  if (user && girisSayfasindaMi) {
    return NextResponse.redirect(new URL(anaSayfa, request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/admin",
    "/hesap/:path*",
    "/hesap",
    "/tedavi/:path*",
    "/tedavi",
  ],
};
