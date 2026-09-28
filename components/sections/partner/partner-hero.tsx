"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown } from "@phosphor-icons/react";

import type { Cta } from "@/lib/partners/microsoft";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/ui/wordmark";

/**
 * Partner hero. Copy left (7 cols), a partnership diagram right (5 cols).
 *
 * The diagram is the argument of the page drawn once: the Microsoft platforms
 * the practice works across, each wired into one Exponentia.ai x Microsoft
 * hub. The platforms are labelled nodes rather than product icons, which keeps
 * the page clear of Microsoft's product-icon usage rules.
 *
 * Motion: copy and diagram fade up once on load (opacity and transform only,
 * so nothing reflows), then each beam carries a single pulse into the hub and
 * rests. Hovering a platform lights its beam. Under prefers-reduced-motion
 * everything renders in place and the lines are static.
 *
 * Layout per breakpoint:
 *   lg+       7/5 split, diagram beside the copy
 *   md        stacked, copy capped at a reading measure, diagram centred
 *   < sm      stacked, CTAs full width, diagram tightened (smaller nodes and
 *             hub) so it holds at 320px without scrolling sideways
 *   landscape phones are the stacked md/sm layouts with reduced top spacing
 */
export function PartnerHero({
  title,
  body,
  primaryCta,
  secondaryCta,
  platforms,
  emphasis = [],
  partnerName = "Microsoft",
  partnerLogo = "/brand/partners/microsoft.svg",
  background,
  fullHeight = false,
}: {
  title: string;
  body: readonly string[];
  primaryCta: Cta;
  secondaryCta?: Cta;
  platforms: readonly string[];
  /** Phrases of the lead paragraph set in bold, as on the live page. */
  emphasis?: readonly string[];
  /** The partner named in the lockup and hub card. */
  partnerName?: string;
  partnerLogo?: string;
  /** Extra decorative layer rendered behind the content, over `.brand-ground`
   * — lets a partner page carry its own accent without losing the shared
   * radial wash every partner hero starts from. */
  background?: React.ReactNode;
  /** Fills the viewport below the sticky header (100dvh minus its real
   * rendered height, same figure the CPG hero uses) instead of the
   * default content-height section, and centres the content within it. */
  fullHeight?: boolean;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const hubRef = React.useRef<HTMLDivElement>(null);
  const nodeRefs = React.useMemo(
    () => platforms.map(() => React.createRef<HTMLSpanElement>()),
    [platforms],
  );
  const [active, setActive] = React.useState<number | null>(null);
  const [lead, ...rest] = body;
  const reduce = useReducedMotion();
  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.6,
            delay,
            ease: [0.16, 1, 0.3, 1] as const,
          },
        };

  return (
    <section
      id="top"
      className={cn(
        "brand-ground relative overflow-hidden border-b border-line",
        fullHeight &&
          "flex min-h-[calc(100dvh-61px)] flex-col justify-center lg:min-h-[calc(100dvh-69px)]",
      )}
      aria-labelledby="partner-hero-heading"
    >
      {background}
      <div className="shell w-full">
        <div
          className={cn(
            "grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14",
            fullHeight
              ? "py-10 md:py-14 lg:py-16"
              : "pb-14 pt-10 md:pb-20 md:pt-16 lg:pb-24 lg:pt-20",
          )}
        >
          <motion.div
            {...enter(0)}
            className="md:max-w-[40rem] lg:col-span-7 lg:max-w-none"
          >
            {/* Partnership lockup above the headline, as on the live page. */}
            <div className="mb-6 flex items-center gap-4">
              <Wordmark />
              <span aria-hidden="true" className="h-6 w-px bg-line-strong" />
              <span className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={partnerLogo}
                  alt=""
                  aria-hidden="true"
                  width={24}
                  height={24}
                  className="size-6"
                />
                {partnerName}
              </span>
            </div>
            <h1
              id="partner-hero-heading"
              className="max-w-[20ch] text-[2rem] font-semibold leading-[1.1] tracking-[-0.035em] text-ink text-balance sm:text-[2.5rem] lg:text-[3rem] lg:leading-[1.08]"
            >
              {title}
            </h1>
            {/* The live page puts the CTA directly under the headline. */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <a href={primaryCta.href}>
                  {primaryCta.label}
                  <ArrowDown size={18} weight="bold" aria-hidden="true" />
                </a>
              </Button>
              {secondaryCta ? (
                <Button asChild size="lg" variant="secondary">
                  <a href={secondaryCta.href}>{secondaryCta.label}</a>
                </Button>
              ) : null}
            </div>
            <p className="mt-10 max-w-[56ch] text-lg leading-relaxed text-ink/85 lg:text-xl">
              {emphasise(lead, emphasis)}
            </p>
            {rest.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-4 max-w-[56ch] text-base leading-relaxed text-muted"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>

          <motion.div {...enter(0.12)} className="lg:col-span-5">
            <div
              ref={containerRef}
              className="relative mx-auto grid w-full max-w-[30rem] grid-cols-[minmax(0,1fr)_auto] items-center gap-x-6 rounded-[var(--radius-surface)] border border-line bg-surface/80 p-4 shadow-[var(--shadow-lift)] backdrop-blur-sm sm:gap-x-16 sm:p-8"
            >
              <p className="sr-only">
                Exponentia.ai works across {platforms.join(", ")} as a{" "}
                {partnerName} partner.
              </p>

              <ul aria-hidden="true" className="flex flex-col gap-2.5 sm:gap-3">
                {platforms.map((platform, index) => (
                  <li key={platform}>
                    <span
                      ref={nodeRefs[index]}
                      onPointerEnter={() => setActive(index)}
                      onPointerLeave={() => setActive(null)}
                      className={cn(
                        "inline-flex h-9 items-center whitespace-nowrap rounded-[var(--radius-control)] border bg-canvas px-3 text-xs font-medium text-ink transition-colors duration-300 hover:bg-surface-2 sm:h-10 sm:px-3.5 sm:text-sm",
                        active === index
                          ? "border-accent"
                          : "border-line-strong",
                      )}
                    >
                      {platform}
                    </span>
                  </li>
                ))}
              </ul>

              <div
                ref={hubRef}
                aria-hidden="true"
                className="flex flex-col items-center gap-2.5 rounded-[var(--radius-surface)] border border-line-strong bg-canvas px-3 py-4 text-center sm:gap-3 sm:px-4 sm:py-5"
              >
                <Wordmark className="[&_img]:h-4" />
                <span className="text-xs text-muted">with</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={partnerLogo}
                  alt=""
                  width={48}
                  height={48}
                  className="size-10 sm:size-12"
                />
                <span className="text-xs font-medium text-ink">
                  {partnerName} Partner
                </span>
              </div>

              {nodeRefs.map((ref, index) => (
                <AnimatedBeam
                  key={platforms[index]}
                  containerRef={containerRef}
                  fromRef={ref}
                  toRef={hubRef}
                  active={active === index}
                  delay={0.6 + index * 0.12}
                  // Fan the arrivals down the hub edge instead of one point.
                  endYOffset={(index - (platforms.length - 1) / 2) * 10}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** Wraps each listed phrase of `text` in <strong>. */
function emphasise(text: string, phrases: readonly string[]) {
  const parts: React.ReactNode[] = [];
  let rest = text;
  for (const phrase of phrases) {
    const at = rest.indexOf(phrase);
    if (at === -1) continue;
    parts.push(
      rest.slice(0, at),
      <strong key={phrase} className="font-semibold text-ink">
        {phrase}
      </strong>,
    );
    rest = rest.slice(at + phrase.length);
  }
  parts.push(rest);
  return parts;
}
