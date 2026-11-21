/**
 * Sitenin BÜTÜN metni bu dosyada.
 *
 * Kod bilmeden düzenlenebilsin diye tek yerde toplandı: bir başlığı
 * değiştirmek, bir çip eklemek ya da bir modülü sıradan çıkarmak için
 * yalnızca burayı düzenlemek yeterli. Eski sitede aynı işi
 * `data/questions.ts` görüyordu.
 */

export type Ajan = {
  id: string;
  rol: string;
  baslik: string;
  metin: string;
  cipler: string[];
  /** "indigo" ürün tarafı, "altin" insan tarafı — görsellerdeki ayrım. */
  renk: "indigo" | "altin";
};

export const AJANLAR: Ajan[] = [
  {
    id: "reklam-yoneticisi",
    rol: "Reklam Yöneticisi",
    baslik: "Meta kampanyaların uzmanı",
    metin:
      "Kampanyaları, hedef kitleleri ve Pixel'i yönetir; reklam hesabının röntgenini çeker.",
    cipler: ["Kampanyalar", "Kitleler", "Pixel", "Hesap röntgeni"],
    renk: "indigo",
  },
  {
    id: "icerik-yoneticisi",
    rol: "İçerik Yöneticisi",
    baslik: "Takvim hiç boş kalmaz",
    metin:
      "İçerik takvimini kurar, paylaşım fikirleri ve çekim planları çıkarır.",
    cipler: ["İçerik takvimi", "Post fikirleri", "Çekim planı"],
    renk: "indigo",
  },
  {
    id: "metin-yazari",
    rol: "Metin Yazarı",
    baslik: "Satan kelimeler",
    metin:
      "Reklam metinleri, başlıklar, açıklamalar ve DM şablonlarını markanın diliyle yazar.",
    cipler: ["Reklam metni", "Başlık", "Caption", "DM"],
    renk: "altin",
  },
  {
    id: "musteri-temsilcisi",
    rol: "Müşteri Temsilcisi",
    baslik: "Hiçbir mesaj kaçmaz",
    metin:
      "Gelen mesajlara cevap taslakları hazırlar, gerektiğinde konuşmayı ekibine devreder.",
    cipler: ["DM taslakları", "Yorumlar", "Ekibe devir"],
    renk: "altin",
  },
];

export type Modul = {
  id: string;
  etiket: string;
  baslik: string;
  metin: string;
  /** Mock ekranı çizen bileşenin anahtarı. */
  gorsel:
    | "reklam-performansi"
    | "calisma-alanlari"
    | "gelen-kutusu"
    | "rakip-reklamlari"
    | "rakip-video";
};

export const MODULLER: Modul[] = [
  {
    id: "reklam-performansi",
    etiket: "Reklam Performansı",
    baslik: "Harcama, lead maliyeti ve ROAS tek bakışta",
    metin:
      "Meta reklam hesabını bağla; harcamayı, lead başı maliyeti ve reklam getirisini gör. Kazanan kreatifler otomatik işaretlenir.",
    gorsel: "reklam-performansi",
  },
  {
    id: "musteri-calisma-alanlari",
    etiket: "Müşteri Çalışma Alanları",
    baslik: "Her müşteriye ayrı alan, tek tıkla geçiş",
    metin:
      "Güzellik salonu, diyetisyen, dil okulu… Her müşterinin kanalları, ekibi ve bilgileri kendi alanında durur. Müşteriler arasında tek tıkla geçersin, hiçbir şey birbirine karışmaz.",
    gorsel: "calisma-alanlari",
  },
  {
    id: "ortak-gelen-kutusu",
    etiket: "Ortak Gelen Kutusu",
    baslik: "Instagram DM ve yorumlar tek yerde",
    metin:
      "Tüm mesajlar ve yorumlar tek kutuda. Yapay zekâ cevabı hazırlar, sen onaylarsın. İstersen otomatik cevabı sonradan açarsın.",
    gorsel: "gelen-kutusu",
  },
  {
    id: "rakip-reklamlari",
    etiket: "Rakip Reklamları",
    baslik: "Rakiplerin hangi reklamı aylardır yayında?",
    metin:
      "Meta Reklam Kütüphanesi'nden rakip reklamlarını çeker, ne kadar süredir yayında olduklarını gösterir. Bölgendeki kuaförün aylardır yayında tuttuğu önce/sonra reklamını gör; beğendiğini tek tıkla klonla ya da senaryosunu uyarla.",
    gorsel: "rakip-reklamlari",
  },
  {
    id: "rakip-video-arastirmasi",
    etiket: "Rakip Video Araştırması",
    baslik: "Sektörde tutan videoları bul, markana uyarla",
    metin:
      "Diyetisyenden kuaföre, dil okulundan güzellik salonuna; sektörde en çok izlenen reels'leri bulur, senaryolarını çıkarır ve markana uyarlanmış 3 farklı versiyon üretir. Fikir bulma derdi bitiyor.",
    gorsel: "rakip-video",
  },
];

export type Kitle = { baslik: string; metin: string; maddeler: string[] };

export const KITLELER: Kitle[] = [
  {
    baslik: "Dijital pazarlama işi yapıyorsan",
    metin:
      "Birden fazla müşteriyi tek panelden yönetirsin. Her müşterinin alanı, kanalı ve ekibi ayrı durur; raporu sormadan hazırdır.",
    maddeler: [
      "Müşteri başına ayrı çalışma alanı",
      "Tek ekranda harcama ve getiri",
      "Mesajlar tek kutuda, ekibe devredilebilir",
    ],
  },
  {
    baslik: "Kendi işletmen için pazarlama yapıyorsan",
    metin:
      "Ajansa ödediğin işi kendin yaparsın. Ne yazacağını, ne çekeceğini ve neye bütçe ayıracağını sistem söyler; sen onaylarsın.",
    maddeler: [
      "Sektöründe tutan içeriklerin senaryosu",
      "Reklam metni ve DM cevapları hazır",
      "Bütçenin nereye gittiği net",
    ],
  },
];

export type ProgramBasligi = {
  no: string;
  baslik: string;
  /** Alt başlıklar yalnızca içeriği yazılmış bölümlerde dolu. */
  altBasliklar: string[];
};

/**
 * Altı başlığın yalnızca birincisinin içeriği yazıldı (Erdem'in ham
 * metni, bkz. icerik/ham/01-kafa-yapisi-insasi.md). Kalan beşinin alt
 * başlıkları Erdem'den gelecek — o güne kadar BİLEREK boş duruyorlar.
 * Uydurma alt başlık yazılmaz.
 */
export const PROGRAM: ProgramBasligi[] = [
  {
    no: "01",
    baslik: "Kafa Yapısı ve Düşünce Sistemi",
    altBasliklar: [
      "Araca değil amaca odaklanmak",
      "İlham veren hedef / tepkisel hedef ayrımı",
      "Hedefi ölçülebilir hâle getirmek (S-M-A-R-T)",
      "Dört başlıkta problem analizi",
      "Kök neden: netlik, kültür, yetkinlik",
      "Büyüme döngüsü ve nitelikli müşteri",
      "Karakter ve irade · umutsuzluk vadisi",
    ],
  },
  { no: "02", baslik: "Konumlandırma ve Kişisel Marka", altBasliklar: [] },
  { no: "03", baslik: "En Doğru Sektör Seçimi", altBasliklar: [] },
  { no: "04", baslik: "Karşı Konulamaz Teklif Oluşturma", altBasliklar: [] },
  { no: "05", baslik: "4A Satış Stratejileri", altBasliklar: [] },
  {
    no: "06",
    baslik: "Uygulamalı Dijital Pazarlama ve Sözleşme",
    altBasliklar: [],
  },
];

export type Faz = {
  no: string;
  baslik: string;
  metin: string;
  durum: "simdi" | "siradaki" | "sonra";
};

/**
 * Erdem'in kendi dört basamağı. Sitede açıkça gösteriliyor: ziyaretçi
 * neyin bugün çalıştığını, neyin kurulmakta olduğunu bilsin. Abartılı
 * vaat verilmez — CLAUDE.md'nin değişmez kuralı.
 */
export const FAZLAR: Faz[] = [
  {
    no: "01",
    baslik: "Tanışma",
    metin:
      "Görüşmeden önce ne yaptığımı ve nasıl çalıştığımı görebilesin diye bu sayfa. Aşağıdaki ekranlar sistemin tasarımı — örnek verilerle.",
    durum: "simdi",
  },
  {
    no: "02",
    baslik: "Çalışan sistem",
    metin:
      "Modüllerin arkasındaki bağlantılar kuruluyor: Meta reklam hesabı, Instagram mesajları ve reklam kütüphanesi.",
    durum: "siradaki",
  },
  {
    no: "03",
    baslik: "İlk işletmeler",
    metin:
      "Birkaç işletmeyle birebir çalışıp sonuçları ölçmek. Referans ancak gerçek sonuçtan sonra yazılır.",
    durum: "sonra",
  },
  {
    no: "04",
    baslik: "Ekip",
    metin: "Çalıştığı kanıtlanan işi ekiple büyütmek.",
    durum: "sonra",
  },
];

export const SSS: { soru: string; cevap: string }[] = [
  {
    soru: "Bu sistem şu anda çalışıyor mu?",
    cevap:
      "Sayfadaki ekranlar sistemin tasarımı ve örnek verilerle hazırlandı. Meta'ya bağlanan kısımlar (reklam performansı, Instagram mesajları, rakip reklamları) Meta'nın işletme doğrulaması ve uygulama incelemesinden geçmeyi gerektiriyor; o süreç devam ediyor. Bugün yapabileceğim işi görüşmede birebir anlatıyorum.",
  },
  {
    soru: "Fiyat ne kadar?",
    cevap:
      "Sayfada fiyat yazmıyor, çünkü işin kapsamı işletmeden işletmeye değişiyor. Görüşmede ne yapılacağını konuşup net bir rakam söylüyorum.",
  },
  {
    soru: "Rakiplerin reklamlarını kopyalamak doğru mu?",
    cevap:
      "Kopyalamak değil, uyarlamak. Aylardır yayında kalan bir reklam para kazandırdığı için yayında kalır — bu bir veridir. O verinin ne söylediğini çıkarıp kendi markanla yeniden kurarsın. Amerika'yı yeniden keşfetmeye gerek yok.",
  },
  {
    soru: "Verilerim ne oluyor?",
    cevap:
      "Form üzerinden paylaştığın bilgiler yalnızca sana dönüş yapmak için kullanılıyor, üçüncü kişilerle paylaşılmıyor. Ayrıntısı KVKK aydınlatma metninde.",
  },
  {
    soru: "Ajanslarla çalışmaktan farkı ne?",
    cevap:
      "Ajans, işi senin yerine yapar ve bilgi ajansta kalır. Burada ne yapıldığı ekranda durur: hangi reklam çalışıyor, hangi mesaj cevaplanmamış, hangi içerik tutmuş. İstersen kendin yürütürsün, istersen birlikte.",
  },
];

/** Görüşme formunda "kimsin?" seçenekleri. */
export const KIM_SECENEKLERI = [
  { id: "ajans", etiket: "Dijital pazarlama işi yapıyorum" },
  { id: "isletme", etiket: "Kendi işletmem için pazarlama yapıyorum" },
] as const;

export const WHATSAPP_NUMARASI = "905319956930";
