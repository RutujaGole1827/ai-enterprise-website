"use client";

import * as React from "react";
import { useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

import { industries } from "@/lib/content";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * Horizontal scroll-snap rail. Six industries is past the point where a
 * vertical list works, so breadth is handled by flicking rather than scrolling.
 *
 * The cards are deliberately not boxed. Everything else that groups content
 * on this page is a bordered surface, so the rail earns its own treatment:
 * the real sector tile sits on a tinted panel and the type on the page ground.
 *
 * The only motion here answers a user action. Native scroll does the work;
 * the arrows are a desktop affordance and honour prefers-reduced-motion by
 * jumping instead of easing.
 *
 * Mobile: same rail, one card per viewport, arrows hidden (touch is enough).
 */
export function Industries() {
  const reduce = useReducedMotion();
  const railRef = React.useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = React.useState(true);
  const [atEnd, setAtEnd] = React.useState(false);

  const syncEdges = React.useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const max = rail.scrollWidth - rail.clientWidth;
    setAtStart(rail.scrollLeft <= 4);
    setAtEnd(rail.scrollLeft >= max - 4);
  }, []);

  React.useEffect(() => {
    syncEdges();
    const rail = railRef.current;
    if (!rail) return;
    // Scroll here is the element's own scroll position, not the window's.
    rail.addEventListener("scroll", syncEdges, { passive: true });
    return () => rail.removeEventListener("scroll", syncEdges);
  }, [syncEdges]);

  const nudge = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector("li");
    const step = card ? card.clientWidth + 16 : rail.clientWidth * 0.8;
    rail.scrollBy({
      left: step * direction,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <section id="industries" className="section-y border-b border-line">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            title="Where the work happens"
            body="The constraints differ by sector. The pattern does not: unify the data, prove one decision, then industrialise it."
            className="md:max-w-[52ch]"
          />

          <div className="hidden shrink-0 gap-2 md:flex">
            <button
              type="button"
              onClick={() => nudge(-1)}
              disabled={atStart}
              aria-label="Previous industries"
              className="inline-flex size-11 items-center justify-center rounded-[var(--radius-control)] border border-control-border bg-surface text-ink transition-colors duration-200 hover:border-line-strong hover:bg-surface-2 active:translate-y-[1px] disabled:pointer-events-none disabled:opacity-40"
            >
              <ArrowLeft size={18} weight="regular" />
            </button>
            <button
              type="button"
              onClick={() => nudge(1)}
              disabled={atEnd}
              aria-label="More industries"
              className="inline-flex size-11 items-center justify-center rounded-[var(--radius-control)] border border-control-border bg-surface text-ink transition-colors duration-200 hover:border-line-strong hover:bg-surface-2 active:translate-y-[1px] disabled:pointer-events-none disabled:opacity-40"
            >
              <ArrowRight size={18} weight="regular" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 lg:mt-16">
        <ul
          ref={railRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-4 [scrollbar-width:none] sm:px-8 lg:px-10 [&::-webkit-scrollbar]:hidden"
        >
          {industries.map((industry) => (
            <li
              key={industry.id}
              className="w-[78vw] shrink-0 snap-start sm:w-[340px] lg:w-[360px]"
            >
              <article className="flex h-full flex-col">
                <div className="flex aspect-[4/3] w-full items-center justify-center rounded-[var(--radius-surface)] bg-surface-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={industry.icon}
                    alt=""
                    aria-hidden="true"
                    width={88}
                    height={88}
                    loading="lazy"
                    decoding="async"
                    className="size-[5.5rem]"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2.5 pt-5">
                  <h3 className="text-lg font-semibold tracking-[-0.015em] text-ink">
                    {industry.name}
                  </h3>
                  <p className="text-[0.9375rem] leading-relaxed text-muted">
                    {industry.body}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
