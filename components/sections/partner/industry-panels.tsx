import type { IndustryResult } from "@/lib/partners/microsoft";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * Industries as expanding panels. Five results, each led by its figure.
 *
 * From xl the panels share one row and the one under the pointer or focus
 * widens to reveal its result; the first is open until another is chosen.
 * All of that is CSS (`.industry-panels` in globals.css): `:hover`,
 * `:focus-within` and `:has()` set one `--open` switch per panel. The panels
 * take focus so a keyboard can open them too.
 *
 * Below xl there is nothing to hover or the collapsed panels would be too
 * narrow for their names, so every panel is open: two columns from md, one
 * on mobile. The width change sits under the global reduced-motion
 * backstop, which collapses the transition to an instant switch.
 */
export function IndustryPanels({
  title,
  items,
}: {
  title: string;
  items: IndustryResult[];
}) {
  return (
    <section
      id="industries"
      aria-labelledby="industries-heading"
      className="section-y border-b border-line"
    >
      <div className="shell">
        <SectionHeading id="industries-heading" title={title} />

        <ul className="industry-panels mt-12 grid grid-cols-1 gap-3 md:grid-cols-2 lg:mt-16 xl:flex xl:h-[27rem]">
          {items.map((item) => (
            <li
              key={item.id}
              tabIndex={0}
              className="flex min-w-0 flex-col overflow-hidden rounded-[var(--radius-surface)] border border-line bg-surface p-6 transition-colors duration-300 hover:border-line-strong md:last:col-span-2 xl:[&:is(:hover,:focus-within)]:bg-canvas"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.icon}
                alt=""
                aria-hidden="true"
                width={48}
                height={48}
                loading="lazy"
                decoding="async"
                className="size-12 shrink-0"
              />

              <h3 className="mt-8 text-xl font-semibold tracking-[-0.02em] text-ink xl:mt-6 xl:text-lg">
                {item.name}
              </h3>

              {/* Anchored to the bottom so every name stays level whatever
                  the length of the copy below it. Fixed measure at xl, so the
                  copy never reflows while the panel widens; the panel clips
                  it until it is open. */}
              <div className="industry-detail mt-4 xl:mt-auto xl:w-[24rem]">
                <p className="flex items-baseline gap-3">
                  <span className="text-4xl font-semibold tracking-[-0.04em] text-accent">
                    {item.stat.value}
                  </span>
                  <span className="max-w-[20ch] text-sm leading-snug text-muted">
                    {item.stat.label}
                  </span>
                </p>
                <p className="mt-4 max-w-[44ch] text-[0.9375rem] leading-relaxed text-muted">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
