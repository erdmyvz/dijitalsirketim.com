import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Newsreader } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

// Başlıklar geometrik sans, gövde metni serif — görsellerdeki eşleşme.
// next/font ile kendi sunucumuzdan servis ediliyor: harici istek yok,
// düzen kayması (layout shift) yok.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin-ext"],
  weight: ["300", "400", "500"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  title:
    "Dijital Şirketim | Çalıştığı kanıtlanmış pazarlamayı markana uyarla",
  description:
    "Sektöründe çoktan işe yaramış reklamları, videoları ve teklifleri bul, markana uyarla, uygula. Dört ajan ve beş modül: reklam performansı, müşteri çalışma alanları, ortak gelen kutusu, rakip reklamları, rakip video araştırması.",
  keywords: [
    "dijital pazarlama",
    "Meta reklam yönetimi",
    "ajans yazılımı",
    "Instagram DM yönetimi",
    "rakip reklam analizi",
    "içerik takvimi",
    "reels senaryo",
  ],
  authors: [{ name: "Erdem Yavuz" }],
  creator: "Erdem Yavuz",
  // Google Search Console mülk doğrulaması — gizli bir değer değil,
  // <meta> etiketi olarak yayınlanması gerekiyor.
  verification: {
    google: "_4SX-X-Csl2xN44SE9qQJXDNEgzoVJwDsnliIHebBw4",
  },
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
    title: "Dijital Şirketim | Amerika'yı yeniden keşfetmeye gerek yok",
    description:
      "Sektöründe çalıştığı kanıtlanmış reklamları ve içerikleri bul, markana uyarla, uygula.",
    url: SITE_URL,
    siteName: "Dijital Şirketim",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dijital Şirketim",
    description:
      "Sektöründe çalıştığı kanıtlanmış pazarlamayı bul, markana uyarla.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      className={`h-full antialiased scroll-smooth ${jakarta.variable} ${newsreader.variable}`}
    >
      <body className="min-h-full flex flex-col bg-zemin font-sans text-zinc-100">
        {children}
      </body>
    </html>
  );
}
