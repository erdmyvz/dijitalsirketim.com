# Görev Panosu — dijitalşirketim.com.tr

> Bu dosya projenin tek doğruluk kaynağıdır. Her oturumun başında okunur,
> her iş bitiminde güncellenir. Çalışma protokolü: [CLAUDE.md](CLAUDE.md)

---

## Sıradaki Görev

### 1. Ana sayfadan fiyatın kaldırılması

Teklif bölümündeki rakam (20.000 TL) ve üstü çizili referans değer (100.000 $)
kaldırılacak; yerine paket içeriği değer istifi olarak listelenecek ve
"önce teşhis, sonra fiyat" çerçeve metni konacak. SSS'ye "Neden fiyat sitede
yazmıyor?" sorusu eklenecek, artık tutarsız kalan "Bu fiyata nasıl mümkün?"
sorusu kaldırılacak. JSON-LD'deki `price` alanı da temizlenecek — aksi halde
Google, sayfada yazmasa bile fiyatı arama sonuçlarında gösterir.

---

## Bekleyen Görevler

Öncelik sırasına dizilidir. Üstteki biter, "Sıradaki Görev"e taşınır.

### 2. Ödeme entegrasyonu (iyzico / PayTR)
Önce karşılaştırmalı araştırma (komisyon oranları, Türkiye'de tüzel kişilik
gereksinimleri, entegrasyon zorluğu, test ortamı), sonra kurulum. Fiyat,
ödeme ekranında ödemeden önce net ve açık gösterilecek.

### 3. Üyelik ve müşteri paneli
Check-up sonuçlarının kaydedilmesi, kullanıcının geçmiş karnelerini görmesi,
tedavi sürecinin takibi. Supabase Auth üzerine kurulacak.

### 4. KVKK / gizlilik metni ve çerez bildirimi
Şu an footer'daki ve form altındaki yasal bağlantılar boş (`#`). Gerçek
metinler hazırlanıp sayfa olarak eklenecek, çerez bildirimi kurulacak.

### 5. SEO, performans ve mobil son cila
Core Web Vitals ölçümü, görsel optimizasyonu, Search Console doğrulaması,
mobilde son gözden geçirme.

---

## Dış Bağımlılıklar (Erdem'in yapması gerekenler)

Bunlar tamamlanmadan ilgili özellikler canlıda çalışmaz:

- [ ] **Anthropic kredisi** — anahtar geçerli ve kurulu, ama hesapta bakiye
      yok. Yüklenene kadar `/check-up` AI kartı WhatsApp yedeğine düşüyor.
      (console.anthropic.com → Plans & Billing)
- [ ] **Anthropic anahtarını yenile** — mevcut anahtar sohbete yapıştırıldı,
      canlıya çıkmadan iptal edilip yenisi oluşturulmalı.
- [ ] **Supabase projesi** — oluşturulup [supabase/schema.sql](supabase/schema.sql)
      çalıştırılacak, admin kullanıcı eklenecek, 3 ortam değişkeni hem
      `.env.local`'e hem Vercel'e girilecek. Girilene kadar `/admin` kapalı,
      başvurular yalnızca sunucu günlüğüne yazılıyor.
- [ ] **`www` alt alan adı** — Vercel → Domains'e eklenmeli ki SSL alsın;
      koddaki www→apex yönlendirmesi ancak o zaman devreye girer.
- [ ] **Google Search Console** — alan adı doğrulaması.

---

## Tamamlananlar

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
