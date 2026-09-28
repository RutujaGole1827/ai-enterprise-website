import {
  Certificate,
  ChartLineUp,
  Cpu,
  Lightning,
  Stack,
} from "@phosphor-icons/react/ssr";

import type { ValuePillar } from "@/lib/partners/microsoft";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const ICONS = {
  stack: Stack,
  certificate: Certificate,
  lightning: Lightning,
  cpu: Cpu,
  chart: ChartLineUp,
} as const;

/**
 * Why Microsoft + Exponentia.ai. Five reasons as a bento: the first two lead
 * at double width, the other three follow at single width, so the grid has a
 * reading order instead of five equal tiles.
 *
 *   lg  6-col track: 3 + 3, then 2 + 2 + 2
 *   md  2 cols, the fifth card spans both
 *   sm  1 col
 *
 * Each card is a SpotlightCard: a pointer-following wash on fine pointers,
 * plus a moving gradient border that only appears on hover. No
 * scroll-triggered entrance.
 */
export function ValueBento({
  title,
  body,
  items,
}: {
  title: string;
  body?: string;
  items: ValuePillar[];
}) {
  return (
    <section
      aria-labelledby="value-heading"
      className="section-y border-b border-line"
    >
      <div className="shell">
        <SectionHeading id="value-heading" title={title} body={body} />

        <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-6">
          {items.map((item, index) => {
            const Icon = ICONS[item.icon];
            const lead = index < 2;
            return (
              <li
                key={item.title}
                className={cn(
                  lead ? "lg:col-span-3" : "lg:col-span-2",
                  index === items.length - 1 && "md:col-span-2 lg:col-span-2",
                )}
              >
                <SpotlightCard
                  className={cn(
                    "flex h-full flex-col gap-10 p-6 md:p-8",
                    lead && "lg:min-h-[17rem]",
                  )}
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-[var(--radius-control)] bg-accent-soft text-accent">
                    <Icon size={22} weight="regular" aria-hidden="true" />
                  </span>
                  <div className="mt-auto">
                    <h3
                      className={cn(
                        "font-semibold tracking-[-0.02em] text-ink",
                        lead ? "text-2xl" : "text-xl",
                      )}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-[44ch] text-[0.9375rem] leading-relaxed text-muted">
                      {item.body}
                    </p>
                  </div>
                </SpotlightCard>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
