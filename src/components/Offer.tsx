import ApplicationForm from "./ApplicationForm";

const degerIstifi = [
  "21 kontrol noktası analizi",
  "Yapay zekâ destekli 5 Neden görüşmesi",
  "Kök problem raporu",
  "Kişiselleştirilmiş tedavi reçetesi",
  "30 dakikalık sonuç görüşmesi",
];

export default function Offer() {
  return (
    <section id="teklif" className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 ring-1 ring-teal-200">
            TEKLİF
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-5xl">
            Dijital Check-Up
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Kök problemi 48 saatte ortaya koyan tek seferlik teşhis paketi.
            Devam edip etmemek tamamen size kalmış.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* Değer istifi + fiyat */}
          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-8">
            <h3 className="text-lg font-semibold text-slate-900">
              Pakete dahil olanlar
            </h3>
            <ul className="mt-5 space-y-3">
              {degerIstifi.map((madde) => (
                <li
                  key={madde}
                  className="flex items-start gap-2 text-sm text-slate-700"
                >
                  <span className="mt-0.5 text-teal-600">✓</span>
                  <span>{madde}</span>
                </li>
              ))}
            </ul>

            {/* NOT: Fiyat ve referans değer alanlarını gerçek fiyatlandırmanızla değiştirin. */}
            <div className="mt-8 border-t border-dashed border-slate-300 pt-6">
              <p className="text-sm text-slate-400 line-through decoration-slate-400">
                Danışmanlık değeri: [REFERANS DEĞER]
              </p>
              <p className="mt-1 text-4xl font-semibold tracking-[-0.02em] text-slate-900">
                [FİYAT]
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Bu, değer merdivenimizin ilk basamağıdır. Ödeme adımı bir
                sonraki fazda eklenecektir.
              </p>
            </div>
          </div>

          {/* Başvuru formu */}
          <ApplicationForm />
        </div>
      </div>
    </section>
  );
}
