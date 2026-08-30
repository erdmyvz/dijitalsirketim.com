const adimlar = [
  {
    no: "01",
    icon: "🔍",
    title: "Teşhis",
    subtitle: "Önce anlıyoruz",
    text: "Web siteniz, Google görünürlüğünüz, sosyal medyanız ve rakipleriniz için ücretsiz bir dijital sağlık taraması yapıyoruz. Sorunun kaynağını net olarak ortaya koyuyoruz.",
  },
  {
    no: "02",
    icon: "📋",
    title: "Reçete",
    subtitle: "Sonra planlıyoruz",
    text: "Teşhise göre işletmenize özel bir yol haritası hazırlıyoruz: öncelikler, hedefler, bütçe ve takvim netleşiyor. Genel geçer paket değil, size özel reçete.",
  },
  {
    no: "03",
    icon: "💊",
    title: "Tedavi",
    subtitle: "Sonra uyguluyoruz",
    text: "Web sitenizi kurar/yeniler, Google ve harita görünürlüğünüzü düzeltir, sosyal medya ve reklam yönetimini devralırız. Reçetedeki her adım uygulamaya geçer.",
  },
  {
    no: "04",
    icon: "📈",
    title: "Takip",
    subtitle: "Ve iyileşmeyi izliyoruz",
    text: "Aylık raporlarla sonuçları birlikte izliyor, gerektiğinde tedaviyi güncelliyoruz. Dijital sağlığınız sürekli kontrol altında kalır, nüksetmez.",
  },
];

export default function Solution() {
  return (
    <section id="cozum" className="bg-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-teal-500/10 px-3 py-1 text-xs font-semibold text-teal-300 ring-1 ring-teal-500/30">
            TEDAVİ YÖNTEMİMİZ
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Bir doktor gibi çalışıyoruz:{" "}
            <span className="text-teal-400">
              teşhis, reçete, tedavi, takip
            </span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">
            Rastgele &ldquo;biraz reklam verelim&rdquo; yaklaşımı değil;
            sebep-sonuç ilişkisini kuran, dört aşamalı ve ölçülebilir bir
            yöntem.
          </p>
        </div>

        <div className="relative mt-16 grid gap-8 md:grid-cols-4">
          {/* bağlayıcı çizgi */}
          <div className="absolute left-0 right-0 top-14 hidden h-px bg-slate-700 md:block" />

          {adimlar.map((a) => (
            <div key={a.no} className="relative">
              <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-teal-500/40 bg-slate-900 text-2xl md:mx-0">
                {a.icon}
              </div>
              <div className="mt-5">
                <span className="text-xs font-semibold tracking-widest text-teal-400">
                  ADIM {a.no}
                </span>
                <h3 className="mt-1 text-xl font-bold text-white">
                  {a.title}
                  <span className="ml-2 text-sm font-normal text-slate-400">
                    · {a.subtitle}
                  </span>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {a.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
