import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Pain from "@/components/Pain";
import Solution from "@/components/Solution";
import Proof from "@/components/Proof";
import Offer from "@/components/Offer";
import RegisterSection from "@/components/RegisterSection";
import Footer from "@/components/Footer";

// Tek sayfalık satış sayfası akışı:
// Sorun (Hero) -> Acı (Pain) -> Çözüm (Solution: Teşhis-Reçete-Tedavi-Takip)
// -> İspat (Proof) -> Teklif (Offer) -> Kayıt CTA (RegisterSection)
export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Pain />
        <Solution />
        <Proof />
        <Offer />
        <RegisterSection />
      </main>
      <Footer />
    </div>
  );
}
