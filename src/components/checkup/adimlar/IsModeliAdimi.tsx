import { IS_MODELLERI, type IsModeli } from "@/data/questions";
import AdimBaslik from "./AdimBaslik";

export default function IsModeliAdimi({
  secili,
  onSec,
}: {
  secili: IsModeli | null;
  onSec: (deger: IsModeli) => void;
}) {
  return (
    <div>
      <AdimBaslik kicker="İŞ MODELİ" baslik="İşletmeniz hangisine en çok benziyor?" />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {IS_MODELLERI.map((model) => {
          const aktif = secili === model.id;
          return (
            <button
              key={model.id}
              type="button"
              onClick={() => onSec(model.id)}
              aria-pressed={aktif}
              className={`rounded-[20px] border p-5 text-left transition-all duration-200 ease-[var(--ease-apple)] motion-reduce:transition-none ${
                aktif
                  ? "border-teal-600 bg-teal-50 shadow-sm"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span
                className={`block text-base font-semibold ${
                  aktif ? "text-teal-800" : "text-slate-900"
                }`}
              >
                {model.baslik}
              </span>
              <span className="mt-1 block text-sm text-slate-500">
                {model.aciklama}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
