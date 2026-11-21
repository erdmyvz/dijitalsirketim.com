import Reveal from "./Reveal";
import { FAZLAR } from "@/data/icerik";

const BICIM = {
  simdi: {
    rozet: "bg-indigo-500 text-white",
    etiket: "Şimdi buradayız",
    kart: "border-indigo-500/50 bg-indigo-500/[0.07]",
    no: "text-indigo-300",
  },
  siradaki: {
    rozet: "bg-zinc-800 text-zinc-300",
    etiket: "Sıradaki",
    kart: "border-cizgi bg-yuzey",
    no: "text-zinc-400",
  },
  sonra: {
    rozet: "bg-zinc-900 text-zinc-500",
    etiket: "Sonra",
    kart: "border-cizgi bg-yuzey/50",
    no: "text-zinc-600",
  },
} as const;

/**
 * Yol haritası — ziyaretçiye neyin bugün çalıştığını, neyin
 * kurulmakta olduğunu açıkça söyleyen bölüm.
 *
 * Bunu sayfadan gizlemek daha "satışçı" olurdu ama görüşmede ortaya
 * çıkınca güveni baştan kırardı. Erdem'in amacı da bu sayfayla
 * görüşmeden önce tanınmak; o yüzden aşama açık yazılıyor.
 */
export default function Durum() {
  return (
    <section id="durum" className="scroll-mt-20 border-t border-cizgi">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <Reveal>
          <p className="etiket text-zinc-500">Durum</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold leading-[1.1] tracking-[-0.025em] text-balance sm:text-4xl">
            Hangi aşamadayız?
          </h2>
          <p className="mt-5 max-w-2xl font-serif text-lg leading-relaxed text-zinc-400">
            Henüz çalışmayan bir şeyi çalışıyor gibi anlatmıyorum. Bugün
            elinizde ne olduğu ve ne zaman ne olacağı aşağıda.
          </p>
        </Reveal>

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FAZLAR.map((f, i) => {
            const b = BICIM[f.durum];
            return (
              <Reveal key={f.no} delayMs={i * 80}>
                <li className={`h-full rounded-2xl border p-5 sm:p-6 ${b.kart}`}>
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`text-sm font-semibold tabular-nums ${b.no}`}
                    >
                      {f.no}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${b.rozet}`}
                    >
                      {b.etiket}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold tracking-[-0.01em]">
                    {f.baslik}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {f.metin}
                  </p>
                </li>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
