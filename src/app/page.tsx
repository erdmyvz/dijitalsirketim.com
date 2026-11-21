import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Kitleler from "@/components/Kitleler";
import Ajanlar from "@/components/Ajanlar";
import Moduller from "@/components/Moduller";
import Program from "@/components/Program";
import Durum from "@/components/Durum";
import Gorusme from "@/components/Gorusme";
import Sss from "@/components/Sss";
import Footer from "@/components/Footer";

export default function AnaSayfa() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Kitleler />
        <Ajanlar />
        <Moduller />
        <Program />
        <Durum />
        <Gorusme />
        <Sss />
      </main>
      <Footer />
    </>
  );
}
