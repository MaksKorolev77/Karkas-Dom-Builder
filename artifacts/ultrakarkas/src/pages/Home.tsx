import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TrustStats } from "@/components/sections/TrustStats";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { WhyUs } from "@/components/sections/WhyUs";
import { ProjectOptions } from "@/components/sections/ProjectOptions";
import { Projects } from "@/components/sections/Projects";
import { Packages } from "@/components/sections/Packages";
import { PaymentStages } from "@/components/sections/PaymentStages";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { HouseSchematic } from "@/components/sections/HouseSchematic";
import { TechIntro } from "@/components/sections/TechIntro";
import { FoundationSection } from "@/components/sections/FoundationSection";
import { WallSection } from "@/components/sections/WallSection";
import { RoofSection } from "@/components/sections/RoofSection";
import { Calculator } from "@/components/sections/Calculator";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <Hero />          {/* dark photo */}
        <TrustStats />    {/* bg-muted/40 */}
        <ComparisonSection /> {/* bg-slate-950 dark */}
        <WhyUs />         {/* bg-background white */}
        <ProjectOptions /> {/* bg-muted/20 */}
        <Projects />      {/* bg-background white */}
        <Packages />      {/* bg-muted/40 */}
        <PaymentStages /> {/* bg-background white */}
        <Process />       {/* bg-muted/40 */}
        <Services />      {/* bg-background white */}
        <HouseSchematic /> {/* bg-slate-950 dark */}
        <TechIntro />     {/* bg-foreground dark */}
        <div id="tech-foundation"><FoundationSection /></div> {/* bg-background white */}
        <div id="tech-walls"><WallSection /></div>            {/* bg-muted/30 */}
        <div id="tech-roof"><RoofSection /></div>             {/* bg-background white */}
        <Calculator />    {/* bg-muted/40 */}
        <FAQ />           {/* bg-background white */}
        <Contact />       {/* bg-muted */}
      </main>
      <Footer />
    </div>
  );
}
