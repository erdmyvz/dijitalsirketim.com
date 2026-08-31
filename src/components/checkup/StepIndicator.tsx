export default function StepIndicator({
  mevcutIndex,
  toplam,
}: {
  mevcutIndex: number; // 0 tabanlı
  toplam: number;
}) {
  const yuzde = Math.round(((mevcutIndex + 1) / toplam) * 100);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs font-medium text-slate-500">
        <span>
          Adım {Math.min(mevcutIndex + 1, toplam)} / {toplam}
        </span>
        <span>%{yuzde}</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-teal-600 transition-[width] duration-500 ease-[var(--ease-apple)] motion-reduce:transition-none"
          style={{ width: `${yuzde}%` }}
        />
      </div>
    </div>
  );
}
