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

// Supabase "karneler" tablosundan okunan tek bir kayıt — bir kullanıcının
// geçmişte tamamladığı bir Check-Up'ın anlık görüntüsü. Alan adları
// tablo kolonlarıyla birebir eşleşir (snake_case), CheckupState'in
// camelCase alanlarıyla karıştırılmasın diye kasıtlı olarak ayrı tutulur
// — dönüşüm için bkz. karneyiCheckupStateYap() (./karne.ts).
export type Karne = {
  id: string;
  created_at: string;
  isletme_adi: string | null;
  sektor: string | null;
  is_modeli: string | null;
  calisan_sayisi: string | null;
  ciro_araligi: string | null;
  problem_metni: string | null;
  cevaplar: Record<string, CevapDegeri>;
  ai_teshis: TeshisSonucu | null;
  durum: string;
};
