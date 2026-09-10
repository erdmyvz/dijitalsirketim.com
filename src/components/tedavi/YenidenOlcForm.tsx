"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/browser";
import { CEVAP_SECENEKLERI, type CevapDegeri, type Soru } from "@/data/questions";
import type { Karne } from "@/lib/checkup/types";

type Durum = "hazir" | "kaydediliyor" | "hata";

/**
 * Modül bitiminde, modülün onardığı check-up sorularını tekrar sorar ve
 * YENİ bir karne oluşturur.
 *
 * Yeni karne = son karnenin tüm cevapları + burada değiştirilenler.
 * Böylece eski karne geçmişte olduğu gibi kalır, kullanıcı ilerlemesini
 * karşılaştırabilir ve tedavi planı (dolayısıyla aylık tutar) yeni
 * duruma göre hesaplanır.
 */
export default function YenidenOlcForm({
  sorular,
  donusYolu,
}: {
  sorular: Soru[];
  donusYolu: string;
}) {
  const router = useRouter();
  const [durum, setDurum] = useState<Durum>("hazir");
  const [hata, setHata] = useState("");
  const [cevaplar, setCevaplar] = useState<Record<string, CevapDegeri>>({});

  const hepsiCevaplandi = sorular.every((s) => cevaplar[s.id] !== undefined);

  async function kaydet() {
    setDurum("kaydediliyor");
    setHata("");

    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setDurum("hata");
      setHata("Oturumun sona ermiş. Tekrar giriş yapman gerekiyor.");
      return;
    }

    // Son karneyi al — diğer 19 sorunun cevabı oradan taşınacak.
    const { data: sonKarne, error: okumaHatasi } = await supabase
      .from("karneler")
      .select(
        "isletme_adi, sektor, is_modeli, calisan_sayisi, ciro_araligi, problem_metni, cevaplar",
      )
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle<Karne>();

    if (okumaHatasi || !sonKarne) {
      setDurum("hata");
      setHata(
        "Önceki karnen bulunamadı. Önce check-up'ı tamamlaman gerekiyor.",
      );
      return;
    }

    const { error } = await supabase.from("karneler").insert({
      user_id: session.user.id,
      isletme_adi: sonKarne.isletme_adi,
      sektor: sonKarne.sektor,
      is_modeli: sonKarne.is_modeli,
      calisan_sayisi: sonKarne.calisan_sayisi,
      ciro_araligi: sonKarne.ciro_araligi,
      problem_metni: sonKarne.problem_metni,
      cevaplar: { ...sonKarne.cevaplar, ...cevaplar },
      // AI teşhis bilinçli olarak taşınmıyor: eski teşhis yeni duruma
      // ait değil. Kullanıcı tam check-up'ı tekrarladığında yenisi
      // üretilir.
      ai_teshis: null,
    });

    if (error) {
      setDurum("hata");
      setHata("Kaydedilemedi: " + error.message);
      return;
    }

    // Panelde yeni skoru ve güncellenen aylık tutarı görsün.
    router.replace("/hesap/plan");
    router.refresh();
  }

  return (
    <div className="mt-8">
      <div className="space-y-4">
        {sorular.map((soru, i) => (
          <div
            key={soru.id}
            className="rounded-[24px] border border-slate-200 bg-white p-6"
          >
            <p className="text-sm font-medium leading-relaxed text-slate-900">
              <span className="mr-2 text-xs font-semibold text-slate-400">
                {i + 1}/{sorular.length}
              </span>
              {soru.metin}
            </p>

            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {CEVAP_SECENEKLERI.map((secenek) => {
                const secili = cevaplar[soru.id] === secenek.deger;
                return (
                  <button
                    key={secenek.deger}
                    type="button"
                    onClick={() =>
                      setCevaplar((o) => ({ ...o, [soru.id]: secenek.deger }))
                    }
                    className={`rounded-2xl border p-3 text-left transition-all duration-200 ease-[var(--ease-apple)] ${
                      secili
                        ? "border-teal-600 bg-teal-50 ring-4 ring-teal-600/10"
                        : "border-slate-200 bg-white hover:border-teal-300"
                    }`}
                  >
                    <span
                      className={`block text-sm font-semibold ${
                        secili ? "text-teal-800" : "text-slate-900"
                      }`}
                    >
                      {secenek.etiket}
                    </span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">
                      {secenek.aciklama}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {durum === "hata" && (
        <p className="animate-apple-in mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {hata}
        </p>
      )}

      <button
        type="button"
        onClick={kaydet}
        disabled={!hepsiCevaplandi || durum === "kaydediliyor"}
        className="mt-6 w-full rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition-all duration-300 ease-[var(--ease-apple)] hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {durum === "kaydediliyor"
          ? "Kaydediliyor..."
          : hepsiCevaplandi
            ? "Yeni Karnemi Oluştur"
            : "Tüm soruları cevapla"}
      </button>

      <p className="mt-4 text-center text-sm">
        <Link href={donusYolu} className="text-slate-400 hover:text-teal-700">
          Modüle geri dön
        </Link>
      </p>
    </div>
  );
}
