# Kararlar — dijitalşirketim.com.tr

> Verilmiş her stratejik/teknik karar burada bir satır olarak durur.
> Amaç: "bunu neden böyle yapmıştık?" sorusunu ileride tekrar tartışmamak.
> Yeni karar alındığında en üste tarihiyle eklenir.

---

**2026-09-07 — Üyelik açılınca "authenticated = admin" varsayımı terk edildi.**
`basvurular` tablosunun RLS kuralı önceden "herhangi bir giriş yapmış
kullanıcı okuyabilir" idi — güvenliydi çünkü Supabase Auth'a yalnızca admin
hesabı elle ekleniyordu. Halka açık müşteri kaydı açılınca bu varsayım
yanlış hale geldi: herhangi bir müşteri hesabı da tüm başvuruları
okuyabilirdi. Çözüm: `profiles` tablosu + `is_admin` bayrağı eklendi
(yeni kullanıcılar tetikleyiciyle `is_admin=false` alır), `basvurular`
kuralı yalnızca `is_admin=true` olanlara daraltıldı, admin panelinde de
ikinci savunma katmanı olarak aynı kontrol eklendi.

**2026-09-07 — `karneler` tablosu ham veriyi saklar, skoru saklamaz.**
Check-up sonucu (profil + 21 cevap) Supabase'e kaydedilirken toplam puan /
skor yüzdesi gibi türetilmiş alanlar AYRICA saklanmadı — bunun yerine her
görüntülemede `skorHesapla()` ile taze hesaplanıyor. Gerekçe: puanlama
mantığı ileride değişirse (eşikler, ağırlıklar) liste ve detay ekranları
hep tutarlı kalsın, tek doğruluk kaynağı `scoring.ts` olsun. AI teşhis
(`ai_teshis`) ise istisna: o bir LLM çıktısı olduğu için görüntülemede
yeniden üretilmiyor (hem maliyet hem "her açılışta farklı metin çıkması"
riskine karşı), olduğu gibi saklanan bir anlık görüntü.

**2026-09-07 — gemini-2.5-flash için "thinking" kapatıldı, çıktı bütçesi büyütüldü.**
Canlı log'da görüldü: fallback devreye girip gemini-2.5-flash'a geçtiğinde
yanıt `SyntaxError: Unterminated string in JSON` ile yarıda kesiliyordu.
Sebep: 2.5-flash varsayılan olarak "thinking" modunda çalışıyor, iç düşünme
token'ları `maxOutputTokens` (2048) bütçesini tüketip asıl JSON çıktısına yer
bırakmıyordu. Bu görev (sabit şemaya göre kısa yorum) derin düşünme
gerektirmediğinden 2.5 ailesinde `thinkingBudget: 0` ile düşünme kapatıldı;
ayrıca tüm modeller için pay 2048'den 4096'ya çıkarıldı. `gemini-3.8-flash`'ta
bu alan set edilmiyor (desteklenmeyebilir, zaten tek gözlemlenen hatası 503).

**2026-09-07 — AI ön teşhis, model aşırı yüklendiğinde gemini-2.5-flash'a geçer.**
Canlıda gözlemlendi: gemini-3.8-flash ücretsiz katmanda zaman zaman
"UNAVAILABLE — model şu an aşırı talep görüyor" (503) döndürüyor. Kod/anahtar
sorunu değil, Google'ın kapasite kısıtı. Çözüm: 3.8-flash başarısız olursa
otomatik olarak daha uzun süredir kararlı (GA) olan gemini-2.5-flash'a
geçiliyor. 429 (kota) için de aynı kademeli geçiş uygulanıyor.

**2026-09-03 — AI ön teşhis Anthropic yerine Google Gemini ile çalışır.**
Gerekçe: maliyet — Gemini'nin ücretsiz katmanı MVP için yeterli. Model
`gemini-3.8-flash`, yapılandırılmış çıktı (responseJsonSchema) ile şemaya
zorlanıyor.

**2026-09-03 — AI'ya gönderilen veriden işletme adı çıkarılır.**
Gemini'nin ÜCRETSİZ katmanında gönderilen içerik Google tarafından ürün
geliştirme/model eğitimi için kullanılabiliyor (ücretli katmanda
kullanılmıyor). Teşhise gönderilen veri sektör, ölçek, 21 cevap ve serbest
problem metnini içerdiğinden, işletme adı gönderilmeyerek veri
kimliksizleştiriliyor. Model isimden teşhise katkı sağlayacak bir şey
çıkarmadığı için kalite kaybı yok. Ücretli katmana geçilirse bu kısıt
gözden geçirilebilir. KVKK metninde bu aktarım açıklanmalı.

**2026-09-03 — MVP'de ödeme manuel havale/EFT ile alınır.**
Sanal POS (iyzico/PayTR) tüzel kişilik gerektiriyor, şirket henüz kurulmadı.
Talep gelmeye başlayınca şirket kurulup sanal POS'a geçilecek. Her başvuruya
`DS-XXXX` biçiminde bir referans kodu üretilir; müşteri havale açıklamasına
bunu yazar, gelen ödeme başvuruyla bu kodla eşleştirilir.

**2026-09-03 — Ödeme bilgileri girilene kadar ekranda IBAN gösterilmez.**
Ücret/IBAN/hesap sahibi [src/data/odeme.ts](src/data/odeme.ts)'de tek yerde
tutulur; üçü de dolu değilse başvuru sonrası ekran IBAN yerine "bilgiler
paylaşılacak" deyip WhatsApp'a yönlendirir. Gerekçe: yer tutucu bir IBAN'ın
canlıya sızması, müşterinin yanlış hesaba para göndermesi demek olurdu.

**2026-09-03 — Ana sayfada fiyat gösterilmez.**
Fiyat, başvuru adımında açıklanır. Gerekçe: doktor metaforu tutarlılığı —
teşhis konmadan tedavi fiyatı verilmez. Ödeme ekranı geldiğinde fiyat,
ödemeden önce net ve açık gösterilecek; sürpriz maliyet olmayacak.

**2026-09-03 — Sürüm numarası `version.json`'dan okunur.**
Git commit sayısı ve GitHub API denendi, ikisi de Vercel'in build ortamında
çalışmadı (sığ klon / `curl` yok). Dış bağımlılığı olmayan sayaç dosyası
tercih edildi. Her commit'te elle bir artırılır.

**2026-09-01 — Hosting Vercel, DNS Vercel nameserver'ları üzerinden.**
Alan adı İsimtescil'de kayıtlı ama nameserver'lar `ns1/ns2.vercel-dns.com`'a
taşındı. Böylece SSL, www yönetimi ve deploy'lar tek yerden yönetiliyor.

**2026-08-31 — Değer merdiveni: düşük fiyatlı check-up → tam tedavi paketi.**
Ücretsiz `/check-up` sihirbazı üstte huninin girişi; ücretli Dijital Check-Up
ilk basamak; tam tedavi paketi ikinci basamak.

**2026-08-31 — MVP'de veritabanı yok, önce check-up motoru.**
Sihirbazın tüm state'i `localStorage`'da tutulur. Gerekçe: check-up motorunun
doğruluğunu kanıtlamak, veri modeli kararlarını erken çakmamak. Başvuru
kayıtları için Supabase ayrıca kurulacak.

**2026-08-31 — AI çıktısı tool-use ile şemaya zorlanır.**
Modelden serbest metin içinde JSON istemek yerine tool-use kullanılıyor;
ayrıştırma hatası riski sıfır. Ayrıca kırmızı bölge sunucuda deterministik
hesaplanır, model yalnızca yorumlar — puanlama modele bırakılmaz.

**2026-08-30 — Uydurma müşteri yorumu ve sahte referans kullanılmaz.**
İlk taslakta yer tutucu yorumlar vardı, kaldırıldı. Gerçek referanslar
gelene kadar "Neden Biz" bölümü metodoloji ve şeffaflık üzerinden anlatılır.

**2026-08-30 — Tasarım dili: Apple.**
Sistem tipografisi, yay eğrisi (`--ease-apple`) geçişler, cam efektli navbar,
büyük köşe yarıçapları, `prefers-reduced-motion` desteği. Emoji ikonlar
yerine tek tip SVG ikon seti.
