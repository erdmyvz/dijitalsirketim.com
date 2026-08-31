import type { CheckupState } from "@/lib/checkup/types";
import { skorHesapla } from "@/lib/checkup/scoring";

// NOT: Bu, Dijital Sağlık Karnesi'nin geçici bir sürümüdür. Skorlama
// zaten çalışıyor; renkli göstergeler, kırmızı bölge vurgusu ve AI
// teşhis kartı bir sonraki fazda eklenecek.
export default function SonucEkrani({ state }: { state: CheckupState }) {
  const sonuc = skorHesapla(state);

  return (
    <div className="text-center">
      <span className="text-xs font-semibold uppercase tracking-widest text-teal-600">
        SONUÇ
      </span>
      <h1 className="mt-1.5 text-2xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-3xl">
        Dijital Sağlık Karneniz Hazır
      </h1>
      <p className="mt-4 text-5xl font-semibold text-teal-600">
        %{sonuc.skorYuzde}
      </p>
      <p className="mt-2 text-sm text-slate-500">
        {sonuc.toplamPuan} / {sonuc.maksimumPuan} puan
      </p>
    </div>
  );
}
