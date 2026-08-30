import Reveal from "./Reveal";
import { IconStethoscope, IconX } from "./icons";

const semptomlar = [
  "Her ay ciroya sıfırdan başlıyorsunuz",
  "Siz olmadan iş duruyor",
  "Reklam veriyorsunuz ama dönüşüm yok",
  "Tek müşteri kaynağınız tavsiye",
  "Sosyal medyada görünmüyorsunuz",
];

export default function Hero() {
  return (
    <section id="sorun" className="relative overflow-hidden bg-slate-50">
      {/* Arka planda hafif, hareketsiz derinlik — sade ve dikkat dağıtmaz */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-teal-200/40 blur-3xl" />
        <div className="absolute -right-24 top-40 h-80 w-80 rounded-full bg-red-100/40 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:py-32">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 ring-1 ring-red-200">
              TÜRKİYE&apos;NİN ŞİRKET DOKTORU
            </span>
          </Reveal>

          <Reveal delayMs={80}>
            <h1 className="mt-5 text-[2.75rem] font-semibold leading-[1.05] tracking-[-0.02em] text-slate-900 sm:text-6xl">
              Ürününüz iyi, emeğiniz büyük. Peki{" "}
              <span className="text-teal-600">müşteri neden gelmiyor?</span>
            </h1>
          </Reveal>

          <Reveal delayMs={150}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl">
              Türkiye&apos;de 2,8 milyon işletmenin ortak hastalığı aynı: gelir
              sistemi yok, müşteri akışı yok, ölçeklenme yok. Dijital
              Şirketim bu hastalığı teşhis eder ve tedavi eder.
            </p>
          </Reveal>

          <Reveal delayMs={220}>
            <ul className="mt-8 space-y-3">
              {semptomlar.map((s) => (
                <li key={s} className="flex items-start gap-3 text-slate-700">
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-red-100 text-red-600">
                    <IconX className="h-3 w-3" strokeWidth={2.25} />
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delayMs={300}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#teklif"
                className="inline-flex items-center justify-center rounded-full bg-teal-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-teal-600/25 transition-transform duration-300 ease-[var(--ease-apple)] hover:scale-[1.02] active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:scale-100"
              >
                Dijital Check-Up Başvurusu
              </a>
              <a
                href="#cozum"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3.5 text-base font-semibold text-slate-700 transition-all duration-300 ease-[var(--ease-apple)] hover:scale-[1.02] hover:border-teal-600 hover:text-teal-700 active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:scale-100"
              >
                Tedavi Modelini Gör
              </a>
            </div>
          </Reveal>
        </div>

        {/* "Reçete kağıdı" görsel bloğu */}
        <Reveal delayMs={150} className="md:justify-self-end">
          <div className="relative mx-auto w-full max-w-sm rotate-1 rounded-[28px] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-900/10 transition-transform duration-500 ease-[var(--ease-apple)] hover:rotate-0 motion-reduce:transition-none">
            <div className="flex items-center gap-2 border-b border-dashed border-slate-200 pb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                <IconStethoscope className="h-5 w-5" />
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
                ["Gelir Sistemi", "Riskli", "bg-red-100 text-red-700"],
                ["Müşteri Akışı", "Zayıf", "bg-amber-100 text-amber-700"],
                [
                  "Ölçeklenme Kapasitesi",
                  "Düzensiz",
                  "bg-amber-100 text-amber-700",
                ],
                ["Dijital Görünürlük", "Riskli", "bg-red-100 text-red-700"],
              ].map(([label, value, cls]) => (
                <div
                  key={label}
                  className="flex items-center justify-between"
                >
                  <dt className="text-slate-500">{label}</dt>
                  <dd
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${cls}`}
                  >
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-5 rounded-2xl bg-teal-50 p-3 text-xs leading-relaxed text-teal-800">
              Sonuç: Erken müdahale ile tamamen tedavi edilebilir. Kök
              problemi görmek için Dijital Check-Up başvurusu yapın.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
