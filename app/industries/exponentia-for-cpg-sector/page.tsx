import type { Metadata } from "next";

import { cpgCaseStudies, cpgHero, cpgStory } from "@/lib/industries/cpg";
import { HeroSection } from "@/components/ui/hero-section-with-smooth-bg-shader";
import { EditorialQuoteSplit } from "@/components/ui/editorial-quote-split";
import { CPGSolutionsScrolling } from "@/components/ui/cpg-solutions-scrolling";
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
 *   1. HeroSection          MeshGradient shader hero
 *   2. EditorialQuoteSplit  the Steve Jobs quote + CPG data story
 *   3. CPGSolutionsScrolling the eight CPG solutions as a sticky card
 *      stack (its own defaults draw from lib/industries/cpg's cpgGrowth,
 *      the live page's own eight use-case cards)
 *   4. CaseStudiesShowcase  the "Client success stories" featured showcase
 */
export default function CpgIndustryPage() {
  return (
    <>
      <HeroSection {...cpgHero} />
      <EditorialQuoteSplit {...cpgStory} />
      <CPGSolutionsScrolling />
      <CaseStudiesShowcase {...cpgCaseStudies} />
    </>
  );
}
