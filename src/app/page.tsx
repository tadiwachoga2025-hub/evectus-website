import { Navbar } from "@/components/ui/mini-navbar";
import Footer from "@/components/Footer";
import { PrimeNestHero } from "@/components/PrimeNestHero";
import ProblemSection from "@/components/sections/ProblemSection";
import InterludeSection from "@/components/sections/InterludeSection";
import CapabilitiesSection from "@/components/sections/CapabilitiesSection";
import FeaturedWorkSection from "@/components/sections/FeaturedWorkSection";
import FaqSection from "@/components/sections/FaqSection";

export default function Home() {
  return (
    <>
      {/* 1. Navigation — transparent over hero, solid paper on scroll */}
      <Navbar overlay />

      <main className="bg-[#f2f2f2] text-[#111111]">
        {/* 2. Hero Section — Vertex AI 2-line headline, dual CTAs, scroll cue */}
        <PrimeNestHero />

        {/* 3. Problem Section — 12-column editorial statement + image card */}
        <ProblemSection />

        {/* 5. Interlude Section — Full-height dark statement section */}
        <InterludeSection />

        {/* 6. Capabilities Index — 4 practice areas + 6 claims bento grid */}
        <CapabilitiesSection />

        {/* 7. Featured Work — Real Evectus case study engagements */}
        <FeaturedWorkSection />

        {/* 8. FAQ Section — flat bordered rows, Vertex layout */}
        <FaqSection />
      </main>

      {/* 9. Footer — UNTOUCHED as requested */}
      <Footer />
    </>
  );
}
