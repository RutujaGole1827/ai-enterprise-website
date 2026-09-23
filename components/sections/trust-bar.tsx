import { trustedBy } from "@/lib/content";
import { brandSvg } from "@/lib/brand-svg";

/**
 * Logo wall. Sits directly UNDER the hero, never inside it.
 * LOGO-ONLY: marks and nothing else. No industry labels beneath them.
 *
 * The marks are inlined with their flat brand colour rewritten to
 * `currentColor` (see scripts/build-brand-svg.mjs), so a single set of files
 * reads correctly in both themes instead of needing a light and a dark copy.
 */
export function TrustBar() {
  return (
    <section
      aria-label="Organisations we work with"
      className="border-b border-line bg-canvas py-12 md:py-14"
    >
      <div className="shell">
        <div className="flex flex-col items-center gap-8">
          <p className="text-sm text-muted">
            Trusted by data and engineering teams at
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-14 lg:gap-x-16">
            {trustedBy.map((company) => (
              <li key={company.name} className="flex items-center">
                <span
                  role="img"
                  aria-label={company.name}
                  className="block text-muted transition-colors duration-300 hover:text-ink [&>svg]:h-7 [&>svg]:w-auto"
                  dangerouslySetInnerHTML={{
                    __html: brandSvg[company.mark],
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
