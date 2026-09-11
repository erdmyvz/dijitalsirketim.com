import Link from "next/link";
import Reveal from "./Reveal";

const bloklar = [
  {
    no: "01",
    baslik: "Amacımız",
    metin:
      "İşletme sahiplerinin müşteri ve gelir problemini geçici reklam çözümleriyle değil, kök nedenini bularak çözmek. İlk adım her zaman 21 kontrol noktalı Dijital Check-Up'tır.",
  },
  {
    no: "02",
    baslik: "Misyonumuz",
    metin:
      "Türkiye'deki işletmelerin dijital sağlığını veriyle teşhis etmek ve ölçülebilir tedavilerle büyütmek — 2,8 milyon işletmenin ortak sistem eksiğini kapatmak.",
  },
  {
    no: "03",
    baslik: "Vizyonumuz",
    metin:
      "Türkiye'de akla gelen ilk şirket doktoru olmak; her işletmenin yılda en az bir kez dijital check-up yaptırdığı bir iş kültürü oluşturmak.",
  },
];

/**
 * Sayfayı kapatan bölüm.
 *
 * Önceden "ortalanmış başlık + 3 eşit kart" idi — sayfadaki dördüncü
 * tekrarı. Kapanışın ağırlığı olsun diye koyu bir banda alındı ve
 * kartlar yerine numaralı, editoryal bir dizi oldu. Koyu zemin ayrıca
 * altındaki footer'a doğal bir geçiş kuruyor.
 */
export default function MissionVision() {
  return (
    <section id="misyon" className="bg-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-500/10 px-3 py-1 text-xs font-semibold text-teal-300 ring-1 ring-teal-500/30">
              BİZ KİMİZ
            </span>
            <h2 className="mt-5 text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-5xl">
              Neden{" "}
              <span className="text-teal-400">buradayız?</span>
            </h2>
            <p className="mt-5 max-w-sm text-lg leading-relaxed text-slate-300">
              Bu site bir ajans vitrini değil. Bir işletmenin kendi
              sorununu kendi görebilmesi, sonra da adım adım
              onarabilmesi için kuruldu.
            </p>
            <Link
              href="/check-up"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-slate-900 transition-transform duration-300 ease-[var(--ease-apple)] hover:scale-[1.02] active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:scale-100"
            >
              Ücretsiz Check-Up&apos;a Başla
            </Link>
          </Reveal>

          <ul className="space-y-0">
            {bloklar.map((b, i) => (
              <Reveal key={b.baslik} delayMs={i * 100}>
                <li className="flex gap-6 border-t border-white/10 py-7 first:border-t-0 first:pt-0">
                  <span className="pt-0.5 text-sm font-semibold tabular-nums text-teal-400/70">
                    {b.no}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {b.baslik}
                    </h3>
                    <p className="mt-2 leading-relaxed text-slate-300">
                      {b.metin}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
