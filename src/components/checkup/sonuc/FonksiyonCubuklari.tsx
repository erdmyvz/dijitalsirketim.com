import type { FonksiyonSonucu, SkorSeviyesi } from "@/lib/checkup/types";
import { IconAlertTriangle } from "@/components/icons";

const SEVIYE_STIL: Record<SkorSeviyesi, { cubuk: string; rozet: string; etiket: string }> = {
  kirmizi: {
    cubuk: "bg-red-600",
    rozet: "bg-red-50 text-red-700 ring-1 ring-red-200",
    etiket: "Kırmızı",
  },
  sari: {
    cubuk: "bg-amber-500",
    rozet: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    etiket: "Sarı",
  },
  yesil: {
    cubuk: "bg-teal-600",
    rozet: "bg-teal-50 text-teal-700 ring-1 ring-teal-200",
    etiket: "Yeşil",
  },
};

export default function FonksiyonCubuklari({
  fonksiyonlar,
  kirmiziBolgeIdleri,
}: {
  fonksiyonlar: FonksiyonSonucu[];
  kirmiziBolgeIdleri: Set<string>;
}) {
  return (
    <div className="space-y-3">
      {fonksiyonlar.map((f) => {
        const stil = SEVIYE_STIL[f.seviye];
        const kirmiziBolgede = kirmiziBolgeIdleri.has(f.id);
        return (
          <div
            key={f.id}
            className={`rounded-2xl border p-4 ${
              kirmiziBolgede
                ? "border-red-200 bg-red-50/40"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-slate-900">
                  {f.no}. {f.baslik}
                </span>
                {kirmiziBolgede && (
                  <span className="inline-flex flex-none items-center gap-1 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    <IconAlertTriangle className="h-3 w-3" strokeWidth={2.5} />
                    Kırmızı Bölge
                  </span>
                )}
              </div>
              <span className={`flex-none rounded-full px-2.5 py-0.5 text-xs font-semibold ${stil.rozet}`}>
                {f.puan}/6
              </span>
            </div>
            <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full transition-[width] duration-700 ease-[var(--ease-apple)] motion-reduce:transition-none ${stil.cubuk}`}
                style={{ width: `${(f.puan / 6) * 100}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
