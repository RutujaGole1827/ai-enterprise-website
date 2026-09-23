import Image from "next/image";

import type { Metric } from "@/lib/partners/microsoft";
import { cn } from "@/lib/utils";
import { NumberTicker } from "@/components/ui/number-ticker";

/**
 * Practice in numbers, under the certification badges the team holds.
 *
 * One hairline grid (1px gaps over the line colour) rather than five cards:
 * the figures are one statement, and boxing each would split it into five.
 * "Official Microsoft Certified Partner" is a status, not a quantity, so it
 * renders as the Microsoft mark instead of counting up to 1.
 *
 * Grid per breakpoint, chosen so no cell is ever left empty (an empty cell
 * would show the line colour as a filled block):
 *   mobile  2 cols, last cell spans both
 *   sm      6-col track: three cells of 2, then two cells of 3
 *   lg      5 across
 */
export function StatStrip({
  items,
  certifications,
}: {
  items: Metric[];
  certifications?: { src: string; width: number; height: number; alt: string };
}) {
  return (
    <section
      aria-label="Our Microsoft practice in numbers"
      className="border-b border-line bg-canvas py-14 md:py-20"
    >
      <div className="shell">
        {certifications ? (
          <Image
            src={certifications.src}
            alt={certifications.alt}
            width={certifications.width}
            height={certifications.height}
            sizes="(max-width: 1400px) 100vw, 1320px"
            className="mx-auto h-auto w-full max-w-5xl"
          />
        ) : null}

        <ul
          className={cn(
            "grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-surface)] border border-line bg-line sm:grid-cols-6 lg:grid-cols-5",
            certifications && "mt-12 md:mt-16",
          )}
        >
          {items.map((item, index) => (
            <li
              key={item.label}
              className={cn(
                "flex flex-col justify-between gap-6 bg-surface p-6 lg:col-span-1 lg:p-7",
                index < 3 ? "sm:col-span-2" : "sm:col-span-3",
                index === items.length - 1 && "col-span-2",
              )}
            >
              {item.kind === "count" ? (
                <>
                  <span className="sr-only">
                    {item.value}
                    {item.suffix} {item.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-4xl font-semibold tracking-[-0.04em] text-ink lg:text-5xl"
                  >
                    <NumberTicker value={item.value} delay={index * 0.08} />
                    {item.suffix ? (
                      <span className="text-accent">{item.suffix}</span>
                    ) : null}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-[0.9375rem] leading-snug text-muted"
                  >
                    {item.label}
                  </span>
                </>
              ) : (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brand/partners/microsoft.svg"
                    alt=""
                    aria-hidden="true"
                    width={48}
                    height={48}
                    className="size-10 lg:size-12"
                  />
                  <span className="text-[0.9375rem] font-medium leading-snug text-ink">
                    {item.label}
                  </span>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
