import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TrustStats } from "@/components/sections/TrustStats";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { WhyUs } from "@/components/sections/WhyUs";
import { ProjectOptions } from "@/components/sections/ProjectOptions";
import { Projects } from "@/components/sections/Projects";
import { HouseSchematic } from "@/components/sections/HouseSchematic";
import { Packages } from "@/components/sections/Packages";
import { FoundationSection } from "@/components/sections/FoundationSection";
import { WallSection } from "@/components/sections/WallSection";
import { RoofSection } from "@/components/sections/RoofSection";
import { Process } from "@/components/sections/Process";
import { PaymentStages } from "@/components/sections/PaymentStages";
import { Services } from "@/components/sections/Services";
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
        <WhyUs />
        <ProjectOptions />
        <Projects />
        <HouseSchematic />
        <Packages />
        <FoundationSection />
        <WallSection />
        <RoofSection />
        <Process />
        <PaymentStages />
        <Services />
        <Calculator />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
