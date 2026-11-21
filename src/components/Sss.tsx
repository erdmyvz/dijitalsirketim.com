import Reveal from "./Reveal";
import { SSS } from "@/data/icerik";

/**
 * Sık sorulanlar. `<details>` kullanıyoruz: açılıp kapanması için
 * JavaScript gerekmiyor, klavyeyle gezilebiliyor ve sayfa içi arama
 * (Ctrl+F) kapalı başlıkların içini de buluyor.
 */
export default function Sss() {
  return (
    <section id="sss" className="scroll-mt-20 border-t border-cizgi">
      <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
        <Reveal>
          <p className="etiket text-zinc-500">SSS</p>
          <h2 className="mt-4 text-3xl font-bold leading-[1.1] tracking-[-0.025em] text-balance sm:text-4xl">
            Akla gelen sorular
          </h2>
        </Reveal>

        <div className="mt-10 divide-y divide-cizgi border-y border-cizgi">
          {SSS.map((s, i) => (
            <Reveal key={s.soru} delayMs={i * 50}>
              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 text-[15px] font-medium text-zinc-100 marker:hidden sm:text-base">
                  {s.soru}
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full border border-cizgi text-zinc-500 transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-prose pr-11 font-serif leading-relaxed text-zinc-400">
                  {s.cevap}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
