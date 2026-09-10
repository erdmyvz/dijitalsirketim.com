import type { ReactNode } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

// /tedavi altındaki tüm sayfaların ortak kabuğu: sade üst bar (markaya
// dönüş + hesap), kırıntı yolu (breadcrumb) ve altta site geneli Footer.
export default function TedaviKabugu({
  kirintiYolu,
  children,
}: {
  /** Üstte gösterilecek kırıntı yolu — sonuncusu aktif sayfadır. */
  kirintiYolu?: { etiket: string; href?: string }[];
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 text-base text-white">
              🩺
            </span>
            <span className="text-base font-semibold tracking-tight text-slate-900">
              dijital<span className="text-teal-600">şirketim</span>
            </span>
          </Link>
          <Link
            href="/hesap"
            className="text-sm font-medium text-slate-400 transition-colors duration-200 ease-[var(--ease-apple)] hover:text-teal-700"
          >
            Hesabım
          </Link>
        </div>
      </header>

      {kirintiYolu && kirintiYolu.length > 0 && (
        <nav
          aria-label="Kırıntı yolu"
          className="border-b border-slate-200 bg-white"
        >
          <ol className="mx-auto flex max-w-5xl flex-wrap items-center gap-1.5 px-4 py-2.5 text-xs text-slate-400 sm:px-6">
            {kirintiYolu.map((parca, i) => (
              <li key={parca.etiket} className="flex items-center gap-1.5">
                {i > 0 && <span aria-hidden="true">/</span>}
                {parca.href ? (
                  <Link
                    href={parca.href}
                    className="transition-colors duration-200 ease-[var(--ease-apple)] hover:text-teal-700"
                  >
                    {parca.etiket}
                  </Link>
                ) : (
                  <span className="font-medium text-slate-600">
                    {parca.etiket}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        {children}
      </main>

      <Footer />
    </div>
  );
}
