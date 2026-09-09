# Kararlar — dijitalşirketim.com.tr

> Verilmiş her stratejik/teknik karar burada bir satır olarak durur.
> Amaç: "bunu neden böyle yapmıştık?" sorusunu ileride tekrar tartışmamak.
> Yeni karar alındığında en üste tarihiyle eklenir.

---

**2026-09-09 — Ürün dört katmana ayrıldı; ölçüt: "bunu Erdem mi yapıyor, sistem mi?"**
Erdem "sistemden tamamen bağımsız" olmak istiyor: (1) self-servis teşhis
[var], (2) self-servis tedavi modülleri, (3) uzmanların kayıt olup
tespit edilen sorunla eşleştirildiği pazar yeri, (4) şirkete özel
otomasyon satışı [danışmanlık yalnızca burada]. Sonuç: müşterinin
Erdem'e ihtiyaç duyduğu her manuel adım vizyona aykırı sayılıyor ve
önceliklendirmede bu ölçüt kullanılıyor. Detay: [TASKS.md](TASKS.md)
"Uzun Vadeli Vizyon". Not: uzman eşleştirmesi için mevcut 7 fonksiyonluk
model hazır bir taksonomi; `profiles` ileride rol (müşteri/uzman/admin)
taşımalı.

**2026-09-09 — Şifre sıfırlamada oturum, Route Handler'da açılıyor.**
E-postadaki tek kullanımlık kodu oturuma çevirmek cookie yazmayı
gerektiriyor; bu Server Component'ten yapılamadığı için
`/hesap/sifre-yenile/dogrula` bir Route Handler. Hem PKCE (`?code=`) hem
klasik şablon (`?token_hash=&type=recovery`) biçimi destekleniyor —
hangisinin geleceği Supabase e-posta şablonuna bağlı, ikisini de
karşılamak bağlantının sessizce çalışmamasını önlüyor. Bu route,
proxy guard'ının tamamen dışında: oturum yokken çalışmalı (oturumu zaten
o açıyor), oturum varken de "giriş sayfası" sayılıp panele atılmamalı.

**2026-09-09 — E-posta gönderimi müşteriler gelene kadar Supabase ücretsiz katmanında.**
Ücretsiz katmanın yerleşik SMTP'si saatte birkaç e-postayla sınırlı ve
sık sık spam'e düşüyor; kayıt onayı ve şifre sıfırlama buna bağlı.
Erdem'in kararı: müşteriler gelmeye başlayınca ücretli/kendi SMTP'sine
geçilecek. O zamana kadar bu bilinen bir kısıt.

**2026-09-09 — Google İşletme Profili ve sosyal medya (sameAs) şimdilik yok.**
Erdem, Google İşletme Profili açmak istemedi; Instagram/LinkedIn gibi
sosyal hesap da henüz yok. JSON-LD'deki `sameAs` alanı bu yüzden
eklenmedi — uydurma/varsayımsal profil linki yazılmadı. Hesap açılırsa
[TASKS.md](TASKS.md) "Bekleyen Görevler"deki madde hatırlatıyor.

**2026-09-09 — "Google'da en üstte çıkma" kod değişikliğiyle garanti edilemez.**
Site dizine bile alınmamıştı (yeni alan adı, sıfır geri bağlantı, GSC
kaydı yoktu) — teknik SEO temeli zaten sağlamdı. Yapılabilecek: dizine
girmeyi hızlandırmak (GSC doğrulama+sitemap+indexing talebi) ve teknik
altyapıyı (OG görseli vb.) tamamlamak. Rekabetçi genel terimlerde
üst sıralarda çıkmak zamana, içerik üretimine ve geri bağlantıya bağlı
bir süreç — Erdem'e abartılı vaat verilmedi (CLAUDE.md marka kuralı).

**2026-09-08 — KVKK Aydınlatma Metni'nde veri sorumlusu: Erdem Yavuz (şahıs).**
Şirket henüz kurulmadığı için tüzel kişilik yerine gerçek kişi adı
yazıldı; metinde "şirket kurulunca güncellenecek" notu var. Erdem
onayladı.

**2026-09-08 — Çerez bildirimi: ağır kabul/red ekranı yerine bilgilendirici şerit.**
Site'de reklam/analiz/takip çerezi yok, yalnızca Supabase Auth'un zorunlu
oturum çerezi var. Zorunlu çerezler KVKK/GDPR pratiğinde açık rıza
gerektirmediği için tam bir "çerez tercihleri" consent akışı yerine tek
"Anladım" ile kapanan, localStorage'da hatırlanan hafif bir şerit
yeterli görüldü.

**2026-09-08 — proxy.ts artık bozuk NEXT_PUBLIC_SUPABASE_URL ile çökmüyor.**
Canlıda /admin ve /hesap 500 veriyordu: `@supabase/ssr`, URL "http(s)://"
ile başlamıyorsa (yalnızca tanımsızsa değil) doğrudan fırlatıyor, biz de
yalnızca "tanımsız mı" diye bakıyorduk. Kök neden: Vercel'deki
`NEXT_PUBLIC_SUPABASE_URL` değeri muhtemelen "ANAHTAR=DEĞER" biçiminde
(değer kutusuna anahtar adı da dahil edilerek) yanlış girilmişti — bunu
yerelde aynı bozuk değerle build alıp doğrulandı. Kod tarafı artık
`/^https?:\/\//i` ile de kontrol edip geçersizse `/`'e yönlendiriyor
(500 yerine), ayrıca değerin şeklini (uzunluk + önizleme, anahtarın
kendisini değil) loglayarak tekrar olursa teşhisi kolaylaştırıyor. Bu,
Vercel'deki değerin GERÇEKTEN düzeltilmesinin yerini tutmaz — yalnızca
çökmeyi önler; düzeltilmezse özellik sessizce devre dışı kalır.

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
