import Image from "next/image";
import { solutions } from "@/lib/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

/**
 * Bento grid. Five items, exactly five cells, no filler tile.
 *
 * Composition on lg (6 columns):
 *   row 1-2  [ photo cell, 4 wide x 2 tall ][ cell 2, 2 wide ]
 *                                          [ cell 3, 2 wide ]
 *   row 3    [ cell 4, 3 wide ][ cell 5, 3 wide ]
 *
 * BACKGROUND DIVERSITY: three of five cells carry real visual variation
 * (imagery, accent tint, hairline texture) rather than text on surface.
 *
 * Each cell carries its real service tile from the live site: a navy square
 * with a white glyph, which reads on the light surface and on the dark one.
 * Mobile: every cell collapses to a single full-width column.
 */

const spans: Record<string, string> = {
  "data-platform": "lg:col-span-4 lg:row-span-2",
  "ml-engineering": "lg:col-span-2",
  "generative-ai": "lg:col-span-2",
  governance: "lg:col-span-3",
  analytics: "lg:col-span-3",
};

export function Solutions() {
  return (
    <section id="solutions" className="section-y border-b border-line">
      <div className="shell">
        <SectionHeading
          title="What we build"
          body="Five practices that ship together. Most engagements start with one and pull in the others as the platform earns trust."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-6">
          {solutions.map((solution) => {
            const isPhoto = solution.media === "photo";

            return (
              <div
                key={solution.id}
                className={cn("md:col-span-1", spans[solution.id])}
              >
                <article
                  className={cn(
                    "flex h-full flex-col overflow-hidden rounded-[var(--radius-surface)] border border-line",
                    "transition-colors duration-300 hover:border-line-strong",
                    solution.media === "tint" && "bg-accent-soft",
                    solution.media === "texture" &&
                      "bg-surface bg-hairline-grid",
                    (solution.media === "plain" || isPhoto) && "bg-surface",
                  )}
                >
                  {isPhoto && solution.image ? (
                    <div className="relative aspect-[16/10] w-full overflow-hidden lg:aspect-[16/9]">
                      <Image
                        src={solution.image.src}
                        alt={solution.image.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        className="object-cover"
                      />
                    </div>
                  ) : null}

                  <div className="flex flex-1 flex-col gap-3 p-6 lg:p-7">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={solution.icon}
                      alt=""
                      aria-hidden="true"
                      width={44}
                      height={44}
                      loading="lazy"
                      decoding="async"
                      className="size-11"
                    />
                    <h3 className="text-lg font-semibold tracking-[-0.015em] text-ink">
                      {solution.title}
                    </h3>
                    <p className="max-w-[46ch] text-[0.9375rem] leading-relaxed text-muted">
                      {solution.body}
                    </p>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
