import { CIRO_ARALIKLARI, type CiroAraligi } from "@/data/questions";
import AdimBaslik from "./AdimBaslik";

export default function CiroAdimi({
  secili,
  onSec,
}: {
  secili: CiroAraligi | null;
  onSec: (deger: CiroAraligi) => void;
}) {
  return (
    <div>
      <AdimBaslik
        kicker="OPSİYONEL"
        baslik="Aylık ciro aralığınız nedir?"
        aciklama="Bu soruyu istediğiniz zaman geçebilirsiniz."
      />

      <div className="space-y-2.5">
        {CIRO_ARALIKLARI.map((opt) => {
          const aktif = secili === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSec(opt.id)}
              aria-pressed={aktif}
              className={`w-full rounded-2xl border p-4 text-left text-sm font-medium transition-all duration-200 ease-[var(--ease-apple)] motion-reduce:transition-none ${
                aktif
                  ? "border-teal-600 bg-teal-50 text-teal-800 shadow-sm"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {opt.etiket}
            </button>
          );
        })}
      </div>
    </div>
  );
}
