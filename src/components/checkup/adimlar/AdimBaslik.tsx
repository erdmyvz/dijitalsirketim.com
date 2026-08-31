export default function AdimBaslik({
  kicker,
  baslik,
  aciklama,
}: {
  kicker: string;
  baslik: string;
  aciklama?: string;
}) {
  return (
    <div className="mb-6">
      <span className="text-xs font-semibold uppercase tracking-widest text-teal-600">
        {kicker}
      </span>
      <h1 className="mt-1.5 text-2xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-3xl">
        {baslik}
      </h1>
      {aciklama && (
        <p className="mt-2 text-sm leading-relaxed text-slate-500 sm:text-base">
          {aciklama}
        </p>
      )}
    </div>
  );
}
