@AGENTS.md

# Çalışma Protokolü

**Bu bölüm her şeyden önce gelir.**

## Oturum akışı

1. **Oturum başında** [TASKS.md](TASKS.md)'yi oku, "Sıradaki Görev"i al.
2. **İşe başlamadan önce** 3-5 maddelik bir plan sun ve **onay bekle.**
   Onay gelmeden kod yazma.
3. **İş bitince** şu sırayla:
   - [TASKS.md](TASKS.md)'yi güncelle: biten görevi tarihi ve kısa notuyla
     "Tamamlananlar"a taşı, bekleyenlerin en üstekini "Sıradaki Görev"e al.
   - Yeni bir karar alındıysa [KARARLAR.md](KARARLAR.md)'ye bir satır ekle.
   - [version.json](version.json)'daki `version` değerini bir artır.
   - commit + push.
   - Erdem'e **2 cümlelik** özet ver, ardından
     *"sıradaki görev şu, başlayayım mı?"* diye sor.

## Değişmez kurallar

- **API anahtarları asla repoya girmez.** Yalnızca `.env.local` (gitignore'da)
  ve Vercel ortam değişkenleri. Anahtar sohbete girdiyse Erdem'e yenilemesini
  hatırlat.
- **Uydurma müşteri yorumu, sahte referans veya doğrulanmamış istatistik
  yazılmaz.** Gerçek veri yoksa metodoloji ve şeffaflık üzerinden anlatılır.
- **Her değişiklik mobilde de kontrol edilir.** Mobil öncelikli düşün.
- **Türkçe karakterler bozulmaz** (ı, ş, ğ, ü, ö, ç, İ).
- Her iş sonunda `npm run lint` ve `npm run build` temiz geçmeli.

## Ton ve marka dili

Şirket doktorluğu metaforu; güven veren, net, **abartısız**. Doktor dili
dozunda kullanılır — her cümleye sıkıştırılmaz. Vaat şişirilmez, kesin
sonuç garantisi verilmez.

---

# Proje Yol Haritası — dijitalşirketim.com.tr

Türkiye'nin Şirket Doktoru konsepti üzerine kurulu, doktor metaforlu bir
dijital pazarlama danışmanlığı sitesi. Next.js 16 (App Router) +
TypeScript + Tailwind CSS v4, Vercel'de yayında.

Güncel görev listesi: [TASKS.md](TASKS.md) · Verilmiş kararlar: [KARARLAR.md](KARARLAR.md)

## Sayfa haritası

| Rota | Ne işe yarar |
|---|---|
| `/` | Tek sayfalık satış sitesi: Sorun → Acının Maliyeti → Tedavi Modeli → Neden Biz → Teklif (ücretli Dijital Check-Up paketi + başvuru formu) → SSS → Biz Kimiz (Amaç/Misyon/Vizyon) |
| `/check-up` | Ücretsiz, çok adımlı "Dijital Check-Up" sihirbazı — profil + 21 soru → Dijital Sağlık Karnesi + AI ön teşhisi. Landing'deki ana CTA'lar buraya bağlı. |
| `/admin` (+ `/admin/giris`, `/admin/cikis`) | Supabase Auth ile korunan yönetim paneli — `/`'deki başvuru formunun (Bölüm "Teklif") kayıtlarını listeler |
| `/api/basvuru` | `/` sayfasındaki başvuru formunu Supabase `basvurular` tablosuna yazar |
| `/api/teshis` | `/check-up` sonuç ekranındaki AI ön teşhis kartını besler (Anthropic Messages API, tool-use ile JSON) |

## Check-Up sihirbazı — mimari notları

- **Soru bankası ve tüm metin içerikleri**: [src/data/questions.ts](src/data/questions.ts) — kod bilmeden düzenlenebilir tek dosya (7 fonksiyon × 3 katman = 21 soru, iş modeli kartları, çalışan/ciro seçenekleri).
- **Puanlama**: [src/lib/checkup/scoring.ts](src/lib/checkup/scoring.ts) — saf fonksiyonlar, VAR=2/BELİRSİZ=1/YOK=0, fonksiyon eşikleri 0-2 kırmızı / 3-4 sarı / 5-6 yeşil.
- **State**: veritabanı yok (bilinçli MVP kararı) — sihirbazın tüm state'i `localStorage`'da tutulur ([useCheckupState.ts](src/components/checkup/useCheckupState.ts)). Sihirbaz `next/dynamic({ ssr: false })` ile yükleniyor ([CheckupWizardClient.tsx](src/components/checkup/CheckupWizardClient.tsx)) — bu sayede localStorage'a bağlı state hiç sunucuda render edilmiyor, hidrasyon uyuşmazlığı riski yok.
- **AI ön teşhis**: [src/lib/checkup/prompt.ts](src/lib/checkup/prompt.ts) sistem promptu + kullanıcı mesajını üretir; [/api/teshis/route.ts](src/app/api/teshis/route.ts) `claude-sonnet-5` modelini tool-use ile JSON şemaya zorlar. Kırmızı bölge sunucuda deterministik hesaplanır, model yalnızca yorumlar. `ANTHROPIC_API_KEY` tanımsızsa nazikçe 503 döner, kart WhatsApp fallback'ine düşer — sayfa asla boş kalmaz.

## Sürüm rozeti (geçici)

Sayfanın üstündeki sarı taslak rozeti, yayın numarasını
[version.json](version.json)'dan okur ([next.config.ts](next.config.ts) build
zamanında gömer). **Her commit'te `version.json` içindeki `version` değerini
bir artırın.** (Daha önce bu sayı git commit sayısından hesaplanıyordu; Vercel
build ortamı depoyu sığ klonladığı için hep yanlış çıkıyordu — bu yüzden
dış bağımlılığı olmayan basit bir sayaç dosyasına geçildi.)

## Ortam değişkenleri

Şablon: [.env.local.example](.env.local.example) (yerelde `.env.local` olarak kopyalayın; Vercel'de Project Settings → Environment Variables). `.env*` `.gitignore`'da — gerçek anahtarlar hiçbir zaman commit edilmez, yalnızca `.example` dosyası izleniyor.

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` — admin paneli + başvuru kayıtları
- `ANTHROPIC_API_KEY` — `/check-up` AI ön teşhis kartı

## Şu an bekleyenler

- [ ] Alan adı DNS'i Vercel'e taşınması (nameserver değişikliği tamamlanınca `dijitalşirketim.com.tr` canlıya çıkar)
- [ ] Supabase projesi kurulumu ([supabase/schema.sql](supabase/schema.sql) çalıştırılmadı, ortam değişkenleri henüz girilmedi) — girilene kadar `/admin` kapalı, form kayıtları yalnızca sunucu günlüğüne yazılıyor
- [ ] `ANTHROPIC_API_KEY` girilmedi — girilene kadar `/check-up` AI kartı WhatsApp fallback'i gösteriyor
- [ ] Google Search Console doğrulaması
- [ ] Site yayına hazır olduğunda: [DraftVersionBanner.tsx](src/components/DraftVersionBanner.tsx) ve `layout.tsx`'teki çağrısı kaldırılacak (geçici taslak sürüm rozeti)
