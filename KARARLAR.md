# Kararlar — dijitalşirketim.com.tr

> Verilmiş her stratejik/teknik karar burada bir satır olarak durur.
> Amaç: "bunu neden böyle yapmıştık?" sorusunu ileride tekrar tartışmamak.
> Yeni karar alındığında en üste tarihiyle eklenir.

---

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
