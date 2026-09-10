// Sık sorulan sorular — TEK KAYNAK.
//
// Hem ekrandaki SSS bölümü (components/Faq.tsx) hem Google'a giden
// FAQPage yapılandırılmış verisi (app/page.tsx) buradan okur. Daha önce
// aynı metin iki yere kopyalanmıştı; ikisi ayrı düşerse Google'a
// sayfada görünmeyen bir cevap bildirmiş oluyorduk.

export type SssMaddesi = { soru: string; cevap: string };

export const SSS: SssMaddesi[] = [
  {
    soru: "Check-up gerçekten ücretsiz mi?",
    cevap:
      "Evet. 21 soruluk check-up, Dijital Sağlık Karnesi ve yapay zekâ ön teşhisi ücretsizdir. Ücretli olan, teşhisten sonra gelen tedavi modülleridir.",
  },
  {
    soru: "Benim sektörüm farklı, bana uyar mı?",
    cevap:
      "4 işletme modeli var, 21 kontrol noktası hepsinde aynı çalışır.",
  },
  {
    soru: "Neden fiyat sitede yazmıyor?",
    cevap:
      "Çünkü fiyat işletmeden işletmeye değişiyor: check-up sonucundan hesaplanıyor. Kaç fonksiyonunuz tedavi gerektiriyorsa o kadar ödüyorsunuz, yeşil fonksiyonlar için ödeme yapmıyorsunuz. Bu yüzden fiyatı önceden söylemek mümkün değil — önce teşhis gerekiyor.",
  },
  {
    soru: "Fonksiyonlarım düzelirse ne olur?",
    cevap:
      "Aylık tutarınız düşer. Fiyat teşhisten hesaplandığı için iyileşen her fonksiyon ücreti azaltır. Hepsi yeşile döndüğünde Nabız Planı'na geçersiniz: aylık kısa kontrol, bir skor düştüğünde erken uyarı, yılda bir tam check-up ve yeni modüllere erişim.",
  },
  {
    soru: "Ne kadar sürer?",
    cevap:
      "Check-up birkaç dakika sürer, karneniz anında çıkar. Tedavi modülleri ise uygulamalıdır: her modül genellikle 1-2 hafta, günde yarım saatlik bir iş.",
  },
  {
    soru: "Karne sonrası devam etmek zorunda mıyım?",
    cevap:
      "Hayır. Karne sizindir, tedavi ayrı bir karardır.",
  },
];
