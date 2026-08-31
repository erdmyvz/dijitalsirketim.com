const RENK: Record<"kirmizi" | "sari" | "yesil", { halka: string; metin: string }> = {
  kirmizi: { halka: "#DC2626", metin: "text-red-600" },
  sari: { halka: "#D97706", metin: "text-amber-600" },
  yesil: { halka: "#0D9488", metin: "text-teal-600" },
};

function genelSeviye(yuzde: number): "kirmizi" | "sari" | "yesil" {
  if (yuzde < 34) return "kirmizi";
  if (yuzde < 67) return "sari";
  return "yesil";
}

export default function SkorGostergesi({
  yuzde,
  toplamPuan,
  maksimumPuan,
}: {
  yuzde: number;
  toplamPuan: number;
  maksimumPuan: number;
}) {
  const seviye = genelSeviye(yuzde);
  const renk = RENK[seviye];
  const r = 54;
  const cevre = 2 * Math.PI * r;
  const doluluk = (yuzde / 100) * cevre;

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-40 w-40 sm:h-48 sm:w-48">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle
            cx="60"
            cy="60"
            r={r}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="12"
          />
          <circle
            cx="60"
            cy="60"
            r={r}
            fill="none"
            stroke={renk.halka}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${doluluk} ${cevre}`}
            className="transition-[stroke-dasharray] duration-1000 ease-[var(--ease-apple)] motion-reduce:transition-none"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-semibold tracking-[-0.02em] sm:text-5xl ${renk.metin}`}>
            %{yuzde}
          </span>
          <span className="mt-1 text-xs text-slate-400">
            {toplamPuan} / {maksimumPuan} puan
          </span>
        </div>
      </div>
      <p className="mt-3 text-sm font-medium text-slate-500">
        Genel Dijital Sağlık Skoru
      </p>
    </div>
  );
}
