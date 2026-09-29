"use client";

import * as React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

export interface EditorialQuoteSplitProps {
  /** Small label above the quote. Sentence case, not styled as an
   * all-caps "eyebrow" — this project's design system explicitly rules
   * those out (README.md: "No all-caps labels and no eyebrows anywhere on
   * the page"), so this renders as a quiet outlined tag instead. */
  eyebrow?: string;
  quote: string;
  quoteAttribution: string;
  heading: string;
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * A premium editorial split: a large scroll-revealed quote on one side, a
 * heading/body/CTA on the other, a thin pulsing line connecting them on
 * desktop, and a theme-aware layered-glow background that drifts gently
 * with scroll. Built for /industries/exponentia-for-cpg-sector's second
 * section but kept generic (props only, no CPG-specific copy) since this
 * project is adding more industry pages one section at a time and is
 * likely to reuse this exact pattern.
 *
 * Motion (`motion/react`, already used throughout this project) drives
 * every animation, all gated behind `useReducedMotion()`: the per-word
 * quote reveal, the heading/body entrance, the connecting line's pulse and
 * the background glows' scroll parallax all render in their settled end
 * state immediately when reduced motion is on, rather than skipping the
 * content or leaving it invisible.
 */
export function EditorialQuoteSplit({
  eyebrow,
  quote,
  quoteAttribution,
  heading,
  body,
  ctaLabel,
  ctaHref = "#",
  className,
}: EditorialQuoteSplitProps) {
  const reduce = useReducedMotion();
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const glowYA = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const glowYB = useTransform(scrollYProgress, [0, 1], [20, -20]);

  const words = quote.split(" ");

  return (
    <section
      ref={sectionRef}
      className={cn(
        "min-h-section relative overflow-hidden border-b border-line bg-canvas py-20 md:py-28",
        className,
      )}
    >
      {/* Layered background glows: warm orange + teal in light mode (a
          bright, premium base), the same pair pushed deeper and paired with
          a touch of indigo in dark mode — not an inverted copy of the light
          treatment. */}
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { y: glowYA }}
        className="pointer-events-none absolute -left-24 top-0 size-[28rem] rounded-full bg-[radial-gradient(circle,rgba(201,64,15,0.10)_0%,transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(255,119,52,0.14)_0%,transparent_70%)]"
      />
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { y: glowYB }}
        className="pointer-events-none absolute -right-24 bottom-0 size-[28rem] rounded-full bg-[radial-gradient(circle,rgba(47,143,134,0.12)_0%,transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(47,143,134,0.22)_0%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] dark:opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="shell relative grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          {eyebrow ? (
            <span className="inline-flex rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-muted">
              {eyebrow}
            </span>
          ) : null}

          <blockquote className="mt-6 text-balance font-semibold tracking-[-0.02em] text-ink [font-size:clamp(1.75rem,3.4vw,2.75rem)] leading-[1.2]">
            {words.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  duration: 0.5,
                  ease: EASE,
                  delay: reduce ? 0 : i * 0.025,
                }}
              >
                {word}
                {i < words.length - 1 ? " " : ""}
              </motion.span>
            ))}
          </blockquote>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: 0.5,
              ease: EASE,
              delay: reduce ? 0 : words.length * 0.025 + 0.15,
            }}
            className="mt-6 text-sm font-medium text-muted"
          >
            — {quoteAttribution}
          </motion.p>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 hidden h-40 w-[2px] -translate-x-1/2 -translate-y-1/2 lg:block"
        >
          <div className="h-full w-full bg-gradient-to-b from-transparent via-line-strong to-transparent" />
          <motion.div
            className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-transparent via-accent/70 to-transparent"
            animate={reduce ? undefined : { top: ["0%", "88%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <h2 className="text-balance font-semibold tracking-[-0.03em] text-ink [font-size:clamp(2rem,3.6vw,3rem)] leading-[1.1]">
            {heading}
          </h2>
          <p className="mt-6 max-w-[58ch] text-base leading-relaxed text-muted sm:text-lg">
            {body}
          </p>
          {ctaLabel ? (
            <a
              href={ctaHref}
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-sm font-semibold text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              {ctaLabel}
              <ArrowRight
                size={16}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
