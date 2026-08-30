"use client";

import { useState } from "react";

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
    soru: "Bu fiyata nasıl mümkün?",
    cevap: "Bu, değer merdivenimizin ilk basamağıdır.",
  },
];

export default function Faq() {
  const [acikIndex, setAcikIndex] = useState<number | null>(0);

  return (
    <section id="sss" className="bg-slate-50">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 ring-1 ring-teal-200">
            SSS
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Sık sorulan sorular
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {sorular.map((s, i) => {
            const acik = acikIndex === i;
            return (
              <div
                key={s.soru}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <button
                  type="button"
                  onClick={() => setAcikIndex(acik ? null : i)}
                  aria-expanded={acik}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-semibold text-slate-900">
                    {s.soru}
                  </span>
                  <span
                    className={`flex h-7 w-7 flex-none items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-transform ${
                      acik ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {acik && (
                  <div className="px-6 pb-5 text-sm leading-relaxed text-slate-600">
                    {s.cevap}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
