// NOT: Paket adları, kapsamları ve fiyatlandırma mantığı örnektir.
// Kendi hizmetlerinize ve fiyatlandırma politikanıza göre düzenleyin.
const paketler = [
  {
    ad: "Muayene",
    aciklama: "Nereden başlayacağınızı bilmiyorsanız",
    fiyat: "Ücretsiz",
    ozellikler: [
      "Web sitesi & Google görünürlük taraması",
      "Sosyal medya hızlı analizi",
      "Yazılı ön teşhis raporu",
      "15 dakikalık değerlendirme görüşmesi",
    ],
    vurgu: false,
    cta: "Ücretsiz Teşhis Al",
  },
  {
    ad: "Tam Tedavi",
    aciklama: "Dijital varlığınızı baştan sona düzeltmek için",
    fiyat: "Size özel teklif",
    ozellikler: [
      "Web sitesi kurulum / yenileme",
      "Google Business & SEO düzenlemesi",
      "Sosyal medya + reklam yönetimi",
      "Kişiye özel reçete ve uygulama takvimi",
      "Aylık ilerleme raporu",
    ],
    vurgu: true,
    cta: "Tedavi Planımı İste",
  },
  {
    ad: "Kurumsal Bakım",
    aciklama: "Sonucu koruyup büyütmek isteyenler için",
    fiyat: "Aylık anlaşma",
    ozellikler: [
      "Tam Tedavi paketinin tüm kapsamı",
      "Sürekli izleme ve takip raporları",
      "Öncelikli destek hattı",
      "Çeyreklik strateji güncellemesi",
    ],
    vurgu: false,
    cta: "Görüşme Talep Et",
  },
];

export default function Offer() {
  return (
    <section id="teklif" className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 ring-1 ring-teal-200">
            TEKLİF
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Size uygun tedavi planını seçin
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Her işletmenin dijital sağlık durumu farklıdır. Bu yüzden ilk
            adım her zaman ücretsiz teşhistir — hangi pakete ihtiyacınız
            olduğuna birlikte karar veririz.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {paketler.map((p) => (
            <div
              key={p.ad}
              className={`relative flex flex-col rounded-2xl border p-8 ${
                p.vurgu
                  ? "border-teal-600 bg-teal-600 text-white shadow-xl shadow-teal-600/20 lg:-translate-y-3"
                  : "border-slate-200 bg-slate-50 text-slate-900"
              }`}
            >
              {p.vurgu && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-3 py-1 text-xs font-bold text-teal-700 shadow">
                  EN ÇOK TERCİH EDİLEN
                </span>
              )}

              <h3 className="text-xl font-bold">{p.ad}</h3>
              <p
                className={`mt-1 text-sm ${
                  p.vurgu ? "text-teal-50" : "text-slate-500"
                }`}
              >
                {p.aciklama}
              </p>
              <p className="mt-6 text-2xl font-extrabold">{p.fiyat}</p>

              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {p.ozellikler.map((o) => (
                  <li key={o} className="flex items-start gap-2">
                    <span
                      className={
                        p.vurgu ? "text-teal-100" : "text-teal-600"
                      }
                    >
                      ✓
                    </span>
                    <span>{o}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#kayit"
                className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                  p.vurgu
                    ? "bg-white text-teal-700 hover:bg-teal-50"
                    : "bg-teal-600 text-white hover:bg-teal-700"
                }`}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
