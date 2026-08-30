// NOT: Aşağıdaki referans kartları örnek/yer tutucu içeriktir.
// Yayına almadan önce gerçek müşteri yorumlarınız, vaka çalışmalarınız
// ve varsa gerçek sayısal sonuçlarınızla değiştirin.
const referanslar = [
  {
    isim: "İşletme Sahibi",
    sektor: "Yerel Hizmet İşletmesi",
    yorum:
      "Teşhis sürecinde sitemizdeki ve Google profilimizdeki eksikleri ilk kez bu kadar net gördük. Reçetedeki adımları uyguladıktan sonra gelen mesaj ve arama sayımızda gözle görülür bir artış oldu.",
  },
  {
    isim: "İşletme Sahibi",
    sektor: "E-ticaret",
    yorum:
      "Önceden dağınık yürüttüğümüz sosyal medya ve reklamlarımız artık tek bir plan etrafında yönetiliyor. Aylık takip raporları sayesinde neyin işe yaradığını net görüyoruz.",
  },
  {
    isim: "İşletme Sahibi",
    sektor: "Kurumsal Hizmet",
    yorum:
      "En çok değer verdiğimiz kısım 'takip' oldu. Tedavi bitince bırakıp gitmediler, sonuçları birlikte izlemeye devam ettik.",
  },
];

const guvenceler = [
  { icon: "🧾", text: "Şeffaf raporlama, gizli madde yok" },
  { icon: "🤝", text: "Size özel reçete, hazır şablon değil" },
  { icon: "🔓", text: "Uzun vadeli bağımlılık yaratmayan çalışma modeli" },
  { icon: "🇹🇷", text: "Türkçe, doğrudan ulaşabileceğiniz destek ekibi" },
];

export default function Proof() {
  return (
    <section id="ispat" className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 ring-1 ring-teal-200">
            İSPAT
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Sadece biz söylemiyoruz, tedavi gören işletmeler de anlatıyor
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {referanslar.map((r, i) => (
            <figure
              key={i}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <span className="text-3xl text-teal-500">&ldquo;</span>
              <blockquote className="flex-1 text-sm leading-relaxed text-slate-600">
                {r.yorum}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-100 text-sm font-semibold text-teal-700">
                  {r.isim.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {r.isim}
                  </p>
                  <p className="text-xs text-slate-400">{r.sektor}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-12 grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:grid-cols-2 lg:grid-cols-4">
          {guvenceler.map((g) => (
            <div key={g.text} className="flex items-center gap-3">
              <span className="text-2xl">{g.icon}</span>
              <span className="text-sm font-medium text-slate-700">
                {g.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
