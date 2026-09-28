import type { Metadata } from "next";

import {
  microsoftCertifications,
  microsoftCta,
  microsoftHero,
  microsoftIndustries,
  microsoftMetrics,
  microsoftOfferings,
  microsoftPillars,
  microsoftTestimonials,
} from "@/lib/partners/microsoft";
import { CircularTestimonials } from "@/components/sections/partner/circular-testimonials";
import { FinalCta } from "@/components/sections/partner/final-cta";
import { IndustryPanels } from "@/components/sections/partner/industry-panels";
import { OfferingExplorer } from "@/components/sections/partner/offering-explorer";
import { PartnerHero } from "@/components/sections/partner/partner-hero";
import { StatStrip } from "@/components/sections/partner/stat-strip";
import { ValueBento } from "@/components/sections/partner/value-bento";

export const metadata: Metadata = {
  title: "Microsoft Partner",
  description: microsoftHero.body[0],
  alternates: { canonical: "/partners-microsoft" },
  openGraph: {
    title: microsoftHero.title,
    description: microsoftHero.body[0],
    url: "/partners-microsoft",
  },
};

/**
 * Microsoft partner page. The route matches the live URL so existing links
 * and search listings carry over.
 *
 * Section order and layout families. No family repeats.
 *   PartnerHero       split, platform-to-hub beam diagram
 *   StatStrip         certification badges over a hairline figure grid
 *   ValueBento        2 + 3 bento with pointer spotlight
 *   OfferingExplorer  list + detail panel (accordion below lg)
 *   IndustryPanels        expanding panel row
 *   CircularTestimonials  stacked-circle avatars, crossfading quote
 *   FinalCta              the page's one navy block, its own close
 *
 * No Contact section: "Contact Our Team" (the CTA band) and "Book a
 * consultation" (the header) both send visitors to the home page's form
 * instead — see components/layout/contact-link.tsx.
 */
export default function MicrosoftPartnerPage() {
  return (
    <>
      <PartnerHero {...microsoftHero} />
      <StatStrip
        items={microsoftMetrics}
        certifications={microsoftCertifications}
      />
      <ValueBento
        title="Why Microsoft + Exponentia.ai"
        items={microsoftPillars}
      />
      <OfferingExplorer {...microsoftOfferings} />
      <IndustryPanels {...microsoftIndustries} />
      <CircularTestimonials
        title="Client Testimonials"
        items={microsoftTestimonials}
      />
      <FinalCta {...microsoftCta} />
    </>
  );
}
