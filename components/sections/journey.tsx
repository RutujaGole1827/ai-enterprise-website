"use client";

import * as React from "react";
import { motion, useReducedMotion, useScroll } from "motion/react";

import { CTA_PRIMARY, journey } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

/**
 * Scroll Progress Path. A sticky left column holds the argument in place
 * while the four stages of the engagement move past on the right.
 *
 * Why this motion exists: storytelling. The line filling as you read is the
 * only honest way to show "you are three quarters of the way through a
 * programme" without printing "Stage 3 of 4", which is a banned label.
 *
 * Scroll position comes from Motion's useScroll (a motion value, no React
 * state, no window scroll listener). Under prefers-reduced-motion the line
 * renders fully drawn and nothing animates.
 *
 * Mobile: the sticky column unsticks and stacks above the list.
 */
export function Journey() {
  const reduce = useReducedMotion();
  const listRef = React.useRef<HTMLOListElement>(null);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 70%", "end 85%"],
  });

  return (
    <section
      id="journey"
      className="section-y border-b border-line bg-surface"
      aria-labelledby="journey-heading"
    >
      <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <h2
                id="journey-heading"
                className="max-w-[16ch] text-3xl font-semibold tracking-[-0.03em] text-ink text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]"
              >
                How a programme actually runs
              </h2>
              <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-muted">
                No twelve-month discovery phase. The first production workload
                ships while the wider platform is still being built.
              </p>
              <Button asChild size="lg" className="mt-8">
                <a href="#contact">{CTA_PRIMARY}</a>
              </Button>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ol ref={listRef} className="relative pl-8 sm:pl-10">
            {/* Track */}
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-px bg-line"
            />
            {/* Progress. scaleY is driven by a motion value, never by state. */}
            <motion.div
              aria-hidden="true"
              style={
                reduce
                  ? { scaleY: 1, originY: 0 }
                  : { scaleY: scrollYProgress, originY: 0 }
              }
              className="absolute inset-y-0 left-0 w-px bg-accent"
            />

            {journey.map((step, index) => (
              <li key={step.id} className="relative pb-14 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute -left-8 top-2 size-2.5 -translate-x-1/2 rounded-full border-2 border-accent bg-surface sm:-left-10"
                />
                <Reveal delay={index * 0.05}>
                  <h3 className="text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-[1.75rem]">
                    {step.label}
                  </h3>
                  <p className="mt-3 max-w-[54ch] text-base leading-relaxed text-muted">
                    {step.body}
                  </p>
                  <p className="mt-3 max-w-[54ch] text-[0.9375rem] leading-relaxed text-ink">
                    {step.detail}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
