import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { TEDAVI_FONKSIYONLARI } from "@/data/moduller";

export default function sitemap(): MetadataRoute.Sitemap {
  // Tedavi kataloğu: harita + 7 fonksiyon + tüm modül sayfaları.
  // Katalog büyüdükçe sitemap kendiliğinden büyür.
  const tedaviSayfalari: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/tedavi`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...TEDAVI_FONKSIYONLARI.flatMap((f) => [
      {
        url: `${SITE_URL}/tedavi/${f.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      },
      ...f.moduller.map((m) => ({
        url: `${SITE_URL}/tedavi/${f.slug}/${m.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ]),
  ];

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...tedaviSayfalari,
    {
      url: `${SITE_URL}/kvkk`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/gizlilik`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
