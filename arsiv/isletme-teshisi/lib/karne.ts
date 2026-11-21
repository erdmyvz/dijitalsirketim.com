import type { CalisanSayisi, CiroAraligi, IsModeli } from "@/data/questions";
import type { CheckupState, Karne } from "./types";

// Supabase'den okunan bir "karneler" satırını, sihirbazın ve sonuç
// ekranının kullandığı CheckupState şekline çevirir. Bu sayede skorlama
// (skorHesapla) ve AI teşhis kartı, geçmiş bir karneyi de canlı
// sihirbazdaki state'ten farksız işleyebilir — tek bir doğruluk
// kaynağı.
export function karneyiCheckupStateYap(karne: Karne): CheckupState {
  return {
    isletmeAdi: karne.isletme_adi ?? "",
    sektor: karne.sektor ?? "",
    isModeli: karne.is_modeli as IsModeli | null,
    calisanSayisi: karne.calisan_sayisi as CalisanSayisi | null,
    ciroAraligi: karne.ciro_araligi as CiroAraligi | null,
    problemMetni: karne.problem_metni ?? "",
    cevaplar: karne.cevaplar,
  };
}
