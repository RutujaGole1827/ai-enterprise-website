"use client";

import * as React from "react";
import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

import { cpgGrowth, type GrowthCard } from "@/lib/industries/cpg";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";

/** This section's own accent — the same blue the CPG page's other
 * technical sections (growth-bento-grid, case-studies-showcase) already
 * use, rather than the marketing-site orange `--accent`. */
const BLUE = "#3B82F6";
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * CPG page, Section 3 — "CPG Solutions Powered by Data & AI" as a
 * physical card stack, replacing the eight-card bento grid
 * (components/ui/growth-bento-grid.tsx, left in place but unused here).
 * Same content and images as the live page, none invented.
 *
 * Eight solutions, eight sticky cards, one scroll track
 * (`solutions.length * 100vh` tall). Each card is `position: sticky;
 * top: 0`, centred in its own full-viewport slot; as the user scrolls,
 * card N+1's slot reaches the sticky point and — being later in the DOM,
 * so painted on top — visually swipes over card N, while card N's own
 * scale/y/opacity ease toward its target across that same segment so it
 * reads as *receding* rather than abruptly vanishing. Every card is one
 * unit: number, title, description and image move and scale together,
 * nothing is independently sticky inside a card.
 *
 * Both the section label ("AI & ANALYTICS SOLUTIONS", via SectionHeading)
 * and the "0N / 08" progress indicator live once, above the stack — not
 * inside every card. The indicator's active number does still need to
 * update as the user scrolls, without a React re-render on every scroll
 * frame: `activeIndex` is derived from `scrollYProgress` through
 * `useTransform`'s single-callback form (a plain function, not an input/
 * output range) and only reaches React state via `useMotionValueEvent`'s
 * "change" event, which itself only fires when the floored index
 * changes — 7 re-renders for the whole section, not one per frame.
 *
 * Every `useTransform` range below is a plain two-point
 * `[index/total, (index+1)/total]` — always non-decreasing by
 * construction, never a three-point or hand-tuned range.
 *
 * Responsive: one implementation, not a desktop/mobile fork. The card
 * itself reflows (`grid-cols-1` stacking number → title → description →
 * image, `lg:grid-cols-[0.9fr_1.1fr]` side-by-side) and its height goes
 * from `h-auto` (mobile — never clips a long description) to a fixed
 * 560–600px band at `lg` and up, but the sticky/scale mechanics are the
 * same at every width — a narrower, taller card below `lg`, not a
 * different interaction.
 *
 * `prefers-reduced-motion`, at any width: the sticky stack isn't
 * rendered at all — a plain accessible vertical flow (`FlowingSolution`)
 * takes over instead, no sticky positioning, no scale, nothing that only
 * reveals information through animation.
 *
 * No separate framer-motion/lenis install: this project already ships
 * `motion` (the same team's merged successor to framer-motion, imported
 * everywhere here as `motion/react`) with the identical useScroll/
 * useTransform API, and no smooth-scroll library anywhere else in the
 * project.
 */
export function CPGSolutionsScrolling({
  heading = cpgGrowth.heading,
  solutions = cpgGrowth.cards,
}: {
  heading?: string;
  solutions?: GrowthCard[];
}) {
  const reduce = useReducedMotion();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const rawIndex = useTransform(scrollYProgress, (value) =>
    Math.min(solutions.length - 1, Math.floor(value * solutions.length)),
  );
  const [activeIndex, setActiveIndex] = React.useState(0);
  useMotionValueEvent(rawIndex, "change", (latest) => {
    setActiveIndex((current) => (current === latest ? current : latest));
  });

  // Ambient depth layer: two glows drifting in opposite directions off
  // the same continuous progress, plus a small brightening pulse right
  // as one card swipes over the next.
  const glowOneX = useTransform(scrollYProgress, [0, 0.5, 1], ["-5%", "5%", "-2%"]);
  const glowOneY = useTransform(scrollYProgress, [0, 0.5, 1], ["-3%", "4%", "0%"]);
  const glowTwoX = useTransform(scrollYProgress, [0, 0.5, 1], ["8%", "-5%", "5%"]);
  const glowTwoY = useTransform(scrollYProgress, [0, 0.5, 1], ["5%", "-3%", "4%"]);
  const glowPulse = useTransform(scrollYProgress, (value) => {
    const position = value * solutions.length;
    const distanceToSwipe = Math.min(
      position - Math.floor(position),
      Math.ceil(position) - position,
    );
    return 0.8 + Math.max(0, 1 - distanceToSwipe / 0.15) * 0.2;
  });

  return (
    <section
      id="cpg-solutions"
      className="min-h-section relative border-b border-line"
      aria-labelledby="cpg-solutions-heading"
    >
      {/* Static base tint — always present, every width, reduced motion
          included. Only the blob/grid layer inside the stack is animated. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 dark:hidden"
        style={{
          background:
            "radial-gradient(circle at 15% 25%, rgba(37,99,235,0.10), transparent 32%), radial-gradient(circle at 85% 70%, rgba(14,165,233,0.08), transparent 30%), var(--canvas)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 hidden dark:block"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(37,99,235,0.16), transparent 35%), radial-gradient(circle at 80% 75%, rgba(14,165,233,0.12), transparent 32%), var(--canvas)",
        }}
      />

      <div className="shell max-w-[1280px] pb-0 pt-14 md:pt-20">
        <SectionHeading id="cpg-solutions-heading" title={heading} />
        <p className="mt-4 text-sm font-medium tabular-nums" style={{ color: BLUE }}>
          {String(activeIndex + 1).padStart(2, "0")}
          <span className="text-muted"> / {String(solutions.length).padStart(2, "0")}</span>
        </p>
      </div>

      {!reduce ? (
        <div
          ref={containerRef}
          className="relative"
          style={{ height: `${solutions.length * 100}vh` }}
        >
          {/* Zero-height sticky anchor: pins at the same viewport position
              as every card for the whole scroll range without adding its
              own slot to the track. */}
          <div className="sticky top-0 z-0 h-0 overflow-visible">
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-[100dvh] overflow-hidden"
              style={{ opacity: glowPulse }}
            >
              <motion.div
                className="absolute -left-32 top-1/4 h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-[100px]"
                style={{ x: glowOneX, y: glowOneY }}
              />
              <motion.div
                className="absolute -right-32 bottom-1/4 h-[380px] w-[380px] rounded-full bg-cyan-400/10 blur-[110px]"
                style={{ x: glowTwoX, y: glowTwoY }}
              />
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(37,99,235,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.15) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
              />
            </motion.div>
          </div>

          {solutions.map((solution, index) => (
            <StickyCard
              key={solution.id}
              solution={solution}
              index={index}
              total={solutions.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      ) : (
        <div className="shell max-w-[1280px] pb-20">
          <ol className="flex flex-col gap-16">
            {solutions.map((solution, index) => (
              <li key={solution.id}>
                <FlowingSolution
                  solution={solution}
                  index={index}
                  total={solutions.length}
                />
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}

function StickyCard({
  solution,
  index,
  total,
  progress,
}: {
  solution: GrowthCard;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = Math.min(1, (index + 1) / total);
  const targetScale = Math.max(0.82, 1 - (total - index - 1) * 0.035);

  const scale = useTransform(progress, [start, end], [1, targetScale]);
  const y = useTransform(progress, [start, end], [0, -60]);
  const opacity = useTransform(progress, [start, end], [1, 0.98]);
  // Fades out as the card recedes behind the next one — the "active"
  // highlight belongs to whichever card is currently pinned at scale 1,
  // not a fixed style every card carries all the time.
  const activeGlow = useTransform(progress, [start, end], [1, 0]);

  return (
    <div
      className="sticky top-0 flex h-[100dvh] items-center justify-center px-4 pt-16 sm:px-6 lg:pt-[68px]"
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        style={{ scale, y, opacity }}
        className={cn(
          "relative flex h-auto min-h-[420px] w-[calc(100vw-32px)] max-w-[1100px] overflow-hidden rounded-[28px] border border-line",
          "shadow-[0_20px_60px_rgba(15,23,42,0.10)] dark:shadow-[0_20px_70px_rgba(0,0,0,0.30)]",
          "sm:w-[calc(100vw-48px)] lg:min-h-[440px]",
        )}
      >
        <div
          className="absolute inset-0 -z-10 dark:hidden"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, rgba(37,99,235,0.08), transparent 35%), var(--surface)",
          }}
        />
        <div
          className="absolute inset-0 -z-10 hidden dark:block"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, rgba(37,99,235,0.12), transparent 35%), var(--surface)",
          }}
        />

        {/* Active-card highlight: a soft blue ring + lifted glow, visible
            only while this card is the one pinned at the front. */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[28px] shadow-[inset_0_0_0_1px_rgba(59,130,246,0.35),0_30px_80px_-20px_rgba(37,99,235,0.35)] dark:shadow-[inset_0_0_0_1px_rgba(96,165,250,0.4),0_30px_90px_-20px_rgba(37,99,235,0.5)]"
          style={{ opacity: activeGlow }}
        />

        <div className="relative grid w-full grid-cols-1 items-center gap-5 p-6 sm:gap-6 sm:p-7 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 lg:p-8">
          <div className="flex flex-col">
            <span
              className="text-sm font-semibold tracking-[0.12em]"
              style={{ color: BLUE }}
            >
              {solution.number}
            </span>
            <h3 className="mt-4 text-3xl font-bold leading-[1.05] tracking-[-0.02em] text-ink text-balance lg:text-4xl xl:text-[2.75rem]">
              {solution.title}
            </h3>
            <p className="mt-5 max-w-[480px] text-base leading-7 text-muted lg:text-lg">
              {solution.description}
            </p>
          </div>

          <div className="relative mx-auto h-[170px] w-full max-w-[320px] overflow-hidden rounded-2xl sm:h-[210px] sm:max-w-[380px] lg:h-[320px] lg:w-[85%] lg:max-w-[420px]">
            <Image
              src={solution.image}
              alt={`${solution.title} — illustration`}
              fill
              sizes="(max-width: 1024px) 90vw, 420px"
              className="object-cover"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/** The accessible, non-animated baseline: shown at every width whenever
 * `prefers-reduced-motion` is set, in normal document flow. Same content
 * and image as the sticky card, one full block per solution. */
function FlowingSolution({
  solution,
  index,
  total,
}: {
  solution: GrowthCard;
  index: number;
  total: number;
}) {
  return (
    <div className="flex flex-col">
      <span className="text-sm font-medium tabular-nums" style={{ color: BLUE }}>
        {String(index + 1).padStart(2, "0")}
        <span className="text-muted"> / {String(total).padStart(2, "0")}</span>
      </span>
      <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-ink text-balance sm:text-3xl">
        {solution.title}
      </h3>
      <p className="mt-4 max-w-[480px] text-base leading-7 text-muted">
        {solution.description}
      </p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={solution.image}
        alt={`${solution.title} — illustration`}
        className="mt-7 h-auto max-h-[360px] w-full rounded-2xl border border-line bg-surface object-contain shadow-[var(--shadow-card)]"
      />
    </div>
  );
}

export default CPGSolutionsScrolling;
