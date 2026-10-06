import { Awards } from "@/components/sections/awards";
import { CaseStudies } from "@/components/sections/case-studies";
import { Contact } from "@/components/sections/contact";
import { CtaBand } from "@/components/sections/cta-band";
import { Ecosystem } from "@/components/sections/ecosystem";
import { Hero } from "@/components/sections/hero";
import { Industries } from "@/components/sections/industries";
import { Insights } from "@/components/sections/insights";
import { Journey } from "@/components/sections/journey";
import { Solutions } from "@/components/sections/solutions";
import { Testimonials } from "@/components/sections/testimonials";
import { TrustBar } from "@/components/sections/trust-bar";

/**
 * Section order and layout families. No family repeats.
 *   Hero            asymmetric split
 *   TrustBar        logo wall
 *   Solutions       bento grid
 *   Industries      horizontal scroll-snap rail
 *   Journey         sticky column + scroll progress path
 *   CaseStudies     featured split + supporting pair
 *   Awards          featured recognition card + selector rail
 *   Ecosystem       marquee (the page's only one)
 *   Testimonials    typographic quote layout, no cards
 *   Insights        editorial index rows
 *   CtaBand         full-width centred statement
 *   Contact         copy + form split
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Solutions />
      <Industries />
      <Journey />
      <CaseStudies />
      <Awards />
      <Ecosystem />
      <Testimonials />
      <Insights />
      <CtaBand />
      <Contact />
    </>
  );
}
