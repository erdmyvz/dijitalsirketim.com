"use client";

import { Suspense, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";

function KayitFormu() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sonraki = searchParams.get("sonraki") || "/hesap";
  const girisHref =
    sonraki === "/hesap" ? "/hesap/giris" : `/hesap/giris?sonraki=${encodeURIComponent(sonraki)}`;

  const [hata, setHata] = useState("");
  const [gonderiliyor, setGonderiliyor] = useState(false);
  const [epostaGonderildi, setEpostaGonderildi] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setHata("");
    setGonderiliyor(true);

    const formData = new FormData(e.currentTarget);
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      options: {
        data: { ad_soyad: String(formData.get("ad_soyad") ?? "") },
      },
    });

    if (error) {
      setGonderiliyor(false);
      setHata(
        error.message.toLowerCase().includes("already registered") ||
          error.message.toLowerCase().includes("already exists")
          ? "Bu e-posta ile zaten bir hesap var. Giriş yapmayı dener misin?"
          : "Kayıt başarısız: " + error.message,
      );
      return;
    }

    // Supabase projesinde "e-posta doğrulaması" açıksa oturum hemen
    // başlamaz — session null döner, kullanıcı e-postasına gitmeli.
    if (data.session) {
      router.replace(sonraki);
      router.refresh();
      return;
    }

    setGonderiliyor(false);
    setEpostaGonderildi(true);
  }

  if (epostaGonderildi) {
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
            Hesabını onaylamak için sana gönderdiğimiz bağlantıya tıkla,
            ardından giriş yap.
          </p>
          <Link
            href={girisHref}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition-all duration-300 ease-[var(--ease-apple)] hover:bg-teal-700"
          >
            Giriş Sayfasına Git
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
            Hesap Oluştur
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Check-Up karnelerini kaydet, ilerlemeni takip et.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm"
        >
          <div>
            <label
              htmlFor="ad_soyad"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Ad Soyad
            </label>
            <input
              id="ad_soyad"
              name="ad_soyad"
              type="text"
              required
              autoComplete="name"
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-all duration-200 ease-[var(--ease-apple)] focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
              placeholder="Ad Soyad"
            />
          </div>

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
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Şifre
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              autoComplete="new-password"
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-all duration-200 ease-[var(--ease-apple)] focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
              placeholder="En az 6 karakter"
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
            {gonderiliyor ? "Kaydediliyor..." : "Hesap Oluştur"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Zaten hesabın var mı?{" "}
          <Link href={girisHref} className="font-semibold text-teal-700 hover:underline">
            Giriş yap
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function HesapKayit() {
  return (
    <Suspense fallback={null}>
      <KayitFormu />
    </Suspense>
  );
}
