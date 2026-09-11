# Kararlar — dijitalşirketim.com.tr

> Verilmiş her stratejik/teknik karar burada bir satır olarak durur.
> Amaç: "bunu neden böyle yapmıştık?" sorusunu ileride tekrar tartışmamak.
> Yeni karar alındığında en üste tarihiyle eklenir.

---

**2026-09-11 — Ana sayfadaki görseller ürünün gerçek çıktısıdır, taklit değil.**
Hero'daki karne kartı elle yazılmış sahte bir tabloydu; ürün değişince
onunla birlikte güncellenmiyordu. Artık `skorHesapla` motorundan geçen
örnek bir karneden besleniyor — eşikler ya da soru bankası değişirse
görsel de değişir. Genel kural: ürünü anlatan her görsel, ürünün kendi
kodundan beslenmeli. Sabit yazılmış "örnek ekran" görselleri zamanla
yalan söylemeye başlıyor.

**2026-09-11 — Görsel ilgi sahte sosyal kanıtla üretilmez.**
Bir satış sayfasını canlandırmanın kolay yolu müşteri logoları, "500+
işletme" rozetleri ve yorum kartlarıdır. Gerçek ücretli müşteri ve
ölçülmüş sonuç oluşana kadar bunların hiçbiri yazılmayacak (CLAUDE.md
değişmez kuralı). Görsel ilgi bunun yerine ürünün kendi çıktısından
çıkarılıyor: karne, skor halkası, organ haritası, piktogram.

**2026-09-11 — Bölüm ritmi tek başına bir tasarım meselesidir.**
"Site yazı gibi duruyor" geri bildiriminin sebebi görsel azlığı değil,
beş bölümün de aynı kalıpta olmasıydı (ortalanmış başlık → paragraf →
kart sırası). Yeni bölüm eklerken kural: bir önceki bölümle aynı
iskelete sahip olmasın — hizalama, zemin ya da içerik biçimi
değişsin.

**2026-09-11 — Renk asla tek başına anlam taşımaz.**
Karne çubuklarında, organ haritasında ve piktogramda renk her zaman
ikinci bir işaretle birlikte: puan ("1/6"), eğim ya da opaklık. Renk
körlüğü olan ziyaretçi yalnızca dolguya bakarak kırmızıyı yeşilden
ayıramaz.

**2026-09-11 — IBAN "dolu mu" değil "geçerli mi" diye kontrol edilir.**
Ödeme ekranındaki koruma ("IBAN yoksa hesap gösterme, WhatsApp'a
yönlendir") boş-değil kontrolüne dayanıyordu; canlıdaki `TR0000` yer
tutucusu bu kontrolü geçip müşteriye ödeme talimatı olarak
gösterilebiliyordu. Artık ISO 13616 mod-97 sağlaması yapılıyor: yarım,
uydurma ya da tek hanesi yanlış yazılmış bir IBAN ne kaydedilebiliyor ne
gösteriliyor. Paranın yanlış hesaba gitmesi geri alınamaz bir hata
olduğu için buradaki doğru varsayılan "göstermemek".

**2026-09-11 — Server Action'da kullanıcı girdisi hatası `throw` edilmez.**
Fırlatılan hata yöneticiye "A server error occurred" diyen ham bir sayfa
olarak çıkıyor; yazdığımız açıklama hiç görünmüyor. Girdi hatası
(geçersiz IBAN, negatif ücret) çökme değil, sıradan bir kullanıcı
hatasıdır — sayfaya hata koduyla dönülüp mesaj gösterilir. `throw`
yalnızca gerçekten beklenmedik durumlar için: yetkisiz çağrı,
yapılandırma eksikliği.

**2026-09-11 — schema.sql, `profiles` tablosu bizden önce varsa da çalışır.**
Dosya `column "is_admin" of relation "profiles" does not exist` hatası
verdi: o veritabanında `profiles` başka bir kaynaktan oluşmuştu
(Supabase'in "User Management Starter" şablonu `is_admin` içermeyen bir
`profiles` yaratır) ve `create table if not exists` hiçbir şey yapmadan
geçti. Kolonlar artık `add column if not exists` ile tamamlanıyor —
`basvurular.referans_kodu` için zaten kullanılan desen. Genel kural: bu
dosya her zaman idempotent ve kısmen kurulmuş bir veritabanında da
çalışır olmalı, çünkü kurtarma yolu olarak da kullanılıyor.

**2026-09-11 — Ana sayfa "4 Adımlı Tedavi Modeli": iskelet kaldı, fail değişti.**
Bölüm ürün değişiminden sonra düzeltilmemişti; ADIM 03 hâlâ "reklam
yönetimi, CRM kurulumu, WhatsApp/Instagram otomasyonları" sayıyordu.
Yanlış beklenti riski somut: müşteri "benim yerime yapacaklar" diye üye
olup modül ekranıyla karşılaşıyordu. Dört adımlı yapı (teşhis → reçete →
tedavi → takip) doğru olduğu için korundu; değişen tek şey her adımı
KİMİN yaptığı oldu. ADIM 04 artık bitiş kontrolü → yeni karne → **aylık
tutarın düşmesi** döngüsünü anlatıyor: faturanın düşmesi sistemin işe
yaradığının kanıtı olduğundan bu, en güçlü satış argümanı. Doktor
metaforu bu dönüşümü kaldırıyor — doktor teşhis koyar ve reçete yazar,
ilacı hasta içer.

**2026-09-10 — Admin yetkisi e-postaya sabitlendi.**
`schema.sql`'deki eski kural "profiles satırı olmayan HERKESİ admin
yapar" idi (ilk kurulumda tek kullanıcı admin olduğu için pratikti).
Tehlikesi: tetikleyici bir kez çalışmazsa ya da bir profil satırı
silinirse, sıradan bir müşteri bu SQL'in bir sonraki çalıştırılışında
admin olabilirdi. Canlıda admin profil satırının kaybolduğu gözlemlendi
(sebebi saptanamadı; hesap duruyordu, yalnızca `profiles` satırı yoktu)
ve yetki elle geri verildi. Artık atama `where email = '...'` ile
sabit; blok idempotent olduğu için aynı zamanda kurtarma yolu.

**2026-09-10 — Müşteri panelinde admin'e özel "Yönetim Paneli" bağlantısı.**
Admin hesabıyla giriş yapan kişi `/hesap`'a düşüyor ve oradan `/admin`'e
ulaşmanın hiçbir yolu yoktu — adresi elle yazmak gerekiyordu. İki ayrı
giriş sayfası (`/hesap/giris`, `/admin/giris`) olduğu için bu kafa
karıştırıcıydı. Bağlantı yalnızca `is_admin` olanlara gösteriliyor.

**2026-09-10 — Başvuru formu, ana huniden çıkıp "özel çalışma" kanalı oldu.**
Ana huni artık: ücretsiz check-up → hesap → tedavi planı → ödeme. Eski
başvuru formu (ad/işletme/telefon → `basvurular`) bu huninin parçası
değil; dört katmanlı modeldeki 4. katmanın (şirkete özel otomasyon /
birebir danışmanlık) talep kanalı olarak konumlandırıldı. Gönderim
sonrasındaki ödeme/IBAN/referans kodu bloğu kaldırıldı. `src/data/odeme.ts`
böylece tamamen kullanılmaz hale geldi ve silindi — fiyat ve ödeme
bilgileri artık `ayarlar` tablosunda.

**2026-09-10 — SSS metinleri tek kaynaktan okunur.**
Aynı sorular hem `Faq.tsx`'te hem `page.tsx`'teki FAQPage JSON-LD'sinde
birebir kopyalanmıştı. İkisi ayrı düşerse Google'a sayfada görünmeyen bir
cevap bildirmiş oluruz (yapılandırılmış veri ihlali). Tek kaynak:
[src/data/sss.ts](src/data/sss.ts).

**2026-09-10 — "48 saatte raporlanır" iddiası kaldırıldı.**
Check-up self-servis sihirbaza dönüştüğünden sonuç anında çıkıyor; eski
metin artık doğru değildi. Marka kuralı gereği doğrulanamayan/yanlış
iddia sitede durmaz.

**2026-09-10 — Check-up ücretsiz, tedavi sistemi ücretli. Fiyat teşhisten hesaplanır.**
Model tersine döndü: eskiden check-up ücretliydi, artık **check-up herkese
ücretsiz**, para **tedavi modüllerine erişimden** kazanılıyor. Aylık ücret
kullanıcının kendi karnesinden hesaplanır:

```
Aylık Ücret = Nabız Planı tabanı + (Birim Ücret × Σ fonksiyon ağırlığı)
  Kırmızı (0-2 puan) → 1.0    Sarı (3-4) → 0.5    Yeşil (5-6) → 0
```

Erdem'in verdiği uçlar bu formülle birebir tutuyor (birim 10.000 TL):
7 kırmızı → 70.000 TL, 1 kırmızı → 10.000 TL. Gerekçe: "sağlayacağımız
fayda ne kadar fazlaysa o kadar ücret". Sarının yarım sayılması "daha az
bozuksa daha az iş, daha az ücret" demek. Birim ücret ve taban admin
panelinden değişir, kodda sabit tutulmaz.

Bu, "ana sayfada fiyat gösterilmez" kararını da güçlendiriyor: fiyat artık
teşhisten türediği için önceden söylenmesi zaten mümkün değil.

**2026-09-10 — Ödeme aylık; erişim, ödenen fonksiyonlarla sınırlı.**
Erdem'in gerekçesi: tek seferlik ödemede sürekli yeni işletme bulma
derdine düşülür, aylık ödeme hem sadakat zinciri kurar hem müşteriye
"para veriyorum, karşılığını almalıyım" disiplini kazandırır. 4 fonksiyon
için ödeyen, o 4 fonksiyonun modüllerini görür; yeşil fonksiyonların
modülleri zaten gerekmez.

**2026-09-10 — İyileşen müşteri "Nabız Planı"na düşer (taban ücret).**
Fiyat teşhisten hesaplandığı için müşteri iyileştikçe faturası düşer. Bu
bir kayıp değil, en güçlü kanıt: "faturam düştü, demek ki işe yaradı".
Tamamen iyileşen müşterinin sistemden çıkmaması için taban bir plan var —
adı bilinçli olarak "bakım" değil **Nabız Planı**, çünkü parayı hak eden
bir teslimatı olmalı: aylık kısa nabız kontrolü, skor düşünce erken
uyarı, yıllık tam check-up, yeni modüllere erişim.

**2026-09-10 — Ciro'ya göre eleme yok; fiyatın kendisi eler.**
Check-up ciro aralığını soruyor ama düşük cirolu işletme kapıda geri
çevrilmiyor. Gerekçe (Erdem): 45.000 TL'lik bir teklif hedef kitleyi zaten
kendiliğinden eler, kimseyi kapıda reddetmeye gerek yok.

**2026-09-10 — Abonelik ödemelerinde referans kodu kullanılmaz.**
Ödeme ekranı yalnızca tutar + IBAN + alıcı adı gösterir. Admin, gelen
havaleyi gönderen adına göre eşleştirip panelden onaylar; onay anında
kullanıcının erişimi açılır ve `/hesap` altındaki "Aboneliğim"de geri
sayım görünür. Hacim artarsa kod eklemek kolay. (Başvuru formundaki
`DS-XXXX` kodu ayrı bir akış, ona dokunulmadı.)

**2026-09-10 — Tedavi kataloğu 7 fonksiyon → alt modüller olarak kurgulandı.**
Üst seviye her zaman 7 kutu (işletmenin tamlığını veren şey bu), modüller
alt seviyede serbestçe büyür. Katalog tek dosyada:
[src/data/moduller.ts](src/data/moduller.ts) — sıra = dizi sırası
(taşımak için kes-yapıştır), yeni modül = diziye yeni nesne
(`questions.ts` ile aynı desen). Her modül `onardigiSorular` ile check-up
sorularına bağlı: modül bitince o sorular tekrar cevaplanır, skor
yükselir — "gözle görülür ilerleme" ölçümü buradan çıkıyor.

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
