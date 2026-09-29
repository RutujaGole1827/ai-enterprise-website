"use client";

import { motion, useReducedMotion } from "motion/react";

import type { CapabilityCategory } from "@/lib/partners/databricks";
import { SectionHeading } from "@/components/ui/section-heading";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * "Our Capabilities on Databricks" as a map, not a wall of cards: the live
 * page's own four tabbed groups (Consulting & Architecture / GenAI & MLOps /
 * SAP Modernization / Migration with Lakebridge) become four connected
 * nodes along one spine, each holding its 2–3 capabilities. Every group is
 * visible at once — nothing is hidden behind a tab click — and each node's
 * item list expands from a name-only rail on hover/focus, so the page reads
 * as end-to-end coverage rather than a click-through tool.
 *
 * The spine draws itself in on scroll (`scaleX`, transform-only) and each
 * node fades up in sequence; under `prefers-reduced-motion` everything
 * renders in its end state and the rail is simply left open.
 */
export function CapabilityMap({
  title,
  body,
  categories,
}: {
  title: string;
  body?: string;
  categories: CapabilityCategory[];
}) {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="capabilities-heading"
      className="section-y min-h-section border-b border-line bg-surface"
    >
      <div className="shell">
        <SectionHeading id="capabilities-heading" title={title} body={body} />

        <div className="relative mt-16 lg:mt-20">
          <motion.div
            aria-hidden="true"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, ease: EASE }}
            style={{ transformOrigin: "0% 50%" }}
            className="absolute inset-x-0 top-5 hidden h-px bg-gradient-to-r from-accent/60 via-line-strong to-accent/60 lg:block"
          />

          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {categories.map((category, index) => (
              <motion.li
                key={category.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: reduce ? 0 : index * 0.08, ease: EASE }}
                className="group/node relative"
              >
                <span
                  aria-hidden="true"
                  className="relative z-10 mx-auto hidden size-[11px] rounded-full border-2 border-accent bg-canvas lg:block"
                />

                <div
                  tabIndex={0}
                  className="mt-4 flex h-full flex-col gap-4 rounded-[var(--radius-surface)] border border-line bg-canvas p-6 transition-colors duration-300 hover:border-line-strong focus-visible:border-line-strong lg:mt-6"
                >
                  <h3 className="text-lg font-semibold tracking-[-0.02em] text-ink">
                    {category.name}
                  </h3>

                  <ul className="flex flex-col gap-4 border-t border-line pt-4">
                    {category.items.map((item) => (
                      <li key={item.name}>
                        <p className="text-[0.9375rem] font-medium text-ink">
                          {item.name}
                        </p>
                        <p className="mt-1 text-sm leading-snug text-muted">
                          {item.body}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
