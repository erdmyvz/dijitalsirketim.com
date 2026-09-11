import type { CheckupState } from "@/lib/checkup/types";

/**
 * Ana sayfadaki karne görselini besleyen ÖRNEK cevap seti.
 *
 * Gerçek bir müşterinin verisi DEĞİLDİR ve öyleymiş gibi sunulmaz —
 * görselin başlığında "örnek" ibaresi her zaman durur. Amaç, ürünün
 * çıktısını kelimeyle anlatmak yerine göstermek.
 *
 * Rakamlar elle yazılmış bir tasarım taslağı değil: buradaki cevaplar
 * `skorHesapla` ile işlenir, yani ekranda görünen yüzde ve renkler
 * müşterinin göreceğiyle aynı motordan çıkar. Soru bankası veya eşikler
 * değişirse bu görsel de kendiliğinden güncellenir.
 *
 * Seçilen tablo bilinçli: iki kırmızı, iki sarı, üç yeşil. "Her şeyi
 * kötü gösterip korkutma" da yok, "her şey yolunda" da yok.
 */
export const ORNEK_KARNE: CheckupState = {
  isletmeAdi: "",
  sektor: "",
  isModeli: null,
  calisanSayisi: null,
  ciroAraligi: null,
  problemMetni: "",
  cevaplar: {
    // Müşteri Bulma — 1/6 (kırmızı)
    "musteri_bulma.surec": 0,
    "musteri_bulma.sistem": 0,
    "musteri_bulma.yapi": 1,
    // Satış — 0/6 (kırmızı)
    "satis.surec": 0,
    "satis.sistem": 0,
    "satis.yapi": 0,
    // Operasyon — 6/6 (yeşil)
    "operasyon.surec": 2,
    "operasyon.sistem": 2,
    "operasyon.yapi": 2,
    // Ürün Geliştirme — 5/6 (yeşil)
    "urun_gelistirme.surec": 2,
    "urun_gelistirme.sistem": 2,
    "urun_gelistirme.yapi": 1,
    // Para Yönetimi — 3/6 (sarı)
    "para_yonetimi.surec": 1,
    "para_yonetimi.sistem": 1,
    "para_yonetimi.yapi": 1,
    // Karar Alma — 6/6 (yeşil)
    "karar_alma.surec": 2,
    "karar_alma.sistem": 2,
    "karar_alma.yapi": 2,
    // Ekip Kurma — 4/6 (sarı)
    "ekip_kurma.surec": 2,
    "ekip_kurma.sistem": 1,
    "ekip_kurma.yapi": 1,
  },
};
