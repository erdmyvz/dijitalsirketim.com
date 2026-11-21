import Reveal from "./Reveal";
import { PROGRAM } from "@/data/icerik";

/**
 * Altı başlıklı program.
 *
 * Yalnızca birinci başlığın alt başlıkları yazıldı; kalan beşi
 * Erdem'den gelecek. İçeriği olmayan başlık "hazırlanıyor" diyor —
 * kilitli ya da dolu gibi gösterilmiyor. Olmayan şeyi varmış gibi
 * sunmak, bu projenin baştan beri reddettiği şey.
 */
export default function Program() {
  const hazirSayisi = PROGRAM.filter((p) => p.altBasliklar.length > 0).length;

  return (
    <section id="program" className="scroll-mt-20 border-t border-cizgi bg-yuzey/30">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="etiket text-altin">Program</p>
            <h2 className="mt-4 text-3xl font-bold leading-[1.1] tracking-[-0.025em] text-balance sm:text-5xl">
              İşi kurmanın altı başlığı
            </h2>
            <p className="mt-5 max-w-md font-serif text-lg leading-relaxed text-zinc-400">
              Modüller kurduğun işi işletmeni sağlıyor. Bu altı başlık da işi
              nasıl kuracağını anlatıyor: nerede duracağın, kime satacağın,
              neyi teklif edeceğin ve sözleşmeyi nasıl yapacağın.
            </p>
            <p className="mt-6 text-sm text-zinc-500">
              {hazirSayisi} / {PROGRAM.length} başlığın içeriği hazır.
            </p>
          </Reveal>

          <ul className="space-y-px overflow-hidden rounded-2xl border border-cizgi">
            {PROGRAM.map((p, i) => {
              const hazir = p.altBasliklar.length > 0;
              return (
                <Reveal key={p.no} delayMs={i * 60}>
                  <li className="border-b border-cizgi bg-yuzey p-6 last:border-b-0 sm:p-7">
                    <div className="flex items-baseline gap-4">
                      <span className="text-sm font-semibold tabular-nums text-altin/70">
                        {p.no}
                      </span>
                      <h3 className="text-lg font-semibold tracking-[-0.015em] text-balance sm:text-xl">
                        {p.baslik}
                      </h3>
                    </div>

                    {hazir ? (
                      <ul className="mt-4 grid gap-x-6 gap-y-2 pl-10 sm:grid-cols-2">
                        {p.altBasliklar.map((alt) => (
                          <li
                            key={alt}
                            className="flex items-start gap-2 text-sm leading-relaxed text-zinc-400"
                          >
                            <span
                              aria-hidden
                              className="mt-[0.45rem] h-1 w-1 flex-none rounded-full bg-altin/60"
                            />
                            {alt}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-3 pl-10 text-sm text-zinc-600">
                        İçeriği hazırlanıyor.
                      </p>
                    )}
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
