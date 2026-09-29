"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Pause,
  Play,
  Quotes,
} from "@phosphor-icons/react";

import type { Testimonial } from "@/lib/content";
import { brandSvg } from "@/lib/brand-svg";
import { cn } from "@/lib/utils";
import { BrandMark } from "@/components/ui/brand-mark";
import { SectionHeading } from "@/components/ui/section-heading";

const AUTOPLAY_MS = 6000;

/**
 * Circular testimonials. The 21st.dev "Circular Testimonials" pattern (by
 * Maxim Bortnikov): a stacked cluster of circular avatars on one side, with
 * the active one forward and full size and the rest held behind it at a
 * smaller scale and lower opacity, crossfading the quote beside it as the
 * selection changes. 21st.dev's registry is auth-gated (returns 403 without
 * an API key from this environment, the same limitation this project's
 * README already documents for its other 21st.dev-derived components), so
 * this is built to that description rather than fetched from it.
 *
 * Adapted to this project's own conventions rather than copied wholesale:
 * - The avatars are company marks, not portrait photos — the reference uses
 *   people's faces; a B2B testimonial's identity is the client, so a real
 *   client logo (or, absent a verified one, a plain initial) takes that
 *   spot instead of inventing or stretching a headshot into place.
 * - The stacked-circle effect generalises to any count, but with exactly two
 *   real testimonials here it reads as a two-avatar overlap rather than a
 *   wide ring — an honest reflection of the data, not a design shortfall.
 * - Prev/next buttons keep this project's `--radius-control` shape lock
 *   (badges may be fully round; controls may not), matching every other
 *   icon button on the site; only the avatar tiles use `rounded-full`,
 *   which the shape lock already allows for badge-like elements.
 * - Autoplay only runs when there's more than one testimonial and the
 *   visitor hasn't asked for reduced motion, pauses on hover/focus, and is
 *   always stoppable with the explicit play/pause button — a hover pause
 *   alone would miss keyboard and touch users.
 */
export function CircularTestimonials({
  title,
  items,
}: {
  title: string;
  items: Testimonial[];
}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = React.useState(0);
  const [playing, setPlaying] = React.useState(!reduce && items.length > 1);
  const [paused, setPaused] = React.useState(false);
  const active = items[index];

  const go = React.useCallback(
    (next: number) => setIndex((next + items.length) % items.length),
    [items.length],
  );

  React.useEffect(() => {
    if (!playing || paused || reduce || items.length <= 1) return;
    const timer = setInterval(() => go(index + 1), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [playing, paused, reduce, items.length, index, go]);

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="section-y min-h-section border-b border-line"
    >
      <div className="shell">
        <SectionHeading id="testimonials-heading" title={title} />

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          className="mt-12 grid grid-cols-1 items-center gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-16"
        >
          {/* Avatar stage. */}
          <div className="flex justify-center lg:col-span-4 lg:justify-start">
            <div className="relative flex size-40 items-center justify-center sm:size-48 lg:size-56">
              {items.map((item, i) => {
                const isActive = i === index;
                // Non-active tiles peek out from behind, offset toward the
                // bottom-right in stacking order, furthest first.
                const behind = (i - index + items.length) % items.length;
                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Show the testimonial from ${item.name}, ${item.role}`}
                    aria-current={isActive || undefined}
                    animate={{
                      scale: isActive ? 1 : 0.78,
                      opacity: isActive ? 1 : 0.5,
                      // At this scale a small offset still leaves the
                      // smaller circle's edge entirely inside the active
                      // one's radius (two circles, not two squares) — this
                      // needs to clear (radius_active − radius_scaled) by a
                      // margin before any of it actually peeks out.
                      x: isActive ? 0 : behind * 34,
                      y: isActive ? 0 : behind * 28,
                    }}
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                    }
                    style={{ zIndex: items.length - behind }}
                    className={cn(
                      "absolute inset-0 flex items-center justify-center overflow-hidden rounded-full border bg-canvas p-6 shadow-[var(--shadow-card)] transition-colors duration-300",
                      isActive
                        ? "border-line-strong"
                        : "border-line hover:border-line-strong",
                    )}
                  >
                    {item.mark ? (
                      <BrandMark
                        svg={brandSvg[item.mark]}
                        className="h-full w-full text-muted [&>svg]:h-full [&>svg]:w-full"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="text-3xl font-semibold tracking-[-0.02em] text-muted sm:text-4xl"
                      >
                        {(item.company ?? item.name).slice(0, 1)}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Quote. */}
          <div className="lg:col-span-8">
            <Quotes
              size={32}
              weight="fill"
              aria-hidden="true"
              className="text-accent"
            />
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={active.id}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4"
              >
                <blockquote className="max-w-[48ch] text-2xl font-medium leading-[1.35] tracking-[-0.02em] text-ink text-balance sm:text-3xl">
                  &ldquo;{active.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 text-[0.9375rem] leading-relaxed">
                  <span className="block font-medium text-ink">
                    {active.name}
                  </span>
                  <span className="block text-muted">{active.role}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            {items.length > 1 ? (
              <div className="mt-9 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => go(index - 1)}
                  aria-label="Previous testimonial"
                  className="inline-flex size-11 items-center justify-center rounded-[var(--radius-control)] border border-control-border bg-surface text-ink transition-colors duration-200 hover:border-line-strong hover:bg-surface-2 active:translate-y-[1px]"
                >
                  <ArrowLeft size={18} weight="regular" />
                </button>
                <button
                  type="button"
                  onClick={() => go(index + 1)}
                  aria-label="Next testimonial"
                  className="inline-flex size-11 items-center justify-center rounded-[var(--radius-control)] border border-control-border bg-surface text-ink transition-colors duration-200 hover:border-line-strong hover:bg-surface-2 active:translate-y-[1px]"
                >
                  <ArrowRight size={18} weight="regular" />
                </button>

                {!reduce ? (
                  <button
                    type="button"
                    onClick={() => setPlaying((value) => !value)}
                    aria-label={
                      playing
                        ? "Pause automatic rotation"
                        : "Resume automatic rotation"
                    }
                    aria-pressed={playing}
                    className="ml-1 inline-flex size-11 items-center justify-center rounded-[var(--radius-control)] border border-control-border bg-surface text-muted transition-colors duration-200 hover:border-line-strong hover:bg-surface-2 hover:text-ink active:translate-y-[1px]"
                  >
                    {playing ? (
                      <Pause size={16} weight="regular" />
                    ) : (
                      <Play size={16} weight="regular" />
                    )}
                  </button>
                ) : null}

                <div
                  role="tablist"
                  aria-label="Choose a testimonial"
                  className="ml-auto flex items-center gap-2"
                >
                  {items.map((item, i) => (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={i === index}
                      aria-label={`Testimonial ${i + 1} of ${items.length}`}
                      onClick={() => go(i)}
                      className={cn(
                        "size-2 rounded-full transition-colors duration-200",
                        i === index ? "bg-accent" : "bg-line-strong",
                      )}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
