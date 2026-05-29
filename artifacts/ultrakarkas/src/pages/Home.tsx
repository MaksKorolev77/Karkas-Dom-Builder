import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TrustStats } from "@/components/sections/TrustStats";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { Projects } from "@/components/sections/Projects";
import { HouseSchematic } from "@/components/sections/HouseSchematic";
import { Packages } from "@/components/sections/Packages";
import { WallSection } from "@/components/sections/WallSection";
import { RoofSection } from "@/components/sections/RoofSection";
import { FoundationSection } from "@/components/sections/FoundationSection";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";
import { Calculator } from "@/components/sections/Calculator";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <TrustStats />
        <ComparisonSection />
        <Projects />
        <HouseSchematic />
        <Packages />
        <WallSection />
        <RoofSection />
        <FoundationSection />
        <Process />
        <Services />
        <WhyUs />
        <Calculator />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
