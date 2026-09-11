import Reveal from "./Reveal";
import AdimCizgisi from "./AdimCizgisi";
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
    subtitle: "Önce ölçülür",
    text: "21 kontrol noktalı dijital check-up: 7 iş fonksiyonu 3 katmanda (strateji, uygulama, ölçüm) taranır. Sonuç anında çıkar — hangi fonksiyonun bozuk olduğu tahminle değil puanla ortaya konur.",
  },
  {
    no: "02",
    Icon: IconClipboard,
    title: "Reçete",
    subtitle: "Sonra kök neden ayrışır",
    text: "Belirti ile kök problem ayrılır: Yetkinlik mi, Kültür mü, Netlik mi? Karnenizdeki her kırmızı fonksiyon, onu onaran modüllerle eşleşir. Genel geçer paket değil, sizin karnenizden çıkan liste.",
  },
  {
    no: "03",
    Icon: IconPill,
    title: "Tedavi",
    subtitle: "Uygulayan sizsiniz",
    text: "Planınızın açtığı modüller adım adım ilerler: her adımda ne yapılacağı, doldurabileceğiniz şablonlar ve net bir bitiş kriteri vardır. Sıra kimsede beklemez — sıradaki adım hep ekrandadır.",
  },
  {
    no: "04",
    Icon: IconTrendingUp,
    title: "Takip",
    subtitle: "Ve tekrar ölçülür",
    text: "Modül bitince onardığı check-up soruları yeniden sorulur, yeni bir karne oluşur. Fonksiyon iyileştikçe aylık tutarınız düşer — ödediğiniz rakam, sistemin işe yarayıp yaramadığının ölçüsüdür.",
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
            Rastgele &ldquo;biraz reklam verelim&rdquo; yaklaşımı değil.
            Sistem teşhisi koyar ve reçeteyi yazar; uygulama adım adım
            sizde kalır — ve her adımın bir bitiş kriteri vardır.
          </p>
        </Reveal>

        <div className="relative mt-16 grid gap-8 md:grid-cols-4">
          {/* Bağlayıcı çizgi: bölüm görünür olunca soldan sağa çizilir —
              tedavi yolunun izlendiği hissi. */}
          <AdimCizgisi className="absolute left-7 right-7 top-7 hidden h-px md:block" />

          {adimlar.map((a, i) => (
            <Reveal key={a.no} delayMs={i * 100} className="group relative">
              <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-slate-900 text-teal-300 shadow-[0_0_0_6px_rgb(15,23,42)] transition-all duration-300 ease-[var(--ease-apple)] group-hover:scale-110 group-hover:border-teal-400/50 group-hover:bg-teal-500/10 group-hover:text-teal-200 motion-reduce:transition-none motion-reduce:group-hover:scale-100 md:mx-0">
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
