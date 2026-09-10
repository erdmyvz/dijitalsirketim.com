"use client";

import { Suspense, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";

// Müşteri girişi — admin girişinden (/admin/giris) tamamen ayrı.
// useSearchParams kullandığı için Suspense sınırı gerekiyor (Next.js
// prod build'de bu olmadan hata verir).
/**
 * Girişten sonra nereye gidileceğini belirler.
 *
 * Kullanıcı belirli bir sayfaya gitmek isterken girişe düştüyse
 * (ör. bir modül bağlantısı → ?sonraki=/tedavi/...) oraya devam edilir.
 * Hedef belirtilmemişse admin doğrudan yönetim paneline alınır —
 * yönetici her girişte müşteri panelinden geçmek zorunda kalmasın.
 *
 * Profil okunamazsa sessizce /hesap'a düşer: yönlendirme kolaylığı için
 * girişi bloklamaya değmez.
 */
async function hedefiBelirle(
  supabase: ReturnType<typeof createClient>,
  kullaniciId: string | undefined,
  sonraki: string,
): Promise<string> {
  if (sonraki !== "/hesap" || !kullaniciId) return sonraki;

  try {
    const { data } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", kullaniciId)
      .maybeSingle<{ is_admin: boolean }>();
    return data?.is_admin ? "/admin" : sonraki;
  } catch {
    return sonraki;
  }
}

function GirisFormu() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sonraki = searchParams.get("sonraki") || "/hesap";
  const [hata, setHata] = useState("");
  const [gonderiliyor, setGonderiliyor] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setHata("");
    setGonderiliyor(true);

    const formData = new FormData(e.currentTarget);
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    });

    if (error) {
      setGonderiliyor(false);
      setHata("Giriş başarısız: e-posta veya şifre hatalı.");
      return;
    }

    router.replace(await hedefiBelirle(supabase, data.user?.id, sonraki));
    router.refresh();
  }

  const kayitHref =
    sonraki === "/hesap" ? "/hesap/kayit" : `/hesap/kayit?sonraki=${encodeURIComponent(sonraki)}`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-xl text-white">
            🩺
          </span>
          <h1 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-slate-900">
            Hesabına Giriş Yap
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Check-Up karnelerini gör, ilerlemeni takip et.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm"
        >
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              E-posta
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-all duration-200 ease-[var(--ease-apple)] focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
              placeholder="ornek@sirket.com"
            />
          </div>

          <div>
            <div className="mb-1 flex items-baseline justify-between gap-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700"
              >
                Şifre
              </label>
              <Link
                href="/hesap/sifremi-unuttum"
                className="text-xs font-medium text-teal-700 hover:underline"
              >
                Şifremi unuttum
              </Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-all duration-200 ease-[var(--ease-apple)] focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
              placeholder="••••••••"
            />
          </div>

          {hata && (
            <p className="animate-apple-in rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {hata}
            </p>
          )}

          <button
            type="submit"
            disabled={gonderiliyor}
            className="w-full rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition-all duration-300 ease-[var(--ease-apple)] hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {gonderiliyor ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Hesabın yok mu?{" "}
          <Link href={kayitHref} className="font-semibold text-teal-700 hover:underline">
            Kayıt ol
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function HesapGiris() {
  return (
    <Suspense fallback={null}>
      <GirisFormu />
    </Suspense>
  );
}
