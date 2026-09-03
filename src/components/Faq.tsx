"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { IconPlus } from "./icons";

const sorular = [
  {
    soru: "Benim sektörüm farklı, bana uyar mı?",
    cevap:
      "4 işletme modeli var, 21 kontrol noktası hepsinde aynı çalışır.",
  },
  {
    soru: "Rapor sonrası devam etmek zorunda mıyım?",
    cevap:
      "Hayır. Rapor sizindir, tedavi ayrı bir karardır.",
  },
  {
    soru: "Ne kadar sürer?",
    cevap: "Check-up 48 saat içinde raporlanır.",
  },
  {
    soru: "Neden fiyat sitede yazmıyor?",
    cevap:
      "Çünkü işletmenizi henüz görmedik. Bir doktorun muayene etmeden tedavi fiyatı söylemesi ne kadar doğruysa, biz de hangi fonksiyonun tıkalı olduğunu bilmeden fiyat vermeyi doğru bulmuyoruz. Başvuru adımında check-up ücreti ve varsa tedavi planının maliyeti size net olarak, ödeme öncesinde yazılı şekilde iletilir. Sürpriz maliyet yoktur.",
  },
];

export default function Faq() {
  const [acikIndex, setAcikIndex] = useState<number | null>(0);

  return (
    <section id="sss" className="bg-slate-50">
      <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
        <Reveal className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 ring-1 ring-teal-200">
            SSS
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-5xl">
            Sık sorulan sorular
          </h2>
        </Reveal>

        <div className="mt-12 space-y-3">
          {sorular.map((s, i) => {
            const acik = acikIndex === i;
            return (
              <Reveal key={s.soru} delayMs={i * 80}>
                <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white">
                  <button
                    type="button"
                    onClick={() => setAcikIndex(acik ? null : i)}
                    aria-expanded={acik}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-medium text-slate-900">
                      {s.soru}
                    </span>
                    <span
                      className={`flex h-7 w-7 flex-none items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-transform duration-300 ease-[var(--ease-apple)] motion-reduce:transition-none ${
                        acik ? "rotate-45" : ""
                      }`}
                    >
                      <IconPlus className="h-3.5 w-3.5" strokeWidth={2.25} />
                    </span>
                  </button>

                  {/* grid-template-rows 0fr -> 1fr tekniği: yükseklik
                      animasyonu için 'auto' kullanamadığımızda yumuşak
                      açılıp kapanma sağlar. */}
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-[var(--ease-apple)] motion-reduce:transition-none ${
                      acik ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-5 text-sm leading-relaxed text-slate-600">
                        {s.cevap}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
