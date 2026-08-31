import { CALISAN_SAYILARI, type CalisanSayisi } from "@/data/questions";
import AdimBaslik from "./AdimBaslik";

export default function CalisanSayisiAdimi({
  secili,
  onSec,
}: {
  secili: CalisanSayisi | null;
  onSec: (deger: CalisanSayisi) => void;
}) {
  return (
    <div>
      <AdimBaslik kicker="EKİP" baslik="Kaç kişi çalışıyorsunuz?" />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {CALISAN_SAYILARI.map((opt) => {
          const aktif = secili === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSec(opt.id)}
              aria-pressed={aktif}
              className={`rounded-[20px] border p-5 text-center text-sm font-semibold transition-all duration-200 ease-[var(--ease-apple)] motion-reduce:transition-none ${
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
