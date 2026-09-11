"use client";

import { useEffect, useRef, useState } from "react";
import type { CheckupSonuc, SkorSeviyesi } from "@/lib/checkup/types";
import { IconStethoscope } from "./icons";

// Seviye renkleri sitenin her yerinde aynı: kırmızı/sarı/yeşil.
// Rengin TEK başına anlam taşımasına izin verilmiyor — her satırda
// puan da ("1/6") yazıyor, çünkü renk körlüğü olan bir ziyaretçi
// yalnızca dolgu rengine bakarak ayırt edemez.
const CUBUK_RENGI: Record<SkorSeviyesi, string> = {
  kirmizi: "bg-red-500",
  sari: "bg-amber-500",
  yesil: "bg-emerald-500",
};

const HALKA_UZUNLUGU = 2 * Math.PI * 52;

function hareketAzaltilsinMi() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Dijital Sağlık Karnesi'nin görsel özeti: skor halkası + 7 fonksiyonun
 * puan çubukları.
 *
 * Ziyaretçi kaydırıp görselin üzerine geldiğinde halka dolar, çubuklar
 * uzar ve skor sayar. Hareket, dikkat çekmek için değil ölçümün
 * "yapılıyor" hissini vermek için — `prefers-reduced-motion` açıksa
 * her şey doğrudan son hâliyle görünür.
 *
 * `sonuc` dışarıdan verilir: ana sayfada örnek karneden, ileride
 * kullanıcının kendi karnesinden beslenebilir.
 */
export default function KarneGorseli({
  sonuc,
  baslik = "Örnek Dijital Sağlık Karnesi",
  altBaslik = "Check-up sonunda gördüğünüz ekran",
  className = "",
}: {
  sonuc: CheckupSonuc;
  baslik?: string;
  altBaslik?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [aktif, setAktif] = useState(hareketAzaltilsinMi);
  const [sayac, setSayac] = useState(() =>
    hareketAzaltilsinMi() ? sonuc.skorYuzde : 0,
  );

  // Görünür alana girince animasyonu bir kez başlat.
  useEffect(() => {
    if (hareketAzaltilsinMi()) return;
    const el = ref.current;
    if (!el) return;

    const gozlemci = new IntersectionObserver(
      ([giris]) => {
        if (giris.isIntersecting) {
          setAktif(true);
          gozlemci.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    gozlemci.observe(el);
    return () => gozlemci.disconnect();
  }, []);

  // Skor sayacı. CSS ile yapılamıyor (metin içeriği değişiyor), bu yüzden
  // rAF ile; çubuk ve halka ise saf CSS geçişi.
  useEffect(() => {
    if (!aktif || hareketAzaltilsinMi()) return;
    const sure = 1100;
    let baslangic: number | null = null;
    let kare = 0;

    const adim = (zaman: number) => {
      baslangic ??= zaman;
      const oran = Math.min((zaman - baslangic) / sure, 1);
      // ease-out: hızlı başlar, yumuşak biter (--ease-apple ile aynı his)
      const yumusak = 1 - Math.pow(1 - oran, 3);
      setSayac(Math.round(sonuc.skorYuzde * yumusak));
      if (oran < 1) kare = requestAnimationFrame(adim);
    };

    kare = requestAnimationFrame(adim);
    return () => cancelAnimationFrame(kare);
  }, [aktif, sonuc.skorYuzde]);

  return (
    <div
      ref={ref}
      className={`rounded-[28px] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-900/10 ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-dashed border-slate-200 pb-4">
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-teal-50 text-teal-600">
          <IconStethoscope className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900">{baslik}</p>
          <p className="text-xs text-slate-400">{altBaslik}</p>
        </div>
      </div>

      {/* Skor halkası */}
      <div className="mt-5 flex items-center gap-5">
        <div className="relative h-[120px] w-[120px] flex-none">
          <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              className="text-slate-100"
            />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
              className="text-teal-600 transition-[stroke-dashoffset] duration-[1200ms] ease-[var(--ease-apple)] motion-reduce:transition-none"
              strokeDasharray={HALKA_UZUNLUGU}
              strokeDashoffset={
                aktif
                  ? HALKA_UZUNLUGU * (1 - sonuc.skorYuzde / 100)
                  : HALKA_UZUNLUGU
              }
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-semibold tracking-[-0.02em] text-slate-900 tabular-nums">
              {sayac}
            </span>
            <span className="text-[11px] text-slate-400">/ 100</span>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Dijital sağlık skoru
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
            7 fonksiyon · 3 katman · 21 kontrol noktası
          </p>
        </div>
      </div>

      {/* Fonksiyon çubukları */}
      <ul className="mt-5 space-y-2.5">
        {sonuc.fonksiyonlar.map((f, i) => (
          <li key={f.id} className="flex items-center gap-3">
            <span className="w-[104px] flex-none truncate text-xs text-slate-600">
              {f.baslik}
            </span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
              <span
                className={`block h-full rounded-full transition-[width] duration-700 ease-[var(--ease-apple)] motion-reduce:transition-none ${CUBUK_RENGI[f.seviye]}`}
                style={{
                  width: aktif ? `${(f.puan / 6) * 100}%` : "0%",
                  transitionDelay: aktif ? `${200 + i * 90}ms` : "0ms",
                }}
              />
            </span>
            <span className="w-8 flex-none text-right text-[11px] tabular-nums text-slate-400">
              {f.puan}/6
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-5 rounded-2xl bg-red-50 p-3 text-xs leading-relaxed text-red-800">
        <span className="font-semibold">Kırmızı bölge:</span>{" "}
        {sonuc.kirmiziBolge.map((f) => f.baslik).join(", ")} — tedavi
        buradan başlar, çünkü en çok kaybettiren fonksiyon bu.
      </p>
    </div>
  );
}
