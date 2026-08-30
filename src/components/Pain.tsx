const sonuclar = [
  {
    icon: "📉",
    title: "Kaybedilen müşteriler",
    text: "Sizi arayan potansiyel müşteriler, sitenizi ya da sayfanızı bulamayınca sessizce rakibinize yöneliyor.",
  },
  {
    icon: "⏳",
    title: "Boşa giden zaman",
    text: "Kendi işinizi büyütmek yerine, işe yaramayan reklamlarla ve düzensiz paylaşımlarla vakit kaybediyorsunuz.",
  },
  {
    icon: "💸",
    title: "Boşa giden bütçe",
    text: "Doğru teşhis olmadan yapılan reklam harcamaları, hedef kitleye ulaşamadan eriyip gidiyor.",
  },
  {
    icon: "🏳️",
    title: "Rakiplerin öne geçmesi",
    text: "Sizinle aynı işi yapan ama dijitalde daha görünür olan rakipleriniz, pazar payınızı adım adım devralıyor.",
  },
];

export default function Pain() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Belirtileri görmezden gelmenin{" "}
            <span className="text-red-600">bedeli ağır</span> oluyor
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Sağlıkta olduğu gibi dijitalde de erteleme tedavi süresini
            uzatır, maliyeti artırır. Teşhis konulmadan geçen her ay, geri
            getirilemeyecek müşteri kayıpları demek.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sonuclar.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:border-red-200 hover:bg-red-50/40"
            >
              <span className="text-3xl">{s.icon}</span>
              <h3 className="mt-4 font-semibold text-slate-900">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {s.text}
              </p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl rounded-xl border border-amber-200 bg-amber-50 p-4 text-center text-sm text-amber-800">
          <strong>Doktorun notu:</strong> Erken teşhis, tedavi maliyetini
          düşürür. Ne kadar erken başlarsanız, dijital sağlığınıza dönüş o
          kadar hızlı ve ucuz olur.
        </p>
      </div>
    </section>
  );
}
