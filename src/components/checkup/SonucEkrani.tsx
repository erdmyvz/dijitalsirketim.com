"use client";

import Link from "next/link";
import type { CheckupState, TeshisSonucu } from "@/lib/checkup/types";
import { skorHesapla } from "@/lib/checkup/scoring";
import SkorGostergesi from "./sonuc/SkorGostergesi";
import FonksiyonCubuklari from "./sonuc/FonksiyonCubuklari";
import KatmanKirilimi from "./sonuc/KatmanKirilimi";
import AiTeshisKarti from "./sonuc/AiTeshisKarti";
import KaydetKarti from "./sonuc/KaydetKarti";
import { useAiTeshis } from "./useAiTeshis";

type Props =
  // Canlı sihirbaz: AI teşhis burada bir kez çekilir, kaydet kartı
  // gösterilir.
  | { state: CheckupState; gecmis?: false }
  // Geçmiş karne görünümü (/hesap/karne/[id]): teşhis zaten Supabase'de
  // kayıtlı — tekrar API çağrısı yapılmaz, kaydet kartı gösterilmez.
  | { state: CheckupState; gecmis: true; kayitliTeshis: TeshisSonucu | null };

export default function SonucEkrani(props: Props) {
  const { state } = props;
  const sonuc = skorHesapla(state);
  const kirmiziBolgeIdleri = new Set(sonuc.kirmiziBolge.map((f) => f.id));

  // Hook'lar koşulsuz çağrılmalı: geçmiş görünümde `state` yerine null
  // geçilir, hook hiçbir istek atmaz ve sonucu kullanılmaz.
  const canliTeshisDurumu = useAiTeshis(props.gecmis ? null : state);
  const teshisDurumu = props.gecmis
    ? props.kayitliTeshis
      ? ({ tip: "hazir", veri: props.kayitliTeshis } as const)
      : ({ tip: "hata" } as const)
    : canliTeshisDurumu;

  return (
    <div>
      <div className="text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-teal-600">
          DİJİTAL SAĞLIK KARNESİ
        </span>
        <h1 className="mt-1.5 text-2xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-3xl">
          {state.isletmeAdi ? `${state.isletmeAdi} için sonuçlar hazır` : "Sonuçlarınız hazır"}
        </h1>
      </div>

      <div className="mt-8 flex justify-center">
        <SkorGostergesi
          yuzde={sonuc.skorYuzde}
          toplamPuan={sonuc.toplamPuan}
          maksimumPuan={sonuc.maksimumPuan}
        />
      </div>

      <div className="mt-10">
        <p className="mb-3 text-sm font-semibold text-slate-900">
          7 fonksiyon skoru
        </p>
        <FonksiyonCubuklari
          fonksiyonlar={sonuc.fonksiyonlar}
          kirmiziBolgeIdleri={kirmiziBolgeIdleri}
        />
      </div>

      <div className="mt-8 rounded-[24px] border border-slate-200 bg-white p-5">
        <KatmanKirilimi katmanlar={sonuc.katmanlar} />
      </div>

      <div className="mt-8">
        <AiTeshisKarti durum={teshisDurumu} />
      </div>

      {!props.gecmis && (
        <div className="mt-6">
          <KaydetKarti state={state} teshisDurumu={teshisDurumu} />
        </div>
      )}

      <div className="mt-10 rounded-[28px] bg-slate-900 p-6 text-center sm:p-8">
        <p className="text-lg font-semibold text-white">
          Karne teşhis koydu. Tedavi planı sırada.
        </p>
        <p className="mt-1.5 text-sm text-slate-300">
          Kırmızı bölgeyi kapatacak kişiselleştirilmiş reçete için ücretli
          teşhis görüşmesine başvurun.
        </p>
        <Link
          href="/#teklif"
          className="mt-5 inline-flex items-center justify-center rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition-transform duration-300 ease-[var(--ease-apple)] hover:scale-[1.02] active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:scale-100 sm:text-base"
        >
          Tam Teşhis Raporu ve Tedavi Planı için Başvur
        </Link>
      </div>
    </div>
  );
}
