# Görev Panosu — dijitalşirketim.com.tr

> Bu dosya projenin tek doğruluk kaynağıdır. Her oturumun başında okunur,
> her iş bitiminde güncellenir. Çalışma protokolü: [CLAUDE.md](CLAUDE.md)

---

## Uzun Vadeli Vizyon

**2026-11-21'de ürün değişti.** Eski "şirket doktoru / check-up / tedavi"
kurgusu söküldü (bkz. KARARLAR.md). Marka adı ve domain aynı kaldı.

**Yeni ürün iki yarımdan oluşuyor:**

1. **Program — işi nasıl kuracağın.** Altı başlık: kafa yapısı ve
   düşünce sistemi · konumlandırma ve kişisel marka · en doğru sektör
   seçimi · karşı konulamaz teklif oluşturma · 4A satış stratejileri ·
   uygulamalı dijital pazarlama ve sözleşme.
2. **Sistem — kurduğun işi nasıl işleteceğin.** Dört ajan (reklam
   yöneticisi, içerik yöneticisi, metin yazarı, müşteri temsilcisi) ve
   beş modül (reklam performansı, müşteri çalışma alanları, ortak gelen
   kutusu, rakip reklamları, rakip video araştırması).

**İki hedef kitle:** dijital pazarlama işi yapanlar; kendi işletmesi
için pazarlama yapanlar.

**Erdem'in dört basamağı:**

| Faz | Ne | Durum |
|---|---|---|
| 1 | Görüşmeden önce tanıtan site | **şimdi** |
| 2 | Gerçekten çalışan arka plan | sıradaki |
| 3 | Birkaç şirketle çalışıp referans biriktirmek | sonra |
| 4 | Ekip kurup büyümek | sonra |

**Çalışma ilkesi — Erdem'in kendi ifadesiyle:** "Amerikayı yeniden
keşfetmemize gerek yok. Bizimle daha önce aynı düşünmüş insanların
yaptığı projeleri gün yüzüne çıkartmalıyız. Bazen bu projeyi daha da
geliştirmeli, farklı kitleler üzerinden denemeliyiz." Birebir kopyalama
değil; çalıştığı kanıtlanmış işe benzerini üretip geliştirmek. Sitenin
giriş cümlesi de bu.

**Sabit kısıt:** Şirket yok ve açılmayacak — sitede fiyat gösterilmez,
doğrudan ödeme alınmaz. Tek çağrı görüşme formu.

---

## Sıradaki Görev

### 1. Erdem'in yapması gerekenler (kod değil)

Bunlar yapılmadan faz 1 tamamlanmış sayılmaz:

- **Yeni Supabase projesi aç.** Eski proje (`ejdhmujiadarywlslpbv`) 20
  Eylül'den beri duruyor; 90 günlük geri yükleme penceresi **19 Aralık
  2026** civarı doluyor. İçindeki veri silinecek, yeni proje açılacak.
  `supabase/schema.sql` tek tabloluk yeni şemayı içeriyor.
- **Vercel ortam değişkenlerini güncelle.** Yeni proje hazır olana
  kadar `NEXT_PUBLIC_SUPABASE_URL` ve `SUPABASE_SERVICE_ROLE_KEY`
  **silinmeli**: eski (ölü) değerler dururken form 500 veriyor,
  silinince "talebin ulaştı" deyip kaydı sunucu günlüğüne yazıyor.
- **Eski Supabase anahtarlarını yenile.** 3 Eylül'de sohbete
  yapıştırılmıştı (publishable + secret + anon).
- **`www` alt alan adını Vercel'e ekle.**

### 2. Kalan beş başlığın alt içerikleri

6 başlıktan yalnızca **Kafa Yapısı ve Düşünce Sistemi** yazıldı
(`icerik/ham/01-kafa-yapisi-insasi.md`). Diğer beşi Erdem'den gelecek;
geldiğinde `src/data/icerik.ts` içindeki `PROGRAM` dizisine eklenecek.
İçeriği olmayan başlık sitede "hazırlanıyor" diyor.

### 3. Faz 2 — çalışan arka plan

Sırayla, Meta'ya bağımlı olmayandan başlayarak:

- **Rakip video araştırması** — Meta onayı gerektirmeyen tek modül,
  bu yüzden ilk sırada.
- **Müşteri çalışma alanları** — veri modeli ve çoklu müşteri yapısı.
- **Reklam performansı** — Meta Marketing API; Business doğrulaması ve
  uygulama incelemesi gerekiyor (haftalar sürebilir).
- **Rakip reklamları** — Meta Ad Library API.
- **Ortak gelen kutusu** — Instagram Messaging API; en ağır izin seti.

---

## Tamamlananlar

### 2026-11-21 — Site baştan yazıldı
Eski şirket doktoru sitesi tamamen söküldü; yerine ajanlar + modüller +
program + görüşme formu üzerine kurulu yeni tek sayfa geldi. Silmeden
önce teşhis motoru `arsiv/`, Erdem'in iki ham metni `icerik/ham/`
altına ayrı bir commit'le alındı. Koyu tema, Plus Jakarta Sans +
Newsreader. Modül ekranları kod ile çiziliyor, hepsinde "Örnek ekran"
rozeti var. `Reveal` animasyonu içeriği artık hiçbir koşulda gizli
bırakamıyor. KVKK ve gizlilik metinleri yeni gerçeğe göre yazıldı,
çerez şeridi kaldırıldı (artık hiç çerez yok).

### 2026-09-13 — İkinci modül içeriği: Nasıl Değil, Kim veya Ne?
Devretme/otomasyon modülü (`ekip_kurma / devretme-sensiz-yuruyen-isletme`)
Erdem'in ham anlatımından 6 adıma çevrildi. İskelet zaten metnindeki yol
haritasıydı: iş envanteri → eleme → otomatikleştirme → delegasyon →
kritik işler → KPI. Son adım metinde listede yoktu ama ağırlıkla
vurgulanmıştı; "devretmek bırakmak değildir" mantığıyla eklendi.

Traktör–öküz benzetmesi otomatikleştirme adımında, logo/mükemmeliyetçilik
ve fırsat maliyeti eleme adımında, "reklam panelini bilmeyen reklamcılar"
kritik işler adımında açıklama olarak duruyor.

**Başlık değişti:** "Devretme: Sensiz Yürüyen İşletme" → **"Nasıl Değil,
Kim veya Ne?"** (Erdem'in kendi adlandırması; ilkenin kendisi olduğu için
daha akılda kalıcı). `id` DEĞİŞMEDİ — URL ve ilerleme kayıtları ona bağlı.
Vaat cümlesi sonucu taşımaya devam ediyor.

**Kök vida düzeltildi:** `["Kültür"]` → `["Netlik", "Yetkinlik"]`.
"Her şeyi ben yapıyorum"un kökü, neyin kritik olduğunun belli olmaması
ve devredecek araç/kişi bilgisinin eksikliği.

**Bir cümle yumuşatıldı.** Ham metindeki "artık bir ekibe ihtiyacınız
yok, bu işleri yapay zekâya yaptırabilirsiniz" hem kesin bir vaatti hem
de metnin kendisiyle çelişiyordu (iki paragraf sonra ekibe %70-80'lik
işler veriliyor). Yeni hâli: "Eskiden işe alım gerektiren birçok iş
bugün bir araçla yapılabiliyor; ekip ihtiyacı yok olmuyor, küçülüyor."

`onardigiSorular` olduğu gibi kaldı — `operasyon.yapi` ("bir hafta ortada
olmasanız operasyon yürür mü?") ve `ekip_kurma.yapi` ("görev tanımları
yazılı mı? / tek kişiyseniz hangi işi ne zaman yaptığınız planlı mı?")
modülün ürettiği çıktıyla birebir örtüşüyor.

Uçtan uca doğrulandı: operasyon ve ekip kurma kırmızı (2/6) bir test
hesabında plan **25.000 TL/ay**; 6 adım işaretlendi, bitiş kontrolü
**iki soruyu** birden sordu (ilk modülde tek soruluk yol test edilmişti),
yeni karne oluştu (19 cevap taşındı, `operasyon.yapi` ve `ekip_kurma.yapi`
0→2, `ai_teshis` boş), iki fonksiyon da sarıya döndü ve plan
**15.000 TL/ay**'a indi. Mobil kontrol edildi, test hesabı silindi.

### 2026-09-13 — İlk modül içeriği: Yönetici Kafa Yapısı
Erdem'in ham anlatımı 6 adımlı, şablonlu ve bitiş kontrollü bir modüle
çevrildi (`karar_alma / yonetici-kafa-yapisi`, `durum: "hazir"`).
Adımlar: ilham veren hedef → S-M-A-R-T → dört başlıkta problem analizi →
5 kez "neden" ile kök neden → Mevcut Ben/Yeni Ben karakter envanteri →
büyüme döngüsünün sınanması. Her adımda doldurulabilir şablon ve
ölçülebilir bir bitiş kriteri var ("en az bir sayı ve bir tarih", "en az
5 karşılaştırma satırı, sıfat değil davranış").

**Check-up bağı düzeltildi.** Modül `karar_alma.yapi`'ye ("hangi kararı
kim verebilir") bağlıydı — bu bir yetki devri sorusu, modülün konusu
değil. Bu hâliyle kullanıcı modülü bitirince alakasız bir soru sorulacak
ve yanlış bir karne üretilecekti. `karar_alma.surec`'e çekildi
("kararlar düzenli mi alınıyor, anlık mı?") — içerikteki "tepkisel hedef
/ ilham veren hedef" ayrımının birebir karşılığı.

**Bir istatistik çıkarıldı.** Ham metindeki "girişimcilerin %95'i
başarısız olur" ifadesi, iki gün önce siteden TOBB/BLS rakamlarını
kaldırırken konan kurala aykırıydı. Fikir korundu, sayı gitti:
"girişimcilerin büyük çoğunluğu tam burada takılır".

Güzel bir örtüşme: Erdem'in kök neden çerçevesi (Netlik / Kültür /
Yetkinlik) koddaki `kokVida` alanıyla birebir aynı. 14 modülün hepsi
zaten bu üçlüye göre etiketli olduğu için modül, kendi anlattığı şeyin
canlı örneği oluyor.

Uçtan uca doğrulandı: karar alma fonksiyonu kırmızı (1/6) bir test
hesabıyla plan **15.000 TL/ay** çıktı; 6 adım işaretlendi, bitiş
kontrolü tek soruyu sordu, yeni karne oluştu (20 cevap değişmeden
taşındı, yalnızca `karar_alma.surec` 0→2, `ai_teshis` boş), fonksiyon
sarıya döndü ve plan **10.000 TL/ay**'a indi. Mobil (375px) kontrol
edildi, yatay taşma yok. Test hesabı silindi.

**Not:** Bu temizlik sırasında `karneler` tablosunda 1 satır kaldığı
görüldü — test artığı değil, **sistemdeki ilk gerçek karne**
(yavuz@enerjimall.com, 11 Eylül 11:20, "Technicall / Mühendislik
Hizmetleri"). Dokunulmadı.

### 2026-09-11 — Doğrulanmamış istatistikler siteden kaldırıldı
"Acının maliyeti" bölümünde TOBB ve BLS adına iki oran duruyordu
("4 işletmeden 1'i", "2 işletmeden 1'i") ve koddaki not bunların teyit
edilmediğini söylüyordu. Kaynak adı verilen doğrulanmamış bir sayı,
sıradan bir abartıdan daha ağır bir iddia — CLAUDE.md'nin değişmez
kuralına da doğrudan aykırıydı. Erdem'in kararı: kaldır, kaynak vermeden
genel ifadeye çek.

İstatistikle birlikte onu görselleştiren piktogram da kalktı (oranın
görsel hâliydi, iddia gidince dayanağı kalmıyordu) ve kullanılmaz hale
gelen `IconStore` silindi.

Yerine geçen çerçeve doğrulama gerektirmiyor: **maliyet bir oran değil,
işletme sahibinin zaten ödediği bedel.** Bölüm artık bir makbuz gibi
kurulu — "Sistemsizliğin faturası: kalem kalem görünmez, ama her ay
ödenir": sahibinin zamanı (her gün), tekrarlanamayan gelir (her ay),
ölçülmeyen pazarlama (her kampanya), hisle alınan kararlar (her
seferinde) → **Toplam: işletmenin büyümemesi.** Hiçbir satır kimse
adına bir sayı iddia etmiyor; okuyan kendinde tanır ya da tanımaz.

Ana metin de iddiasını daralttı: "Ürününüz kötü olduğu için
büyüyemiyor olabilirsiniz. Ya da bir sisteminiz olmadığı için. Check-up
tam olarak bunu ayırır." — eski hâli ("kapanan işletmelerin ürünleri
kötü değildi") bütün kapanan işletmeler adına konuşuyordu.

Canlı sayfada doğrulandı: "TOBB", "BLS", "Kaynak", "4 işletmeden" ve
"2 işletmeden" ifadelerinin hiçbiri artık sayfada geçmiyor. Mobil ve
masaüstü kontrol edildi.

### 2026-09-11 — UI/UX: ürünü göstermek, ritmi kırmak
Erdem'in tespiti: "site tamamen yazılardan oluşuyor." İnceleme sonucu
sorunun "az ikon" olmadığı görüldü — asıl sorun iki taneydi:
**(a)** beş bölüm de aynı kalıptaydı (ortalanmış başlık → paragraf →
kart sırası), göz ritim değişikliği görmediği için her şeyi yazı duvarı
olarak algılıyordu; **(b)** renk kodlu bir karne satan site, o karneyi
ziyaretçiye hiç göstermiyor, hepsini kelimeyle anlatıyordu.

**Karne görseli ([KarneGorseli.tsx](src/components/KarneGorseli.tsx)).**
Hero'daki elle yazılmış taklit kart kaldırıldı; yerine skor halkası +
7 fonksiyon çubuğu geldi. Dekoratif bir çizim değil: veriyi
[ornekKarne.ts](src/data/ornekKarne.ts)'den alıp **gerçek `skorHesapla`
motorundan** geçiriyor — soru bankası ya da eşikler değişirse görsel de
kendiliğinden güncellenir. Görünür alana girince halka dolar, çubuklar
uzar, skor 0'dan sayar. Başlıkta "Örnek" ibaresi kalıcı: gerçek bir
müşteri verisi değil, öyleymiş gibi de sunulmuyor.

**Organ haritası ([OrganHaritasi.tsx](src/components/OrganHaritasi.tsx)).**
Doktor metaforu bugüne kadar yalnızca cümlelerde yaşıyordu. 7 fonksiyon
artık kendi ikonu ve kendi puanıyla tek bakışta görülüyor ("Bir işletme
7 organdan oluşur"), altında renk eşiği açıklaması var. `sonuc`
verilmezse nötr gri harita çıkıyor — check-up yapmamış ziyaretçiye
uydurma renk gösterilmiyor.

**İkonlar.** Jenerik büyüteç/pano/hap yerine her fonksiyona ait ikon
eklendi (huni, etiket, dişli, katman, banknot, çatal yol, ekip) + dükkân
piktogramı. İlk çizimde satış ve para yönetimi 20px'te okunmuyordu,
yeniden çizildi.

**Ritim.** `CostOfPain` ortalanmış başlıktan iki sütuna geçti ve oran
artık piktogramla anlatılıyor — "4 işletmeden 1'i" cümlesi okunup
geçiliyordu, dördü çizilip biri kırmızıya dönünce göz saymak zorunda
kalıyor. `Proof` sola sabitlenen iddia + sağda akan güvenceler oldu.
`MissionVision` — sayfayı kapatan bölüm, dördüncü kez aynı kalıptaydı —
koyu banda alınıp numaralı editoryal diziye çevrildi, footer'a doğal
geçiş kuruyor ve kapanışta bir CTA kazandı.

**Hareket.** 4 adımlı modelin bağlayıcı çizgisi
([AdimCizgisi.tsx](src/components/AdimCizgisi.tsx)) bölüm görününce
soldan sağa çiziliyor ve daire merkezlerinden geçiyor. Kaydırma
konumuna bağlı sürekli hesap bilinçli olarak yapılmadı — her karede
ölçüm mobilde takılmaya yol açıyor. Tüm hareketler
`prefers-reduced-motion` ile kapanıyor (globals.css'teki genel kapatma
+ bileşenlerde ayrı kontrol).

Sahte sosyal kanıt (müşteri logosu, uydurma sayı, yorum kartı)
eklenmedi — görsel ilgi ürünün kendi çıktısından çıkarıldı.
Mobil (375px) ve masaüstü (1280px) kontrol edildi, yatay taşma yok,
`lint` + `build` temiz.

### 2026-09-11 — Modül motoru uçtan uca doğrulandı + IBAN koruması gerçekten çalışıyor
`modul_ilerleme` tablosu oluştu; motorun test edilmemiş son iki parçası
canlı veritabanına karşı doğrulandı. Senaryo: 2 kırmızı + 1 sarı
fonksiyonlu bir test karnesi (plan **30.000 TL/ay**), `musteri-bulma`
kapsamında abonelik, modüle geçici iki adım. Sonuç: adım işareti ve
şablon metni (Türkçe karakterlerle birlikte) tam sayfa yenilemeden sonra
da yerinde; iki adım da bitince "Modül bitti" kartı çıkıyor; bitiş
kontrolü iki soruyu tekrar soruyor ve **yeni bir karne** üretiyor — eski
karne geçmişte kalıyor, diğer **19 cevap değişmeden taşınıyor**,
`ai_teshis` bilinçli olarak boş. Plan **30.000 → 20.000 TL/ay** düştü,
Müşteri Bulma plandan çıktı. Ödenen dönemin kapsamı donduğu için modül
abonelik bitene kadar açık kalmaya devam ediyor — doğru davranış.

Yol boyunca canlıda iki gerçek sorun bulundu ve düzeltildi:

**(1) Ödeme ekranı yer tutucu IBAN gösteriyordu.** `ayarlar` tablosunda
`iban = "TR0000"` duruyordu ve "IBAN girilmediyse hesap gösterme"
koruması yalnızca *boş mu* diye baktığı için bunu geçiriyordu. Yani bir
müşteri bugün ödeme ekranını açsa havale yapması gereken hesap olarak
`TR0000` görecekti — korumanın önlemek için yazıldığı durumun ta
kendisi. Artık kontrol ISO 13616 mod-97 sağlaması yapıyor (TR + 24
rakam + sağlama hanesi), yani tek hanesi yanlış yazılmış bir IBAN da
kabul edilmiyor. 10 vakalık doğrulama yazıldı ve geçti. Yer tutucu
değer canlı veritabanından temizlendi.

**(2) Yönetici hata mesajını hiç görmüyordu.** Ayarlar formu geçersiz
girdide `throw` ediyordu; Server Action'da fırlatılan hata yöneticiye
"A server error occurred" diyen ham bir sayfa olarak çıkıyor — yazılan
açıklama ekrana ulaşmıyor. IBAN'da bir hane yanlış yazmak sıradan bir
kullanıcı hatası, çökme değil. Artık sayfaya bir hata koduyla dönülüyor
ve ne olduğu açıkça yazıyor. `throw` yalnızca beklenmedik durumlar
(yetkisiz çağrı, yapılandırma eksikliği) için kaldı.

Ayrıca `schema.sql` sağlamlaştırıldı: Erdem dosyayı çalıştırdığında
`column "is_admin" of relation "profiles" does not exist` hatası aldı.
Sebep, o veritabanında `profiles` tablosunun bizden önce başka bir
kaynaktan oluşmuş olması (Supabase'in "User Management Starter" şablonu
`is_admin` içermeyen bir `profiles` yaratır) — bu durumda
`create table if not exists` hiçbir şey yapmadan geçiyor. Artık eksik
kolonlar `add column if not exists` ile tamamlanıyor; `basvurular` için
zaten kullanılan desen. Not: **production veritabanı etkilenmedi**,
`is_admin` orada baştan beri duruyordu ve hatalı çalıştırma geri alındı.

Test hesapları ve test verisi silindi; tablolar başlangıç durumuna
döndü (2 gerçek hesap, diğer tablolar 0 satır). Mobil (375px)
kontrol edildi.

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
**2026-09-11'de uçtan uca doğrulandı** — aşağıdaki kayda bakınız.

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
