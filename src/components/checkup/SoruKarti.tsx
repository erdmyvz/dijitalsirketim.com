import { CEVAP_SECENEKLERI, type CevapDegeri, type Soru } from "@/data/questions";

const SEVIYE_STIL: Record<CevapDegeri, string> = {
  2: "border-teal-600 bg-teal-50 text-teal-800",
  1: "border-amber-500 bg-amber-50 text-amber-800",
  0: "border-slate-400 bg-slate-100 text-slate-700",
};

export default function SoruKarti({
  soru,
  index,
  secili,
  onSec,
}: {
  soru: Soru;
  index: number;
  secili: CevapDegeri | undefined;
  onSec: (deger: CevapDegeri) => void;
}) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-teal-600">
        {String.fromCharCode(97 + index)})
      </p>
      <p className="mt-1.5 text-base leading-relaxed text-slate-900 sm:text-lg">
        {soru.metin}
      </p>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {CEVAP_SECENEKLERI.map((secenek) => {
          const aktif = secili === secenek.deger;
          return (
            <button
              key={secenek.deger}
              type="button"
              onClick={() => onSec(secenek.deger)}
              aria-pressed={aktif}
              className={`rounded-2xl border p-3 text-left transition-all duration-200 ease-[var(--ease-apple)] motion-reduce:transition-none ${
                aktif
                  ? SEVIYE_STIL[secenek.deger]
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span className="block text-sm font-semibold">
                {secenek.etiket}
              </span>
              <span className="mt-0.5 block text-xs opacity-80">
                {secenek.aciklama}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
