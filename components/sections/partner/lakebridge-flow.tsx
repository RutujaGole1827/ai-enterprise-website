"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight, ShieldCheck } from "@phosphor-icons/react";

import { SectionHeading } from "@/components/ui/section-heading";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Lakebridge Suite: the live page's migration path drawn as a four-stage
 * flow (Legacy Platform → Lakebridge → Databricks Lakehouse → AI /
 * Analytics), the Lakebridge stage itself expanded into its four tools.
 * The connecting line's gradient sweeps once as the section enters view
 * (background-position only, GPU-friendly, paused entirely under
 * `prefers-reduced-motion`); the three benefit figures sit below as the
 * outcome of the path rather than a fourth stage.
 */
export function LakebridgeFlow({
  title,
  tools,
  flow,
  benefits,
}: {
  title: string;
  tools: readonly string[];
  flow: readonly string[];
  benefits: readonly { value: string | null; label: string }[];
}) {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="lakebridge-heading"
      className="section-y border-b border-line"
    >
      <div className="shell">
        <SectionHeading id="lakebridge-heading" title={title} />

        <div className="mt-12 flex flex-col items-center gap-2 lg:mt-16 lg:flex-row lg:gap-0">
          {flow.map((stage, index) => {
            const isLakebridge = stage === "Lakebridge";
            const isLast = index === flow.length - 1;
            return (
              <div key={stage} className="flex flex-col items-center lg:flex-1">
                <div className="flex flex-col items-center gap-2 lg:flex-row lg:gap-0">
                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: reduce ? 0 : index * 0.12, ease: EASE }}
                    className={
                      isLakebridge
                        ? "flex w-full max-w-xs flex-col items-center gap-3 rounded-[var(--radius-surface)] border border-accent/50 bg-accent-soft px-6 py-6 text-center shadow-[var(--shadow-lift)]"
                        : "flex w-full max-w-xs flex-col items-center gap-1 rounded-[var(--radius-surface)] border border-line bg-surface px-6 py-6 text-center"
                    }
                  >
                    <span
                      className={
                        isLakebridge
                          ? "text-lg font-semibold tracking-[-0.02em] text-accent"
                          : "text-base font-medium text-ink"
                      }
                    >
                      {stage}
                    </span>

                    {isLakebridge ? (
                      <ul className="mt-1 flex flex-col gap-1.5">
                        {tools.map((tool) => (
                          <li
                            key={tool}
                            className="text-[0.8125rem] leading-snug text-ink/80"
                          >
                            {tool}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </motion.div>

                  {!isLast ? (
                    <div
                      aria-hidden="true"
                      className="flex shrink-0 items-center justify-center py-1 lg:w-14 lg:py-0"
                    >
                      <ArrowDown
                        size={18}
                        weight="bold"
                        className="text-line-strong lg:hidden"
                      />
                      <span className="relative hidden h-px w-full overflow-hidden bg-line lg:block">
                        <motion.span
                          aria-hidden="true"
                          initial={reduce ? false : { x: "-100%" }}
                          whileInView={{ x: "100%" }}
                          viewport={{ once: true, amount: 0.5 }}
                          transition={{
                            duration: 1.1,
                            delay: reduce ? 0 : 0.3 + index * 0.12,
                            ease: EASE,
                          }}
                          className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-accent to-transparent"
                        />
                      </span>
                      <ArrowRight
                        size={16}
                        weight="bold"
                        className="hidden shrink-0 text-line-strong lg:block"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-surface)] border border-line bg-line sm:grid-cols-3 lg:mt-16">
          {benefits.map((benefit) => (
            <li
              key={benefit.label}
              className="flex flex-col items-center gap-2 bg-surface px-6 py-8 text-center"
            >
              {benefit.value ? (
                <span className="text-4xl font-semibold tracking-[-0.04em] text-ink lg:text-5xl">
                  {benefit.value}
                </span>
              ) : (
                <ShieldCheck
                  size={40}
                  weight="regular"
                  aria-hidden="true"
                  className="text-accent"
                />
              )}
              <span className="text-[0.9375rem] leading-snug text-muted">
                {benefit.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
