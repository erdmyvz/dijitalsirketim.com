import type { CheckupState } from "@/lib/checkup/types";
import AdimBaslik from "./AdimBaslik";

export default function ProblemAdimi({
  state,
  guncelle,
}: {
  state: CheckupState;
  guncelle: (kismi: Partial<CheckupState>) => void;
}) {
  return (
    <div>
      <AdimBaslik
        kicker="SON SORU"
        baslik="Sizi en çok yoran problem nedir?"
        aciklama="1-2 cümleyle yazın — yapay zekâ ön teşhisi bu cevaba göre şekillenecek."
      />

      <textarea
        value={state.problemMetni}
        onChange={(e) => guncelle({ problemMetni: e.target.value })}
        rows={5}
        maxLength={600}
        className="w-full rounded-xl border border-slate-300 px-3.5 py-3 text-sm text-slate-900 outline-none transition-all duration-200 ease-[var(--ease-apple)] focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
        placeholder="Örn: Reklam veriyorum ama dönüşüm çok düşük, nedenini bilmiyorum..."
      />
      <p className="mt-1.5 text-right text-xs text-slate-400">
        {state.problemMetni.length}/600
      </p>
    </div>
  );
}
