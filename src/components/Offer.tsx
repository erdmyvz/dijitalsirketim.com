import Link from "next/link";
import ApplicationForm from "./ApplicationForm";
import Reveal from "./Reveal";
import { IconArrowRight, IconCheck } from "./icons";
import { TEDAVI_FONKSIYONLARI, TOPLAM_MODUL_SAYISI } from "@/data/moduller";

const ucretsizOlanlar = [
  "21 kontrol noktalı check-up",
  "Dijital Sağlık Karnesi (7 fonksiyon, 3 katman)",
  "Yapay zekâ destekli kök problem ön teşhisi",
  "Kişiye özel tedavi planı ve aylık tutarın hesabı",
];

const ucretliOlanlar = [
  `${TEDAVI_FONKSIYONLARI.length} fonksiyonun altında ${TOPLAM_MODUL_SAYISI} tedavi modülü`,
  "Adım adım uygulama planı ve doldurulabilir şablonlar",
  "Modül bitince check-up'ı tekrarlayıp skorunu ölçme",
  "Karne geçmişi ve ilerleme takibi",
];

export default function Offer() {
  return (
    <section id="teklif" className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 ring-1 ring-teal-200">
            NASIL İŞLİYOR
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-5xl">
            Teşhis ücretsiz.{" "}
            <span className="text-teal-700">Ücretli olan tedavi.</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Hiçbir doktor muayene etmeden tedavi fiyatı söylemez. Önce
            check-up&apos;ı yapın, hangi fonksiyonunuzun tıkalı olduğunu
            görün — tedavi planınız ve aylık tutarınız o sonuçtan
            hesaplanır.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Ücretsiz */}
          <Reveal delayMs={80}>
            <div className="flex h-full flex-col rounded-[28px] border border-teal-200 bg-teal-50/50 p-8">
              <span className="inline-flex w-fit items-center rounded-full bg-teal-600 px-3 py-1 text-xs font-semibold text-white">
                ÜCRETSİZ
              </span>
              <h3 className="mt-4 text-xl font-semibold tracking-[-0.01em] text-slate-900">
                Teşhis
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                Kayıt olmadan başlayabilirsiniz, birkaç dakika sürer.
              </p>
              <ul className="mt-5 flex-1 space-y-3">
                {ucretsizOlanlar.map((madde) => (
                  <li
                    key={madde}
                    className="flex items-start gap-2 text-sm text-slate-700"
                  >
                    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-teal-100 text-teal-700">
                      <IconCheck className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                    <span>{madde}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/check-up"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition-transform duration-300 ease-[var(--ease-apple)] hover:scale-[1.02] active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:scale-100"
              >
                Ücretsiz Check-Up&apos;a Başla
                <IconArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
            </div>
          </Reveal>

          {/* Ücretli */}
          <Reveal delayMs={160}>
            <div className="flex h-full flex-col rounded-[28px] border border-slate-200 bg-slate-50 p-8">
              <span className="inline-flex w-fit items-center rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                AYLIK ÜYELİK
              </span>
              <h3 className="mt-4 text-xl font-semibold tracking-[-0.01em] text-slate-900">
                Tedavi
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                Tutar, check-up sonucunuzdan hesaplanır.
              </p>
              <ul className="mt-5 flex-1 space-y-3">
                {ucretliOlanlar.map((madde) => (
                  <li
                    key={madde}
                    className="flex items-start gap-2 text-sm text-slate-700"
                  >
                    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-slate-200 text-slate-700">
                      <IconCheck className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                    <span>{madde}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 rounded-2xl border border-dashed border-slate-300 bg-white p-5">
                <p className="text-sm font-medium leading-relaxed text-slate-800">
                  Yalnızca bozuk olan fonksiyonlar için ödersiniz.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Yeşil fonksiyonlar plana hiç girmez. Fonksiyonlarınız
                  iyileştikçe aylık tutarınız düşer; hepsi yeşile
                  döndüğünde yalnızca aylık kontrolü kapsayan Nabız
                  Planı kalır.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Özel danışmanlık — ayrı ve ikincil kanal */}
        <Reveal delayMs={220}>
          <div className="mx-auto mt-16 max-w-3xl">
            <div className="text-center">
              <h3 className="text-xl font-semibold tracking-[-0.01em] text-slate-900 sm:text-2xl">
                Şirketinize özel bir çalışma mı gerekiyor?
              </h3>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
                Tekrar eden manuel işlerinizin otomasyonu ya da birebir
                danışmanlık için bize yazın — bunlar modüllerden ayrı,
                görüşmeyle yürüyen çalışmalardır.
              </p>
            </div>
            <div className="mt-8">
              <ApplicationForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
