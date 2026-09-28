import type { Metadata } from "next";

import { cpgCaseStudies, cpgGrowth, cpgHero, cpgStory } from "@/lib/industries/cpg";
import { HeroSection } from "@/components/ui/hero-section-with-smooth-bg-shader";
import { EditorialQuoteSplit } from "@/components/ui/editorial-quote-split";
import { GrowthBentoGrid } from "@/components/ui/growth-bento-grid";
import { CaseStudiesShowcase } from "@/components/ui/case-studies-showcase";

export const metadata: Metadata = {
  title: "AI for CPG",
  description: cpgHero.description,
  alternates: { canonical: "/industries/exponentia-for-cpg-sector" },
  openGraph: {
    title: `${cpgHero.title} ${cpgHero.highlightText}`,
    description: cpgHero.description,
    url: "/industries/exponentia-for-cpg-sector",
  },
};

/**
 * CPG industry page. Built one section at a time:
 *   1. HeroSection         MeshGradient shader hero
 *   2. EditorialQuoteSplit the Steve Jobs quote + CPG data story
 *   3. GrowthBentoGrid     the eight CPG solution use-case cards
 *   4. CaseStudiesShowcase the "Client success stories" featured showcase
 */
export default function CpgIndustryPage() {
  return (
    <>
      <HeroSection {...cpgHero} />
      <EditorialQuoteSplit {...cpgStory} />
      <GrowthBentoGrid {...cpgGrowth} />
      <CaseStudiesShowcase {...cpgCaseStudies} />
    </>
  );
}
