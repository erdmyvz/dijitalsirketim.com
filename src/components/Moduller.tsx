import Reveal from "./Reveal";
import { MODULLER } from "@/data/icerik";
import { EKRANLAR } from "./moduller/Ekranlar";
import {
  IconGrafik,
  IconKatmanlar,
  IconMesaj,
  IconBuyutec,
  IconVideo,
} from "./icons";

const IKONLAR = {
  "reklam-performansi": IconGrafik,
  "calisma-alanlari": IconKatmanlar,
  "gelen-kutusu": IconMesaj,
  "rakip-reklamlari": IconBuyutec,
  "rakip-video": IconVideo,
} as const;

/**
 * Beş modül. Metin ve ekran dönüşümlü duruyor (zigzag): beş bölümü aynı
 * kalıpla alt alta dizmek sayfayı tek düze yapıyordu — eski sitede
 * düştüğümüz hata buydu.
 */
export default function Moduller() {
  return (
    <section id="moduller" className="scroll-mt-20 border-t border-cizgi">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <p className="etiket text-indigo-400">Modüller</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold leading-[1.1] tracking-[-0.025em] text-balance sm:text-5xl">
            Bir işletmenin pazarlamada ihtiyacı olan beş şey
          </h2>
        </Reveal>

        <div className="mt-16 space-y-20 sm:space-y-28">
          {MODULLER.map((m, i) => {
            const Ekran = EKRANLAR[m.gorsel];
            const Ikon = IKONLAR[m.gorsel];
            const tersCevir = i % 2 === 1;

            return (
              <Reveal key={m.id}>
                <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                  <div className={tersCevir ? "lg:order-2" : ""}>
                    <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/40 px-3.5 py-1.5 text-indigo-300">
                      <Ikon className="h-4 w-4" strokeWidth={1.8} />
                      <span className="etiket">{m.etiket}</span>
                    </span>

                    <h3 className="mt-5 max-w-lg text-2xl font-bold leading-[1.15] tracking-[-0.02em] text-balance sm:text-[2rem]">
                      {m.baslik}
                    </h3>
                    <p className="mt-4 max-w-lg font-serif text-lg leading-relaxed text-zinc-400">
                      {m.metin}
                    </p>
                  </div>

                  <div className={tersCevir ? "lg:order-1" : ""}>
                    <Ekran />
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
