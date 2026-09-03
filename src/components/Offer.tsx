import ApplicationForm from "./ApplicationForm";
import Reveal from "./Reveal";
import { IconCheck } from "./icons";

const degerIstifi = [
  "21 kontrol noktası analizi",
  "Yapay zekâ destekli kök problem analizi",
  "Dijital Sağlık Karnesi",
  "Kişiselleştirilmiş tedavi reçetesi",
  "Sonuç görüşmesi",
];

export default function Offer() {
  return (
    <section id="teklif" className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 ring-1 ring-teal-200">
            TEKLİF
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-5xl">
            Dijital Check-Up
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Kök problemi 48 saatte ortaya koyan tek seferlik teşhis paketi.
            Devam edip etmemek tamamen size kalmış.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* Değer istifi + fiyat */}
          <Reveal delayMs={80} className="h-full">
            <div className="h-full rounded-[28px] border border-slate-200 bg-slate-50 p-8">
              <h3 className="text-lg font-semibold text-slate-900">
                Pakete dahil olanlar
              </h3>
              <ul className="mt-5 space-y-3">
                {degerIstifi.map((madde) => (
                  <li
                    key={madde}
                    className="flex items-start gap-2 text-sm text-slate-700"
                  >
                    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-teal-100 text-teal-700">
                      <IconCheck className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                    <span>{madde}</span>
                  </li>
                ))}
              </ul>

              {/* Fiyat bilinçli olarak burada gösterilmez — bkz. KARARLAR.md
                  (2026-09-03). Teşhis konmadan tedavi fiyatı verilmez. */}
              <div className="mt-8 border-t border-dashed border-slate-300 pt-6">
                <p className="text-base font-medium leading-relaxed text-slate-800">
                  Hiçbir doktor tedavi fiyatını muayeneden önce söylemez.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Önce teşhis: işletmenizin hangi fonksiyonu tıkalı, kök
                  problem nerede. Check-up ücreti ve tedavi planı, başvuru
                  adımında net olarak paylaşılır. Sürpriz maliyet yoktur.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Başvuru formu */}
          <Reveal delayMs={160}>
            <ApplicationForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
