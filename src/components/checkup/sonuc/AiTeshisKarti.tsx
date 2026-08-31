"use client";

import { useEffect, useState } from "react";
import type { CheckupState, TeshisSonucu } from "@/lib/checkup/types";
import { IconHeartPulse, IconMessageCircle } from "@/components/icons";

const WHATSAPP_NUMARASI = "905319956930";

type Durum =
  | { tip: "yukleniyor" }
  | { tip: "hazir"; veri: TeshisSonucu }
  | { tip: "hata" };

export default function AiTeshisKarti({ state }: { state: CheckupState }) {
  const [durum, setDurum] = useState<Durum>({ tip: "yukleniyor" });

  useEffect(() => {
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
    // kartın kendisi mount olduğunda bir kez çağrılsın istiyoruz.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="rounded-[28px] border border-teal-100 bg-gradient-to-br from-teal-50 to-white p-6 sm:p-8">
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-teal-600 text-white">
          <IconHeartPulse
            className={`h-4.5 w-4.5 ${durum.tip === "yukleniyor" ? "animate-heartbeat" : ""}`}
            strokeWidth={2}
          />
        </span>
        <div>
          <p className="text-sm font-semibold text-slate-900">
            Yapay Zekâ Ön Teşhisi
          </p>
          <p className="text-xs text-slate-500">Dijital Şirketim &middot; Şirket Doktoru</p>
        </div>
      </div>

      {durum.tip === "yukleniyor" && (
        <div className="mt-5 space-y-2">
          <p className="text-sm text-slate-500">
            Cevaplarınız inceleniyor, kök problem taranıyor...
          </p>
          <div className="h-2 w-3/4 animate-pulse rounded-full bg-teal-100" />
          <div className="h-2 w-1/2 animate-pulse rounded-full bg-teal-100" />
        </div>
      )}

      {durum.tip === "hata" && (
        <div className="animate-apple-in mt-5">
          <p className="text-sm leading-relaxed text-slate-600">
            Yapay zekâ ön teşhisi şu anda hazırlanamadı. Bu sorun değil —
            Dijital Sağlık Karneniz zaten yukarıda hazır. Kök problemi
            birlikte konuşmak isterseniz doğrudan yazabilirsiniz:
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMARASI}?text=${encodeURIComponent(
              "Merhaba, Dijital Check-Up sonucum hakkında konuşmak istiyorum.",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-300 ease-[var(--ease-apple)] hover:border-teal-600 hover:text-teal-700"
          >
            <IconMessageCircle className="h-4 w-4" strokeWidth={2} />
            WhatsApp&apos;tan Yazın
          </a>
        </div>
      )}

      {durum.tip === "hazir" && (
        <div className="animate-apple-in mt-5 space-y-4 text-sm leading-relaxed text-slate-700">
          <p>{durum.veri.ozet}</p>

          <div className="rounded-2xl border border-teal-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-600">
              Muhtemel Kök Vida: {durum.veri.kok_vida}
            </p>
            <p className="mt-1.5 text-slate-700">{durum.veri.gerekce}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Bu Hafta İlk Yardım
            </p>
            <ul className="mt-2 space-y-2">
              {durum.veri.ilk_yardim.map((madde, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-700">
                    {i + 1}
                  </span>
                  <span>{madde}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs italic text-slate-500">{durum.veri.kapanis}</p>
        </div>
      )}
    </div>
  );
}
