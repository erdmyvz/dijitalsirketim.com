import Reveal from "./Reveal";
import { AJANLAR, type Ajan } from "@/data/icerik";

/**
 * Görsellerdeki ajan kartları. Oradaki 3B karakter illüstrasyonları
 * elimizde olmadığı için avatar yerine, ajanın baş harfini taşıyan
 * renkli bir disk kullanıyoruz: illüstrasyon tedarik edildiğinde
 * yalnızca bu parça değişecek, kartın düzeni aynı kalacak.
 */
const RENKLER = {
  indigo: {
    etiket: "text-indigo-400",
    disk: "from-indigo-500/90 to-indigo-700/70 text-white",
    halka: "ring-indigo-500/25",
    kenar: "hover:border-indigo-500/40",
  },
  altin: {
    etiket: "text-altin",
    disk: "from-altin/90 to-altin-soguk/70 text-zinc-950",
    halka: "ring-altin/25",
    kenar: "hover:border-altin/40",
  },
} as const;

function AjanKarti({ ajan }: { ajan: Ajan }) {
  const r = RENKLER[ajan.renk];
  const basHarfler = ajan.rol
    .split(" ")
    .map((k) => k[0])
    .join("");

  return (
    <div
      className={`flex h-full flex-col rounded-2xl border border-cizgi bg-yuzey p-6 transition-colors duration-300 sm:p-7 ${r.kenar}`}
    >
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br text-base font-bold ring-4 ${r.disk} ${r.halka}`}
        aria-hidden
      >
        {basHarfler}
      </span>

      <p className={`etiket mt-6 ${r.etiket}`}>{ajan.rol}</p>
      <h3 className="mt-2 text-xl font-semibold tracking-[-0.015em]">
        {ajan.baslik}
      </h3>
      <p className="mt-3 font-serif leading-relaxed text-zinc-400">
        {ajan.metin}
      </p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {ajan.cipler.map((c) => (
          <li
            key={c}
            className="rounded-full border border-cizgi px-3.5 py-1.5 text-[13px] text-zinc-400"
          >
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Ajanlar() {
  return (
    <section id="ajanlar" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <p className="etiket text-indigo-400">Ajanlar</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold leading-[1.1] tracking-[-0.025em] text-balance sm:text-5xl">
            Dört kişilik bir ekip, tek panelde
          </h2>
          <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-zinc-400">
            Her biri tek bir işten sorumlu. Taslağı onlar hazırlar, son sözü
            sen söylersin.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {AJANLAR.map((a, i) => (
            <Reveal key={a.id} delayMs={i * 80}>
              <AjanKarti ajan={a} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
