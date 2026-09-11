import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { sonKarneSonucu } from "@/lib/tedavi/sonKarne";
import {
  ayarlariOku,
  ibanBicimle,
  odemeBilgileriHazirMi,
} from "@/lib/tedavi/ayarlar";
import { tedaviPlaniHesapla, tutarBicimle } from "@/lib/tedavi/fiyat";
import { IconCheck } from "@/components/icons";

export const metadata = {
  title: "Ödeme | Dijital Şirketim",
  robots: { index: false, follow: false },
};

const WHATSAPP_NUMARASI = "905319956930";

export default async function OdemeSayfasi() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/hesap/giris");

  const sonuc = await sonKarneSonucu();
  if (!sonuc) redirect("/hesap/plan");

  const ayarlar = await ayarlariOku();
  const plan = tedaviPlaniHesapla(sonuc, ayarlar);
  const bilgilerHazir = odemeBilgileriHazirMi(ayarlar);

  const whatsappMesaji = encodeURIComponent(
    `Merhaba, ${tutarBicimle(
      plan.aylikTutar,
    )} tutarındaki aylık ödememi yaptım. Hesabımın e-postası: ${user.email}`,
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4">
          <Link href="/hesap/plan" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-base text-white">
              🩺
            </span>
            <span className="text-base font-semibold text-slate-900">Ödeme</span>
          </Link>
          <Link
            href="/hesap/plan"
            className="text-sm font-medium text-slate-400 transition-colors duration-200 ease-[var(--ease-apple)] hover:text-teal-700"
          >
            Planıma dön
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-10">
        <div className="rounded-[28px] bg-slate-900 p-8 text-center">
          <p className="text-sm font-medium text-slate-300">
            Ödenecek aylık tutar
          </p>
          <p className="mt-2 text-5xl font-semibold tracking-[-0.02em] text-white">
            {tutarBicimle(plan.aylikTutar)}
          </p>
        </div>

        {bilgilerHazir ? (
          <>
            <div className="mt-8 rounded-[24px] border border-slate-200 bg-white p-6">
              <h2 className="text-sm font-semibold text-slate-900">
                Havale / EFT bilgileri
              </h2>
              <dl className="mt-4 space-y-4">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Alıcı
                  </dt>
                  <dd className="mt-1 font-medium text-slate-900">
                    {ayarlar.hesapSahibi}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    IBAN
                  </dt>
                  <dd className="mt-1 font-mono text-sm font-medium tracking-wide text-slate-900">
                    {ibanBicimle(ayarlar.iban)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Tutar
                  </dt>
                  <dd className="mt-1 font-medium text-slate-900">
                    {tutarBicimle(plan.aylikTutar)}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-6 rounded-[24px] border border-slate-200 bg-white p-6">
              <h2 className="text-sm font-semibold text-slate-900">
                Bundan sonra ne olacak?
              </h2>
              <ol className="mt-4 space-y-3">
                {[
                  "Yukarıdaki hesaba havale/EFT yap.",
                  "WhatsApp'tan bize haber ver — hesabını eşleştirebilelim.",
                  "Ödemen görüldüğünde erişimin açılır; kalan süreni panelinden takip edersin.",
                ].map((adim, i) => (
                  <li key={adim} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-teal-100 text-xs font-semibold text-teal-700">
                      {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-slate-600">
                      {adim}
                    </span>
                  </li>
                ))}
              </ol>
              <a
                href={`https://wa.me/${WHATSAPP_NUMARASI}?text=${whatsappMesaji}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition-all duration-300 ease-[var(--ease-apple)] hover:bg-teal-700"
              >
                <IconCheck className="h-4 w-4" strokeWidth={2.5} />
                Ödemeyi Yaptım, Haber Ver
              </a>
            </div>
          </>
        ) : (
          /* IBAN girilmediyse yer tutucu bir hesap GÖSTERİLMEZ — yanlış
             hesaba ödeme riskine karşı bilinçli tercih (KARARLAR.md
             2026-09-03, aynı mantık). */
          <div className="mt-8 rounded-[24px] border border-amber-200 bg-amber-50 p-6 text-center">
            <p className="text-base font-semibold text-slate-900">
              Ödeme bilgileri henüz paylaşılmadı
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">
              Hesap bilgilerini WhatsApp&apos;tan seninle paylaşalım;
              ödeme sonrası erişimin aynı gün açılır.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMARASI}?text=${encodeURIComponent(
                `Merhaba, tedavi planım aylık ${tutarBicimle(
                  plan.aylikTutar,
                )} çıktı. Ödeme bilgilerini paylaşır mısınız?`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center justify-center rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition-all duration-300 ease-[var(--ease-apple)] hover:bg-teal-700"
            >
              WhatsApp&apos;tan Yaz
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
