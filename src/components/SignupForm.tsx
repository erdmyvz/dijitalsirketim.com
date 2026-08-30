"use client";

import { useState, type FormEvent } from "react";

type Durum = "hazir" | "gonderiliyor" | "basarili" | "hata";

export default function SignupForm() {
  const [durum, setDurum] = useState<Durum>("hazir");
  const [hataMesaji, setHataMesaji] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDurum("gonderiliyor");
    setHataMesaji("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      adSoyad: String(formData.get("adSoyad") ?? ""),
      isletme: String(formData.get("isletme") ?? ""),
      iletisim: String(formData.get("iletisim") ?? ""),
      site: String(formData.get("site") ?? ""),
      mesaj: String(formData.get("mesaj") ?? ""),
    };

    try {
      const res = await fetch("/api/kayit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Bir şeyler ters gitti.");
      }

      setDurum("basarili");
      form.reset();
    } catch (err) {
      setDurum("hata");
      setHataMesaji(
        err instanceof Error ? err.message : "Bir şeyler ters gitti.",
      );
    }
  }

  if (durum === "basarili") {
    return (
      <div className="rounded-2xl border border-teal-200 bg-teal-50 p-8 text-center">
        <span className="text-4xl">✅</span>
        <h3 className="mt-4 text-xl font-bold text-teal-900">
          Talebiniz alındı!
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-teal-800">
          Ücretsiz dijital teşhis talebiniz elimize ulaştı. Ekibimiz en kısa
          sürede (genellikle 1 iş günü içinde) sizinle iletişime geçecek.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="adSoyad"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Ad Soyad *
          </label>
          <input
            id="adSoyad"
            name="adSoyad"
            type="text"
            required
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            placeholder="Adınız Soyadınız"
          />
        </div>
        <div>
          <label
            htmlFor="isletme"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            İşletme Adı
          </label>
          <input
            id="isletme"
            name="isletme"
            type="text"
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            placeholder="İşletmenizin adı"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="iletisim"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Telefon veya E-posta *
          </label>
          <input
            id="iletisim"
            name="iletisim"
            type="text"
            required
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            placeholder="05xx xxx xx xx / e-posta"
          />
        </div>
        <div>
          <label
            htmlFor="site"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Web Siteniz (varsa)
          </label>
          <input
            id="site"
            name="site"
            type="text"
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            placeholder="www.ornek.com.tr"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="mesaj"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Belirtileriniz / Notunuz
        </label>
        <textarea
          id="mesaj"
          name="mesaj"
          rows={3}
          className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
          placeholder="Örn: Google'da bulunmuyoruz, sitemiz mobilde bozuk görünüyor..."
        />
      </div>

      <label className="flex items-start gap-2 text-xs text-slate-500">
        <input
          type="checkbox"
          required
          className="mt-0.5 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
        />
        <span>
          {/* NOT: Aşağıdaki bağlantıyı gerçek KVKK Aydınlatma Metni sayfanızla değiştirin. */}
          <a href="#" className="underline hover:text-teal-700">
            KVKK Aydınlatma Metni
          </a>
          &apos;ni okudum, bilgilerimin işlenmesini kabul ediyorum.
        </span>
      </label>

      {durum === "hata" && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {hataMesaji}
        </p>
      )}

      <button
        type="submit"
        disabled={durum === "gonderiliyor"}
        className="w-full rounded-full bg-teal-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-teal-600/25 transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {durum === "gonderiliyor"
          ? "Gönderiliyor..."
          : "Ücretsiz Teşhisimi İste"}
      </button>
    </form>
  );
}
