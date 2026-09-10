// Tedavi modülleri kataloğu. Kod bilmeden içerik güncellemek için bu
// dosyayı düzenlemeniz yeterli — menü ve sayfalar bu verinin şeklini
// otomatik takip eder (questions.ts ile aynı desen).
//
// SIRA = DİZİ SIRASI. Bir fonksiyonu ya da modülü yukarı/aşağı taşımak
// için ilgili nesneyi kes-yapıştır yapmanız yeterli; başka hiçbir yeri
// güncellemeye gerek yok.
//
// YENİ MODÜL EKLEME: ilgili fonksiyonun `moduller` dizisine yeni bir
// nesne ekleyin. `durum: "yakinda"` ile eklerseniz sayfası oluşur ama
// içerik yerine "Yakında" rozeti gösterilir.

import type { FonksiyonId, Katman } from "./questions";

/** AI teşhisindeki kök vida kategorileriyle aynı üçlü. */
export type KokVida = "Yetkinlik" | "Kültür" | "Netlik";

export type ModulDurumu = "hazir" | "yakinda";

export type Modul = {
  /** URL parçası — /tedavi/<fonksiyon>/<bu id> */
  id: string;
  baslik: string;
  /** Tek cümlelik somut sonuç vaadi. Garanti değil, kazanım. */
  vaat: string;
  /** "1 hafta · günde ~30 dk" gibi. */
  sure: string;
  durum: ModulDurumu;
  katmanlar: Katman[];
  kokVida: KokVida[];
  /**
   * Bu modülün onardığı check-up soruları (questions.ts'teki id'ler).
   * Modül bitince kullanıcıya bu sorular tekrar sorulur, skoru yükselir
   * — "gözle görülür ilerleme" ölçümü buradan çıkıyor.
   */
  onardigiSorular: string[];
  /** İşletmenin nefes alması için önce yapılması gerekenler. */
  acil?: boolean;
};

export type TedaviFonksiyonu = {
  /** questions.ts'teki FonksiyonId ile AYNI — eşleştirmenin anahtarı. */
  id: FonksiyonId;
  /** URL parçası — /tedavi/<bu slug> */
  slug: string;
  no: number;
  baslik: string;
  /** Fonksiyon sayfasının giriş cümlesi. */
  ozet: string;
  moduller: Modul[];
};

export const TEDAVI_FONKSIYONLARI: TedaviFonksiyonu[] = [
  {
    id: "musteri_bulma",
    slug: "musteri-bulma",
    no: 1,
    baslik: "Müşteri Bulma",
    ozet:
      "Yeni müşterinin işletmeye hangi yoldan geldiği belli değilse, büyüme tesadüfe bağlıdır. Bu bölüm o yolu yazılı ve tekrarlanabilir hale getirir.",
    moduller: [
      {
        id: "musteri-bulma-plani",
        baslik: "Müşteri Bulma Planı",
        vaat:
          "Yeni müşterilerin sana nasıl ulaşacağı tahmine değil, yazılı bir plana bağlansın.",
        sure: "1 hafta · günde ~30 dk",
        durum: "yakinda",
        katmanlar: ["surec", "sistem"],
        kokVida: ["Netlik"],
        onardigiSorular: ["musteri_bulma.surec", "musteri_bulma.sistem"],
        acil: true,
      },
      {
        id: "duzenli-pazarlama-ritmi",
        baslik: "Düzenli Pazarlama Ritmi",
        vaat:
          "Pazarlama “aklına geldikçe” değil, takvime bağlı bir ritimle yürüsün.",
        sure: "1 hafta · günde ~20 dk",
        durum: "yakinda",
        katmanlar: ["surec"],
        kokVida: ["Kültür"],
        onardigiSorular: ["musteri_bulma.surec", "musteri_bulma.yapi"],
      },
    ],
  },
  {
    id: "satis",
    slug: "satis",
    no: 2,
    baslik: "Satış",
    ozet:
      "Görüşme sayısı değil, görüşmenin satışa dönme oranı belirleyicidir. Bu bölüm teklifi ve takibi ölçülebilir bir akışa oturtur.",
    moduller: [
      {
        id: "etkili-satis-teklifi",
        baslik: "Etkili Satış Teklifi",
        vaat:
          "Tekliflerin “düşüneyim” değil “başlayalım” cevabı alacak biçimde kurulsun.",
        sure: "1 hafta · günde ~30 dk",
        durum: "yakinda",
        katmanlar: ["surec"],
        kokVida: ["Yetkinlik"],
        onardigiSorular: ["satis.surec"],
      },
      {
        id: "satis-takibi-ve-donusum",
        baslik: "Satış Takibi ve Dönüşüm Ölçümü",
        vaat:
          "Kaç görüşmenin satışa döndüğünü tahminle değil, rakamla bil.",
        sure: "1 hafta · günde ~20 dk",
        durum: "yakinda",
        katmanlar: ["sistem", "yapi"],
        kokVida: ["Netlik"],
        onardigiSorular: ["satis.sistem", "satis.yapi"],
      },
    ],
  },
  {
    id: "operasyon",
    slug: "operasyon",
    no: 3,
    baslik: "Operasyon",
    ozet:
      "İşin teslimi kişiye bağlıysa, işletme o kişinin kapasitesiyle sınırlıdır. Bu bölüm teslimi sürece bağlar.",
    moduller: [
      {
        id: "teslimat-sureci-el-kitabi",
        baslik: "Teslimat Süreci El Kitabı",
        vaat: "İşin teslimi kişiye değil, yazılı bir sürece bağlansın.",
        sure: "1 hafta · günde ~30 dk",
        durum: "yakinda",
        katmanlar: ["surec"],
        kokVida: ["Netlik"],
        onardigiSorular: ["operasyon.surec"],
      },
      {
        id: "operasyon-gostergeleri",
        baslik: "Operasyon Göstergeleri",
        vaat:
          "Teslim süresi, hata ve iade oranını düzenli gör; aksamayı müşteri söylemeden yakala.",
        sure: "1 hafta · günde ~20 dk",
        durum: "yakinda",
        katmanlar: ["sistem"],
        kokVida: ["Netlik"],
        onardigiSorular: ["operasyon.sistem"],
      },
    ],
  },
  {
    id: "urun_gelistirme",
    slug: "urun-gelistirme",
    no: 4,
    baslik: "Ürün Geliştirme",
    ozet:
      "Müşteri ne söylediyse ürün oraya gitmelidir. Bu bölüm geri bildirimi ürüne dönüştüren döngüyü kurar.",
    moduller: [
      {
        id: "musteri-geri-bildirimi-donugusu",
        baslik: "Müşteri Geri Bildirimi Döngüsü",
        vaat:
          "Müşterinin söylediği, ürüne dönüşen tanımlı bir yola girsin.",
        sure: "1 hafta · günde ~20 dk",
        durum: "yakinda",
        katmanlar: ["surec"],
        kokVida: ["Kültür"],
        onardigiSorular: ["urun_gelistirme.surec"],
      },
      {
        id: "urun-karlilik-analizi",
        baslik: "Ürün/Hizmet Kârlılık Analizi",
        vaat:
          "Hangi ürünün gerçekten kazandırdığını, hangisinin sırtından geçindiğini gör.",
        sure: "1 hafta · günde ~30 dk",
        durum: "yakinda",
        katmanlar: ["sistem"],
        kokVida: ["Netlik"],
        onardigiSorular: ["urun_gelistirme.sistem", "urun_gelistirme.yapi"],
      },
    ],
  },
  {
    id: "para_yonetimi",
    slug: "para-yonetimi",
    no: 5,
    baslik: "Para Yönetimi",
    ozet:
      "Kâr, cironun içinde saklıdır — ölçülmezse görünmez. Bu bölüm nakdi ve marjı görünür kılar.",
    moduller: [
      {
        id: "nakit-akisi-kontrol-paneli",
        baslik: "Nakit Akışı Kontrol Paneli",
        vaat:
          "Önümüzdeki ayın nakit akışını ve kâr marjını rakamla söyleyebil.",
        sure: "1 hafta · günde ~30 dk",
        durum: "yakinda",
        katmanlar: ["surec", "sistem"],
        kokVida: ["Netlik"],
        onardigiSorular: [
          "para_yonetimi.surec",
          "para_yonetimi.sistem",
          "para_yonetimi.yapi",
        ],
      },
    ],
  },
  {
    id: "karar_alma",
    slug: "karar-alma",
    no: 6,
    baslik: "Karar Alma",
    ozet:
      "Anlık alınan kararlar, anlık sonuç verir. Bu bölüm kararı ritme ve kayda bağlar.",
    moduller: [
      {
        id: "haftalik-karar-toplantisi",
        baslik: "Haftalık Karar Toplantısı",
        vaat:
          "Kararlar anlık tepkiyle değil, düzenli ve kayıtlı bir ritimle alınsın.",
        sure: "1 hafta · haftada 1 saat",
        durum: "yakinda",
        katmanlar: ["surec", "sistem"],
        kokVida: ["Kültür"],
        onardigiSorular: ["karar_alma.surec", "karar_alma.sistem"],
      },
      {
        id: "yonetici-kafa-yapisi",
        baslik: "Yönetici Kafa Yapısı",
        vaat: "İşin içinde çalışmaktan, işin üzerinde çalışmaya geç.",
        sure: "2 hafta · günde ~20 dk",
        durum: "yakinda",
        katmanlar: ["yapi"],
        kokVida: ["Kültür", "Yetkinlik"],
        onardigiSorular: ["karar_alma.yapi"],
      },
    ],
  },
  {
    id: "ekip_kurma",
    slug: "ekip-kurma",
    no: 7,
    baslik: "Ekip Kurma",
    ozet:
      "Kimin neyden sorumlu olduğu yazılı değilse, sorumluluk kimsede değildir. Bu bölüm rolleri ve devri kurar.",
    moduller: [
      {
        id: "gorev-tanimlari",
        baslik: "Görev Tanımları",
        vaat: "Kimin neyden sorumlu olduğu yazılı ve tartışmasız olsun.",
        sure: "1 hafta · günde ~30 dk",
        durum: "yakinda",
        katmanlar: ["yapi"],
        kokVida: ["Netlik"],
        onardigiSorular: ["ekip_kurma.yapi"],
      },
      {
        id: "ise-alim-ve-alistirma",
        baslik: "İşe Alım ve Alıştırma Kiti",
        vaat:
          "Yeni gelen kişi haftalarca değil, günler içinde üretime geçsin.",
        sure: "1 hafta · günde ~30 dk",
        durum: "yakinda",
        katmanlar: ["surec", "sistem"],
        kokVida: ["Yetkinlik"],
        onardigiSorular: ["ekip_kurma.surec", "ekip_kurma.sistem"],
      },
      {
        id: "devretme-sensiz-yuruyen-isletme",
        baslik: "Devretme: Sensiz Yürüyen İşletme",
        vaat:
          "Bir hafta ortada olmasan da işletme aksamadan yürüsün.",
        sure: "2 hafta · günde ~30 dk",
        durum: "yakinda",
        katmanlar: ["yapi"],
        kokVida: ["Kültür"],
        onardigiSorular: ["operasyon.yapi", "ekip_kurma.yapi"],
      },
    ],
  },
];

/** Toplam modül sayısı — harita sayfasındaki sayaç için. */
export const TOPLAM_MODUL_SAYISI = TEDAVI_FONKSIYONLARI.reduce(
  (toplam, f) => toplam + f.moduller.length,
  0,
);

export function fonksiyonBul(slug: string): TedaviFonksiyonu | undefined {
  return TEDAVI_FONKSIYONLARI.find((f) => f.slug === slug);
}

export function modulBul(
  fonksiyonSlug: string,
  modulId: string,
): { fonksiyon: TedaviFonksiyonu; modul: Modul } | undefined {
  const fonksiyon = fonksiyonBul(fonksiyonSlug);
  const modul = fonksiyon?.moduller.find((m) => m.id === modulId);
  if (!fonksiyon || !modul) return undefined;
  return { fonksiyon, modul };
}
