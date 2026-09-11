import Reveal from "./Reveal";
import OrganHaritasi from "./OrganHaritasi";
import { ORNEK_KARNE } from "@/data/ornekKarne";
import { skorHesapla } from "@/lib/checkup/scoring";
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
  const ornek = skorHesapla(ORNEK_KARNE);

  return (
    <section id="ispat" className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        {/* Ritim: solda iddia sabit kalır, sağda güvenceler akar.
            Önceki bölümlerdeki "ortalanmış başlık + kart sırası"
            kalıbının tekrarını kırmak için. */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start">
          <Reveal className="lg:sticky lg:top-28">
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 ring-1 ring-teal-200">
              NEDEN BİZ
            </span>
            <h2 className="mt-5 text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-slate-900 sm:text-5xl">
              Kurumsal danışmanlık mantığı, günler değil{" "}
              <span className="text-teal-600">saatler</span> içinde
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-slate-600">
              Büyük danışmanlık firmaları benzer bir analizi haftalar süren
              projelerle ve kurumsal bütçelerle yapar. Dijital check-up aynı
              mantığı dijitalleştirir: 21 soru, anında kök problem karnesi.
            </p>
          </Reveal>

          <div className="space-y-4">
            {guvenceler.map((g, i) => (
              <Reveal key={g.title} delayMs={i * 100}>
                <div className="flex gap-5 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 ease-[var(--ease-apple)] hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-teal-50 text-teal-600">
                    <g.Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <div>
                    <h3 className="font-semibold text-slate-900">{g.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                      {g.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Doktor metaforunun görsel karşılığı: 7 organ, kendi ikonu ve
            kendi puanıyla. Metafor buraya kadar yalnızca cümlelerde
            yaşıyordu. */}
        <Reveal delayMs={120}>
          <div className="mt-16 rounded-[32px] border border-slate-200 bg-white p-7 sm:p-9">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold tracking-[-0.01em] text-slate-900">
                  Bir işletme 7 organdan oluşur
                </h3>
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-slate-500">
                  Check-up yedisini de ayrı ayrı ölçer. Aşağıdaki renkler
                  örnek bir karneye aittir — sizinki kendi cevaplarınızdan
                  çıkar.
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500 ring-1 ring-slate-200">
                Örnek
              </span>
            </div>

            <OrganHaritasi sonuc={ornek} className="mt-7" />

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-slate-100 pt-5 text-xs text-slate-500">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                0–2 puan · kırmızı, acil
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                3–4 puan · sarı, düzeltme
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                5–6 puan · yeşil, sağlıklı
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
