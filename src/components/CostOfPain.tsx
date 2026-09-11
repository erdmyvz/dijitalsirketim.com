import Reveal from "./Reveal";
import { IconStore } from "./icons";

// NOT: Aşağıdaki istatistikler ve kaynak atıfları (TOBB / BLS) brief'te
// verildiği şekilde kullanılmıştır. Yayına almadan önce güncel ve doğru
// kaynak referanslarıyla teyit edin.
const istatistikler = [
  {
    baslik: "4 işletmeden 1'i",
    toplam: 4,
    kapanan: 1,
    aciklama: "Her yıl açılan işletmelerin yaklaşık dörtte biri kapanıyor.",
    kaynak: "TOBB",
  },
  {
    baslik: "2 işletmeden 1'i",
    toplam: 2,
    kapanan: 1,
    aciklama: "İşletmelerin yaklaşık yarısı 5. yılını göremiyor.",
    kaynak: "BLS",
  },
];

/**
 * Oranı rakamla değil piktogramla anlatıyoruz: "4 işletmeden 1'i" bir
 * cümle olarak okunup geçiliyor, dördü çizilip biri kırmızıya döndüğünde
 * göz onu saymak zorunda kalıyor. Renk tek başına anlam taşımasın diye
 * kapanan dükkân aynı zamanda soluklaştırılıp devriliyor.
 */
function Piktogram({ toplam, kapanan }: { toplam: number; kapanan: number }) {
  return (
    <div aria-hidden className="flex items-end justify-center gap-2.5">
      {Array.from({ length: toplam }, (_, i) => {
        const kapali = i < kapanan;
        return (
          <span
            key={i}
            className={
              kapali
                ? "text-red-500 opacity-90 [transform:rotate(8deg)]"
                : "text-slate-300"
            }
          >
            <IconStore
              className={kapali ? "h-11 w-11" : "h-11 w-11"}
              strokeWidth={1.5}
            />
          </span>
        );
      })}
    </div>
  );
}

export default function CostOfPain() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        {/* Ritim kırılımı: bu bölüm ortalanmış başlık yerine iki sütun —
            solda iddia, sağda kanıt. Üstteki ve alttaki bölümlerle aynı
            kalıba düşmesin diye. */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <Reveal>
            <h2 className="text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-slate-900 sm:text-5xl">
              Bu tablo böyle devam ederse{" "}
              <span className="text-red-600">ne olur?</span>
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-slate-600">
              Kapanan işletmelerin çoğu kötü ürün yüzünden kapanmıyor.
              Ürün iyi, emek yerinde — eksik olan, geliri tekrarlanabilir
              kılan sistem.
            </p>
            <p className="mt-6 inline-block rounded-2xl border-l-[3px] border-slate-900 bg-slate-50 py-3 pl-4 pr-5 text-base font-medium leading-relaxed text-slate-800">
              Kapanan işletmelerin ürünleri kötü değildi.
              <br />
              Sistemleri yoktu.
            </p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {istatistikler.map((s, i) => (
              <Reveal key={s.baslik} delayMs={i * 120}>
                <div className="h-full rounded-[28px] border border-red-100 bg-red-50/50 p-7 text-center transition-all duration-300 ease-[var(--ease-apple)] hover:-translate-y-1 hover:shadow-xl hover:shadow-red-900/5 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                  <Piktogram toplam={s.toplam} kapanan={s.kapanan} />
                  <p className="mt-5 text-2xl font-semibold tracking-[-0.02em] text-red-700 sm:text-3xl">
                    {s.baslik}
                  </p>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-700">
                    {s.aciklama}
                  </p>
                  <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-widest text-red-400">
                    Kaynak: {s.kaynak}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
