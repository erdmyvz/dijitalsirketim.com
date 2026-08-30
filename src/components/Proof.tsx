import Reveal from "./Reveal";
import { IconBarChart, IconCompass, IconEye } from "./icons";

const guvenceler = [
  {
    Icon: IconCompass,
    title: "Mühendis yaklaşımı",
    text: "Belirtiye değil, sisteme bakıyoruz. Her tedavi kök nedene bağlanır.",
  },
  {
    Icon: IconBarChart,
    title: "Veriyle karar",
    text: "Tahmine değil, 21 kontrol noktasından çıkan ölçülebilir bulgulara göre reçete yazıyoruz.",
  },
  {
    Icon: IconEye,
    title: "Şeffaf metodoloji",
    text: "Hangi noktayı neden test ettiğimizi, raporda adım adım gösteriyoruz — kapalı kutu yok.",
  },
];

export default function Proof() {
  return (
    <section id="ispat" className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 ring-1 ring-teal-200">
            NEDEN BİZ
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-5xl">
            Kurumsal danışmanlık mantığı, günler değil{" "}
            <span className="text-teal-600">saatler</span> içinde
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Büyük danışmanlık firmaları benzer bir analizi haftalar süren
            projelerle ve kurumsal bütçelerle yapar. Dijital check-up aynı
            mantığı dijitalleştirir: 48 saatte kök problem raporu.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {guvenceler.map((g, i) => (
            <Reveal key={g.title} delayMs={i * 100}>
              <div className="h-full rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 ease-[var(--ease-apple)] hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                  <g.Icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <h3 className="mt-4 font-semibold text-slate-900">
                  {g.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {g.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
