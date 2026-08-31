// Dijital Check-Up soru bankası. Kod bilmeden içerik güncellemek için
// bu dosyayı düzenlemeniz yeterli — UI, aşağıdaki verinin şeklini
// otomatik olarak takip eder.

export type IsModeli =
  | "fiziksel_urun"
  | "bilgi_tecrube"
  | "servis_hizmet"
  | "yazilim_dijital";

export const IS_MODELLERI: { id: IsModeli; baslik: string; aciklama: string }[] = [
  {
    id: "fiziksel_urun",
    baslik: "Fiziksel Ürün",
    aciklama: "Üretip veya tedarik edip elle tutulur bir ürün satıyorum",
  },
  {
    id: "bilgi_tecrube",
    baslik: "Bilgi & Tecrübe",
    aciklama: "Eğitim, danışmanlık veya uzmanlığımı satıyorum",
  },
  {
    id: "servis_hizmet",
    baslik: "Servis & Hizmet",
    aciklama: "Emek/zaman karşılığı bir hizmet sunuyorum",
  },
  {
    id: "yazilim_dijital",
    baslik: "Yazılım & Dijital",
    aciklama: "Yazılım, uygulama veya dijital bir ürün geliştiriyorum",
  },
];

export type CalisanSayisi = "yalnizim" | "2-5" | "6-20" | "21+";

export const CALISAN_SAYILARI: { id: CalisanSayisi; etiket: string }[] = [
  { id: "yalnizim", etiket: "Yalnızım" },
  { id: "2-5", etiket: "2 – 5 kişi" },
  { id: "6-20", etiket: "6 – 20 kişi" },
  { id: "21+", etiket: "21+ kişi" },
];

export type CiroAraligi =
  | "0-50k"
  | "50k-150k"
  | "150k-500k"
  | "500k+"
  | "belirtmek_istemiyorum";

export const CIRO_ARALIKLARI: { id: CiroAraligi; etiket: string }[] = [
  { id: "0-50k", etiket: "0 – 50.000 TL" },
  { id: "50k-150k", etiket: "50.000 – 150.000 TL" },
  { id: "150k-500k", etiket: "150.000 – 500.000 TL" },
  { id: "500k+", etiket: "500.000 TL ve üzeri" },
  { id: "belirtmek_istemiyorum", etiket: "Belirtmek istemiyorum" },
];

// Cevap ölçeği — her sorudaki üç seçenek de aynı puanlama mantığını izler.
export type CevapDegeri = 2 | 1 | 0;

export const CEVAP_SECENEKLERI: {
  deger: CevapDegeri;
  etiket: string;
  aciklama: string;
}[] = [
  {
    deger: 2,
    etiket: "VAR",
    aciklama: "Net ve yazılı / ölçülü",
  },
  {
    deger: 1,
    etiket: "BELİRSİZ",
    aciklama: "Kafamda var ama yazılı / düzenli değil",
  },
  {
    deger: 0,
    etiket: "YOK",
    aciklama: "Böyle bir şey yok",
  },
];

export type Katman = "surec" | "sistem" | "yapi";

export const KATMAN_ETIKETLERI: Record<Katman, string> = {
  surec: "Süreç",
  sistem: "Sistem",
  yapi: "Yapı",
};

export type FonksiyonId =
  | "musteri_bulma"
  | "satis"
  | "operasyon"
  | "urun_gelistirme"
  | "para_yonetimi"
  | "karar_alma"
  | "ekip_kurma";

export type Soru = {
  id: string; // "musteri_bulma.surec" gibi
  katman: Katman;
  metin: string;
};

export type Fonksiyon = {
  id: FonksiyonId;
  no: number; // 1-7
  baslik: string;
  sorular: Soru[]; // her zaman 3 — surec, sistem, yapi
};

export const FONKSIYONLAR: Fonksiyon[] = [
  {
    id: "musteri_bulma",
    no: 1,
    baslik: "Müşteri Bulma",
    sorular: [
      {
        id: "musteri_bulma.surec",
        katman: "surec",
        metin:
          "Yeni müşterilerin size nasıl ulaşacağı yazılı bir plana bağlı mı, yoksa “tavsiyeyle geliyorlar” mı?",
      },
      {
        id: "musteri_bulma.sistem",
        katman: "sistem",
        metin:
          "Bu ay kaç potansiyel müşteriyle temas kurduğunuzu ve bir müşteri kazanmanın size kaça mal olduğunu biliyor musunuz?",
      },
      {
        id: "musteri_bulma.yapi",
        katman: "yapi",
        metin: "Müşteri bulmaktan her gün fiilen sorumlu belirli bir kişi var mı?",
      },
    ],
  },
  {
    id: "satis",
    no: 2,
    baslik: "Satış",
    sorular: [
      {
        id: "satis.surec",
        katman: "surec",
        metin:
          "Teklif verme ve satışı kapatma adımlarınız yazılı bir akışa/scripte bağlı mı?",
      },
      {
        id: "satis.sistem",
        katman: "sistem",
        metin: "Görüşmelerinizin yüzde kaçının satışa dönüştüğünü ölçüyor musunuz?",
      },
      {
        id: "satis.yapi",
        katman: "yapi",
        metin: "Satıştan sorumlu kişi net mi, yoksa “kim müsaitse o” mu?",
      },
    ],
  },
  {
    id: "operasyon",
    no: 3,
    baslik: "Operasyon",
    sorular: [
      {
        id: "operasyon.surec",
        katman: "surec",
        metin: "İşin üretimi/teslimi için adım adım yazılı bir süreç var mı?",
      },
      {
        id: "operasyon.sistem",
        katman: "sistem",
        metin:
          "Teslim süresi, hata veya iade oranı gibi göstergeleri düzenli takip ediyor musunuz?",
      },
      {
        id: "operasyon.yapi",
        katman: "yapi",
        metin:
          "Siz bir hafta ortada olmasanız operasyon kimin sorumluluğunda, aksamadan yürür mü?",
      },
    ],
  },
  {
    id: "urun_gelistirme",
    no: 4,
    baslik: "Ürün Geliştirme",
    sorular: [
      {
        id: "urun_gelistirme.surec",
        katman: "surec",
        metin:
          "Müşteri geri bildirimlerini toplayıp ürüne/hizmete dönüştüren tanımlı bir süreciniz var mı?",
      },
      {
        id: "urun_gelistirme.sistem",
        katman: "sistem",
        metin:
          "Hangi ürün ya da hizmetinizin ne kadar kazandırdığını ayrı ayrı ölçüyor musunuz?",
      },
      {
        id: "urun_gelistirme.yapi",
        katman: "yapi",
        metin: "Ürünü/hizmeti geliştirmekten sorumlu biri var mı?",
      },
    ],
  },
  {
    id: "para_yonetimi",
    no: 5,
    baslik: "Para Yönetimi",
    sorular: [
      {
        id: "para_yonetimi.surec",
        katman: "surec",
        metin:
          "Gelir-gider takibi düzenli bir sisteme mi işleniyor, yoksa büyük ölçüde akılda mı?",
      },
      {
        id: "para_yonetimi.sistem",
        katman: "sistem",
        metin:
          "Aylık kâr marjınızı ve önümüzdeki ayın nakit akışını sayıyla söyleyebilir misiniz?",
      },
      {
        id: "para_yonetimi.yapi",
        katman: "yapi",
        metin: "Paranın takibinden sorumlu net bir kişi/rol var mı?",
      },
    ],
  },
  {
    id: "karar_alma",
    no: 6,
    baslik: "Karar Alma",
    sorular: [
      {
        id: "karar_alma.surec",
        katman: "surec",
        metin:
          "Önemli kararlar için düzenli bir toplantı/değerlendirme düzeniniz var mı, yoksa kararlar anlık mı alınıyor?",
      },
      {
        id: "karar_alma.sistem",
        katman: "sistem",
        metin: "Alınan kararların sonuçlarını ölçüp geriye dönüp bakıyor musunuz?",
      },
      {
        id: "karar_alma.yapi",
        katman: "yapi",
        metin: "Hangi kararı kimin verebileceği net olarak belli mi?",
      },
    ],
  },
  {
    id: "ekip_kurma",
    no: 7,
    baslik: "Ekip Kurma",
    sorular: [
      {
        id: "ekip_kurma.surec",
        katman: "surec",
        metin: "İşe alım ve işe alıştırma için yazılı adımlarınız var mı?",
      },
      {
        id: "ekip_kurma.sistem",
        katman: "sistem",
        metin: "Ekipteki kişilerin performansını düzenli ölçüyor musunuz?",
      },
      {
        id: "ekip_kurma.yapi",
        katman: "yapi",
        metin:
          "Herkesin görev tanımı yazılı ve net mi? (Tek kişiyseniz: hangi işi hangi gün/saatte yaptığınız planlı mı?)",
      },
    ],
  },
];

export const TOPLAM_SORU_SAYISI = FONKSIYONLAR.length * 3; // 21
export const MAKSIMUM_PUAN = TOPLAM_SORU_SAYISI * 2; // 42
