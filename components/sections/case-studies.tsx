import Image from "next/image";
import Link from "next/link";

import { caseStudies } from "@/lib/content";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * Featured-plus-supporting layout. One engagement gets the full split
 * treatment; the other two run as a compact pair underneath. Deliberately not
 * a third zig-zag row and not another equal-width card grid.
 *
 * Each card is a single link target (the heading), so there is no repeated
 * "Read case study" button competing with the page CTA.
 *
 * Mobile: the split stacks image over copy; the pair becomes one column.
 */
export function CaseStudies() {
  const featured = caseStudies.find((entry) => entry.featured) ?? caseStudies[0];
  const rest = caseStudies.filter((entry) => entry.id !== featured.id);

  return (
    <section
      id="case-studies"
      className="section-y min-h-section border-b border-line"
    >
      <div className="shell">
        <SectionHeading
          title="Work that reached production"
          body="Three programmes where the model, the platform and the people who run it all shipped together."
        />

        <div className="mt-12 lg:mt-16">
          <article className="relative grid grid-cols-1 items-center gap-8 overflow-hidden rounded-[var(--radius-surface)] border border-line bg-surface lg:grid-cols-12 lg:gap-0">
            <div className="relative aspect-[16/10] w-full lg:col-span-7 lg:aspect-[7/5] lg:h-full">
              <Image
                src={featured.image.src}
                alt={featured.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col gap-5 p-6 pb-8 lg:col-span-5 lg:p-10">
              <p className="text-sm text-muted">
                {featured.client}, {featured.sector}
              </p>
              <h3 className="max-w-[20ch] text-2xl font-semibold tracking-[-0.025em] text-ink text-balance lg:text-[1.875rem] lg:leading-[1.15]">
                <Link
                  href={`/work/${featured.id}`}
                  className="transition-colors after:absolute after:inset-0 hover:text-accent focus-visible:text-accent"
                >
                  {featured.title}
                </Link>
              </h3>
              <p className="max-w-[48ch] text-base leading-relaxed text-muted">
                {featured.body}
              </p>

              <dl className="mt-2 grid grid-cols-2 gap-6 border-t border-line pt-6">
                {featured.results.map((result) => (
                  <div key={result.label} className="flex flex-col gap-1">
                    <dt className="order-2 text-sm leading-snug text-muted">
                      {result.label}
                    </dt>
                    <dd className="order-1 text-xl font-semibold tracking-[-0.02em] text-accent lg:text-2xl">
                      {result.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {rest.map((study) => (
            <div key={study.id}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-surface)] border border-line bg-surface transition-colors duration-300 hover:border-line-strong">
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={study.image.src}
                    alt={study.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-3 p-6 lg:p-7">
                  <p className="text-sm text-muted">
                    {study.client}, {study.sector}
                  </p>
                  <h3 className="text-xl font-semibold tracking-[-0.02em] text-ink text-pretty">
                    <Link
                      href={`/work/${study.id}`}
                      className="transition-colors after:absolute after:inset-0 group-hover:text-accent"
                    >
                      {study.title}
                    </Link>
                  </h3>
                  <p className="max-w-[44ch] text-[0.9375rem] leading-relaxed text-muted">
                    {study.body}
                  </p>

                  <p className="mt-auto border-t border-line pt-5 text-[0.9375rem] text-ink">
                    <span className="font-semibold text-accent">
                      {study.results[0].value}
                    </span>{" "}
                    {study.results[0].label}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
