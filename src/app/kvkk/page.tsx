import type { Metadata } from "next";
import Link from "next/link";
import LegalSayfa, { Bolum, Liste, Metin } from "@/components/legal/LegalSayfa";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni | Dijital Şirketim",
  description:
    "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında dijitalşirketim.com.tr tarafından işlenen kişisel verilere ilişkin aydınlatma metni.",
  alternates: { canonical: "/kvkk" },
};

export default function KvkkSayfasi() {
  return (
    <LegalSayfa baslik="KVKK Aydınlatma Metni" guncellemeTarihi="8 Eylül 2026">
      <Metin>
        Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu
        (&quot;KVKK&quot;) uyarınca, dijitalşirketim.com.tr (&quot;Site&quot;)
        üzerinden işlenen kişisel verileriniz hakkında sizi bilgilendirmek
        amacıyla hazırlanmıştır.
      </Metin>

      <Bolum>1. Veri Sorumlusu</Bolum>
      <Metin>
        Veri sorumlusu, Site&apos;nin işletmecisi <strong>Erdem Yavuz</strong>
        &apos;dur. Site şu an bir tüzel kişilik (şirket) üzerinden değil,
        şahıs olarak işletilmektedir; bir şirket kurulduğunda bu bölüm
        şirketin unvanı ile güncellenecektir.
      </Metin>
      <Metin>
        İletişim:{" "}
        <a href="mailto:erdem.yvz@hotmail.com" className="text-teal-700 underline hover:text-teal-800">
          erdem.yvz@hotmail.com
        </a>{" "}
        ·{" "}
        <a href="tel:+905319956930" className="text-teal-700 underline hover:text-teal-800">
          +90 531 995 69 30
        </a>
      </Metin>

      <Bolum>2. İşlenen Kişisel Veriler ve Toplanma Yöntemi</Bolum>
      <Metin>Site üzerinde, kullandığınız bölüme göre şu veriler işlenir:</Metin>
      <Liste>
        <li>
          <strong>Başvuru formu</strong> (ana sayfa, &quot;Teklif&quot;
          bölümü): ad soyad, telefon, varsa işletme adı ve sektör.
        </li>
        <li>
          <strong>Dijital Check-Up sihirbazı</strong>: işletme adı, sektör,
          iş modeli, çalışan sayısı, ciro aralığı, işletmenizle ilgili
          serbestçe yazdığınız problem tanımı ve 21 soruya verdiğiniz
          cevaplar. Hesap açmadığınız sürece bu veriler yalnızca kendi
          tarayıcınızda tutulur, bize gönderilmez.
        </li>
        <li>
          <strong>Hesap oluşturma</strong> (&quot;Hesabım&quot;): e-posta
          adresiniz, şifreniz (şifreniz bizim tarafımızdan görülemeyecek
          şekilde saklanır) ve isteğe bağlı olarak ad soyadınız.
        </li>
        <li>
          <strong>Kaydedilen karneler</strong>: hesap açtıktan sonra
          Check-Up sonucunuzu kaydetmeyi seçerseniz, yukarıdaki Check-Up
          verileriniz ve yapay zekâ ön teşhis metni hesabınıza bağlı
          olarak saklanır.
        </li>
      </Liste>

      <Bolum>3. İşlenme Amaçları ve Hukuki Sebep</Bolum>
      <Metin>Kişisel verileriniz şu amaçlarla işlenir:</Metin>
      <Liste>
        <li>Talebinizi değerlendirmek ve sizinle iletişime geçmek,</li>
        <li>Dijital Check-Up sonucunuzu ve ön teşhisi üretmek,</li>
        <li>Hesabınızla ilgili işlemleri (giriş, karne geçmişi) yürütmek,</li>
        <li>Yasal yükümlülüklerin yerine getirilmesi.</li>
      </Liste>
      <Metin>
        Bu işlemenin hukuki sebebi, KVKK m.5/2 kapsamında bir sözleşmenin
        kurulması veya ifasıyla doğrudan ilgili olması ve açık rızanızın
        alınmasıdır (başvuru formundaki onay kutusu, hesap kaydı sırasındaki
        onay).
      </Metin>

      <Bolum>4. Verilerin Aktarıldığı Taraflar</Bolum>
      <Metin>
        Verileriniz, Site&apos;nin altyapısını sağlayan aşağıdaki hizmet
        sağlayıcılarla, yalnızca hizmetin çalışması için gerektiği ölçüde
        paylaşılır:
      </Metin>
      <Liste>
        <li>
          <strong>Supabase</strong> — veritabanı ve hesap/giriş
          altyapısı sağlayıcısı. Başvurularınız, hesabınız ve
          kaydettiğiniz karneler burada saklanır.
        </li>
        <li>
          <strong>Google (Gemini API)</strong> — yapay zekâ ön teşhisi
          üretmek için Check-Up cevaplarınız (sektör, iş modeli, ölçek,
          21 cevap, problem tanımınız) gönderilir.{" "}
          <strong>İşletme adınız bu istekten bilinçli olarak
          çıkarılır</strong> — detay için{" "}
          <Link href="/gizlilik" className="text-teal-700 underline hover:text-teal-800">
            Gizlilik Politikası
          </Link>
          &apos;na bakın.
        </li>
      </Liste>
      <Metin>
        Verileriniz, yukarıdakiler dışında, yasal bir zorunluluk olmadıkça
        üçüncü kişilerle paylaşılmaz, satılmaz veya pazarlama amacıyla
        kiralanmaz.
      </Metin>

      <Bolum>5. Saklama Süresi</Bolum>
      <Metin>
        Verileriniz, işlenme amacının gerektirdiği süre boyunca ve ilgili
        mevzuatta öngörülen zamanaşımı süreleri saklı kalmak kaydıyla
        saklanır. Hesabınızı ve kayıtlı karnelerinizi silmek isterseniz
        aşağıdaki iletişim adresinden talepte bulunabilirsiniz.
      </Metin>

      <Bolum>6. KVKK m.11 Kapsamındaki Haklarınız</Bolum>
      <Metin>KVKK&apos;nın 11. maddesi uyarınca şu haklara sahipsiniz:</Metin>
      <Liste>
        <li>Kişisel verinizin işlenip işlenmediğini öğrenme,</li>
        <li>İşlenmişse buna ilişkin bilgi talep etme,</li>
        <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
        <li>Yurt içinde/dışında aktarıldığı üçüncü kişileri bilme,</li>
        <li>Eksik/yanlış işlenmişse düzeltilmesini isteme,</li>
        <li>Silinmesini veya yok edilmesini isteme,</li>
        <li>Bu işlemlerin, verinin aktarıldığı üçüncü kişilere bildirilmesini isteme,</li>
        <li>
          İşlenen verinin münhasıran otomatik sistemlerle analiz edilmesi
          yoluyla aleyhinize bir sonucun ortaya çıkmasına itiraz etme,
        </li>
        <li>Zarara uğramanız hâlinde zararın giderilmesini talep etme.</li>
      </Liste>
      <Metin>
        Bu haklarınızı kullanmak için{" "}
        <a href="mailto:erdem.yvz@hotmail.com" className="text-teal-700 underline hover:text-teal-800">
          erdem.yvz@hotmail.com
        </a>{" "}
        adresinden bize ulaşabilirsiniz.
      </Metin>
    </LegalSayfa>
  );
}
