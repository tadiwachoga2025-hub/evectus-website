import type { Metadata } from "next";
import { Navbar } from "@/components/ui/mini-navbar";
import Footer from "@/components/Footer";
import { PrimeNestHero } from "@/components/PrimeNestHero";
import ProblemSection from "@/components/sections/ProblemSection";
import InterludeSection from "@/components/sections/InterludeSection";
import CapabilitiesSection from "@/components/sections/CapabilitiesSection";
import FeaturedWorkSection from "@/components/sections/FeaturedWorkSection";
import FaqSection from "@/components/sections/FaqSection";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Enterprise Technology & Strategy Consultancy",
  description:
    "Evectus Solutions is a Harare-based enterprise technology consultancy delivering digital transformation, strategy, and custom software across Africa.",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Evectus Solutions",
  url: "https://evectussolutions.co.zw",
  logo: "https://evectussolutions.co.zw/evectus-logo.svg",
  email: "evectussolution@gmail.com",
  telephone: "+263789916421",
  slogan: "Shifting the Culture",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Harare",
    addressCountry: "ZW",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      {/* 1. Navigation — transparent over hero, solid paper on scroll */}
      <Navbar overlay />

      <main id="main-content" tabIndex={-1} className="bg-[#f2f2f2] text-[#111111]">
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

        {/* Closing CTA — conversion moment after objections are resolved */}
        <CTABanner
          headline="Ready to replace the ordinary with the extraordinary?"
          body="Tell us about your challenge — we'll show you how we'd solve it."
          ctaLabel="Book a Consultation"
          ctaHref="/contact"
          secondaryCtaLabel="View Our Work"
          secondaryCtaHref="/case-studies"
        />
      </main>

      {/* 9. Footer — UNTOUCHED as requested */}
      <Footer />
    </>
  );
}
