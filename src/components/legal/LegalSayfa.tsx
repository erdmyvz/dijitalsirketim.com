import type { ReactNode } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

// KVKK ve Gizlilik sayfalarının ortak kabuğu: sade üst bar (markaya
// dönüş), başlık + güncelleme tarihi, düz metin içerik için okunabilir
// tipografi birincil öğeleri (aşağıda), ve sayfa sonunda site geneli
// Footer — bu sayfalar footer'daki bağlantılardan erişildiği için
// ziyaretçi buradan da siteye geri dönebilsin.
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
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-2xl items-center gap-2 px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 text-base text-white">
              🩺
            </span>
            <span className="text-base font-semibold tracking-tight text-slate-900">
              dijital<span className="text-teal-600">şirketim</span>
            </span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-3xl">
          {baslik}
        </h1>
        <p className="mt-2 text-sm text-slate-400">
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
    <h2 className="mt-10 text-lg font-semibold tracking-[-0.01em] text-slate-900 first:mt-0">
      {children}
    </h2>
  );
}

export function Metin({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
      {children}
    </p>
  );
}

export function Liste({ children }: { children: ReactNode }) {
  return (
    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-slate-600">
      {children}
    </ul>
  );
}
