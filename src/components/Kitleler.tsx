import Reveal from "./Reveal";
import { KITLELER } from "@/data/icerik";
import { IconTik } from "./icons";

/**
 * İki hedef kitle. Ürün ikisine de satılıyor ama aynı cümleyle
 * satılmıyor: ajans birden fazla müşteriyi yönetiyor, işletme sahibi
 * kendi işini yürütüyor. Ziyaretçi hangisi olduğunu ilk ekranlarda
 * görsün diye modüllerden önce duruyor.
 */
export default function Kitleler() {
  return (
    <section className="border-y border-cizgi bg-yuzey/40">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <h2 className="max-w-xl text-2xl font-semibold tracking-[-0.02em] text-balance sm:text-3xl">
            İki türlü kullanılıyor
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {KITLELER.map((k, i) => (
            <Reveal key={k.baslik} delayMs={i * 90}>
              <div className="h-full rounded-2xl border border-cizgi bg-yuzey p-6 sm:p-7">
                <h3 className="text-lg font-semibold tracking-[-0.01em]">
                  {k.baslik}
                </h3>
                <p className="mt-3 font-serif leading-relaxed text-zinc-400">
                  {k.metin}
                </p>
                <ul className="mt-5 space-y-2.5 border-t border-cizgi pt-5">
                  {k.maddeler.map((m) => (
                    <li key={m} className="flex items-start gap-2.5 text-sm text-zinc-300">
                      <IconTik
                        className="mt-0.5 h-4 w-4 flex-none text-indigo-400"
                        strokeWidth={2.2}
                      />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
