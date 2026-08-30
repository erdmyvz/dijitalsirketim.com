import type { Metadata } from "next";
import DraftVersionBanner from "@/components/DraftVersionBanner";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  title: "Dijital Şirketim | Türkiye'nin Şirket Doktoru — Dijital Check-Up",
  description:
    "Ürününüz iyi ama müşteri gelmiyor mu? Dijital Şirketim, 21 kontrol noktalı Dijital Check-Up ile işletmenizin kök problemini 48 saatte teşhis eder ve size özel bir tedavi reçetesi sunar. Kurucu: Erdem Yavuz.",
  keywords: [
    "dijital pazarlama danışmanlığı",
    "işletme büyütme",
    "dijital check-up",
    "şirket doktoru",
    "müşteri kazanma",
    "dijital dönüşüm danışmanlığı",
    "KOBİ dijital pazarlama",
  ],
  authors: [{ name: "Erdem Yavuz" }],
  creator: "Erdem Yavuz",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Dijital Şirketim | Türkiye'nin Şirket Doktoru",
    description:
      "21 kontrol noktalı Dijital Check-Up ile işletmenizin kök problemini 48 saatte teşhis edip tedavi reçetesi sunuyoruz.",
    url: SITE_URL,
    siteName: "Dijital Şirketim",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dijital Şirketim | Türkiye'nin Şirket Doktoru",
    description:
      "21 kontrol noktalı Dijital Check-Up ile kök problemi 48 saatte teşhis ediyoruz.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-white text-slate-900 font-sans">
        {/* GEÇİCİ: site yayına hazır olduğunda bu satırı kaldırın. */}
        <DraftVersionBanner />
        {children}
      </body>
    </html>
  );
}
