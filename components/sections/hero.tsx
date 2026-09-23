"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { CTA_PRIMARY, CTA_SECONDARY, hero } from "@/lib/content";
import { Button } from "@/components/ui/button";

/**
 * Asymmetric Split Hero. Copy left (7 cols), photography right (5 cols).
 * ANTI-CENTER BIAS: DESIGN_VARIANCE is 7, so the hero is not centred.
 *
 * Headline scale is planned against the 7-column track: at 3.75rem the line
 * box holds roughly 24 characters, so the 43-character headline sets in two
 * lines at desktop. Going a step larger pushes it to three.
 *
 * HERO STACK: exactly three text elements (headline, subtext, CTA pair).
 * No eyebrow, no trust strip, no tagline under the buttons. The logo wall is
 * its own section immediately below.
 *
 * Why this motion exists: a single staggered entry establishes reading order
 * on first paint. It runs once and stops.
 */
export function Hero() {
  const reduce = useReducedMotion();

  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section
      id="top"
      className="brand-ground relative overflow-hidden border-b border-line"
      aria-labelledby="hero-heading"
    >
      <div className="shell">
        <div className="grid grid-cols-1 items-center gap-10 pb-16 pt-12 md:pb-24 md:pt-16 lg:min-h-[calc(100dvh-68px)] lg:grid-cols-12 lg:gap-14 lg:pb-20 lg:pt-20">
          <div className="lg:col-span-7">
            <motion.h1
              id="hero-heading"
              {...enter(0)}
              className="max-w-[24ch] text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.04em] text-ink text-balance sm:text-[3.25rem] lg:text-[3.75rem]"
            >
              {hero.headline}
            </motion.h1>

            <motion.p
              {...enter(0.09)}
              className="mt-6 max-w-[50ch] text-lg leading-relaxed text-muted lg:text-xl"
            >
              {hero.subtext}
            </motion.p>

            <motion.div
              {...enter(0.18)}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button asChild size="lg">
                <a href="#contact">{CTA_PRIMARY}</a>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href="#case-studies">{CTA_SECONDARY}</a>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[var(--radius-surface)] border border-line bg-surface-2 shadow-[var(--shadow-lift)]">
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
