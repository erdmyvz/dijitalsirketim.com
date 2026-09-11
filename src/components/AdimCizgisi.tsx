"use client";

import { useEffect, useRef, useState } from "react";

function hareketAzaltilsinMi() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * 4 adımlı tedavi modelinin altındaki bağlayıcı çizgi.
 *
 * Bölüm görünür alana girdiğinde soldan sağa çizilir — tedavi yolunun
 * "izlendiği" hissini verir. Kaydırma konumuna bağlı sürekli bir hesap
 * yapmıyoruz: her kaydırma karesinde ölçüm yapmak mobilde takılmaya yol
 * açıyor; bir kereye mahsus çizim hem daha akıcı hem de aynı anlamı
 * taşıyor.
 *
 * `prefers-reduced-motion` açıksa çizgi doğrudan tam hâliyle durur.
 */
export default function AdimCizgisi({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [cizildi, setCizildi] = useState(hareketAzaltilsinMi);

  useEffect(() => {
    if (hareketAzaltilsinMi()) return;
    const el = ref.current;
    if (!el) return;

    const gozlemci = new IntersectionObserver(
      ([giris]) => {
        if (giris.isIntersecting) {
          setCizildi(true);
          gozlemci.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    gozlemci.observe(el);
    return () => gozlemci.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`overflow-hidden bg-slate-700 ${className}`}
    >
      <div
        className="h-full bg-teal-400 transition-[width] duration-[1600ms] ease-[var(--ease-apple)] motion-reduce:transition-none"
        style={{ width: cizildi ? "100%" : "0%" }}
      />
    </div>
  );
}
