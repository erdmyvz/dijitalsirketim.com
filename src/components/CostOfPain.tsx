// NOT: Aşağıdaki istatistikler ve kaynak atıfları (TOBB / BLS) brief'te
// verildiği şekilde kullanılmıştır. Yayına almadan önce güncel ve doğru
// kaynak referanslarıyla teyit edin.
const istatistikler = [
  {
    baslik: "4 işletmeden 1'i",
    aciklama: "Her yıl açılan işletmelerin yaklaşık dörtte biri kapanıyor.",
    kaynak: "TOBB",
  },
  {
    baslik: "2 işletmeden 1'i",
    aciklama: "İşletmelerin yaklaşık yarısı 5. yılını göremiyor.",
    kaynak: "BLS",
  },
];

export default function CostOfPain() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-5xl">
            Bu tablo böyle devam ederse{" "}
            <span className="text-red-600">ne olur?</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {istatistikler.map((s) => (
            <div
              key={s.baslik}
              className="rounded-[28px] border border-red-100 bg-red-50/60 p-8 text-center transition-all duration-300 ease-[var(--ease-apple)] hover:-translate-y-1 hover:shadow-xl hover:shadow-red-900/5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <p className="text-4xl font-semibold tracking-[-0.02em] text-red-700 sm:text-6xl">
                {s.baslik}
              </p>
              <p className="mt-3 text-base leading-relaxed text-slate-700">
                {s.aciklama}
              </p>
              <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-widest text-red-400">
                Kaynak: {s.kaynak}
              </span>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center text-lg font-medium leading-relaxed text-slate-800">
          Kapanan işletmelerin ürünleri kötü değildi. Sistemleri yoktu.
        </p>
      </div>
    </section>
  );
}
