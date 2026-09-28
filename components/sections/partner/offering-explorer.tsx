"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check } from "@phosphor-icons/react";

import type { Offering } from "@/lib/partners/microsoft";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * Offerings explorer. One list of offerings and ONE detail panel, laid out
 * two ways from the same markup:
 *
 *   lg      list left (5 cols), panel right (7 cols) spanning every row
 *   below   an accordion: the panel is ordered directly after the active item
 *
 * The panel moves by CSS alone. Items take the even `order` slots, the panel
 * takes the odd slot after the active item; at lg the order is dropped and
 * explicit grid rows put the list in column one and the panel in column two.
 * That keeps a single panel element, so `aria-controls` always points at
 * something real at every width.
 *
 * Buttons use the disclosure pattern (aria-expanded), which is correct in
 * both layouts; a tablist would be wrong once the panel sits inline.
 *
 * Motion answers the click only: the active marker slides between items and
 * the panel content cross-fades. Both are instant under reduced motion.
 */
export function OfferingExplorer({
  title,
  body,
  items,
}: {
  title: string;
  body?: string;
  items: Offering[];
}) {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = React.useState(items[0].id);
  const activeIndex = items.findIndex((item) => item.id === activeId);
  const active = items[activeIndex];
  const panelId = "offering-panel";

  return (
    <section
      id="offerings"
      aria-labelledby="offerings-heading"
      className="section-y scroll-mt-20 border-b border-line bg-surface"
    >
      <div className="shell">
        <SectionHeading id="offerings-heading" title={title} body={body} />

        <div className="mt-12 grid grid-cols-1 gap-3 lg:mt-16 lg:grid-cols-12 lg:gap-x-10">
          {items.map((item, index) => {
            const isActive = item.id === activeId;
            return (
              <button
                key={item.id}
                type="button"
                aria-expanded={isActive}
                aria-controls={panelId}
                onClick={() => setActiveId(item.id)}
                style={
                  {
                    "--order": index * 2,
                    "--row": index + 1,
                  } as React.CSSProperties
                }
                className={cn(
                  "group relative flex w-full flex-col items-start rounded-[var(--radius-surface)] border p-5 text-left",
                  "order-[var(--order)] transition-colors duration-200 lg:order-none lg:col-span-5 lg:col-start-1 lg:[grid-row:var(--row)]",
                  isActive
                    ? "border-line-strong bg-canvas"
                    : "border-transparent hover:bg-canvas/60",
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="offering-marker"
                    aria-hidden="true"
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                    }
                    className="absolute inset-y-4 left-0 w-[3px] rounded-full bg-accent"
                  />
                ) : null}
                <span className="flex flex-col gap-1 pl-2">
                  <span className="text-lg font-semibold tracking-[-0.02em] text-ink">
                    {item.name}
                  </span>
                  <span className="text-[0.9375rem] leading-snug text-muted">
                    {item.summary}
                  </span>
                </span>
              </button>
            );
          })}

          <div
            id={panelId}
            role="region"
            aria-label={active.name}
            style={
              {
                "--order": activeIndex * 2 + 1,
                "--rows": items.length,
              } as React.CSSProperties
            }
            className="order-[var(--order)] lg:order-none lg:col-span-7 lg:col-start-6 lg:[grid-row:1/span_var(--rows)]"
          >
            <div className="brand-ground relative h-full overflow-hidden rounded-[var(--radius-surface)] border border-line bg-canvas p-6 md:p-10">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -4 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="flex h-full flex-col gap-8"
                >
                  {active.icon ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={active.icon}
                      alt={`${active.name} logo`}
                      width={197}
                      height={95}
                      className="h-12 w-auto"
                    />
                  ) : null}

                  {/* Below lg the panel sits right under its own button, so
                      repeating the name there would only echo it. Also
                      skipped when the icon above already carries the name
                      as part of its own lockup. */}
                  <h3
                    className={cn(
                      "text-4xl font-semibold tracking-[-0.03em] text-ink",
                      active.icon ? "hidden" : "hidden lg:block",
                    )}
                  >
                    {active.name}
                  </h3>

                  {active.highlight ? (
                    <p className="flex items-baseline gap-3">
                      <span className="text-5xl font-semibold tracking-[-0.04em] text-accent lg:text-6xl">
                        {active.highlight.value}
                      </span>
                      <span className="max-w-[22ch] text-[0.9375rem] leading-snug text-muted">
                        {active.highlight.label}
                      </span>
                    </p>
                  ) : null}

                  <ul className="flex flex-col gap-3 border-line lg:border-t lg:pt-6">
                    {active.includes.map((entry) => (
                      <li
                        key={entry}
                        className="flex items-start gap-3 text-base text-ink"
                      >
                        <Check
                          size={18}
                          weight="bold"
                          aria-hidden="true"
                          className="mt-0.5 shrink-0 text-accent"
                        />
                        {entry}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
