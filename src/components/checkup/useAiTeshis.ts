"use client";

import { useEffect, useState } from "react";
import type { CheckupState, TeshisSonucu } from "@/lib/checkup/types";

export type AiTeshisDurumu =
  | { tip: "yukleniyor" }
  | { tip: "hazir"; veri: TeshisSonucu }
  | { tip: "hata" };

/**
 * Canlı sihirbazda /api/teshis'i bir kez çağırır. `state` null verilirse
 * (geçmiş bir karne görüntülenirken — o zaman zaten kaydedilmiş teşhis
 * kullanılır) hiçbir istek atmadan "yukleniyor" durumunda kalır; bu
 * durumda çağıran taraf dönen değeri kullanmaz.
 */
export function useAiTeshis(state: CheckupState | null): AiTeshisDurumu {
  const [durum, setDurum] = useState<AiTeshisDurumu>({ tip: "yukleniyor" });

  useEffect(() => {
    if (!state) return;
    let iptalEdildi = false;

    fetch("/api/teshis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("İstek başarısız");
        const veri = (await res.json()) as TeshisSonucu;
        if (!iptalEdildi) setDurum({ tip: "hazir", veri });
      })
      .catch(() => {
        if (!iptalEdildi) setDurum({ tip: "hata" });
      });

    return () => {
      iptalEdildi = true;
    };
    // state, sonuç ekranına gelindiğinde artık değişmiyor — yalnızca
    // hook mount olduğunda bir kez çağrılsın istiyoruz.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return durum;
}
