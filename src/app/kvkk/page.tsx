import type { Metadata } from "next";
import Link from "next/link";
import LegalSayfa, {
  Baglanti,
  Bolum,
  Liste,
  Metin,
} from "@/components/legal/LegalSayfa";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni | Dijital Şirketim",
  description:
    "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında dijitalşirketim.com.tr tarafından işlenen kişisel verilere ilişkin aydınlatma metni.",
  alternates: { canonical: "/kvkk" },
};

/**
 * Metin, sitenin BUGÜN gerçekten topladığı veriyi anlatır: yalnızca
 * görüşme formu. Hesap açma, check-up kaydı ve yapay zekâ teşhisi
 * kaldırıldığı için (21 Kasım 2026) o bölümler de metinden çıkarıldı —
 * toplanmayan veriyi anlatan bir aydınlatma metni yanıltıcı olur.
 */
export default function KvkkSayfasi() {
  return (
    <LegalSayfa baslik="KVKK Aydınlatma Metni" guncellemeTarihi="21 Kasım 2026">
      <Metin>
        Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu
        (&quot;KVKK&quot;) uyarınca, dijitalşirketim.com.tr (&quot;Site&quot;)
        üzerinden işlenen kişisel verileriniz hakkında sizi bilgilendirmek
        amacıyla hazırlanmıştır.
      </Metin>

      <Bolum>1. Veri Sorumlusu</Bolum>
      <Metin>
        Veri sorumlusu, Site&apos;nin işletmecisi <strong>Erdem Yavuz</strong>
        &apos;dur. Site bir tüzel kişilik (şirket) üzerinden değil, şahıs
        olarak işletilmektedir; bir şirket kurulduğunda bu bölüm şirketin
        unvanıyla güncellenecektir.
      </Metin>
      <Metin>
        İletişim:{" "}
        <Baglanti href="mailto:erdem.yvz@hotmail.com">
          erdem.yvz@hotmail.com
        </Baglanti>{" "}
        · <Baglanti href="tel:+905319956930">+90 531 995 69 30</Baglanti>
      </Metin>

      <Bolum>2. İşlenen Kişisel Veriler ve Toplanma Yöntemi</Bolum>
      <Metin>
        Site&apos;de üyelik yoktur; veri yalnızca sizin doldurduğunuz görüşme
        formu üzerinden toplanır. Form göndermezseniz Site hiçbir kişisel
        verinizi kaydetmez.
      </Metin>
      <Liste>
        <li>
          <strong>Görüşme talebi formu</strong>: ad soyad, telefon (zorunlu);
          e-posta, işletme/ajans adı, hangi gruba ait olduğunuz ve yazdığınız
          serbest metin (isteğe bağlı).
        </li>
        <li>
          <strong>Teknik kayıtlar</strong>: barındırma sağlayıcısının (Vercel)
          tuttuğu standart sunucu günlükleri — IP adresi, tarih/saat, istek
          yapılan adres. Bunlar güvenlik ve hata takibi amacıyla otomatik
          oluşur.
        </li>
      </Liste>

      <Bolum>3. İşleme Amaçları</Bolum>
      <Liste>
        <li>Görüşme talebinize dönüş yapmak ve randevu planlamak,</li>
        <li>Talebin kapsamına uygun bir teklif hazırlamak,</li>
        <li>Site&apos;nin güvenliğini ve çalışır kalmasını sağlamak.</li>
      </Liste>
      <Metin>
        Verileriniz pazarlama listesine eklenmez, size izinsiz toplu ileti
        gönderilmez.
      </Metin>

      <Bolum>4. Hukuki Sebep</Bolum>
      <Metin>
        Form verileri, KVKK m.5/2-(c) uyarınca{" "}
        <em>sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması</em>;
        teknik kayıtlar ise m.5/2-(f) uyarınca{" "}
        <em>meşru menfaat</em> hukuki sebebine dayanılarak işlenir.
      </Metin>

      <Bolum>5. Aktarım</Bolum>
      <Metin>
        Verileriniz satılmaz ve pazarlama amacıyla üçüncü kişilerle
        paylaşılmaz. Yalnızca hizmetin çalışması için kullanılan
        sağlayıcılarda barındırılır:
      </Metin>
      <Liste>
        <li>
          <strong>Vercel</strong> — Site&apos;nin barındırılması ve sunucu
          günlükleri (yurt dışı).
        </li>
        <li>
          <strong>Supabase</strong> — görüşme taleplerinin saklandığı
          veritabanı (yurt dışı).
        </li>
      </Liste>
      <Metin>
        Yurt dışına aktarım, KVKK m.9 çerçevesinde ve yalnızca hizmetin
        sunulabilmesi için gerekli ölçüde yapılır.
      </Metin>

      <Bolum>6. Saklama Süresi</Bolum>
      <Metin>
        Görüşme talepleri, görüşme tamamlandıktan sonra en fazla{" "}
        <strong>2 yıl</strong> saklanır; bu sürenin sonunda silinir. Daha
        erken silinmesini isterseniz yukarıdaki adresten yazmanız yeterlidir.
      </Metin>

      <Bolum>7. Haklarınız</Bolum>
      <Metin>
        KVKK m.11 uyarınca; kişisel verinizin işlenip işlenmediğini öğrenme,
        buna ilişkin bilgi talep etme, düzeltilmesini veya silinmesini isteme
        ve işlemenin kanuna aykırı olduğunu düşünüyorsanız itiraz etme
        haklarına sahipsiniz. Talebinizi yukarıdaki e-posta adresine
        iletebilirsiniz; en geç 30 gün içinde yanıtlanır.
      </Metin>

      <Bolum>8. Çerezler</Bolum>
      <Metin>
        Site&apos;de reklam veya takip çerezi kullanılmaz. Ayrıntı için{" "}
        <Link
          href="/gizlilik"
          className="text-indigo-400 underline underline-offset-2 hover:text-indigo-300"
        >
          Gizlilik ve Çerez Politikası
        </Link>
        .
      </Metin>
    </LegalSayfa>
  );
}
