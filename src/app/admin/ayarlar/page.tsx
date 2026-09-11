import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { adminMi } from "@/lib/admin/yetki";
import {
  ayarlariOku,
  ibanBicimle,
  ibanGecerliMi,
  odemeBilgileriHazirMi,
} from "@/lib/tedavi/ayarlar";
import { tutarBicimle } from "@/lib/tedavi/fiyat";
import { ayarlariKaydet } from "./actions";

export const metadata = {
  title: "Ayarlar | Yönetim",
  robots: { index: false, follow: false },
};

const alanClass =
  "w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-all duration-200 ease-[var(--ease-apple)] focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10";

/** Server Action'dan dönen sonuç şeridi. Bkz. actions.ts'teki açıklama. */
const GERI_BILDIRIM: Record<string, { tur: "hata" | "basari"; mesaj: string }> = {
  iban: {
    tur: "hata",
    mesaj:
      "IBAN kaydedilmedi: geçerli bir Türk IBAN'ı değil. TR ile başlar ve " +
      "toplam 26 karakterdir (TR + 24 rakam); sağlama hanesi de kontrol " +
      "edilir, yani tek hane yanlışsa kabul edilmez. Boşluklu yazabilirsin. " +
      "Hesabı henüz girmeyeceksen alanı tamamen boş bırak.",
  },
  sayi: {
    tur: "hata",
    mesaj: "Kaydedilmedi: birim ücret ve Nabız tabanı 0 veya daha büyük bir sayı olmalı.",
  },
  kayit: {
    tur: "hata",
    mesaj: "Kaydedilemedi — veritabanına yazılamadı. Tekrar dene; sürerse sunucu günlüğüne bak.",
  },
  ok: { tur: "basari", mesaj: "Ayarlar kaydedildi." },
};

export default async function AyarlarSayfasi({
  searchParams,
}: {
  searchParams: Promise<{ hata?: string; kayit?: string }>;
}) {
  const sorgu = await searchParams;
  const geriBildirim =
    GERI_BILDIRIM[sorgu.hata ?? ""] ??
    (sorgu.kayit === "ok" ? GERI_BILDIRIM.ok : undefined);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/giris");
  if (!(await adminMi())) redirect("/");

  const ayarlar = await ayarlariOku();
  const hazir = odemeBilgileriHazirMi(ayarlar);

  // Örnek: 2 kırmızı + 3 sarı bir işletme ne öder?
  const ornekTutar =
    ayarlar.nabizTabani + ayarlar.birimUcret * (2 * 1 + 3 * 0.5);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-base text-white">
              🩺
            </span>
            <div>
              <h1 className="text-base font-semibold text-slate-900">Ayarlar</h1>
              <p className="text-xs text-slate-400">{user.email}</p>
            </div>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <Link
              href="/admin"
              className="font-medium text-slate-500 hover:text-teal-700"
            >
              Başvurular
            </Link>
            <Link
              href="/admin/abonelikler"
              className="font-medium text-slate-500 hover:text-teal-700"
            >
              Abonelikler
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-10">
        {geriBildirim && (
          <div
            role="status"
            className={`mb-6 rounded-[20px] border p-4 text-sm leading-relaxed ${
              geriBildirim.tur === "hata"
                ? "border-red-200 bg-red-50 text-red-800"
                : "border-emerald-200 bg-emerald-50 text-emerald-800"
            }`}
          >
            {geriBildirim.mesaj}
          </div>
        )}

        <form action={ayarlariKaydet} className="space-y-8">
          <section className="rounded-[24px] border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold tracking-[-0.01em] text-slate-900">
              Fiyatlandırma
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-500">
              Aylık ücret = Nabız tabanı + (birim ücret × fonksiyon
              ağırlıkları). Kırmızı fonksiyon ×1, sarı ×0,5, yeşil ×0.
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <label
                  htmlFor="birim_ucret"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Birim ücret (TL) — tedavi edilen tam fonksiyon başına
                </label>
                <input
                  id="birim_ucret"
                  name="birim_ucret"
                  type="number"
                  min={0}
                  step={100}
                  required
                  defaultValue={ayarlar.birimUcret}
                  className={alanClass}
                />
              </div>

              <div>
                <label
                  htmlFor="nabiz_tabani"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Nabız Planı tabanı (TL/ay)
                </label>
                <input
                  id="nabiz_tabani"
                  name="nabiz_tabani"
                  type="number"
                  min={0}
                  step={100}
                  required
                  defaultValue={ayarlar.nabizTabani}
                  className={alanClass}
                />
                <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                  İyileşen müşterinin sistemde kalma bedeli. 0 yaparsan
                  tamamen yeşile dönen müşteri hiçbir şey ödemez ve
                  sadakat zinciri kopar.
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
              Örnek: 2 kırmızı + 3 sarı fonksiyonu olan bir işletme{" "}
              <span className="font-semibold text-slate-900">
                {tutarBicimle(ornekTutar)}/ay
              </span>{" "}
              öder.
            </div>
          </section>

          <section className="rounded-[24px] border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold tracking-[-0.01em] text-slate-900">
              Ödeme bilgileri
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-500">
              IBAN geçerli değilse ya da hesap sahibi boşsa ödeme
              ekranında hesap gösterilmez, müşteri WhatsApp&apos;a
              yönlendirilir — yanlış hesaba ödeme riskine karşı. IBAN
              kaydedilirken sağlama hanesi de kontrol edilir; yarım ya da
              yer tutucu bir numara kaydedilemez.
            </p>

            {!hazir && (
              <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
                {ayarlar.iban.trim().length > 0 && !ibanGecerliMi(ayarlar.iban)
                  ? "Kayıtlı IBAN geçerli değil — ödeme ekranı hesap göstermiyor, müşteri WhatsApp'a düşüyor."
                  : "Şu an eksik: ödeme ekranı IBAN göstermiyor."}
              </p>
            )}

            <div className="mt-5 space-y-4">
              <div>
                <label
                  htmlFor="hesap_sahibi"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Hesap sahibi (havalede görünecek alıcı adı)
                </label>
                <input
                  id="hesap_sahibi"
                  name="hesap_sahibi"
                  type="text"
                  defaultValue={ayarlar.hesapSahibi}
                  placeholder="Ad Soyad"
                  className={alanClass}
                />
              </div>

              <div>
                <label
                  htmlFor="iban"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  IBAN
                </label>
                <input
                  id="iban"
                  name="iban"
                  type="text"
                  defaultValue={
                    ayarlar.iban ? ibanBicimle(ayarlar.iban) : ""
                  }
                  placeholder="TR00 0000 0000 0000 0000 0000 00"
                  className={`${alanClass} font-mono`}
                />
              </div>
            </div>
          </section>

          <button
            type="submit"
            className="w-full rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition-all duration-300 ease-[var(--ease-apple)] hover:bg-teal-700"
          >
            Ayarları Kaydet
          </button>
        </form>
      </main>
    </div>
  );
}
