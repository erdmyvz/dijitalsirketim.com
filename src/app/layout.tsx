import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dijital Şirketim | Türkiye'nin Şirket Doktoru — Dijital Check-Up",
  description:
    "Ürününüz iyi ama müşteri gelmiyor mu? Dijital Şirketim, 21 kontrol noktalı Dijital Check-Up ile işletmenizin kök problemini 48 saatte teşhis eder ve size özel bir tedavi reçetesi sunar.",
  keywords: [
    "dijital pazarlama danışmanlığı",
    "işletme büyütme",
    "dijital check-up",
    "şirket doktoru",
    "müşteri kazanma",
  ],
  openGraph: {
    title: "Dijital Şirketim | Türkiye'nin Şirket Doktoru",
    description:
      "21 kontrol noktalı Dijital Check-Up ile işletmenizin kök problemini 48 saatte teşhis edip tedavi reçetesi sunuyoruz.",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
