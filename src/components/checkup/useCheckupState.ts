"use client";

import { useCallback, useEffect, useState } from "react";
import { BOS_CHECKUP_STATE, type CheckupState } from "@/lib/checkup/types";
import { ADIM_SIRASI, type CheckupAdimi } from "@/lib/checkup/steps";

const STORAGE_KEY = "dijitalsirketim-checkup-v1";

type Depolanan = {
  state: CheckupState;
  adim: CheckupAdimi;
};

function depodanOku(): Depolanan | null {
  try {
    const ham = window.localStorage.getItem(STORAGE_KEY);
    if (!ham) return null;
    const ayristirilan = JSON.parse(ham) as Depolanan;
    // Adım sırası ileride değişirse (soru bankası güncellenirse) geçersiz
    // bir adımda takılı kalmasın.
    if (!ADIM_SIRASI.includes(ayristirilan.adim)) {
      return { state: ayristirilan.state, adim: ADIM_SIRASI[0] };
    }
    return ayristirilan;
  } catch {
    return null;
  }
}

/**
 * Check-Up sihirbazının tüm state'ini yönetir ve localStorage'a
 * yansıtır — kullanıcı sekmeyi kapatıp geri dönse, ya da sayfayı
 * yenilese bile kaldığı yerden devam eder ("veritabanı yok, cevaplar
 * tarayıcı state'inde tutulur" kararı).
 *
 * Bu hook yalnızca next/dynamic(..., { ssr: false }) ile yüklenen
 * CheckupWizard içinde kullanılır — yani her zaman yalnızca tarayıcıda
 * çalışır. Bu sayede localStorage'ı doğrudan lazy state initializer'da
 * okuyabiliyoruz: sunucu tarafı render hiç olmadığı için okunan değerle
 * ilk render arasında bir hidrasyon uyuşmazlığı riski yok.
 */
export function useCheckupState() {
  const [depolananIlk] = useState(depodanOku);
  const [state, setState] = useState<CheckupState>(
    () => depolananIlk?.state ?? BOS_CHECKUP_STATE,
  );
  const [adim, setAdim] = useState<CheckupAdimi>(
    () => depolananIlk?.adim ?? ADIM_SIRASI[0],
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ state, adim } satisfies Depolanan),
      );
    } catch {
      // localStorage kapalıysa (gizli sekme vb.) sessizce yok say —
      // sihirbaz yine de bellek içi state ile çalışmaya devam eder.
    }
  }, [state, adim]);

  const guncelle = useCallback((kismi: Partial<CheckupState>) => {
    setState((onceki) => ({ ...onceki, ...kismi }));
  }, []);

  const cevapVer = useCallback((soruId: string, deger: 0 | 1 | 2) => {
    setState((onceki) => ({
      ...onceki,
      cevaplar: { ...onceki.cevaplar, [soruId]: deger },
    }));
  }, []);

  const sifirla = useCallback(() => {
    setState(BOS_CHECKUP_STATE);
    setAdim(ADIM_SIRASI[0]);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // yok say
    }
  }, []);

  return { state, guncelle, cevapVer, adim, setAdim, sifirla };
}
