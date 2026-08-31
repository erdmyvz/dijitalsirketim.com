import type {
  CalisanSayisi,
  CevapDegeri,
  CiroAraligi,
  IsModeli,
} from "@/data/questions";

// Sihirbazın tamamındaki cevapları tutan tek state nesnesi.
// sessionStorage'da JSON olarak saklanır — sayfa yenilense/geri dönülse
// bile kaybolmaz (brief: "Form yarıda bırakılıp dönülebiliyor").
export type CheckupState = {
  isletmeAdi: string;
  sektor: string;
  isModeli: IsModeli | null;
  calisanSayisi: CalisanSayisi | null;
  ciroAraligi: CiroAraligi | null;
  problemMetni: string;
  // Soru id'sine göre cevap (örn. "musteri_bulma.surec": 2)
  cevaplar: Record<string, CevapDegeri>;
};

export const BOS_CHECKUP_STATE: CheckupState = {
  isletmeAdi: "",
  sektor: "",
  isModeli: null,
  calisanSayisi: null,
  ciroAraligi: null,
  problemMetni: "",
  cevaplar: {},
};

export type SkorSeviyesi = "kirmizi" | "sari" | "yesil";

export type FonksiyonSonucu = {
  id: string;
  no: number;
  baslik: string;
  puan: number; // 0-6
  seviye: SkorSeviyesi;
};

export type KatmanSonucu = {
  katman: "surec" | "sistem" | "yapi";
  etiket: string;
  puan: number; // 0-14 (7 fonksiyon x 2)
  maksimum: number;
};

export type CheckupSonuc = {
  toplamPuan: number; // 0-42
  maksimumPuan: number;
  skorYuzde: number; // 0-100
  fonksiyonlar: FonksiyonSonucu[];
  katmanlar: KatmanSonucu[];
  kirmiziBolge: FonksiyonSonucu[]; // en düşük 1-2 fonksiyon
};

// AI teşhis API'sinin döndürdüğü, sonuç ekranında gösterilen yapı.
export type TeshisSonucu = {
  ozet: string;
  kok_vida: "Yetkinlik" | "Kültür" | "Netlik";
  gerekce: string;
  ilk_yardim: [string, string, string];
  kapanis: string;
};
