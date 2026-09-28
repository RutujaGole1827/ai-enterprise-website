import type { Metadata } from "next";

import {
  databricksBenefits,
  databricksCapabilities,
  databricksCertifications,
  databricksCta,
  databricksHero,
  databricksLakebridge,
  databricksMetrics,
  databricksOfferings,
  databricksWhyIntro,
} from "@/lib/partners/databricks";
import { CapabilityMap } from "@/components/sections/partner/capability-map";
import { DatabricksHeroBackground } from "@/components/sections/partner/databricks-hero-background";
import { FinalCta } from "@/components/sections/partner/final-cta";
import { LakebridgeFlow } from "@/components/sections/partner/lakebridge-flow";
import { OfferingExplorer } from "@/components/sections/partner/offering-explorer";
import { PartnerHero } from "@/components/sections/partner/partner-hero";
import { StatStrip } from "@/components/sections/partner/stat-strip";
import { ValueBento } from "@/components/sections/partner/value-bento";

const heroTitle = `${databricksHero.title} ${databricksHero.highlight}`;

export const metadata: Metadata = {
  title: "Databricks Partner",
  description: databricksHero.body[0],
  alternates: { canonical: "/partners-databricks" },
  openGraph: {
    title: heroTitle,
    description: databricksHero.body[0],
    url: "/partners-databricks",
  },
};

/**
 * Databricks partner page. Sibling to /partners-microsoft — same section
 * architecture and components — but not a clone: full-height hero with a
 * Databricks red/orange background instead of the diagram wash, a
 * balanced 3-up metric strip instead of 5, a capability map instead of
 * industry panels, and its own Lakebridge migration-flow section that
 * Microsoft's page has no equivalent of.
 *
 * Section order and layout families.
 *   PartnerHero       full-height, platform-to-hub beam diagram, Databricks bg
 *   StatStrip         3-up balanced grid (no certification strip image)
 *   OfferingExplorer  list + detail panel (accordion below lg)
 *   ValueBento        2 + 3 bento with pointer spotlight
 *   CapabilityMap     four connected capability groups along one spine
 *   LakebridgeFlow    Legacy → Lakebridge → Lakehouse → AI/Analytics
 *   FinalCta          the page's one dark block, Databricks red/orange beam
 *
 * No Contact section, no testimonials: the live page has neither for
 * Databricks. "Contact Our Team" sends visitors to the home page's form,
 * same as the Microsoft page — see components/layout/contact-link.tsx.
 */
export default function DatabricksPartnerPage() {
  return (
    <>
      <PartnerHero
        title={heroTitle}
        body={databricksHero.body}
        primaryCta={databricksHero.primaryCta}
        emphasis={databricksHero.emphasis}
        platforms={["Delta Lake", "Unity Catalog", "MLflow", "Spark", "Lakebridge"]}
        partnerName="Databricks"
        partnerLogo="/brand/partners/databricks.svg"
        background={<DatabricksHeroBackground />}
        fullHeight
      />
      <StatStrip
        items={databricksMetrics}
        certifications={databricksCertifications}
        label="Our Databricks practice in numbers"
      />
      <OfferingExplorer {...databricksOfferings} />
      <ValueBento
        title="Why Partner with Us"
        body={databricksWhyIntro}
        items={databricksBenefits.map((benefit) => ({
          title: benefit.title,
          body: benefit.body,
          icon: BENEFIT_ICONS[benefit.title] ?? "stack",
        }))}
      />
      <CapabilityMap
        title={databricksCapabilities.title}
        body={databricksCapabilities.body}
        categories={databricksCapabilities.categories}
      />
      <LakebridgeFlow
        title={databricksLakebridge.title}
        tools={databricksLakebridge.tools}
        flow={databricksLakebridge.flow}
        benefits={databricksLakebridge.benefits}
      />
      <FinalCta
        {...databricksCta}
        beamColorFrom="#ff8a65"
        beamColorTo="#ff3621"
        highlightTo="#ff8a65"
        glowColor="255,86,48"
      />
    </>
  );
}

/** ValueBento's icon set is fixed (stack/certificate/lightning/cpu/chart);
 * mapped here by benefit title rather than adding a sixth icon key just
 * for this page. */
const BENEFIT_ICONS: Record<string, "stack" | "certificate" | "lightning" | "cpu" | "chart"> = {
  "Business-first approach": "chart",
  "Accelerated delivery": "lightning",
  "Seamless interoperability": "stack",
  "Continuous enablement": "cpu",
  "Data you can trust": "certificate",
};
