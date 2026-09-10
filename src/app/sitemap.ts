import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// NOT: /tedavi sayfaları bilinçli olarak sitemap'te YOK. Modül
// içerikleri tamamlanana kadar bu bölüm giriş arkasında; giriş
// sayfasına yönlenen bir URL'yi Google'a bildirmek doğru olmaz.
// Modüller yayına alınıp bölüm herkese açıldığında buraya geri
// eklenecek (o zaman 15 sayfalık gerçek içerik SEO'ya iyi gelir).
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
