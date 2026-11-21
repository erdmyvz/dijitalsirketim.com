"use client";

import { useState, type FormEvent } from "react";
import { KIM_SECENEKLERI, WHATSAPP_NUMARASI } from "@/data/icerik";
import { IconTik, IconWhatsapp } from "./icons";

type Durum = "hazir" | "gonderiliyor" | "basarili" | "hata";

const ALAN =
  "w-full rounded-xl border border-cizgi bg-zemin px-4 py-3 text-[15px] text-zinc-100 placeholder:text-zinc-600 outline-none transition-colors focus:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/30";

/**
 * Görüşme talebi formu.
 *
 * Sitede fiyat yok ve doğrudan ödeme alınmıyor — Erdem'in şirketi yok
 * ve açmayı düşünmüyor. Tek hedef: görüşmeye oturmak.
 *
 * Form, veritabanı yapılandırılmamış olsa bile ASLA kırılmaz: sunucu
 * tarafı kaydı günlüğe yazıp yine başarı döner. Kaydedilemeyen durumda
 * bile ziyaretçinin elinde WhatsApp yolu kalır.
 */
export default function GorusmeFormu() {
  const [durum, setDurum] = useState<Durum>("hazir");
  const [referans, setReferans] = useState("");
  const [hata, setHata] = useState("");

  async function gonder(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDurum("gonderiliyor");
    setHata("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const govde = {
      adSoyad: String(fd.get("adSoyad") ?? ""),
      telefon: String(fd.get("telefon") ?? ""),
      eposta: String(fd.get("eposta") ?? ""),
      kim: String(fd.get("kim") ?? ""),
      isletme: String(fd.get("isletme") ?? ""),
      not: String(fd.get("not") ?? ""),
    };

    try {
      const yanit = await fetch("/api/gorusme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(govde),
      });
      const json = await yanit.json();
      if (!yanit.ok || !json.ok) throw new Error(json.error || "Gönderilemedi.");

      setReferans(json.referansKodu ?? "");
      setDurum("basarili");
      form.reset();
    } catch (err) {
      setDurum("hata");
      setHata(
        err instanceof Error ? err.message : "Bir şeyler ters gitti.",
      );
    }
  }

  const whatsapp = `https://wa.me/${WHATSAPP_NUMARASI}?text=${encodeURIComponent(
    "Merhaba, Dijital Şirketim için görüşme ayarlamak istiyorum.",
  )}`;

  if (durum === "basarili") {
    return (
      <div className="rounded-2xl border border-indigo-500/40 bg-indigo-500/[0.07] p-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 text-white">
          <IconTik className="h-6 w-6" strokeWidth={2.4} />
        </span>
        <h3 className="mt-4 text-xl font-semibold tracking-[-0.01em]">
          Talebin bana ulaştı
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-zinc-400">
          En kısa sürede dönüş yapacağım.
          {referans && (
            <>
              {" "}
              Takip numaran:{" "}
              <span className="font-mono text-zinc-200">{referans}</span>
            </>
          )}
        </p>
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-cizgi px-5 py-2.5 text-sm font-semibold text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
        >
          <IconWhatsapp />
          Beklemek istemiyorsan WhatsApp&apos;tan yaz
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={gonder}
      className="rounded-2xl border border-cizgi bg-yuzey p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="adSoyad" className="mb-1.5 block text-sm text-zinc-400">
            Ad Soyad <span className="text-indigo-400">*</span>
          </label>
          <input id="adSoyad" name="adSoyad" required maxLength={120} className={ALAN} />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="telefon" className="mb-1.5 block text-sm text-zinc-400">
            Telefon <span className="text-indigo-400">*</span>
          </label>
          <input
            id="telefon"
            name="telefon"
            type="tel"
            required
            maxLength={30}
            inputMode="tel"
            placeholder="05xx xxx xx xx"
            className={ALAN}
          />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="eposta" className="mb-1.5 block text-sm text-zinc-400">
            E-posta
          </label>
          <input id="eposta" name="eposta" type="email" maxLength={160} className={ALAN} />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="isletme" className="mb-1.5 block text-sm text-zinc-400">
            İşletme / ajans adı
          </label>
          <input id="isletme" name="isletme" maxLength={160} className={ALAN} />
        </div>
      </div>

      <fieldset className="mt-5">
        <legend className="mb-2 text-sm text-zinc-400">Hangisisin?</legend>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {KIM_SECENEKLERI.map((s, i) => (
            <label
              key={s.id}
              htmlFor={`kim-${s.id}`}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-cizgi bg-zemin px-4 py-3 text-sm text-zinc-300 transition-colors has-[:checked]:border-indigo-500 has-[:checked]:text-white"
            >
              <input
                id={`kim-${s.id}`}
                type="radio"
                name="kim"
                value={s.id}
                defaultChecked={i === 0}
                className="h-4 w-4 flex-none accent-indigo-500"
              />
              {s.etiket}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-5">
        <label htmlFor="not" className="mb-1.5 block text-sm text-zinc-400">
          Kısaca durumun
        </label>
        <textarea
          id="not"
          name="not"
          rows={3}
          maxLength={1000}
          placeholder="Ne satıyorsun, şu an pazarlamayı kim yürütüyor, en büyük sıkıntın ne?"
          className={`${ALAN} resize-y`}
        />
      </div>

      {durum === "hata" && (
        <div className="mt-5 rounded-xl border border-red-500/40 bg-red-500/10 p-4">
          <p className="text-sm text-red-300">{hata}</p>
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-red-200 underline underline-offset-4"
          >
            <IconWhatsapp />
            WhatsApp&apos;tan doğrudan yaz
          </a>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={durum === "gonderiliyor"}
          className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-400 disabled:opacity-60"
        >
          {durum === "gonderiliyor" ? "Gönderiliyor…" : "Görüşme talebi gönder"}
        </button>
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-cizgi px-5 py-3.5 text-sm font-semibold text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
        >
          <IconWhatsapp />
          WhatsApp
        </a>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-zinc-600">
        Paylaştığın bilgiler yalnızca sana dönüş yapmak için kullanılır.
        Ayrıntı için{" "}
        <a href="/kvkk" className="underline underline-offset-2 hover:text-zinc-400">
          KVKK aydınlatma metni
        </a>
        .
      </p>
    </form>
  );
}
