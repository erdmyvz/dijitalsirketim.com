"use client";

import { useState, type FormEvent } from "react";
import { IconCheck, IconMessageCircle } from "./icons";

// NOT: Aşağıdaki WhatsApp numarasını kendi işletme numaranızla
// değiştirin. Bu, form/CRM entegrasyonu tamamlanana kadar kullanılabilecek
// geçici bir başvuru kanalıdır.
const WHATSAPP_NUMARASI = "90XXXXXXXXXX";
const whatsappMesaji = encodeURIComponent(
  "Merhaba, Dijital Check-Up başvurusu yapmak istiyorum.",
);

const inputClass =
  "w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-all duration-200 ease-[var(--ease-apple)] focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10";

type Durum = "hazir" | "gonderiliyor" | "basarili" | "hata";

export default function ApplicationForm() {
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
      isletmeAdi: String(formData.get("isletmeAdi") ?? ""),
      sektor: String(formData.get("sektor") ?? ""),
      telefon: String(formData.get("telefon") ?? ""),
    };

    try {
      const res = await fetch("/api/basvuru", {
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
      <div className="animate-apple-in rounded-[28px] border border-teal-200 bg-teal-50 p-8 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-600 text-white">
          <IconCheck className="h-7 w-7" strokeWidth={2.25} />
        </span>
        <h3 className="mt-4 text-xl font-semibold text-teal-900">
          Başvurunuz alındı!
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-teal-800">
          Dijital Check-Up başvurunuz elimize ulaştı. Ekibimiz en kısa
          sürede sizinle iletişime geçecek.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
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
            className={inputClass}
            placeholder="Adınız Soyadınız"
          />
        </div>

        <div>
          <label
            htmlFor="isletmeAdi"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            İşletme Adı
          </label>
          <input
            id="isletmeAdi"
            name="isletmeAdi"
            type="text"
            className={inputClass}
            placeholder="İşletmenizin adı"
          />
        </div>

        <div>
          <label
            htmlFor="sektor"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Sektör
          </label>
          <input
            id="sektor"
            name="sektor"
            type="text"
            className={inputClass}
            placeholder="Örn: perakende, hizmet, üretim..."
          />
        </div>

        <div>
          <label
            htmlFor="telefon"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Telefon *
          </label>
          <input
            id="telefon"
            name="telefon"
            type="tel"
            required
            className={inputClass}
            placeholder="05xx xxx xx xx"
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
          <p className="animate-apple-in rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {hataMesaji}
          </p>
        )}

        <button
          type="submit"
          disabled={durum === "gonderiliyor"}
          className="w-full rounded-full bg-teal-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-teal-600/25 transition-all duration-300 ease-[var(--ease-apple)] hover:scale-[1.01] hover:bg-teal-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 motion-reduce:transition-none motion-reduce:hover:scale-100"
        >
          {durum === "gonderiliyor" ? "Gönderiliyor..." : "Başvuruyu Gönder"}
        </button>
      </form>

      <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
        <span className="h-px flex-1 bg-slate-200" />
        veya
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <a
        href={`https://wa.me/${WHATSAPP_NUMARASI}?text=${whatsappMesaji}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex items-center justify-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 ease-[var(--ease-apple)] hover:scale-[1.01] hover:border-teal-600 hover:text-teal-700 active:scale-[0.99] motion-reduce:transition-none motion-reduce:hover:scale-100"
      >
        <IconMessageCircle className="h-4 w-4" strokeWidth={2} />
        Doğrudan WhatsApp&apos;tan Yazın
      </a>
    </div>
  );
}
