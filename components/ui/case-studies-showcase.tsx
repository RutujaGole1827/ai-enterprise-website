"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import type { CpgCaseStudy } from "@/lib/industries/cpg";
import { cn } from "@/lib/utils";
import { ButtonColorful } from "@/components/ui/button-colorful";

const EASE = [0.16, 1, 0.3, 1] as const;
/** This section's own accent — a blue distinct from the site's orange
 * `--accent`, matching the AI-forward treatment this page's other
 * technical sections already use, rather than the marketing-site accent. */
const BLUE = "#3B82F6";

/** How long the featured case study stays up before auto-advancing. */
const AUTOPLAY_MS = 6000;

/** Per-tag badge classes: "Blogs" (content type) reads as a neutral
 * slate badge, "CPG" (the industry) picks up this section's own blue so
 * it reads as the more important of the two at a glance. Any other tag
 * value falls back to the neutral slate treatment rather than guessing.
 *
 * CPG's background is a `dark:` variant, not the same rgba re-applied —
 * at the light-mode 10% tint, that same blue reads as barely-there against
 * this card's near-black dark-mode surface, so dark mode gets a stronger
 * fill and a lighter blue text to keep it legible and clearly the more
 * prominent badge in both themes, not just light mode. */
const TAG_COLORS: Record<string, string> = {
  cpg: "bg-[#3B82F6]/10 text-[#3B82F6] dark:bg-[#3B82F6]/30 dark:text-[#93c5fd]",
  blogs: "bg-slate-500/10 text-slate-500",
};

/**
 * "Client success stories": a master/detail layout — a vertical list of
 * the three case studies on the left (desktop) with the selected one
 * expanded on the right, auto-advancing every {@link AUTOPLAY_MS} like a
 * slider. Selecting an item, by click or auto-advance, cross-fades the
 * expanded content in place (~500ms, `AnimatePresence` `mode="wait"`);
 * under `prefers-reduced-motion` the swap is instant and autoplay is off
 * entirely, matching this project's convention of never leaving something
 * moving for a visitor who asked for less motion. Autoplay also pauses
 * while the pointer or keyboard focus is anywhere in this component, so
 * it never changes out from under someone reading or interacting.
 *
 * On mobile there's no room for a side-by-side list, so the list becomes
 * a swipeable snap-scroll strip below the expanded card instead — a
 * genuinely different composition, not the desktop layout just reflowed
 * to one column. `lg:` and up switches to the two-column layout.
 *
 * Every title, tag, date, client line, CTA and image is the live page's
 * own — it has no body copy or metrics for any of these three posts, so
 * none is added here.
 */
export function CaseStudiesShowcase({
  heading,
  body,
  items,
}: {
  heading: string;
  body: string;
  items: CpgCaseStudy[];
}) {
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const reduce = useReducedMotion();
  const featured = items[active];

  React.useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(() => {
      setActive((current) => (current + 1) % items.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [reduce, paused, items.length]);

  return (
    <section className="min-h-section border-b border-line bg-canvas py-14 md:py-20">
      <div className="shell max-w-[1280px]">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <h2 className="max-w-2xl text-balance font-semibold tracking-[-0.03em] text-ink [font-size:clamp(2rem,3.6vw,3rem)] leading-[1.1]">
            {heading}
          </h2>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">{body}</p>
        </motion.div>

        <motion.div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setPaused(false);
            }
          }}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: reduce ? 0 : 0.15, ease: EASE }}
          className="mt-8 lg:grid lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-5"
        >
          <div className="relative overflow-hidden rounded-[var(--radius-surface)] border border-line bg-surface lg:order-2 lg:flex lg:h-full lg:flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={featured.id}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 1 } : { opacity: 0, y: -14 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="grid grid-cols-1 gap-6 p-6 sm:p-8 md:grid-cols-2 md:items-center md:p-10 lg:h-full"
              >
                <div className="flex flex-col">
                  <div className="flex flex-wrap gap-2">
                    {featured.tags.map((tag) => (
                      <span
                        key={tag}
                        className={cn(
                          "rounded-full px-2.5 py-1 text-xs font-medium",
                          TAG_COLORS[tag.toLowerCase()] ?? TAG_COLORS.blogs,
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="mt-4 line-clamp-2 text-balance text-2xl font-semibold leading-tight text-ink sm:text-3xl">
                    {featured.title}
                  </h3>

                  {featured.client ? (
                    <p className="mt-3 text-sm text-muted">{featured.client}</p>
                  ) : null}
                  <p className="mt-2 text-xs font-semibold" style={{ color: BLUE }}>
                    {featured.date}
                  </p>

                  <ButtonColorful
                    href={featured.ctaHref}
                    label={featured.ctaLabel}
                    className="mt-6 w-fit"
                  />
                </div>

                <div className="relative aspect-[16/9] w-full max-w-sm mx-auto overflow-hidden rounded-[var(--radius-control)] md:aspect-[4/3] md:max-w-none md:mx-0">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile/tablet: three equal columns in one row, sized to the
              viewport (`grid-cols-3`, no overflow container) rather than a
              scroll strip — all three are always visible at once.
              `lg:` and up: the same three items as a vertical list instead,
              stretched (via the parent grid row's default stretch +
              `flex-1` below) to match the expanded card's height exactly,
              for equal-height columns. */}
          <div
            className={cn(
              "mt-6 grid grid-cols-3 gap-2",
              "lg:order-1 lg:mt-0 lg:flex lg:h-full lg:flex-col lg:gap-3",
            )}
          >
            {items.map((item, i) => {
              const isActive = i === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => setActive(i)}
                  className={cn(
                    "group relative flex w-full min-w-0 flex-col gap-2 rounded-[var(--radius-control)] border bg-surface p-3 text-left transition-[border-color,transform] duration-300 hover:-translate-y-0.5",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                    "lg:flex-1 lg:justify-center lg:gap-3 lg:p-4",
                  )}
                  style={{
                    borderColor: isActive ? `${BLUE}80` : "var(--line)",
                    outlineColor: BLUE,
                  }}
                >
                  <span className="flex items-center gap-2 text-xs font-medium tracking-[0.1em] text-muted">
                    {String(i + 1).padStart(2, "0")}
                    {isActive ? (
                      <span
                        aria-hidden="true"
                        className="h-1 w-5 rounded-full"
                        style={{ background: BLUE }}
                      />
                    ) : null}
                  </span>
                  <span className="line-clamp-4 text-xs font-semibold text-ink sm:line-clamp-2 sm:text-sm">
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
