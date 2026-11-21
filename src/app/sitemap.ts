import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Site tek sayfa: ajanlar, modüller, program ve görüşme formu aynı
// adreste, çapa bağlantılarıyla. Sitemap'te yalnızca gerçek URL'ler
// olur — çapalar ayrı sayfa değildir.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
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
