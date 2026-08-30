import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CostOfPain from "@/components/CostOfPain";
import Solution from "@/components/Solution";
import Proof from "@/components/Proof";
import Offer from "@/components/Offer";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

// Tek sayfalık satış sayfası akışı:
// Sorun (Hero) -> Acının Maliyeti (CostOfPain) ->
// Çözüm (Solution: Teşhis-Reçete-Tedavi-Takip) -> İspat/Zıtlık (Proof) ->
// Teklif + Başvuru Formu (Offer) -> SSS (Faq)
export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <CostOfPain />
        <Solution />
        <Proof />
        <Offer />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
