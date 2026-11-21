import { IconOk } from "./icons";

/**
 * Açılış. Başlık, Erdem'in kendi çalışma ilkesi — aynı zamanda ürünün
 * tezi: rakip reklamları ve rakip video modülleri tam olarak bunu
 * yapıyor, çalıştığı kanıtlanmış olanı bulup uyarlıyor.
 */
export default function Hero() {
  return (
    <section id="ust" className="relative overflow-hidden">
      {/* Üstten inen çok hafif indigo ışık — düz siyahı kırmak için. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-[520px] opacity-60 [background:radial-gradient(60%_60%_at_50%_0%,rgba(99,102,241,0.22),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
        <p className="etiket text-indigo-400">Dijital Şirketim</p>

        <h1 className="mt-5 max-w-[16ch] text-[2.5rem] font-bold leading-[1.03] tracking-[-0.035em] text-balance sm:text-6xl lg:text-[4.25rem]">
          Amerika&apos;yı yeniden keşfetmeye gerek yok.
        </h1>

        <p className="mt-7 max-w-2xl font-serif text-lg leading-relaxed text-zinc-400 sm:text-xl">
          Senin sektöründe çalıştığı çoktan kanıtlanmış reklamlar, videolar ve
          teklifler var. <span className="text-zinc-200">Dijital Şirketim</span>{" "}
          onları bulur, markana uyarlar ve uygulamanı sağlar — dört ajan ve beş
          modülle.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href="#gorusme"
            className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 ease-[var(--ease-apple)] hover:bg-indigo-400"
          >
            Görüşme ayarla
            <IconOk className="h-4 w-4" strokeWidth={2} />
          </a>
          <a
            href="#moduller"
            className="inline-flex items-center rounded-full border border-cizgi px-6 py-3.5 text-sm font-semibold text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
          >
            Nasıl çalıştığını gör
          </a>
        </div>

        {/* Dürüstlük notu: aşağıdaki ekranlar örnek. Ziyaretçi ne
            gördüğünü bilsin diye ilk ekranda söyleniyor. */}
        <p className="mt-8 max-w-xl text-sm leading-relaxed text-zinc-500">
          Sistem kuruluyor. Aşağıdaki ekranlar tasarımı örnek verilerle
          gösteriyor — gerçek bir müşteriye ait değil.{" "}
          <a href="#durum" className="text-zinc-400 underline underline-offset-4 hover:text-zinc-200">
            Hangi aşamadayız?
          </a>
        </p>
      </div>
    </section>
  );
}
