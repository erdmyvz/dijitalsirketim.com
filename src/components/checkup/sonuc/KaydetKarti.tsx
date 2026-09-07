"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/browser";
import type { CheckupState } from "@/lib/checkup/types";
import type { AiTeshisDurumu } from "../useAiTeshis";

// Supabase yapılandırılmamışsa (yerel geliştirme, env eksik) bu kart
// tamamen gizlenir — /api/teshis'in GEMINI_API_KEY yokken WhatsApp
// yedeğine düşmesiyle aynı "sessizce devre dışı kal" mantığı.
const SUPABASE_YAPILANDIRILDI = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

type KayitDurumu =
  | { tip: "kontrol-ediliyor" }
  | { tip: "giris-yapilmamis" }
  | { tip: "kaydediliyor" }
  | { tip: "kaydedildi" }
  | { tip: "hata" };

export default function KaydetKarti({
  state,
  teshisDurumu,
}: {
  state: CheckupState;
  teshisDurumu: AiTeshisDurumu;
}) {
  const [durum, setDurum] = useState<KayitDurumu>({ tip: "kontrol-ediliyor" });

  useEffect(() => {
    if (!SUPABASE_YAPILANDIRILDI) return;
    // AI teşhis sonuçlanmadan kaydetmiyoruz ki karneyle birlikte
    // (varsa) teşhis de tek seferde, eksiksiz kaydedilsin.
    if (teshisDurumu.tip === "yukleniyor") return;

    let iptal = false;
    const supabase = createClient();

    async function calistir() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (iptal) return;

      if (!session) {
        setDurum({ tip: "giris-yapilmamis" });
        return;
      }

      setDurum({ tip: "kaydediliyor" });
      const { error } = await supabase.from("karneler").insert({
        user_id: session.user.id,
        isletme_adi: state.isletmeAdi || null,
        sektor: state.sektor || null,
        is_modeli: state.isModeli,
        calisan_sayisi: state.calisanSayisi,
        ciro_araligi: state.ciroAraligi,
        problem_metni: state.problemMetni || null,
        cevaplar: state.cevaplar,
        ai_teshis: teshisDurumu.tip === "hazir" ? teshisDurumu.veri : null,
      });
      if (iptal) return;
      setDurum(error ? { tip: "hata" } : { tip: "kaydedildi" });
    }

    calistir();

    return () => {
      iptal = true;
    };
    // Yalnızca teşhis "yükleniyor"dan çıktığında (hazır/hata) bir kez
    // çalışsın istiyoruz.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teshisDurumu.tip]);

  if (!SUPABASE_YAPILANDIRILDI) return null;

  if (durum.tip === "kontrol-ediliyor" || durum.tip === "kaydediliyor") {
    return (
      <div className="rounded-[24px] border border-slate-200 bg-white p-5 text-sm text-slate-400">
        {durum.tip === "kaydediliyor" ? "Kaydediliyor..." : "Yükleniyor..."}
      </div>
    );
  }

  if (durum.tip === "giris-yapilmamis") {
    return (
      <div className="rounded-[24px] border border-teal-200 bg-teal-50/50 p-5 sm:p-6">
        <p className="text-sm font-semibold text-slate-900">
          Sonuçlarını kaydet, ilerlemeni takip et
        </p>
        <p className="mt-1 text-sm text-slate-600">
          Ücretsiz bir hesap oluştur; bu karne panelinde saklansın, her
          check-up&apos;ta gelişimini karşılaştır.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/hesap/kayit?sonraki=/check-up"
            className="inline-flex items-center justify-center rounded-full bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition-all duration-300 ease-[var(--ease-apple)] hover:scale-[1.02] active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:scale-100"
          >
            Hesap Oluştur ve Kaydet
          </Link>
          <Link
            href="/hesap/giris?sonraki=/check-up"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 transition-colors duration-200 ease-[var(--ease-apple)] hover:border-teal-600 hover:text-teal-700"
          >
            Zaten hesabım var
          </Link>
        </div>
      </div>
    );
  }

  if (durum.tip === "hata") {
    return (
      <div className="rounded-[24px] border border-slate-200 bg-white p-5 text-sm text-slate-500">
        Sonuçların kaydedilemedi. Sayfayı yenileyip tekrar deneyebilirsin.
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-[24px] border border-teal-200 bg-teal-50/50 p-5">
      <p className="text-sm font-medium text-teal-800">
        ✓ Kaydedildi — bu karne panelinde saklanıyor.
      </p>
      <Link
        href="/hesap"
        className="flex-none text-sm font-semibold text-teal-700 hover:underline"
      >
        Panelime Git
      </Link>
    </div>
  );
}
