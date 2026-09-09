# Görev Panosu — dijitalşirketim.com.tr

> Bu dosya projenin tek doğruluk kaynağıdır. Her oturumun başında okunur,
> her iş bitiminde güncellenir. Çalışma protokolü: [CLAUDE.md](CLAUDE.md)

---

## Uzun Vadeli Vizyon

**2026-09-08, Erdem'in kendi ifadesiyle:** "Bu site birisine bağlı
kalmadan işletmelerin ihtiyaçlarını karşılayan bir para basma makinesine
dönüşmeli. Tüm işletmeler gözle görülür bir şekilde gelirlerini
arttırmalı ve bu sisteme dahil olup sadakat zincirine dönüşmeli. Eski
işletmelerin başarıları ile yeni işletmeler sisteme dahil olarak bu
sistemin başarısı kanıtlanmalıdır."

Kendi kendini besleyen döngü: müşteri → ölçülebilir gelir artışı →
sisteme sadakat → o başarı yeni müşteri getirir. Bu bölümdeki hiçbir
madde henüz onaylanmış bir görev DEĞİL — yalnızca gelecekteki
önceliklendirmede filtre olarak kullanılacak bir yön. Somut bir adıma
dönüştürmeden önce her zaman plan sunulup onay beklenecek (bkz.
CLAUDE.md). Olası yönler:
- Gerçek sonuç/vaka çalışmaları — **ancak** gerçek ücretli müşteriler ve
  ölçülmüş sonuçlar oluştuktan sonra (CLAUDE.md: sahte referans/uydurma
  istatistik asla yazılmaz — şu an gerçek müşteri yok).
- Sadakat/tavsiye programı — eski müşteri yeni müşteri getirirse ne
  kazanır?
- Müşterinin kendi sonuç/gelir ilerlemesini gördüğü bir pano —
  mevcut `/hesap` panelinin (karne geçmişi) ötesinde.

İlk somut adım muhtemelen: ilk gerçek ücretli müşteriler geldikten
sonra sonuçlarını ölçüp göstermenin altyapısını kurmak.

---

## Sıradaki Görev

### 1. Sanal POS entegrasyonu (iyzico / PayTR)
Şirket kurulduktan sonra. Komisyon oranları, entegrasyon zorluğu ve test
ortamı karşılaştırılıp seçim yapılacak. Fiyat, ödeme ekranında ödemeden
önce net gösterilecek.

---

## Bekleyen Görevler

Öncelik sırasına dizilidir. Üstteki biter, "Sıradaki Görev"e taşınır.

### 2. Admin panelinden karne durumu güncelleme
"Tedavi sürecinin takibi" başlığının ikinci yarısı: `karneler.durum`
alanı şu an yalnızca müşteri panelinde salt okunur gösteriliyor
(varsayılan "Beklemede"). Admin panelinden bu alanı güncelleyebilme
(ör. "İnceleniyor" / "Teklif Gönderildi" / "Tamamlandı") ayrı bir görev
olarak bırakıldı.

### 3. Şifremi unuttum akışı
Müşteri girişinde (/hesap/giris) şifre sıfırlama bağlantısı yok. MVP'de
bilinçli olarak dışarıda bırakıldı, ihtiyaç doğunca eklenecek.

### 4. Sosyal medya hesapları açılınca JSON-LD'ye eklenmeli
Şu an Instagram/LinkedIn vb. yok (2026-09-09 itibarıyla). Açılırsa
`organizationJsonLd`'deki (`src/app/page.tsx`) `sameAs` alanına
eklenmeli — Google'a "bu hesaplar aynı işletmeye ait" sinyali verir.

---

## Dış Bağımlılıklar (Erdem'in yapması gerekenler)

Bunlar tamamlanmadan ilgili özellikler canlıda çalışmaz:

- [x] **Gemini API anahtarı** — `.env.local`'e ve Vercel → Environment
      Variables'a girildi, canlıda `/api/teshis` uçtan uca test edildi
      (200, gerçek teşhis JSON'u döndü). Yol boyunca iki canlı hata
      bulunup düzeltildi: model aşırı yüklenmesi (503 → gemini-2.5-flash'a
      otomatik geçiş) ve 2.5-flash'ın "thinking" modunun JSON çıktısını
      yarıda kesmesi (`thinkingBudget: 0` ile çözüldü). Detay: KARARLAR.md.
- [x] **Supabase projesi** — oluşturuldu, [supabase/schema.sql](supabase/schema.sql)
      çalıştırıldı, 3 anahtar `.env.local`'e girildi ve canlı API'ye karşı
      doğrulandı. RLS testi yapıldı: `service_role` okuyup yazabiliyor,
      `anon` anahtarı hem okumayı hem yazmayı doğru şekilde reddediyor.
      `/api/basvuru` gerçek bir kaydı Supabase'e yazdığı doğrulandı
      (test kaydı silindi). **Kalan:**
      - [ ] Admin kullanıcısı eklenmeli — Supabase → Authentication →
        Users → Add user (e-posta/şifreyi Erdem kendisi belirler, bu adım
        güvenlik gereği devredilemez).
      - [x] 3 anahtar Vercel → Environment Variables'a da girildi
        (Erdem ekran görüntüleriyle doğruladı, 2026-09-07).
- [ ] **Ödeme bilgileri** — `src/data/odeme.ts` içindeki ücret, IBAN ve
      hesap sahibi adı doldurulmalı. Doldurulana kadar başvuru sonrası ekran
      IBAN göstermeyip WhatsApp'a yönlendiriyor.
- [ ] **`www` alt alan adı** — Vercel → Domains'e eklenmeli ki SSL alsın;
      koddaki www→apex yönlendirmesi ancak o zaman devreye girer.
- [x] **Google Search Console** — mülk doğrulandı (`layout.tsx`'e
      eklenen `google-site-verification` etiketiyle), sitemap.xml
      gönderildi, ana sayfa için dizine eklenme talep edildi
      (2026-09-09, Erdem tarafından).

---

## Tamamlananlar

### 2026-09-09 — SEO: Google Search Console, OG görseli, mobil kontrol
Site Google'da hiç dizine alınmamıştı (`site:` araması sıfır sonuç) —
sebep kötü SEO değil, ~1 haftalık yeni bir alan adının henüz taranmamış
olması. Yapılanlar: (1) Google Search Console mülk doğrulaması
(`layout.tsx`'e `google-site-verification` etiketi eklendi), Erdem
sitemap.xml'i gönderdi ve ana sayfa için dizine eklenmeyi talep etti;
(2) `next/og` ile kod-tabanlı, marka tutarlı bir Open Graph paylaşım
görseli eklendi (`src/app/opengraph-image.tsx`, 1200x630) — önceden
WhatsApp/sosyal paylaşımlarda hiç önizleme görseli çıkmıyordu; (3) mobil
son kontrol yapıldı, sorun bulunmadı (içerik sunucu tarafında render
ediliyor, 0.5s'lik CSS "belirme" animasyonu LCP'yi etkilemiyor).
Teknik SEO temeli (title/description/canonical/robots meta/JSON-LD
ProfessionalService+FAQPage) zaten sağlamdı, incelemede doğrulandı.
`sameAs` (sosyal medya) ve Google İşletme Profili, Erdem'in kararıyla
şimdilik atlandı — sosyal hesap yok, GİP istenmiyor (bkz. Bekleyen
Görevler #4). Not: "en üstte çıkma" kod değişikliğiyle garanti
edilemeyeceği, zamana/geri bağlantıya bağlı olduğu Erdem'e açıkça
belirtildi.

### 2026-09-08 — KVKK Aydınlatma Metni, Gizlilik Politikası ve çerez bildirimi
`/kvkk` (KVKK Aydınlatma Metni — veri sorumlusu: Erdem Yavuz, şahıs;
şirket kurulunca güncellenecek) ve `/gizlilik` (Gizlilik Politikası +
Çerezler, sade dille) sayfaları eklendi — toplanan veriler (başvuru,
check-up, hesap, karneler), Supabase ve Google Gemini'ye aktarım
(işletme adının bilinçli olarak dışarıda bırakıldığı dahil), saklama
süresi ve KVKK m.11 hakları anlatılıyor. Footer'daki ve başvuru
formundaki `#` yer tutucular gerçek sayfalara bağlandı. Site'de yalnızca
zorunlu/işlevsel çerez (Supabase Auth oturum çerezi) kullanıldığından —
takip/analiz çerezi yok — ağır bir kabul/red ekranı yerine tek
"Anladım" ile kapanan, localStorage'da hatırlanan hafif bir şerit
eklendi (`CerezBildirimi.tsx`, hidrasyon uyuşmazlığına karşı
`next/dynamic({ssr:false})` ile yükleniyor — `useCheckupState.ts`'teki
aynı desen). `/kvkk` ve `/gizlilik` sitemap.xml'e eklendi.

Ayrıca bu görevi doğrularken canlıda bulunan bir hata da düzeltildi:
`/admin` ve `/hesap` 500 veriyordu (Vercel'deki `NEXT_PUBLIC_SUPABASE_URL`
değeri "ANAHTAR=DEĞER" biçiminde yanlış girilmişti). `proxy.ts` artık
URL'nin `http(s)://` ile başladığını da kontrol ediyor, geçersizse
çökmek yerine `/`'e yönlendiriyor. Erdem değeri Vercel'de düzeltip
redeploy etti, canlıda gerçek bir test hesabıyla (kayıt → check-up →
otomatik kayıt → panelde görüntüleme) uçtan uca doğrulandı.

### 2026-09-07 — Üyelik ve müşteri paneli
Supabase Auth üzerine müşteri hesabı sistemi: `/hesap/kayit`, `/hesap/giris`
(admin girişinden tamamen ayrı), `/hesap` (geçmiş karnelerin listesi) ve
`/hesap/karne/[id]` (detay). Check-up sonuç ekranına "Sonuçlarını Kaydet"
kartı eklendi — giriş yapılmışsa AI teşhis tamamlanır tamamlanmaz otomatik
kaydeder, yapılmamışsa hesap oluşturmaya yönlendirir (localStorage sayesinde
hesap oluşturduktan sonra check-up'a dönüldüğünde aynı sonuç ekranı otomatik
kaydedilir). Güvenlik ön koşulu: `profiles` tablosu + `is_admin` bayrağı
eklendi, çünkü halka açık üyelik açılınca "authenticated = admin" varsayımı
geçersiz hale geliyordu — `basvurular` tablosunun okuma kuralı yalnızca
admin'e daraltıldı, admin panelinde de ikinci bir savunma katmanı olarak
is_admin kontrolü eklendi. Yeni `karneler` tablosu yalnızca ham veriyi
(profil + 21 cevap) saklıyor, skor her görüntülemede taze hesaplanıyor;
AI teşhis ise tekrar üretilmeden bir "anlık görüntü" olarak saklanıyor.
Canlı Supabase projesinde gerçek bir test hesabıyla uçtan uca doğrulandı
(kayıt → trigger ile profil oluşumu → kendi karnesini okuma/yazma →
`basvurular`'ı görememe → admin işaretlenince görebilme), test verileri
temizlendi. "Tedavi sürecinin takibi" için `durum` alanı eklendi ama admin
tarafından güncellenmesi ayrı bir göreve bırakıldı (bkz. Bekleyen Görevler).

### 2026-09-07 — Gemini entegrasyonu canlıda uçtan uca doğrulandı
API anahtarları (Gemini + Supabase) Vercel'e girildi, gerçek anahtarlarla
canlı doğrulama yapıldı. `/api/teshis` canlıda iki ayrı hatayla karşılaştı,
ikisi de log'lardan teşhis edilip düzeltildi: (1) `gemini-3.8-flash`
ücretsiz katmanda zaman zaman 503 (aşırı talep) dönüyordu → otomatik olarak
`gemini-2.5-flash`'a geçen model sırası eklendi; (2) 2.5-flash varsayılan
"thinking" modu `maxOutputTokens`'ı tüketip JSON çıktısını yarıda kesiyordu
→ 2.5 ailesinde düşünme kapatıldı (`thinkingBudget: 0`), pay 4096'ya
çıkarıldı. Son test: 200, tutarlı bir teşhis metni, 6 saniyede.

### 2026-09-03 — AI ön teşhis Gemini'ye taşındı
Maliyet nedeniyle Anthropic yerine Google Gemini (`gemini-3.8-flash`,
ücretsiz katman). Yapılandırılmış çıktı ile JSON şeması garanti altında.
Gizlilik önlemi: ücretsiz katmanda veri model eğitimine gidebildiği için
prompt'tan işletme adı çıkarıldı. Ortam değişkeni: `GEMINI_API_KEY`.

### 2026-09-03 — Ödeme akışı (manuel havale/EFT)
Her başvuruya sunucuda `DS-XXXX` referans kodu üretiliyor; başvuru sonrası
ekran tutar/IBAN/alıcı ve bu kodu gösteriyor, WhatsApp dekont butonuna kod
otomatik geçiyor. Ödeme bilgileri girilene kadar IBAN gösterilmiyor (yanlış
hesaba ödeme riskine karşı). Ücret/IBAN/hesap sahibi tek dosyada:
`src/data/odeme.ts`. Admin paneline ve veritabanı şemasına referans kodu
kolonu eklendi.

### 2026-09-03 — Ana sayfadan fiyat kaldırıldı
"20.000 TL" ve üstü çizili "100.000 $" kaldırıldı; yerine değer istifi ve
"önce teşhis, sonra fiyat" çerçeve metni kondu. SSS'ye "Neden fiyat sitede
yazmıyor?" eklendi, "Bu fiyata nasıl mümkün?" kaldırıldı. JSON-LD'deki
`price` alanı da temizlendi (Google sayfada görünmeyen fiyatı da gösterir).
CTA: "Dijital Check-Up Başvurusu".

### 2026-09-03 — Proje yönetim yapısı
TASKS.md, KARARLAR.md oluşturuldu; CLAUDE.md'ye çalışma protokolü eklendi.

### 2026-09-03 — Sürüm rozeti sayacı düzeltildi
Sayı git commit sayısından hesaplanıyordu, Vercel'in sığ klonu yüzünden hep
yanlış çıkıyordu. Dış bağımlılığı olmayan `version.json` sayacına geçildi.

### 2026-09-01 — Alan adı canlıya alındı
DNS Vercel nameserver'larına taşındı, SSL aktif, `www → apex` yönlendirmesi
koda eklendi (Vercel'de www eklenince devreye girecek).

### 2026-08-31 — Başvuru formu ve WhatsApp akışı
Ad/işletme/sektör/telefon alanları, KVKK onayı, WhatsApp yedek kanalı.
`/api/basvuru` Supabase'e yazacak şekilde hazır — env değişkenleri girilene
kadar günlüğe yazıyor.

### 2026-08-31 — AI Ön Teşhis (`/api/teshis`)
Anthropic Messages API (claude-sonnet-5), tool-use ile şemaya zorlanan JSON
çıktı. Kırmızı bölge sunucuda deterministik hesaplanıyor, model yalnızca
yorumluyor. Kredi yüklenince uçtan uca doğrulanacak.

### 2026-08-31 — Dijital Sağlık Karnesi
Skor göstergesi, 7 fonksiyon renk kodlaması (0-2 kırmızı / 3-4 sarı /
5-6 yeşil), kırmızı bölge vurgusu, Süreç/Sistem/Yapı katman kırılımı.

### 2026-08-31 — `/check-up` sihirbazı
Profil soruları + 21 soruluk banka (7 fonksiyon × 3 katman), adım göstergesi,
geri/ileri, localStorage ile yarıda bırakıp dönebilme.

### 2026-08-30 — Satış sayfası ve altyapı
Tek sayfalık satış sitesi (Sorun → Acı → Tedavi Modeli → Neden Biz → Teklif →
SSS → Biz Kimiz), Apple tasarım dili, admin paneli iskeleti, SEO paketi.
