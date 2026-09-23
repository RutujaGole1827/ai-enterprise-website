import Image from "next/image";
import Link from "next/link";

import { insights } from "@/lib/content";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * Editorial index. Four rows, each one a full-width record: metadata left,
 * title and excerpt centre, thumbnail right. A single hairline separates
 * rows (never top AND bottom borders on each one).
 *
 * Mobile: metadata sits above the title, the thumbnail drops out entirely so
 * the row stays scannable at 360px.
 */
export function Insights() {
  return (
    <section id="insights" className="section-y border-b border-line">
      <div className="shell">
        <SectionHeading
          title="What we are writing about"
          body="Notes from engagements, published when we have something specific to say."
        />

        <div className="mt-12 flex flex-col lg:mt-16">
          {insights.map((article, index) => (
            <div
              key={article.id}
              className={index > 0 ? "border-t border-line" : undefined}
            >
              <article className="group relative grid grid-cols-1 items-center gap-x-8 gap-y-3 py-7 sm:grid-cols-12 lg:py-8">
                <div className="flex items-center gap-3 text-sm text-muted sm:col-span-3 sm:flex-col sm:items-start sm:gap-1.5">
                  <span className="font-medium text-accent">
                    {article.category}
                  </span>
                  <span className="sm:text-muted">{article.date}</span>
                  <span className="hidden sm:inline">
                    {article.readingTime}
                  </span>
                </div>

                <div className="flex flex-col gap-2 sm:col-span-6">
                  <h3 className="text-lg font-semibold tracking-[-0.02em] text-ink text-pretty transition-colors duration-200 group-hover:text-accent lg:text-xl">
                    <Link
                      href={`/insights/${article.id}`}
                      className="after:absolute after:inset-0"
                    >
                      {article.title}
                    </Link>
                  </h3>
                  <p className="max-w-[56ch] text-[0.9375rem] leading-relaxed text-muted">
                    {article.excerpt}
                  </p>
                </div>

                <div className="hidden sm:col-span-3 sm:block">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[var(--radius-control)] border border-line">
                    <Image
                      src={article.image.src}
                      alt={article.image.alt}
                      fill
                      sizes="(max-width: 1024px) 25vw, 280px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
