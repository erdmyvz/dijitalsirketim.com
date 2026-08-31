import {
  CALISAN_SAYILARI,
  CEVAP_SECENEKLERI,
  CIRO_ARALIKLARI,
  FONKSIYONLAR,
  IS_MODELLERI,
} from "@/data/questions";
import type { CheckupSonuc, CheckupState } from "./types";

export const TESHIS_SISTEM_PROMPTU = `Sen Dijital Şirketim'in şirket doktorusun. Görevin ÖN TEŞHİS koymak, kullanıcıya sunulan "dijital_teshis_koy" aracını çağırarak yapılandırılmış bir yanıt üretmek:

(a) Kırmızı bölgeyi (en düşük puanlı fonksiyon(lar)) işletmenin kendi cevaplarına doğrudan atıf yaparak 2-3 cümleyle yorumla.
(b) Şikayet metnine 5 Neden mantığını uygula ve muhtemel kök vidayı tahmin et: Yetkinlik mi, Kültür mü, Netlik mi? Gerekçeni kırmızı bölgedeki cevaplara dayandır.
(c) Bu hafta uygulanabilir, somut ve küçük 3 maddelik "ilk yardım" önerisi ver — büyük projeler değil, bugün başlanabilecek adımlar.
(d) Tam tedavi planını ANLATMA, fiyat SÖYLEME, kesin sonuç garantisi VERME. Tam reçetenin ücretli teşhis görüşmesinde çıkarıldığını nazikçe belirt.

Ton: Türkçe, güven veren, doktor metaforu dozunda (abartısız). Uydurma istatistik ve abartı yasak. Yalnızca sana verilen verilere dayan, işletme hakkında bilmediğin hiçbir şeyi varsayma.`;

function cevapEtiketi(deger: number | undefined): string {
  if (deger === undefined) return "Cevaplanmadı";
  return CEVAP_SECENEKLERI.find((s) => s.deger === deger)?.etiket ?? "Bilinmiyor";
}

export function teshisKullaniciMesaji(
  state: CheckupState,
  sonuc: CheckupSonuc,
): string {
  const isModeli = IS_MODELLERI.find((m) => m.id === state.isModeli)?.baslik ?? "Belirtilmedi";
  const calisanSayisi =
    CALISAN_SAYILARI.find((c) => c.id === state.calisanSayisi)?.etiket ?? "Belirtilmedi";
  const ciro =
    CIRO_ARALIKLARI.find((c) => c.id === state.ciroAraligi)?.etiket ?? "Belirtilmedi";

  const soruSatirlari = FONKSIYONLAR.flatMap((f) =>
    f.sorular.map(
      (s) => `- [${f.baslik} / ${s.katman}] "${s.metin}" → ${cevapEtiketi(state.cevaplar[s.id])}`,
    ),
  ).join("\n");

  const fonksiyonOzeti = sonuc.fonksiyonlar
    .map((f) => `${f.baslik}: ${f.puan}/6 (${f.seviye})`)
    .join(", ");

  const kirmiziBolgeOzeti = sonuc.kirmiziBolge.map((f) => f.baslik).join(", ") || "yok";

  return `İŞLETME PROFİLİ
Ad: ${state.isletmeAdi || "Belirtilmedi"}
Sektör: ${state.sektor || "Belirtilmedi"}
İş modeli: ${isModeli}
Çalışan sayısı: ${calisanSayisi}
Aylık ciro aralığı: ${ciro}

GENEL SKOR: ${sonuc.toplamPuan}/${sonuc.maksimumPuan} (%${sonuc.skorYuzde})
FONKSİYON PUANLARI: ${fonksiyonOzeti}
KIRMIZI BÖLGE (en zayıf fonksiyon(lar), zaten hesaplandı — sen sadece yorumla): ${kirmiziBolgeOzeti}

21 SORUNUN TÜM CEVAPLARI:
${soruSatirlari}

İŞLETME SAHİBİNİN YAZDIĞI ŞİKAYET:
"${state.problemMetni || "Belirtilmedi"}"

Yukarıdaki verilere dayanarak dijital_teshis_koy aracını çağır.`;
}
