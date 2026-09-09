"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";

// Yeni şifre belirleme. Buraya ancak e-postadaki bağlantı doğrulandıktan
// (yani ./dogrula route'u oturumu açtıktan) sonra gelinebiliyor —
// oturum yoksa proxy.ts zaten /hesap/giris'e yönlendirir.
export default function SifreYenile() {
  const router = useRouter();
  const [hata, setHata] = useState("");
  const [gonderiliyor, setGonderiliyor] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setHata("");

    const formData = new FormData(e.currentTarget);
    const sifre = String(formData.get("password") ?? "");
    const sifreTekrar = String(formData.get("password_tekrar") ?? "");

    if (sifre !== sifreTekrar) {
      setHata("Şifreler eşleşmiyor.");
      return;
    }

    setGonderiliyor(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: sifre });

    if (error) {
      setGonderiliyor(false);
      setHata("Şifre güncellenemedi: " + error.message);
      return;
    }

    // Şifre değişti ve oturum zaten açık — doğrudan panele al.
    router.replace("/hesap");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-xl text-white">
            🔑
          </span>
          <h1 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-slate-900">
            Yeni Şifre Belirle
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Yeni şifreni yaz, hemen panele geçelim.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm"
        >
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Yeni şifre
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

          <div>
            <label
              htmlFor="password_tekrar"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Yeni şifre (tekrar)
            </label>
            <input
              id="password_tekrar"
              name="password_tekrar"
              type="password"
              required
              minLength={6}
              autoComplete="new-password"
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-all duration-200 ease-[var(--ease-apple)] focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
              placeholder="Aynı şifreyi tekrar yaz"
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
            {gonderiliyor ? "Kaydediliyor..." : "Şifreyi Güncelle"}
          </button>
        </form>
      </div>
    </div>
  );
}
