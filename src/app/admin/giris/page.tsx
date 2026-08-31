"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";

// Admin giriş sayfası. Kullanıcılar Supabase Dashboard >
// Authentication > Users üzerinden elle eklenir; sitede halka açık
// üyelik yoktur.
export default function AdminGiris() {
  const router = useRouter();
  const [hata, setHata] = useState("");
  const [gonderiliyor, setGonderiliyor] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setHata("");
    setGonderiliyor(true);

    const formData = new FormData(e.currentTarget);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    });

    if (error) {
      setGonderiliyor(false);
      setHata("Giriş başarısız: e-posta veya şifre hatalı.");
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-xl text-white">
            🩺
          </span>
          <h1 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-slate-900">
            Yönetim Paneli
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            dijitalşirketim.com.tr
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
              placeholder="admin@ornek.com"
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

        <p className="mt-6 text-center text-xs text-slate-400">
          Bu alan yalnızca site yöneticisi içindir.
        </p>
      </div>
    </div>
  );
}
