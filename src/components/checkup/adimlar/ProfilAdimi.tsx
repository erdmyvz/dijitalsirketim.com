import type { CheckupState } from "@/lib/checkup/types";
import AdimBaslik from "./AdimBaslik";

const inputClass =
  "w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-all duration-200 ease-[var(--ease-apple)] focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10";

export default function ProfilAdimi({
  state,
  guncelle,
}: {
  state: CheckupState;
  guncelle: (kismi: Partial<CheckupState>) => void;
}) {
  return (
    <div>
      <AdimBaslik
        kicker="BAŞLARKEN"
        baslik="Önce sizi tanıyalım"
        aciklama="Bu bilgiler teşhis raporunu işletmenize özel hale getirmek için kullanılır."
      />

      <div className="space-y-4">
        <div>
          <label
            htmlFor="isletmeAdi"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            İşletme Adı
          </label>
          <input
            id="isletmeAdi"
            type="text"
            value={state.isletmeAdi}
            onChange={(e) => guncelle({ isletmeAdi: e.target.value })}
            className={inputClass}
            placeholder="İşletmenizin adı"
            autoComplete="organization"
          />
        </div>

        <div>
          <label
            htmlFor="sektor"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Sektör
          </label>
          <input
            id="sektor"
            type="text"
            value={state.sektor}
            onChange={(e) => guncelle({ sektor: e.target.value })}
            className={inputClass}
            placeholder="Örn: perakende, hizmet, üretim..."
          />
        </div>
      </div>
    </div>
  );
}
