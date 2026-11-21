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

Net, sade, **abartısız**. Vaat şişirilmez, kesin sonuç garantisi
verilmez. Henüz çalışmayan bir şey çalışıyormuş gibi anlatılmaz —
sitedeki "Durum" bölümü hangi fazda olduğumuzu açıkça söyler.

Ürünün tezi Erdem'in kendi ilkesi: **"Amerika'yı yeniden keşfetmeye
gerek yok."** Çalıştığı kanıtlanmış işi bul, markana uyarla, uygula.
Birebir kopyalama değil — uyarlama.

---

# Proje — dijitalşirketim.com.tr

Dijital pazarlama işini kurmak ve işletmek için bir ürün. Next.js 16
(App Router) + TypeScript + Tailwind CSS v4, Vercel'de yayında.

**2026-11-21'de ürün tamamen değişti.** Eski "şirket doktoru /
check-up / tedavi" kurgusu söküldü. Geçmişi `arsiv/` ve `icerik/ham/`
altında duruyor; gerekçeler [KARARLAR.md](KARARLAR.md)'de.

Güncel görev listesi: [TASKS.md](TASKS.md) · Verilmiş kararlar: [KARARLAR.md](KARARLAR.md)

## Sayfa haritası

| Rota | Ne işe yarar |
|---|---|
| `/` | Tek sayfa: Hero → İki kitle → 4 Ajan → 5 Modül → 6 Başlıklı Program → Durum (yol haritası) → Görüşme formu → SSS |
| `/api/gorusme` | Görüşme formunu Supabase `gorusme_talepleri` tablosuna yazar |
| `/kvkk`, `/gizlilik` | Yasal metinler |

## Mimari notları

- **Bütün site metni tek dosyada**: [src/data/icerik.ts](src/data/icerik.ts).
  Ajanlar, modüller, program başlıkları, fazlar, SSS — hepsi burada.
  Kod bilmeden düzenlenebilen tek dosya; bir başlığı değiştirmek için
  bileşenlere dokunmak gerekmez.
- **Modül ekranları kodla çiziliyor**
  ([src/components/moduller/Ekranlar.tsx](src/components/moduller/Ekranlar.tsx)),
  ekran görüntüsü yapıştırılmıyor: dar ekranda bozulmuyor, metin
  seçilebiliyor. **Hepsinde "Örnek ekran" rozeti var** — rakamlar ve
  isimler uydurmadır, gerçek müşteriye ait değildir.
- **`Reveal` içeriği asla gizleyemez**
  ([src/components/Reveal.tsx](src/components/Reveal.tsx)): görünür
  render edilir, gizleme sonradan ve yalnızca ekran altındaki bloklara
  uygulanır. Ölçüm 250 ms geciktirilir (çapa bağlantısı sorunu) ve ortak
  bir kaydırma süpürücüsü gözlemcinin kaçırdıklarını yakalar. Bu dosyayı
  "sadeleştirmeden" önce KARARLAR.md'deki 2026-11-21 maddesini okuyun.
- **Form asla kırılmaz**: Supabase yapılandırılmamışsa talep sunucu
  günlüğüne yazılır ve yine başarı döner. Yazma hatası olursa ziyaretçi
  WhatsApp'a yönlendirilir, kayıt yine günlüğe düşer.
- **Çerez yok.** Oturum, analiz, takip — hiçbiri. Bu yüzden onay şeridi
  de yok. Ölçümleme eklenirse `/gizlilik` güncellenip şerit geri gelmeli.

## Arşiv

- [arsiv/isletme-teshisi/](arsiv/isletme-teshisi/) — 21 soruluk banka,
  puanlama motoru, 14 modüllük katalog. `src/` dışında, derlemeye
  girmiyor (tsconfig `exclude`). "İşletme teşhisi" olarak başka bir
  yerde kullanılacak.
- [icerik/ham/](icerik/ham/) — Erdem'in kendi kaleminden iki modül
  metni, hiç düzenlenmeden.

## Ortam değişkenleri

Şablon: [.env.local.example](.env.local.example). `.env*` `.gitignore`'da.

- `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` — görüşme
  taleplerinin yazıldığı veritabanı. **İkisi de boşsa site yine
  çalışır**; talep günlüğe yazılır.

## Sürüm sayacı

[version.json](version.json) her commit'te bir artırılır. Sayfadaki
taslak rozeti 21 Kasım 2026'da kaldırıldı, sayaç sürüm takibi için
duruyor.
