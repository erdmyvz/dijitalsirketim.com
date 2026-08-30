import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CostOfPain from "@/components/CostOfPain";
import Solution from "@/components/Solution";
import Proof from "@/components/Proof";
import Offer from "@/components/Offer";
import Faq from "@/components/Faq";
import MissionVision from "@/components/MissionVision";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/site";

// Google'ın işletmeyi, teklifi ve SSS'yi anlaması için yapılandırılmış
// veri (JSON-LD). Server component'te render edildiği için ilk HTML'de
// yer alır — arama motorları JavaScript beklemeden okur.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Dijital Şirketim",
  alternateName: "dijitalşirketim.com.tr",
  slogan: "Türkiye'nin Şirket Doktoru",
  url: SITE_URL,
  telephone: "+905319956930",
  founder: { "@type": "Person", name: "Erdem Yavuz" },
  areaServed: { "@type": "Country", name: "Türkiye" },
  description:
    "İşletmelerin müşteri ve gelir problemini kök nedeninden çözen dijital pazarlama kliniği. 21 kontrol noktalı Dijital Check-Up ile teşhis eder, size özel reçeteyle tedavi eder, KPI takibiyle sonucu izler.",
  makesOffer: {
    "@type": "Offer",
    name: "Dijital Check-Up",
    description:
      "21 kontrol noktası analizi, yapay zekâ destekli 5 Neden görüşmesi, kök problem raporu, kişiselleştirilmiş tedavi reçetesi ve 30 dakikalık sonuç görüşmesi.",
    price: "20000",
    priceCurrency: "TRY",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Benim sektörüm farklı, bana uyar mı?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "4 işletme modeli var, 21 kontrol noktası hepsinde aynı çalışır.",
      },
    },
    {
      "@type": "Question",
      name: "Rapor sonrası devam etmek zorunda mıyım?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hayır. Rapor sizindir, tedavi ayrı bir karardır.",
      },
    },
    {
      "@type": "Question",
      name: "Ne kadar sürer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Check-up 48 saat içinde raporlanır.",
      },
    },
    {
      "@type": "Question",
      name: "Bu fiyata nasıl mümkün?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bu, değer merdivenimizin ilk basamağıdır.",
      },
    },
  ],
};

// Tek sayfalık satış sayfası akışı:
// Sorun (Hero) -> Acının Maliyeti (CostOfPain) ->
// Çözüm (Solution: Teşhis-Reçete-Tedavi-Takip) -> İspat/Zıtlık (Proof) ->
// Teklif + Başvuru Formu (Offer) -> SSS (Faq) -> Amaç/Misyon/Vizyon
export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <CostOfPain />
        <Solution />
        <Proof />
        <Offer />
        <Faq />
        <MissionVision />
      </main>
      <Footer />
    </div>
  );
}
