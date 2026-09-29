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
 *
 * A page with 3 or fewer metrics (no partner has a "badge" status entry to
 * fill a wider track) instead gets a plain, even N-up grid at every
 * breakpoint from `sm` — the 5-metric ratios above would leave 3 items
 * short of a full row and read as an unfinished layout, not an intentional
 * three-up one.
 */
export function StatStrip({
  items,
  certifications,
  label = "Our Microsoft practice in numbers",
}: {
  items: Metric[];
  certifications?: { src: string; width: number; height: number; alt: string };
  label?: string;
}) {
  const compact = items.length <= 3;

  return (
    <section
      aria-label={label}
      className="min-h-section border-b border-line bg-canvas py-14 md:py-20"
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
            "grid gap-px overflow-hidden rounded-[var(--radius-surface)] border border-line bg-line",
            compact
              ? "grid-cols-1 sm:grid-cols-3"
              : "grid-cols-2 sm:grid-cols-6 lg:grid-cols-5",
            certifications && "mt-12 md:mt-16",
          )}
        >
          {items.map((item, index) => (
            <li
              key={item.label}
              className={cn(
                "flex flex-col justify-between gap-6 bg-surface p-6 lg:p-7",
                compact
                  ? "lg:col-span-1"
                  : cn(
                      "lg:col-span-1",
                      index < 3 ? "sm:col-span-2" : "sm:col-span-3",
                      index === items.length - 1 && "col-span-2",
                    ),
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
                  {/* A status ("1 official partner"), not a quantity someone
                      would count up to, but styled exactly like the other
                      four metrics' numbers so the row reads as one set. */}
                  <span
                    aria-hidden="true"
                    className="text-4xl font-semibold tracking-[-0.04em] text-ink lg:text-5xl"
                  >
                    1
                  </span>
                  <span className="text-[0.9375rem] leading-snug text-muted">
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
