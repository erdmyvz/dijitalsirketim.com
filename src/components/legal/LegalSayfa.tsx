import type { ReactNode } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

/**
 * KVKK ve Gizlilik sayfalarının ortak kabuğu: sade üst bar (markaya
 * dönüş), başlık + güncelleme tarihi, okunaklı düz metin tipografisi ve
 * site geneli footer. Site koyu temalı olduğu için bu sayfalar da koyu.
 */
export default function LegalSayfa({
  baslik,
  guncellemeTarihi,
  children,
}: {
  baslik: string;
  guncellemeTarihi: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-zemin">
      <header className="border-b border-cizgi">
        <div className="mx-auto flex max-w-2xl items-center px-5 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500 text-[13px] font-bold text-white">
              D
            </span>
            <span className="text-[15px] font-semibold tracking-[-0.01em] text-zinc-100">
              Dijital Şirketim
            </span>
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-12 sm:px-6 sm:py-16">
        <h1 className="text-2xl font-bold tracking-[-0.025em] text-zinc-100 sm:text-3xl">
          {baslik}
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Son güncelleme: {guncellemeTarihi}
        </p>

        <div className="mt-8">{children}</div>
      </main>

      <Footer />
    </div>
  );
}

export function Bolum({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-10 text-lg font-semibold tracking-[-0.015em] text-zinc-100 first:mt-0">
      {children}
    </h2>
  );
}

export function Metin({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 font-serif text-[15px] leading-relaxed text-zinc-400">
      {children}
    </p>
  );
}

export function Liste({ children }: { children: ReactNode }) {
  return (
    <ul className="mt-3 list-disc space-y-1.5 pl-5 font-serif text-[15px] leading-relaxed text-zinc-400 marker:text-zinc-600">
      {children}
    </ul>
  );
}

export function Baglanti({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a href={href} className="text-indigo-400 underline underline-offset-2 hover:text-indigo-300">
      {children}
    </a>
  );
}
