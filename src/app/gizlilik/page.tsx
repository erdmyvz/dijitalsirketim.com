import type { Metadata } from "next";
import Link from "next/link";
import LegalSayfa, { Bolum, Liste, Metin } from "@/components/legal/LegalSayfa";

export const metadata: Metadata = {
  title: "Gizlilik Politikası ve Çerezler | Dijital Şirketim",
  description:
    "dijitalşirketim.com.tr hangi verileri neden topluyor, verileriniz nerede saklanıyor, hangi çerezler kullanılıyor — sade bir dille anlatıyoruz.",
  alternates: { canonical: "/gizlilik" },
};

export default function GizlilikSayfasi() {
  return (
    <LegalSayfa baslik="Gizlilik Politikası" guncellemeTarihi="8 Eylül 2026">
      <Metin>
        Bu sayfa, dijitalşirketim.com.tr&apos;nin verilerinizle ne yaptığını
        hukuki dilden çok, sade bir dille anlatır. Resmî metin için{" "}
        <Link href="/kvkk" className="text-teal-700 underline hover:text-teal-800">
          KVKK Aydınlatma Metni
        </Link>
        &apos;ne bakabilirsiniz.
      </Metin>

      <Bolum>Ne topluyoruz, neden?</Bolum>
      <Metin>
        Kısaca: yalnızca hizmeti çalıştırmak için gereken veriyi topluyoruz.
        Reklam ağlarına veri satmıyoruz, ziyaretçi davranışını izleyen
        analiz/reklam aracı (Google Analytics, Facebook Pixel vb.)
        kullanmıyoruz — Site&apos;de böyle bir üçüncü taraf takip kodu
        yok.
      </Metin>
      <Liste>
        <li>
          <strong>Başvuru formunu doldurursanız:</strong> ad soyad,
          telefon, varsa işletme adı/sektör — size dönüş yapabilmek için.
        </li>
        <li>
          <strong>Check-Up&apos;ı yaparsanız:</strong> verdiğiniz cevaplar
          — Dijital Sağlık Karnenizi ve yapay zekâ ön teşhisini
          üretebilmek için. Hesap açmadan yaparsanız bu veriler yalnızca
          sizin tarayıcınızda kalır, bize hiç ulaşmaz.
        </li>
        <li>
          <strong>Hesap açarsanız:</strong> e-posta ve şifreniz — giriş
          yapabilmeniz ve karnelerinizi saklayabilmeniz için. Şifrenizi
          biz de göremeyiz, Supabase (altyapı sağlayıcımız) tarafından
          geri döndürülemez şekilde saklanır.
        </li>
      </Liste>

      <Bolum>Yapay zekâ ön teşhisi ve Google Gemini</Bolum>
      <Metin>
        Check-Up sonucunuzdaki &quot;Yapay Zekâ Ön Teşhisi&quot; kartı
        Google&apos;ın Gemini modelini kullanır. Bunun için sektörünüz, iş
        modeliniz, ölçeğiniz, 21 sorunun cevapları ve yazdığınız problem
        tanımı Google&apos;a gönderilir.
      </Metin>
      <Metin>
        <strong>İşletmenizin adını bu isteğe bilinçli olarak dahil
        etmiyoruz.</strong> Sebebi şu: Gemini&apos;nin ücretsiz katmanında
        gönderilen içerik Google tarafından ürün geliştirme amacıyla
        kullanılabiliyor (ücretli katmanda kullanılmıyor). İşletme adınızı
        çıkararak, teşhis kalitesinden ödün vermeden veriyi
        kimliksizleştiriyoruz — model zaten isimden teşhise katkı
        sağlayacak bir şey çıkarmıyor.
      </Metin>

      <Bolum>Verileriniz nerede saklanıyor?</Bolum>
      <Metin>
        Başvurularınız, hesabınız ve kaydettiğiniz karneler{" "}
        <strong>Supabase</strong> üzerinde saklanır — veritabanı ve
        kimlik doğrulama altyapımız. Tabloya erişim, satır düzeyi güvenlik
        kurallarıyla korunur: kendi karnelerinizi yalnızca siz
        görebilirsiniz, başka bir kullanıcı hesabı bunları göremez.
      </Metin>

      <Bolum>Çerezler</Bolum>
      <Metin>
        Site&apos;de yalnızca <strong>zorunlu/işlevsel çerezler</strong>{" "}
        kullanılır — reklam, analiz veya çapraz-site takip çerezi yoktur:
      </Metin>
      <Liste>
        <li>
          <strong>Oturum çerezleri</strong> (Supabase Auth) — yalnızca
          giriş yaptıysanız oluşur, oturumunuzun açık kalmasını sağlar.
          Bunlar olmadan hesabınıza giriş yapılı kalamaz.
        </li>
      </Liste>
      <Metin>
        Ayrıca Check-Up sihirbazındaki ilerlemeniz, çerez değil{" "}
        <strong>tarayıcı deposunda (localStorage)</strong> tutulur — bu da
        yalnızca sizin cihazınızda kalır, bize hiç gönderilmez; sekmeyi
        kapatıp geri dönseniz bile kaldığınız yerden devam edebilmeniz
        içindir.
      </Metin>

      <Bolum>Haklarınız</Bolum>
      <Metin>
        Verilerinizin bir kopyasını isteyebilir, düzeltilmesini veya
        silinmesini talep edebilirsiniz. Detaylı liste için{" "}
        <Link href="/kvkk" className="text-teal-700 underline hover:text-teal-800">
          KVKK Aydınlatma Metni
        </Link>
        &apos;ne bakın; taleplerinizi{" "}
        <a href="mailto:erdem.yvz@hotmail.com" className="text-teal-700 underline hover:text-teal-800">
          erdem.yvz@hotmail.com
        </a>{" "}
        adresine iletebilirsiniz.
      </Metin>
    </LegalSayfa>
  );
}
