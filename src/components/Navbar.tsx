"use client";

import { useEffect, useState } from "react";

const BAGLANTILAR = [
  { href: "#ajanlar", etiket: "Ajanlar" },
  { href: "#moduller", etiket: "Modüller" },
  { href: "#program", etiket: "Program" },
  { href: "#sss", etiket: "SSS" },
];

/**
 * Üst çubuk. Sayfa kaydırıldığında zemini koyulaşıp altına ince bir
 * çizgi gelir — yoksa koyu tema üzerinde yüzen metin gibi duruyor.
 */
export default function Navbar() {
  const [kaydi, setKaydi] = useState(false);

  useEffect(() => {
    const olcum = () => setKaydi(window.scrollY > 12);
    olcum();
    window.addEventListener("scroll", olcum, { passive: true });
    return () => window.removeEventListener("scroll", olcum);
  }, []);

  return (
    <header
      className={`sticky z-50 transition-colors duration-300 ${
        kaydi
          ? "border-b border-cizgi bg-zemin/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
      style={{ top: "env(safe-area-inset-top, 0px)" }}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <a href="#ust" className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500 text-[13px] font-bold text-white">
            D
          </span>
          <span className="text-[15px] font-semibold tracking-[-0.01em]">
            Dijital Şirketim
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {BAGLANTILAR.map((b) => (
            <a
              key={b.href}
              href={b.href}
              className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
            >
              {b.etiket}
            </a>
          ))}
        </div>

        <a
          href="#gorusme"
          className="flex-none rounded-full bg-indigo-500 px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-indigo-400 sm:px-5 sm:text-sm"
        >
          Görüşme ayarla
        </a>
      </nav>
    </header>
  );
}
