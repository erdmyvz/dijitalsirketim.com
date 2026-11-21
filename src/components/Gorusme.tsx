import Reveal from "./Reveal";
import GorusmeFormu from "./GorusmeFormu";

/**
 * Kapanış bölümü: tek çağrı, tek form. Sitede fiyat yok — kapanış da
 * "satın al" değil "konuşalım" diyor.
 */
export default function Gorusme() {
  return (
    <section
      id="gorusme"
      className="relative scroll-mt-20 overflow-hidden border-t border-cizgi bg-yuzey/30"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-80 opacity-70 [background:radial-gradient(55%_70%_at_50%_100%,rgba(99,102,241,0.18),transparent_70%)]"
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <Reveal>
          <p className="etiket text-indigo-400">Görüşme</p>
          <h2 className="mt-4 text-3xl font-bold leading-[1.1] tracking-[-0.025em] text-balance sm:text-5xl">
            Önce tanışalım, sonra konuşalım
          </h2>
          <p className="mt-5 max-w-md font-serif text-lg leading-relaxed text-zinc-400">
            Formu doldur, seni arayayım. Ne sattığını ve şu an pazarlamayı
            kimin yürüttüğünü konuşalım; yapılabilecekleri ve yapılamayacakları
            olduğu gibi söyleyeyim.
          </p>

          <dl className="mt-8 space-y-4 border-t border-cizgi pt-6">
            {[
              ["Ücret", "Görüşme için ücret yok."],
              ["Süre", "20–30 dakika, telefonda ya da görüntülü."],
              [
                "Sonrasında",
                "Ne yapılabileceğini yazılı olarak iletirim; devam etmek zorunda değilsin.",
              ],
            ].map(([baslik, metin]) => (
              <div key={baslik} className="flex gap-4">
                <dt className="w-24 flex-none text-sm font-medium text-zinc-500">
                  {baslik}
                </dt>
                <dd className="text-sm leading-relaxed text-zinc-300">
                  {metin}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delayMs={120}>
          <GorusmeFormu />
        </Reveal>
      </div>
    </section>
  );
}
