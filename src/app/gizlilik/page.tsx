import type { Metadata } from "next";
import Link from "next/link";
import LegalSayfa, {
  Baglanti,
  Bolum,
  Liste,
  Metin,
} from "@/components/legal/LegalSayfa";

export const metadata: Metadata = {
  title: "Gizlilik ve Çerez Politikası | Dijital Şirketim",
  description:
    "dijitalşirketim.com.tr hangi verileri topluyor, nerede saklıyor, kimlerle paylaşıyor ve çerez kullanıyor mu — sade bir anlatım.",
  alternates: { canonical: "/gizlilik" },
};

/**
 * KVKK metni hukuki çerçeveyi anlatır; bu sayfa aynı şeyi gündelik
 * dille söyler. İkisi de 21 Kasım 2026'da, site baştan yazıldığında
 * güncellendi: artık hesap açma, karne kaydı ve yapay zekâ teşhisi yok.
 */
export default function GizlilikSayfasi() {
  return (
    <LegalSayfa
      baslik="Gizlilik ve Çerez Politikası"
      guncellemeTarihi="21 Kasım 2026"
    >
      <Metin>
        Kısa cevap: Site&apos;de üyelik yok, çerez yok, takip yok. Tek veri
        kaynağı, kendi isteğinizle doldurduğunuz görüşme formu.
      </Metin>

      <Bolum>Ne topluyoruz?</Bolum>
      <Metin>
        <strong>Formu doldurursanız:</strong> ad soyadınız ve telefonunuz
        (zorunlu); verirseniz e-postanız, işletme adınız, hangi gruba ait
        olduğunuz ve yazdığınız not. Bunlar size dönüş yapabilmek içindir.
      </Metin>
      <Metin>
        <strong>Formu doldurmazsanız:</strong> hiçbir kişisel veriniz
        kaydedilmez. Sayfayı gezmeniz bir kayıt oluşturmaz.
      </Metin>
      <Metin>
        Bunların dışında, siteyi barındıran Vercel&apos;in otomatik sunucu
        günlükleri vardır (IP, zaman, istenen adres). Bunları biz
        oluşturmuyoruz; her web sunucusunda bulunur ve güvenlik için
        tutulur.
      </Metin>

      <Bolum>Çerez kullanıyor muyuz?</Bolum>
      <Metin>
        <strong>Hayır.</strong> Site hiçbir çerez yazmıyor: ne reklam, ne
        analiz, ne oturum çerezi. Google Analytics, Meta Pixel ya da benzeri
        bir takip aracı da yok. Bu yüzden sayfada çerez onay şeridi de
        görmüyorsunuz — onaylanacak bir şey yok.
      </Metin>
      <Metin>
        İleride bir ölçümleme aracı eklenirse bu sayfa güncellenir ve
        gerekli onay ekranı eklenir.
      </Metin>

      <Bolum>Nerede saklanıyor?</Bolum>
      <Liste>
        <li>
          <strong>Vercel</strong> — sitenin kendisi ve sunucu günlükleri.
        </li>
        <li>
          <strong>Supabase</strong> — görüşme taleplerinin tutulduğu
          veritabanı. Tabloya satır bazlı güvenlik uygulanır; kayıtlara
          tarayıcıdan erişilemez, yalnızca sunucu yazabilir.
        </li>
      </Liste>
      <Metin>
        Her iki sağlayıcının sunucuları da yurt dışındadır.
      </Metin>

      <Bolum>Kimlerle paylaşıyoruz?</Bolum>
      <Metin>
        Hiç kimseyle. Verileriniz satılmaz, pazarlama listelerine eklenmez,
        üçüncü kişilere aktarılmaz. Yalnızca yukarıdaki iki sağlayıcıda,
        hizmetin çalışması için barındırılır.
      </Metin>

      <Bolum>Ne kadar süre saklanıyor?</Bolum>
      <Metin>
        Görüşme talepleri en fazla iki yıl. Daha erken silinmesini isterseniz{" "}
        <Baglanti href="mailto:erdem.yvz@hotmail.com">
          erdem.yvz@hotmail.com
        </Baglanti>{" "}
        adresine yazmanız yeterli; kaydınız silinir ve size bilgi verilir.
      </Metin>

      <Bolum>Sitedeki ekran görüntüleri gerçek mi?</Bolum>
      <Metin>
        Hayır, hepsi örnektir ve her birinin köşesinde &quot;Örnek
        ekran&quot; yazar. Sayfadaki rakamlar, işletme adları ve mesajlar
        gerçek müşterilere ait değildir; sistemin nasıl görüneceğini
        göstermek için hazırlanmıştır. Gerçek sonuçlar ancak gerçek
        işletmelerle çalışıldıktan ve ölçüldükten sonra paylaşılacaktır.
      </Metin>

      <Bolum>Haklarınız</Bolum>
      <Metin>
        Verinizin işlenip işlenmediğini öğrenme, düzeltme ve silme
        haklarınızın tamamı için{" "}
        <Link
          href="/kvkk"
          className="text-indigo-400 underline underline-offset-2 hover:text-indigo-300"
        >
          KVKK Aydınlatma Metni
        </Link>
        .
      </Metin>
    </LegalSayfa>
  );
}
