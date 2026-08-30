import Reveal from "./Reveal";
import { IconCheckCircle, IconCompass, IconEye } from "./icons";

const bloklar = [
  {
    Icon: IconCheckCircle,
    baslik: "Amacımız",
    metin:
      "İşletme sahiplerinin müşteri ve gelir problemini geçici reklam çözümleriyle değil, kök nedenini bularak çözmek. İlk adım her zaman 21 kontrol noktalı Dijital Check-Up'tır.",
  },
  {
    Icon: IconCompass,
    baslik: "Misyonumuz",
    metin:
      "Türkiye'deki işletmelerin dijital sağlığını veriyle teşhis etmek ve ölçülebilir tedavilerle büyütmek — 2,8 milyon işletmenin ortak sistem eksiğini kapatmak.",
  },
  {
    Icon: IconEye,
    baslik: "Vizyonumuz",
    metin:
      "Türkiye'de akla gelen ilk şirket doktoru olmak; her işletmenin yılda en az bir kez dijital check-up yaptırdığı bir iş kültürü oluşturmak.",
  },
];

export default function MissionVision() {
  return (
    <section id="misyon" className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 ring-1 ring-teal-200">
            BİZ KİMİZ
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-5xl">
            Neden buradayız?
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {bloklar.map((b, i) => (
            <Reveal key={b.baslik} delayMs={i * 100}>
              <div className="h-full rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                  <b.Icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <h3 className="mt-4 font-semibold text-slate-900">
                  {b.baslik}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {b.metin}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
