"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * İçeriği, kullanıcı kaydırarak görünür alana getirdiğinde hafifçe
 * belirip yükselerek gösterir. Tek seferlik bir efekttir (aşağı/yukarı
 * kaydırdıkça tekrar tekrar oynamaz) ve `prefers-reduced-motion`
 * tercihine saygı duyar — ziyaretçiyi yormak yerine sayfaya ince bir
 * canlılık katmak içindir.
 */
export default function Reveal({
  children,
  className = "",
  delayMs = 0,
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Hareket azaltma tercihi varsa animasyonsuz, doğrudan görünür başlat —
  // effect içinde senkron setState çağırmak yerine lazy initial state
  // kullanıyoruz.
  const [visible, setVisible] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion()) return; // zaten görünür başladı
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delayMs}ms` : "0ms" }}
      className={`transition-all duration-700 ease-[var(--ease-apple)] motion-reduce:transition-none ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}
