const belirtiler = [
  "Web siteniz yok ya da yıllardır güncellenmedi",
  "Google'da işletme adınızı arasanız bile bulunmuyorsunuz",
  "Sosyal medya hesaplarınız aylardır sessiz",
  "Gelen mesaj ve aramalarda geri dönüş yavaş, düzensiz",
  "Rakipleriniz sizden daha az emekle daha çok müşteri kapıyor",
];

export default function Hero() {
  return (
    <section id="sorun" className="relative overflow-hidden bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 ring-1 ring-red-200">
            ÖN TEŞHİS
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
            İşletmenizin dijital tarafında bir{" "}
            <span className="text-teal-600">rahatsızlık</span> mı var?
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
            Tıpkı sağlığımızdaki belirtiler gibi, işletmenizin dijital
            varlığında da göz ardı edilen belirtiler vardır. Erken teşhis
            edilmezse küçük bir aksaklık, ciddi bir müşteri ve gelir kaybına
            dönüşür.
          </p>

          <ul className="mt-8 space-y-3">
            {belirtiler.map((b) => (
              <li key={b} className="flex items-start gap-3 text-slate-700">
                <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-red-100 text-xs text-red-600">
                  ✕
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#kayit"
              className="inline-flex items-center justify-center rounded-full bg-teal-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-teal-600/25 transition hover:bg-teal-700"
            >
              Ücretsiz Dijital Teşhisimi İste
            </a>
            <a
              href="#cozum"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3.5 text-base font-semibold text-slate-700 transition hover:border-teal-600 hover:text-teal-700"
            >
              Tedavi Yöntemini Gör
            </a>
          </div>
          <p className="mt-3 text-sm text-slate-400">
            Muayene ücretsiz — kredi kartı gerekmez.
          </p>
        </div>

        {/* "Reçete kağıdı" görsel bloğu */}
        <div className="relative mx-auto w-full max-w-sm rotate-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
          <div className="flex items-center gap-2 border-b border-dashed border-slate-200 pb-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-xl">
              🩺
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Dijital Sağlık Karnesi
              </p>
              <p className="text-xs text-slate-400">
                dijitalşirketim.com.tr Kliniği
              </p>
            </div>
          </div>

          <dl className="mt-4 space-y-3 text-sm">
            {[
              ["Web Sitesi Performansı", "Riskli", "bg-red-100 text-red-700"],
              ["Google Görünürlüğü", "Zayıf", "bg-amber-100 text-amber-700"],
              [
                "Sosyal Medya Nabzı",
                "Düzensiz",
                "bg-amber-100 text-amber-700",
              ],
              ["Müşteri Geri Dönüşü", "Riskli", "bg-red-100 text-red-700"],
            ].map(([label, value, cls]) => (
              <div key={label} className="flex items-center justify-between">
                <dt className="text-slate-500">{label}</dt>
                <dd
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${cls}`}
                >
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-5 rounded-lg bg-teal-50 p-3 text-xs leading-relaxed text-teal-800">
            Sonuç: Erken müdahale ile tamamen tedavi edilebilir. Reçetenizi
            görmek için ücretsiz teşhis talep edin.
          </p>
        </div>
      </div>
    </section>
  );
}
