import Reveal from "./Reveal";
import {
  IconClipboard,
  IconPill,
  IconSearch,
  IconTrendingUp,
} from "./icons";

const adimlar = [
  {
    no: "01",
    Icon: IconSearch,
    title: "Teşhis",
    subtitle: "Önce anlıyoruz",
    text: "21 kontrol noktalı dijital check-up: 7 iş fonksiyonunu 3 katmanda (strateji, uygulama, ölçüm) tarıyoruz. Sorunun kaynağını net olarak ortaya koyuyoruz.",
  },
  {
    no: "02",
    Icon: IconClipboard,
    title: "Reçete",
    subtitle: "Sonra kök nedeni buluyoruz",
    text: "5 Neden analiziyle belirtinin arkasındaki kök problemi ayırıyoruz: Yetkinlik mi, Kültür mü, Netlik mi? Genel geçer paket değil, size özel reçete.",
  },
  {
    no: "03",
    Icon: IconPill,
    title: "Tedavi",
    subtitle: "Sonra uyguluyoruz",
    text: "Reklam yönetimi, CRM kurulumu, WhatsApp/Instagram yapay zekâ otomasyonları ve satış huninizin (funnel) yeniden kurulması. Reçetedeki her adım uygulamaya geçer.",
  },
  {
    no: "04",
    Icon: IconTrendingUp,
    title: "Takip",
    subtitle: "Ve ölçerek iyileştiriyoruz",
    text: "KPI tabloları ve aylık raporla sonuçları birlikte izliyoruz. Ölçemediğin performansı geliştiremezsin — dijital sağlığınız sürekli kontrol altında kalır.",
  },
];

export default function Solution() {
  return (
    <section id="cozum" className="bg-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-teal-500/10 px-3 py-1 text-xs font-semibold text-teal-300 ring-1 ring-teal-500/30">
            4 ADIMLI TEDAVİ MODELİ
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.02em] text-white sm:text-5xl">
            Doktora gider gibi:{" "}
            <span className="text-teal-400">
              teşhis, reçete, tedavi, takip
            </span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">
            Rastgele &ldquo;biraz reklam verelim&rdquo; yaklaşımı değil;
            sebep-sonuç ilişkisini kuran, dört aşamalı ve ölçülebilir bir
            yöntem.
          </p>
        </Reveal>

        <div className="relative mt-16 grid gap-8 md:grid-cols-4">
          {/* bağlayıcı çizgi */}
          <div className="absolute left-0 right-0 top-14 hidden h-px bg-slate-700 md:block" />

          {adimlar.map((a, i) => (
            <Reveal key={a.no} delayMs={i * 100} className="group relative">
              <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-teal-300 backdrop-blur-xl transition-all duration-300 ease-[var(--ease-apple)] group-hover:scale-110 group-hover:border-teal-400/40 group-hover:bg-white/10 motion-reduce:transition-none motion-reduce:group-hover:scale-100 md:mx-0">
                <a.Icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <div className="mt-5">
                <span className="text-xs font-semibold tracking-widest text-teal-400">
                  ADIM {a.no}
                </span>
                <h3 className="mt-1 text-xl font-semibold text-white">
                  {a.title}
                  <span className="ml-2 text-sm font-normal text-slate-400">
                    · {a.subtitle}
                  </span>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {a.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Zıtlık şeridi */}
        <Reveal delayMs={200}>
          <div className="mx-auto mt-16 max-w-3xl rounded-[28px] border border-teal-500/20 bg-teal-500/5 p-6 text-center backdrop-blur-xl sm:p-8">
            <p className="text-base leading-relaxed text-slate-200 sm:text-lg">
              <span className="text-slate-400 line-through decoration-slate-500">
                Amatör danışman semptomu tedavi eder.
              </span>{" "}
              <span className="font-semibold text-teal-300">
                Şirket doktoru kök problemi tedavi eder.
              </span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
