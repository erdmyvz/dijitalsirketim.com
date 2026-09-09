"use client";

import { Suspense, useState, type FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";

// Şifre sıfırlama isteği. Supabase, kayıtlı OLMAYAN bir e-posta için de
// hata döndürmez (hesap sızdırmamak için) — biz de aynı ekranı
// gösteriyoruz. Yani buradaki hata mesajları yalnızca gerçek teknik
// sorunlara (hız sınırı, e-posta gönderilemedi) ait.
function SifremiUnuttumFormu() {
  const searchParams = useSearchParams();
  const baglantiHatasi = searchParams.get("hata") === "baglanti";

  const [gonderiliyor, setGonderiliyor] = useState(false);
  const [gonderildi, setGonderildi] = useState(false);
  const [hata, setHata] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setHata("");
    setGonderiliyor(true);

    const formData = new FormData(e.currentTarget);
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(
      String(formData.get("email") ?? ""),
      { redirectTo: `${window.location.origin}/hesap/sifre-yenile/dogrula` },
    );

    setGonderiliyor(false);

    if (error) {
      setHata(
        error.status === 429
          ? "Çok sık denendi. Birkaç dakika sonra tekrar dener misin?"
          : "E-posta gönderilemedi. Biraz sonra tekrar dene, sorun sürerse WhatsApp'tan yaz.",
      );
      return;
    }

    setGonderildi(true);
  }

  if (gonderildi) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="w-full max-w-sm rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-sm">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-xl text-white">
            ✉️
          </span>
          <h1 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-slate-900">
            E-postanı kontrol et
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Bu e-posta ile kayıtlı bir hesap varsa, şifre belirleme
            bağlantısını gönderdik. Bağlantı kısa süre geçerli — gelen
            kutunda yoksa spam klasörüne de bak.
          </p>
          <Link
            href="/hesap/giris"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition-all duration-300 ease-[var(--ease-apple)] hover:bg-teal-700"
          >
            Giriş Sayfasına Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-xl text-white">
            🩺
          </span>
          <h1 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-slate-900">
            Şifreni mi unuttun?
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            E-posta adresini yaz, yeni şifre belirleme bağlantısı gönderelim.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm"
        >
          {baglantiHatasi && (
            <p className="animate-apple-in rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
              Bağlantının süresi dolmuş veya daha önce kullanılmış. Yeni bir
              bağlantı isteyebilirsin.
            </p>
          )}

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
            {gonderiliyor ? "Gönderiliyor..." : "Bağlantı Gönder"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Şifreni hatırladın mı?{" "}
          <Link href="/hesap/giris" className="font-semibold text-teal-700 hover:underline">
            Giriş yap
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SifremiUnuttum() {
  return (
    <Suspense fallback={null}>
      <SifremiUnuttumFormu />
    </Suspense>
  );
}
