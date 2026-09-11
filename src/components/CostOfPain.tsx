import Reveal from "./Reveal";

// Burada BİLEREK istatistik yok.
//
// Önceki sürümde TOBB ve BLS adına iki oran yazıyordu ("4 işletmeden
// 1'i", "2 işletmeden 1'i") ve koddaki not bunların teyit edilmediğini
// söylüyordu. Kaynak adı verilen doğrulanmamış bir sayı, sıradan bir
// abartıdan daha ağır bir iddia — CLAUDE.md'nin değişmez kuralına da
// aykırı. Erdem'in kararıyla (2026-09-11) kaldırıldı.
//
// Yerine geçen çerçeve doğrulama gerektirmiyor: maliyet bir oran değil,
// işletme sahibinin zaten ödediği bedel. Okuyan kendinde tanır ya da
// tanımaz; kimse adına bir istatistik iddia edilmiyor.
const kalemler = [
  { kalem: "Sahibinin zamanı", siklik: "her gün" },
  { kalem: "Tekrarlanamayan gelir", siklik: "her ay" },
  { kalem: "Ölçülmeyen pazarlama", siklik: "her kampanya" },
  { kalem: "Hisle alınan kararlar", siklik: "her seferinde" },
];

export default function CostOfPain() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center">
          <Reveal>
            <h2 className="text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-slate-900 sm:text-5xl">
              Bu tablo böyle devam ederse{" "}
              <span className="text-red-600">ne olur?</span>
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-600">
              Sistemsizliğin bir faturası var, ama bu fatura posta
              kutusuna gelmiyor. Ürün iyi, emek yerinde — eksik olan,
              geliri tekrarlanabilir kılan yapı. O yapı kurulmadığı
              sürece bedel, işletmenin büyümemesi olarak ödenir.
            </p>
            <p className="mt-7 inline-block rounded-2xl border-l-[3px] border-slate-900 bg-slate-50 py-3 pl-4 pr-5 text-base font-medium leading-relaxed text-slate-800">
              Ürününüz kötü olduğu için büyüyemiyor olabilirsiniz.
              <br />
              Ya da bir sisteminiz olmadığı için.
              <br />
              <span className="text-slate-500">
                Check-up tam olarak bunu ayırır.
              </span>
            </p>
          </Reveal>

          {/* Makbuz görseli: rakam yok, kaynak yok — yalnızca neyin
              ödendiği ve ne sıklıkla ödendiği. */}
          <Reveal delayMs={120}>
            <div className="rounded-[28px] border border-red-100 bg-red-50/50 p-7 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-red-500">
                Sistemsizliğin faturası
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                Kalem kalem görünmez, ama her ay ödenir.
              </p>

              <dl className="mt-6 border-t border-dashed border-red-200 pt-4">
                {kalemler.map((k) => (
                  <div
                    key={k.kalem}
                    className="flex items-baseline justify-between gap-4 border-b border-dashed border-red-200/70 py-3 last:border-b-0"
                  >
                    <dt className="text-[15px] text-slate-800">{k.kalem}</dt>
                    <dd className="flex-none text-xs font-medium uppercase tracking-wider text-red-400">
                      {k.siklik}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-4 flex items-baseline justify-between gap-4 border-t-2 border-dashed border-red-300 pt-4">
                <span className="text-sm font-semibold uppercase tracking-widest text-slate-500">
                  Toplam
                </span>
                <span className="text-right text-lg font-semibold tracking-[-0.01em] text-red-700">
                  İşletmenin büyümemesi
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
