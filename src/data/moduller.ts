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

/**
 * Bir modülün tek adımı.
 *
 * İÇERİK EKLEME: modülün `adimlar` dizisine nesne eklemek yeterli.
 * `adimlar` boşsa modül "içerik hazırlanıyor" durumunda kalır; dolunca
 * adım ekranı, ilerleme kaydı ve bitiş kontrolü kendiliğinden devreye
 * girer — kodda değişiklik gerekmez.
 */
export type ModulAdimi = {
  /** İlerleme kaydının anahtarı — sonradan DEĞİŞTİRİLMEMELİ. */
  id: string;
  baslik: string;
  /** Ne yapılacak ve neden — kısa, uygulanabilir. */
  aciklama: string;
  /**
   * Doldurulabilir şablon. Yoksa adım yalnızca "yaptım" işaretiyle
   * kapanır; varsa kullanıcının yazdığı metin saklanır ve geri
   * döndüğünde karşısına çıkar.
   */
  sablon?: {
    etiket: string;
    ipucu: string;
    /** textarea satır sayısı — varsayılan 4. */
    satir?: number;
  };
  /** "Bu adım bitti" demenin somut ölçüsü. */
  bitisKriteri: string;
};

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
  /**
   * Modülün adımları. Boşsa içerik henüz yazılmamış demektir —
   * ekranda "hazırlanıyor" görünür.
   */
  adimlar: ModulAdimi[];
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
        adimlar: [],
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
        adimlar: [],
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
        adimlar: [],
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
        adimlar: [],
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
        adimlar: [],
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
        adimlar: [],
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
        adimlar: [],
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
        adimlar: [],
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
        adimlar: [],
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
        adimlar: [],
      },
      {
        id: "yonetici-kafa-yapisi",
        baslik: "Yönetici Kafa Yapısı",
        vaat: "İşin içinde çalışmaktan, işin üzerinde çalışmaya geç.",
        sure: "2 hafta · günde ~20 dk",
        durum: "hazir",
        katmanlar: ["yapi"],
        kokVida: ["Kültür", "Yetkinlik"],
        // Not: önceden "karar_alma.yapi" (yetki devri) idi; modülün
        // konusu o değil. Kararların anlık mı yoksa düşünülerek mi
        // alındığı sorusu, bu modüldeki "tepkisel hedef / ilham veren
        // hedef" ayrımının birebir karşılığı.
        onardigiSorular: ["karar_alma.surec"],
        adimlar: [
          {
            id: "ilham-veren-hedef",
            baslik: "İlham veren hedefini yaz",
            aciklama:
              "İzmir'den İstanbul'a uçakla da gidilir, bisikletle de. Maliyet ve konfor değişir ama varılan yer aynıdır. Araç değişebilir, amaç değişmez — bu yüzden önce amacı sabitliyoruz. İki tür hedef vardır: tepkisel hedef, dışarıdan gelen bir uyarana verilen ham reflekstir (rakip indirim yaptı, sen de yaptın). İlham veren hedef ise seninle arasına giren tüm engellerden daha büyük, kişisel bir amaçtır. Ayırt etmenin yolu şu: hedefinle duygusal bir bağın yoksa, ilk ciddi engelde bırakırsın.",
            sablon: {
              etiket: "İlham veren hedefim",
              ipucu:
                "1) Hedefim ne?  2) Bu hedefe ulaşırsam hayatımda somut olarak ne değişir?  3) Ulaşamazsam ne kaybederim? Üçüncü soruyu boş bırakma — duygusal bağ orada kuruluyor.",
              satir: 6,
            },
            bitisKriteri:
              "Hedefin yazılı ve seni tanımayan biri okuduğunda ne demek istediğini anlıyor.",
          },
          {
            id: "smart-hedef",
            baslik: "Hedefi ölçülebilir hâle getir (S-M-A-R-T)",
            aciklama:
              "Birçok insanın hayali vardır, çok azının hedefi. Farkı yaratan beş şey: Spesifik (açık ve net, nereden başlayacağını söylüyor), Ölçülebilir (takip edilebiliyor, bittiğini anlayabiliyorsun), Ulaşılabilir (bugün aksiyon alabiliyorsun, kontrol sende), Gerçekçi (gereksiz stres ve hayal kırıklığı üretmiyor), Zamana dayalı (bir tarihi var). Bir önceki adımda yazdığın hedefi şimdi bu beş filtreden geçir.",
            sablon: {
              etiket: "Hedefimin S-M-A-R-T hâli",
              ipucu:
                "Spesifik:\nÖlçülebilir:\nUlaşılabilir:\nGerçekçi:\nZamana dayalı:",
              satir: 7,
            },
            bitisKriteri:
              "Hedefinde en az bir sayı ve bir tarih var; ikisi de yoksa hedef değil, niyet.",
          },
          {
            id: "problem-analizi",
            baslik: "Dört başlıkta problem analizi yap",
            aciklama:
              "Hedefi belirledikten sonra önündeki engelleri tek tek adlandırmak gerekir. Hepsini tek torbaya koymak işe yaramaz; dört ayrı başlıkta düşün: Bütçesel problemler (para nerede tıkanıyor), Lider problemleri (senin kendi eksiklerin — bu başlığı atlama, en zoru bu), Ekip problemleri (kim yok, kim yanlış yerde), Teknolojik problemler (hangi iş hâlâ elle yapılıyor). Her başlığa dürüstçe bakmadan bir sonraki adıma geçme.",
            sablon: {
              etiket: "Hedefimin önündeki engeller",
              ipucu:
                "Bütçesel:\nLider (ben):\nEkip:\nTeknolojik:",
              satir: 8,
            },
            bitisKriteri:
              "Dört başlığın her birinde en az bir madde yazılı — \"burada sorun yok\" yazdıysan bir kez daha düşün.",
          },
          {
            id: "kok-neden",
            baslik: "Kök nedene in (5 kez \"neden?\")",
            aciklama:
              "Bir önceki adımda yazdığın en can yakıcı problemi seç ve beş kez üst üste \"neden?\" diye sor. Her cevabı bir öncekinin üzerine koy. Şaşırtıcı olan şu: bütün yollar üç kök nedenden birine çıkar. NETLİK (ne yapılacağı yazılı ve belli değil), KÜLTÜR (iletişim ve alışkanlıklar taşımıyor), YETKİNLİK (donanım ya da kabiliyet eksik). Belirtiyi tedavi etmek zaman kaybıdır; bu üçünden hangisi olduğunu bulduğunda neyi onaracağını da bulmuş olursun.",
            sablon: {
              etiket: "Beş neden zinciri",
              ipucu:
                "Problem:\n1. Neden?\n2. Neden?\n3. Neden?\n4. Neden?\n5. Neden?\n\nKök neden hangisi: Netlik / Kültür / Yetkinlik",
              satir: 10,
            },
            bitisKriteri:
              "En az bir problemin kökü Netlik, Kültür veya Yetkinlik'ten birine bağlanmış durumda.",
          },
          {
            id: "karakter-envanteri",
            baslik: "Mevcut karakterinle hedefteki karakterini karşılaştır",
            aciklama:
              "Kimse hayallerine ulaşamaz; herkes standartlarını yaşar. Karakter farkında olmadan oluşur — kültür, çevre ve alışkanlıklarla. İrade ise bilinçli inşa edilir: yeni kararlar, disiplin, eğitim. Mevcut karakterinle hedefine ulaşamıyorsan, mesele hedefin büyüklüğü değil karakterin ayarıdır. Bu adımda iki sütun yazacaksın: bugünkü hâlin ve hedefe ulaşmış hâlin. Somut yaz — günü nasıl geçiriyor, kimlerle vakit geçiriyor, neye hayır diyor, hangi işi kendi yapıyor hangisini yapmıyor. Soyut sıfatlar (\"daha disiplinli\") işe yaramaz.",
            sablon: {
              etiket: "Mevcut Ben → Yeni Ben",
              ipucu:
                "Bugün: sabahları ...           → Hedefte: sabahları ...\nBugün: vaktimin çoğu ...      → Hedefte: vaktimin çoğu ...\nBugün: şu işi kendim yapıyorum → Hedefte: bu iş ...\nBugün: hayır diyemediğim şey ... → Hedefte: ...\nBugün: birlikte vakit geçirdiğim insanlar ... → Hedefte: ...",
              satir: 10,
            },
            bitisKriteri:
              "En az 5 karşılaştırma satırı var ve hepsi davranış tarif ediyor, sıfat değil.",
          },
          {
            id: "buyume-dongusu",
            baslik: "Büyüme döngünü sına",
            aciklama:
              "Çoğu işletmenin döngüsü şudur: müşteriye ilgi gösterirsin, müşteri sonuç alır, tatmin olur, yeni müşteri getirir — ama müşteri sayısı arttıkça harcadığın zaman artar, zaman artınca ilgi azalır ve döngü kendi kendini bozar. Bu döngüde para kazanılır, servet kazanılmaz. Girişimcilerin büyük çoğunluğu tam burada takılır. Çıkış yolu daha çok müşteri değil, daha nitelikli müşteridir: küçük bir işe harcadığın saatle büyük bir işe harcadığın saat aynıdır. Bu adımda kendi döngünü çiz ve nerede kırıldığını bul.",
            sablon: {
              etiket: "Büyüme döngüm",
              ipucu:
                "Bugünkü döngüm (adım adım):\n\nDöngü nerede kırılıyor:\n\nEn kârlı 3 müşterimin ortak özelliği:\n\nBundan sonra hangi müşteriyi almayacağım:",
              satir: 10,
            },
            bitisKriteri:
              "Döngünün kırıldığı nokta yazılı ve bundan sonra hangi işi almayacağına dair bir cümle var.",
          },
        ],
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
        adimlar: [],
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
        adimlar: [],
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
        adimlar: [],
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
