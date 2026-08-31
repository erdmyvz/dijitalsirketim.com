import type { KatmanSonucu } from "@/lib/checkup/types";

export default function KatmanKirilimi({ katmanlar }: { katmanlar: KatmanSonucu[] }) {
  return (
    <div>
      <p className="text-sm font-semibold text-slate-900">
        Süreç · Sistem · Yapı kırılımı
      </p>
      <p className="mt-1 text-xs text-slate-500">
        Ölçemediğin performansı geliştiremezsin — üç katmandan hangisi
        geride kaldığını gösterir.
      </p>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {katmanlar.map((k) => {
          const yuzde = Math.round((k.puan / k.maksimum) * 100);
          return (
            <div
              key={k.katman}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center"
            >
              <p className="text-2xl font-semibold tracking-[-0.02em] text-slate-900">
                {k.puan}
                <span className="text-sm font-normal text-slate-400">
                  /{k.maksimum}
                </span>
              </p>
              <p className="mt-1 text-xs font-medium text-slate-500">
                {k.etiket}
              </p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-teal-600 transition-[width] duration-700 ease-[var(--ease-apple)] motion-reduce:transition-none"
                  style={{ width: `${yuzde}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
