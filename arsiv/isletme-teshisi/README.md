# İşletme Teşhisi — arşiv

Bu klasör, 21 Kasım 2026'da sökülen eski "şirket doktoru" sitesinin
**çalışan ve uçtan uca test edilmiş** teşhis motorudur. Site baştan
yazılırken silinmedi: Erdem'in kararıyla **"işletme teşhisi" olarak
başka bir yerde yeniden kullanılacak.**

Bu dosyalar uygulamaya dahil **değil** — `src/` dışında duruyorlar, bu
yüzden derlemeye girmiyorlar. Yeniden kullanılacakları zaman ilgili
dosya `src/` altına taşınır ve import yolları düzeltilir.

## Ne var

| Dosya | Ne işe yarar |
|---|---|
| `questions.ts` | 7 fonksiyon × 3 katman = 21 soruluk banka. Süreç / Sistem / Yapı katmanları, iş modeli ve ciro seçenekleri. Kod bilmeden düzenlenebilir. |
| `lib/scoring.ts` | Saf puanlama: VAR=2 · BELİRSİZ=1 · YOK=0. Fonksiyon başına 6 puan; 0–2 kırmızı, 3–4 sarı, 5–6 yeşil. "Kırmızı bölge" = en düşük iki fonksiyon, eşitlikte soru bankası sırası (deterministik). |
| `lib/types.ts` | Karne, sonuç ve teşhis tipleri. |
| `lib/steps.ts` | Sihirbazın adım sırası. |
| `lib/karne.ts` | Veritabanı satırını sihirbaz state'ine çeviren köprü. |
| `lib/prompt.ts` | Yapay zekâ ön teşhisinin sistem promptu. Model puan üretmez, yalnızca hazır skoru yorumlar. |
| `moduller.ts` | 14 modüllük katalog. İkisinin içeriği tamamdır — ham hâlleri için `icerik/ham/`. |
| `ornekKarne.ts` | Tanıtımda kullanılan örnek karne. Gerçek bir müşteriye ait **değildir**. |

## Neden saklandı

Motor çalışıyor ve iki kez canlı veritabanına karşı uçtan uca
doğrulandı: modül tamamlanınca onardığı sorular yeniden soruluyor, yeni
karne üretiliyor, plan ve tutar yeniden hesaplanıyor. Böyle bir parçayı
yeniden yazmak, taşımaktan pahalı.

## Yeniden kullanırken dikkat

- **Modül ve adım kimlikleri (`id`) asla değişmez.** Kullanıcı ilerleme
  kayıtları bunlara bağlıdır; değişirse ilerlemeler sahipsiz kalır.
  Serbestçe değiştirilebilen tek alan `baslik`.
- Bir modülün `onardigiSorular` listesi, modül bittiğinde gerçekten
  değişecek soruları göstermelidir — yoksa bitiş kontrolü yanlış karne
  üretir.
- Puanlama saf fonksiyonlardan oluşur, hiçbir dış bağımlılığı yoktur;
  olduğu gibi taşınabilir.
