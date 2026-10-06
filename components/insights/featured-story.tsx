import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";

import type { SignalItem } from "@/lib/insights-signal";

/**
 * Featured Impact Story — an asymmetric editorial cover rather than a
 * blog card. No stock photo stands in for a real one: the centre panel
 * renders the story's own verified metric as the visual, at cover-story
 * scale, instead of a fabricated image.
 */
export function FeaturedStory({ story }: { story: SignalItem }) {
  return (
    <section className="section-y border-b border-line">
      <div className="shell">
        <p className="text-xs font-semibold tracking-[0.14em] text-accent">
          FEATURED IMPACT STORY
        </p>

        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-5">
            <h2 className="text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-ink text-balance sm:text-4xl lg:text-[2.75rem]">
              {story.title}
            </h2>
          </div>

          <div className="lg:col-span-4">
            <div className="relative flex aspect-[4/3] w-full flex-col items-center justify-center overflow-hidden rounded-[var(--radius-surface)] border border-line bg-surface-2">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--ink) 1px, transparent 1px), linear-gradient(90deg, var(--ink) 1px, transparent 1px)",
                  backgroundSize: "26px 26px",
                }}
              />
              {story.metric ? (
                <div className="relative flex flex-col items-center gap-1 text-center">
                  <span className="text-6xl font-bold tracking-[-0.03em] text-ink sm:text-7xl">
                    {story.metric.value}
                  </span>
                  <span className="max-w-[16ch] text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                    {story.metric.label}
                  </span>
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:col-span-3">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold tracking-[0.08em] text-muted">
              <span className="text-accent">CLIENT SUCCESS STORY</span>
              {story.industry ? <span>{story.industry.toUpperCase()}</span> : null}
              <span>{story.date}</span>
            </p>
            <p className="text-[0.9375rem] leading-relaxed text-muted">
              {story.description}
            </p>
            {story.href ? (
              <Link
                href={story.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-accent"
              >
                Explore story
                <ArrowUpRight
                  size={16}
                  weight="bold"
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
