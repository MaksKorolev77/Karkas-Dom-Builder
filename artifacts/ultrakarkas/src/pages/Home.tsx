import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TrustStats } from "@/components/sections/TrustStats";
import { Projects } from "@/components/sections/Projects";
import { Packages } from "@/components/sections/Packages";
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
        <Projects />
        <Packages />
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
