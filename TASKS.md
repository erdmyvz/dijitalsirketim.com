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
sisteme sadakat → o başarı yeni müşteri getirir.

**2026-09-09'da netleşen ürün modeli (Erdem'in kendi ifadesiyle):**
"Ben sistemden tamamen bağımsız olmak istiyorum. Sadece özel müşteriler
bana gelip benden danışmanlık alabilirler. Diğer tüm işletme sahipleri bu
site ile şirket içerisindeki sorunları tespit edip gelirlerini arttırma
konusunda ilerleyecektir. (…) Alanında uzman kişilerde bu sisteme kayıt
olabilecek ve şirketlerin tespit edilen sorunlarına doğru kişiyi
eşleştirerek çözüm sağlayacak."

Buradan çıkan **dört katmanlı ürün**:

1. **Self-servis teşhis** — bugün var: `/check-up` → Dijital Sağlık
   Karnesi + AI ön teşhis.
2. **Self-servis tedavi modülleri** — asıl eksik parça. Teşhisteki
   kırmızı bölgeye göre açılan, adım adım uygulanabilir modüller: ör.
   "Müşteri Bulma Modülü"; netlik sorunu olanlar için temel görev
   tanımları. Erdem'in hiç dahil olmadığı, ölçeklenen kısım.
3. **Uzman pazar yeri** — uzmanlar sisteme kayıt olur, tespit edilen
   soruna göre doğru uzmanla eşleştirilir. Not: mevcut 7 fonksiyonluk
   model (Müşteri Bulma / Satış / Operasyon / Ürün Geliştirme / Para
   Yönetimi / Karar Alma / Ekip Kurma) eşleştirme için hazır bir
   taksonomi — uzman hangi fonksiyonlarda uzman olduğunu seçer,
   check-up'ın "kırmızı bölge"si zaten o fonksiyonları adlandırıyor.
   `profiles` tablosunun tek bir `is_admin` bayrağının ötesinde rol
   (müşteri / uzman / admin) taşımasını gerektirecek.
4. **Şirkete özel otomasyon satışı** — ileriki versiyon. Tekrar eden
   manuel işlerin (ör. elle teklif hazırlama) otomasyonu; görüşmeyle
   satılan, yüksek dokunuşlu iş. Danışmanlık da yalnızca bu "özel
   müşteri" katmanında.

**Karar filtresi:** Yeni bir özellik önerirken sor — "bunu Erdem mi
yapıyor, sistem mi?" Müşterinin Erdem'e ihtiyaç duyduğu her manuel adım
(elle şifre sıfırlama, elle durum güncelleme, elle içerik teslimi)
vizyona aykırı.

Bu bölümdeki hiçbir madde henüz onaylanmış bir görev DEĞİL — somut bir
adıma dönüştürmeden önce her zaman plan sunulup onay beklenecek (bkz.
CLAUDE.md). Ayrıca: gerçek sonuç/vaka çalışmaları ancak gerçek ücretli
müşteriler ve ölçülmüş sonuçlar oluştuktan sonra yazılabilir — sahte
referans/uydurma istatistik asla yazılmaz.

---

## Sıradaki Görev

### 1. Modül içerikleri (modül modül)
Katalog, sayfa iskeleti ve kilit mekanizması hazır; içerikler boş. Sıra:
önce **Müşteri Bulma Planı** (acil müdahale modülü). **Erdem'den
beklenen:** bir işletme sahibi 1 hafta boyunca günde ~30 dakika ayırarak
hangi somut adımları atarsa ilk yeni temaslarını kurmuş olur? Ham
anlatım yeterli — şablonlu ve bitiş kontrollü modüle çevrilecek.
Her modül: 4-7 adım, doldurulabilir şablonlar, bitiş kontrolü
(onardığı check-up sorusunun tekrar cevaplanması). Modül `durum`u
`"hazir"` yapılınca sayfa otomatik dinamikleşiyor ve kilit devreye
giriyor — ek iş yok.

---

## Bekleyen Görevler

Öncelik sırasına dizilidir. Üstteki biter, "Sıradaki Görev"e taşınır.

### 2. Modüller bitince /tedavi'yi herkese aç
Tüm modül içerikleri tamamlandığında (Sıradaki Görev #1) yapılacaklar:
`proxy.ts` matcher'ından `/tedavi` çıkarılacak, üç sayfadaki
`robots: { index: false }` kaldırılacak, 15 sayfa `sitemap.ts`'e geri
eklenecek, Navbar'a "Modüller" bağlantısı `<Link>` olarak konacak ve ana
sayfaya "hangi modüller var, ne işe yarıyorlar" bölümü eklenecek
(Erdem'in isteği, 2026-09-10). Hepsi ~15 dakikalık iş — tek engel
içeriklerin hazır olması.

### 3. Uzman pazar yeri
Uzmanların kayıt olup tespit edilen sorunla eşleştirildiği katman.
`profiles` tablosunun rol (müşteri / uzman / admin) taşıması gerekecek.
Eşleştirme anahtarı: 7 fonksiyonluk taksonomi.

### 4. Sanal POS entegrasyonu (iyzico / PayTR)
Şirket kurulduktan sonra. Şu an ödeme manuel havale/EFT + admin onayı.

### 5. Admin panelinden karne durumu güncelleme
"Tedavi sürecinin takibi" başlığının ikinci yarısı: `karneler.durum`
alanı şu an yalnızca müşteri panelinde salt okunur gösteriliyor
(varsayılan "Beklemede"). Admin panelinden bu alanı güncelleyebilme
(ör. "İnceleniyor" / "Teklif Gönderildi" / "Tamamlandı") ayrı bir görev
olarak bırakıldı.

### 6. Kendi SMTP'ni bağla (e-posta gönderimi)
Supabase'in ücretsiz katmandaki yerleşik e-posta gönderimi saatte birkaç
e-postayla sınırlı ve çoğu zaman spam klasörüne düşer. Kayıt onayı ve
şifre sıfırlama e-postaları buna bağlı olduğu için, gerçek kullanıcılar
gelmeye başlayınca kendi SMTP'si (ör. Resend / Brevo ücretsiz katman)
Supabase → Authentication → SMTP Settings'e bağlanmalı. Erdem'in kararı
(2026-09-09): müşteriler gelene kadar ücretsiz katmanda kalınacak.
Abonelik bitiş hatırlatması da bu bağlandığında e-postayla gönderilebilir
(şimdilik yalnızca uygulama içi uyarı).

### 7. Sosyal medya hesapları açılınca JSON-LD'ye eklenmeli
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
      - [x] Admin kullanıcısı eklendi: **erdem.yvz@hotmail.com**
        (`profiles.is_admin = true`, e-posta onaylı — 2026-09-10'da
        doğrulandı).
      - [x] 3 anahtar Vercel → Environment Variables'a da girildi
        (Erdem ekran görüntüleriyle doğruladı, 2026-09-07).
- [x] **`ayarlar` tablosu** — çalıştırıldı (2026-09-10), admin ayarlar
      ekranından yazma canlı veritabanına karşı doğrulandı.
- [x] **`abonelikler` tablosu** — çalıştırıldı (2026-09-10). Uçtan uca
      doğrulandı: kilitli modül → admin panelinden "1 ay ekle" → kilit
      açıldı; plana dahil olmayan fonksiyonun modülü kilitli kaldı;
      geri sayım ve son-7-gün uyarısı doğru çalıştı.
- [ ] **`modul_ilerleme` tablosu çalıştırılmalı** — [supabase/schema.sql](supabase/schema.sql)'in
      sonundaki `-- Modül ilerlemesi:` bölümü Supabase → SQL Editor'de bir
      kez çalıştırılmalı. Olmadan kullanıcı adımları işaretleyemez /
      şablon dolduramaz (sayfa çökmez, adımlar okunur ama kaydedilmez).
- [ ] **Abonelik ödeme bilgileri girilmeli** — Admin → Ayarlar
      ekranından IBAN ve hesap sahibi. Girilene kadar `/hesap/odeme`
      ekranı IBAN göstermeyip WhatsApp'a yönlendiriyor (yanlış hesaba
      ödeme riskine karşı bilinçli).
- [ ] **`www` alt alan adı** — Vercel → Domains'e eklenmeli ki SSL alsın;
      koddaki www→apex yönlendirmesi ancak o zaman devreye girer.
- [x] **Google Search Console** — mülk doğrulandı (`layout.tsx`'e
      eklenen `google-site-verification` etiketiyle), sitemap.xml
      gönderildi, ana sayfa için dizine eklenme talep edildi
      (2026-09-09, Erdem tarafından).

---

## Tamamlananlar

### 2026-09-11 — Ana sayfadaki "4 Adımlı Tedavi Modeli" yeni modele çekildi
Bölüm hâlâ eski "biz sizin yerinize yaparız" hizmetini anlatıyordu ve
ürün değiştiği için doğrudan yanlış beklenti üretiyordu: ADIM 03
"Reklam yönetimi, CRM kurulumu, WhatsApp/Instagram otomasyonları"
sayıyor, ADIM 04 "aylık raporla birlikte izliyoruz" diyordu. Check-up'ı
yapan biri bunları okuyup "reklamlarımı yönetecekler" beklentisiyle üye
oluyor, sonra modül ekranıyla karşılaşıyordu.

Dört adımlı iskelet doğruydu, yanlış olan kimin yaptığıydı — iskelet
korundu, fail değişti: ADIM 03 self-servis modüller (adımlar, şablonlar,
bitiş kriteri; uygulayan işletmenin kendisi), ADIM 04 bitiş kontrolü →
yeni karne → **aylık tutarın düşmesi** döngüsü. Faturanın düşmesi
sistemin işe yaradığının kanıtı olduğu için satış argümanı da güçlendi.
Üst paragraf da "sistem teşhisi koyar ve reçeteyi yazar; uygulama sizde
kalır" diye netleştirildi. Doktor metaforu bozulmadı: doktor teşhis
koyar ve reçete yazar, ilacı hasta içer.

Yeni vaat eklenmedi — yalnızca hâlihazırda çalışan mekanizma doğru
anlatıldı. Mobil (375px) ve masaüstü (1280px) kontrol edildi, konsol
temiz. Sitede başka "biz yapıyoruz" ifadesi kalmadığı tarandı;
`Offer.tsx`'teki otomasyon/danışmanlık kanalı bilinçli olarak duruyor
(dört katmanlı modelin 4. katmanı, gerçekten Erdem'in yaptığı iş).

### 2026-09-10 — Modül motoru (içerik olmadan altyapı)
Modüllerin içeriğini taşıyacak mekanizma kuruldu; 14 modülün `adimlar`
dizisi bilinçli olarak boş. İçerik geldiğinde tek yapılacak iş
`moduller.ts`'e yazmak — kod dokunulmayacak.

- **Adım veri yapısı** (`ModulAdimi`): başlık, açıklama, isteğe bağlı
  doldurulabilir şablon, bitiş kriteri. `adimlar` boşsa modül otomatik
  "içerik hazırlanıyor" durumunda kalıyor.
- **Adım ekranı** (`ModulAdimlari.tsx`): ilerleme çubuğu, adım adım
  kartlar, şablon alanları, "Yaptım" işaretleri. Yazma tarayıcıdan
  doğrudan Supabase'e (RLS koruyor, KaydetKarti ile aynı desen);
  şablon metni alandan çıkınca kaydediliyor, her tuşta değil.
- **`modul_ilerleme` tablosu**: kullanıcı × modül × adım, benzersiz
  kısıtla. Kullanıcı yalnızca kendi satırını yönetiyor, admin okuyabiliyor.
- **Bitiş kontrolü — döngüyü kapatan parça**: tüm adımlar bitince
  modülün onardığı check-up soruları tekrar soruluyor
  (`/tedavi/[f]/[m]/bitir`), cevaplar **yeni bir karne** oluşturuyor
  (eski karne geçmişte kalıyor, diğer 19 sorunun cevabı taşınıyor).
  Skor yükseliyor, aylık tutar düşüyor. Eski AI teşhis bilinçli olarak
  taşınmıyor — yeni duruma ait değil.

Geçici iki test adımıyla ekran doğrulandı, sonra geri alındı. Tablo
yokken sayfanın çökmediği, adımların okunabilir kaldığı da görüldü.
**Henüz test edilmedi:** ilerleme kaydı ve bitiş kontrolü —
`modul_ilerleme` tablosu oluşturulduktan sonra uçtan uca doğrulanacak.

### 2026-09-10 — /tedavi giriş arkasına alındı
Erdem'in kararı: modül içerikleri tamamlanmadan ana sayfada
tanıtılmasınlar; hesap açan müşteriler erişsin. Yapılanlar: Navbar'dan
"Modüller" bağlantısı kaldırıldı, `proxy.ts` matcher'ına `/tedavi`
eklendi (oturumsuz → `/hesap/giris?sonraki=...`, gitmek istediği modüle
girişten sonra dönüyor), üç `/tedavi` sayfasına `noindex` kondu ve 15
sayfa sitemap'ten çıkarıldı — giriş sayfasına yönlenen URL'yi Google'a
bildirmek doğru olmazdı. Ana sayfadaki teklif bölümünden de "14 tedavi
modülü" ifadesi çıkarıldı (hem modül reklamı, hem de içerik yokken
doğrulanamayan bir vaat).

Bunun bedeli: sitemap 25'ten 3 URL'ye düştü, "ince içerik" SEO zaafı
geri geldi. Modüller bitince tersine çevrilecek (Bekleyen Görevler #2 —
adım adım yazıldı).

### 2026-09-10 — Ana sayfa yeni modele göre yeniden yazıldı
Site hâlâ "ücretli tek seferlik check-up" satıyordu; model değişmişti.
Teklif bölümü ikiye ayrıldı: **Ücretsiz / Teşhis** (check-up, karne, AI
ön teşhis, plan hesabı) ve **Aylık Üyelik / Tedavi** (7 fonksiyon
altında 14 modül, şablonlar, ilerleme takibi). Fiyat yine yok — teşhisten
hesaplandığı için zaten önceden söylenemiyor; onun yerine "yalnızca bozuk
fonksiyonlar için ödersiniz, iyileştikçe tutar düşer" anlatımı kondu.

Başvuru formu, ana huniden çıkarılıp **"şirketinize özel çalışma /
danışmanlık"** kanalına dönüştürüldü (dört katmanlı modeldeki 4. katman).
Gönderim sonrası ekranındaki ödeme/IBAN/referans kodu bloğu kaldırıldı,
yerine ücretsiz check-up'a yönlendirme kondu. Buton: "Görüşme Talebi
Gönder".

Yanlış hale gelen "48 saatte raporlanır" iddiası tüm sitede temizlendi
(check-up artık anında sonuç veriyor): Proof, SSS, meta açıklaması, OG
ve Twitter metinleri. Navbar/footer'daki "Check-Up Teklifi" bağlantısı
"Nasıl İşliyor" oldu.

İki yapısal düzeltme: (1) SSS metinleri hem bileşende hem FAQPage
JSON-LD'sinde birebir kopyalanmıştı — ikisi ayrı düşerse Google'a
sayfada görünmeyen cevap bildirmiş oluyorduk; tek kaynağa alındı
([src/data/sss.ts](src/data/sss.ts)) ve içerik yeni modele göre yazıldı.
(2) `src/data/odeme.ts` artık hiçbir yerden kullanılmıyordu (fiyat/IBAN
`ayarlar` tablosuna taşındı), ölü dosya silindi.

### 2026-09-10 — Erişim ve ödeme sistemi
Manuel havale + admin onayı akışı kuruldu. `abonelikler` tablosu
(schema.sql'e eklendi): kullanıcı, bitiş tarihi, **kapsanan
fonksiyonlar**, onay anındaki tutar, onaylayan admin. Erişim kontrolü
tek satır: `bitis > now()`, ve erişim **planın kapsadığı fonksiyonlarla
sınırlı** — 4 fonksiyon için ödeyen yalnızca o 4 fonksiyonun modüllerini
görür.

Eklenenler: `/hesap/odeme` (tutar + IBAN + alıcı adı, **referans kodu
yok**), modül sayfalarında kilit ekranı, `/hesap` altında "Aboneliğim"
(geri sayım) ve son 7 günde uyarı şeridi, `/admin/abonelikler` (kullanıcı
listesi + hesaplanan plan + "1/3/6 ay ekle" + "erişimi kapat"),
`/admin/ayarlar` (birim ücret, Nabız tabanı, IBAN, hesap sahibi).

Güvenlik: Server Action'lar herkese açık uç noktalar olduğu için servis
anahtarıyla iş yapan her aksiyon `adminOlmaliVeyaHata()` ile başlıyor
([src/lib/admin/yetki.ts](src/lib/admin/yetki.ts)) — sayfayı proxy
korusa bile aksiyon doğrudan çağrılabilir.

Doğrulananlar: ayarlar ekranından yazma canlı veritabanına işledi
(birim ücret 10.000→12.000 yapıldı, plan 40.000→47.000 TL'ye güncellendi,
IBAN ödeme ekranında göründü — sonra hepsi geri alındı, sahte IBAN
canlıda bırakılmadı). `abonelikler` tablosu henüz oluşturulmadığı için
kodun bu durumda çökmediği, herkesi "erişim yok" gösterdiği doğrulandı.
Bir modül "hazir" yapılıp build denendi: Next.js o sayfayı otomatik
dinamiğe çeviriyor, "yakında" olanlar statik kalıyor — kilitli hâlin
önbelleğe alınma tuzağı yok.

**Henüz test edilmedi:** "N ay ekle" aksiyonu — `abonelikler` tablosu
oluşturulduktan sonra uçtan uca doğrulanacak.

### 2026-09-10 — Fiyat motoru ve tedavi planı ekranı
Teşhise dayalı fiyatlama çalışır durumda. Saf hesap fonksiyonu
[src/lib/tedavi/fiyat.ts](src/lib/tedavi/fiyat.ts): kırmızı ×1, sarı
×0,5, yeşil ×0; toplam × birim ücret + Nabız Planı tabanı. Erdem'in
verdiği uçlara karşı doğrulandı (7 kırmızı → 75.000 TL, 1 kırmızı →
15.000 TL, 2 kırmızı+3 sarı → 40.000 TL, hepsi yeşil → 5.000 TL Nabız).

`/hesap/plan` ekranı: aylık tutar, kalem kalem hangi fonksiyondan ne
kadar geldiği, planla açılacak modüllerin listesi. Yeşil fonksiyonlar
plana hiç girmiyor — ödenmeyen şey listede de görünmüyor. 7 fonksiyon da
yeşilse ekran Nabız Planı'na dönüyor. "Fonksiyonların iyileştikçe bu
tutar düşer" notu bilinçli: faturanın düşmesi sistemin işe yaradığının
kanıtı, satış argümanının kendisi.

Fiyat ayarları `ayarlar` tablosundan okunuyor (schema.sql'e eklendi;
herkes okur, yalnızca admin yazar). Tablo yoksa/erişilemezse koddaki
varsayılana düşüyor — fiyat ekranının tamamen kaybolmasındansa
varsayılanla çalışması yeğ.

Check-up sonuç ekranındaki eski CTA ("ücretli teşhis görüşmesine
başvurun" — artık geçersiz model) "Tedavi Planımı Gör"e dönüştü. Tutar
bilinçli olarak sonuç ekranında gösterilmiyor: ayarlar sunucuda,
istemcide tahmini rakam gösterip planda başkasını göstermek olmaz.
`/hesap` paneline de plan bağlantısı eklendi. Gerçek test hesabıyla iki
senaryo da doğrulandı, mobil kontrol yapıldı, test verisi temizlendi.

### 2026-09-10 — Tedavi modülleri: katalog ve menü iskeleti
Ürünün asıl değer katmanının çatısı kuruldu. `/tedavi` haritası ("Bir
işletme 7 organdan oluşur, yedisinin de reçetesi burada"), 7 fonksiyon
sayfası ve 14 modül sayfası. Üst seviye her zaman 7 kutu — tamlık hissini
veren şey bu; modüller alt seviyede serbestçe büyür.

Katalog tek dosyada: [src/data/moduller.ts](src/data/moduller.ts). Sıra =
dizi sırası (taşımak için kes-yapıştır), yeni modül = diziye yeni nesne —
`questions.ts` ile aynı "kod bilmeden düzenlenebilir" deseni.

Kişiselleştirme: giriş yapmış ve check-up yapmış kullanıcıda kartlar kendi
skoruyla renkleniyor (kırmızı/sarı/yeşil), üstte "önce şuradan başla"
şeridi çıkıyor. Check-up yapmamış ziyaretçi ve Google nötr haritayı
görüyor. Supabase erişilemese bile katalog ayakta kalıyor (sonKarne.ts
asla fırlatmıyor — proxy.ts'teki hatadan alınan ders).

Her modül `onardigiSorular` ile check-up sorularına bağlı; modül
sayfasında "bu modül check-up'ında neyi onarır?" bölümünde o soruların
metni gösteriliyor. Modül içerikleri bilinçli olarak boş ("Yakında"),
sıradaki görevlerde doldurulacak. 14 modül sayfası sitemap'e eklendi —
sitenin en büyük SEO zaafı olan "tek sayfalık ince içerik" sorununa da
doğrudan iyi geliyor. Mobil kontrol yapıldı.

### 2026-09-09 — Şifremi unuttum akışı
Müşteri artık şifresini kendi sıfırlayabiliyor — daha önce Erdem'in
Supabase panelinden elle müdahalesi gerekiyordu, bu da "sistemden
bağımsız olma" vizyonuna aykırıydı. Eklenenler: `/hesap/sifremi-unuttum`
(e-posta ile sıfırlama bağlantısı ister; kayıtlı olmayan e-posta için de
aynı ekranı gösterir — hangi e-postanın kayıtlı olduğunu sızdırmamak
için), `/hesap/sifre-yenile/dogrula` (e-postadaki tek kullanımlık kodu
oturuma çeviren Route Handler — cookie yazmak gerektiği için Server
Component'te yapılamaz; hem PKCE `?code=` hem klasik
`?token_hash=&type=recovery` biçimini karşılar), `/hesap/sifre-yenile`
(yeni şifre formu). `proxy.ts` güncellendi: `/hesap/sifremi-unuttum`
oturumsuz erişilebilir, doğrulama route'u guard'ın tamamen dışında
(oturum açıkken de çalışmalı), `/hesap/sifre-yenile` ise korumalı kaldı.
Giriş sayfasına "Şifremi unuttum" bağlantısı eklendi.

Uçtan uca doğrulandı (tek kullanımlık test hesabıyla, e-posta
göndermeden — admin API ile gerçek kurtarma token'ı üretilerek):
bağlantı → oturum açılıyor → yeni şifre kaydediliyor → panele
yönlendiriyor; yeni şifreyle giriş çalışıyor, eski şifre reddediliyor.
Geçersiz/süresi dolmuş bağlantı, açıklayıcı uyarıyla sıfırlama sayfasına
geri gönderiyor. Mobil kontrol yapıldı, test verisi temizlendi.

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
