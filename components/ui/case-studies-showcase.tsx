"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";

import type { CpgCaseStudy, CpgCaseStudyId } from "@/lib/industries/cpg";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;
/** This section's own accent — a blue distinct from the site's orange
 * `--accent`, matching the AI-forward treatment this page's other
 * technical sections already use, rather than the marketing-site accent. */
const BLUE = "#3B82F6";

/** How long the featured case study stays up before auto-advancing. */
const AUTOPLAY_MS = 6000;

/** Per-tag badge colors: "Blogs" (content type) reads as a neutral
 * slate badge, "CPG" (the industry) picks up this section's own blue so
 * it reads as the more important of the two at a glance. Any other tag
 * value falls back to the neutral slate treatment rather than guessing. */
const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  cpg: { bg: "rgba(59,130,246,0.12)", text: BLUE },
  blogs: { bg: "rgba(100,116,139,0.12)", text: "#64748b" },
};

/**
 * "Client success stories": a master/detail layout — a vertical list of
 * the three case studies on the left (desktop) with the selected one
 * expanded on the right, auto-advancing every {@link AUTOPLAY_MS} like a
 * slider. Selecting an item, by click or auto-advance, cross-fades the
 * expanded content in place (~500ms, `AnimatePresence` `mode="wait"`);
 * under `prefers-reduced-motion` the swap is instant and autoplay is off
 * entirely, matching this project's convention of never leaving something
 * moving for a visitor who asked for less motion. Autoplay also pauses
 * while the pointer or keyboard focus is anywhere in this component, so
 * it never changes out from under someone reading or interacting.
 *
 * On mobile there's no room for a side-by-side list, so the list becomes
 * a swipeable snap-scroll strip below the expanded card instead — a
 * genuinely different composition, not the desktop layout just reflowed
 * to one column. `lg:` and up switches to the two-column layout.
 *
 * Every title, tag, date, client line and CTA is the live page's own —
 * it has no body copy or metrics for any of these three posts, so none is
 * added here. Each gets its own small abstract SVG keyed to its real
 * subject (a resource/logistics flow, a many-sources-into-one-platform
 * merge, and a cloud/dashboard motif) — decorative only, inventing no
 * numbers.
 */
export function CaseStudiesShowcase({
  heading,
  body,
  items,
}: {
  heading: string;
  body: string;
  items: CpgCaseStudy[];
}) {
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const reduce = useReducedMotion();
  const featured = items[active];

  React.useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(() => {
      setActive((current) => (current + 1) % items.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [reduce, paused, items.length]);

  return (
    <section className="border-b border-line bg-canvas py-14 md:py-20">
      <div className="shell max-w-[1280px]">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <h2 className="max-w-2xl text-balance font-semibold tracking-[-0.03em] text-ink [font-size:clamp(2rem,3.6vw,3rem)] leading-[1.1]">
            {heading}
          </h2>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">{body}</p>
        </motion.div>

        <motion.div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setPaused(false);
            }
          }}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: reduce ? 0 : 0.15, ease: EASE }}
          className="mt-8 lg:grid lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-5"
        >
          <div className="relative overflow-hidden rounded-[var(--radius-surface)] border border-line bg-surface lg:order-2 lg:flex lg:h-full lg:flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={featured.id}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 1 } : { opacity: 0, y: -14 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="grid grid-cols-1 gap-6 p-6 sm:p-8 md:grid-cols-2 md:items-center md:p-10 lg:h-full"
              >
                <div className="flex flex-col">
                  <div className="flex flex-wrap gap-2">
                    {featured.tags.map((tag) => {
                      const colors = TAG_COLORS[tag.toLowerCase()] ?? TAG_COLORS.blogs;
                      return (
                        <span
                          key={tag}
                          className="rounded-full px-2.5 py-1 text-xs font-medium"
                          style={{ background: colors.bg, color: colors.text }}
                        >
                          {tag}
                        </span>
                      );
                    })}
                  </div>

                  <h3 className="mt-4 line-clamp-2 text-balance text-2xl font-semibold leading-tight text-ink sm:text-3xl">
                    {featured.title}
                  </h3>

                  {featured.client ? (
                    <p className="mt-3 text-sm text-muted">{featured.client}</p>
                  ) : null}
                  <p className="mt-2 text-xs font-semibold" style={{ color: BLUE }}>
                    {featured.date}
                  </p>

                  <a
                    href={featured.ctaHref}
                    className="group mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-ink transition-colors duration-300"
                    onMouseEnter={(e) => e.currentTarget.style.setProperty("color", BLUE)}
                    onMouseLeave={(e) => e.currentTarget.style.removeProperty("color")}
                  >
                    {featured.ctaLabel}
                    <ArrowRight
                      size={16}
                      weight="bold"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </a>
                </div>

                <div className="flex items-center justify-center">
                  <CaseStudyVisual id={featured.id} reduce={reduce} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile/tablet: three equal columns in one row, sized to the
              viewport (`grid-cols-3`, no overflow container) rather than a
              scroll strip — all three are always visible at once.
              `lg:` and up: the same three items as a vertical list instead,
              stretched (via the parent grid row's default stretch +
              `flex-1` below) to match the expanded card's height exactly,
              for equal-height columns. */}
          <div
            className={cn(
              "mt-6 grid grid-cols-3 gap-2",
              "lg:order-1 lg:mt-0 lg:flex lg:h-full lg:flex-col lg:gap-3",
            )}
          >
            {items.map((item, i) => {
              const isActive = i === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => setActive(i)}
                  className={cn(
                    "group relative flex w-full min-w-0 flex-col gap-2 rounded-[var(--radius-control)] border bg-surface p-3 text-left transition-[border-color,transform] duration-300 hover:-translate-y-0.5",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                    "lg:flex-1 lg:justify-center lg:gap-3 lg:p-4",
                  )}
                  style={{
                    borderColor: isActive ? `${BLUE}80` : "var(--line)",
                    outlineColor: BLUE,
                  }}
                >
                  <span className="flex items-center gap-2 text-xs font-medium tracking-[0.1em] text-muted">
                    {String(i + 1).padStart(2, "0")}
                    {isActive ? (
                      <span
                        aria-hidden="true"
                        className="h-1 w-5 rounded-full"
                        style={{ background: BLUE }}
                      />
                    ) : null}
                  </span>
                  <span className="line-clamp-4 text-xs font-semibold text-ink sm:line-clamp-2 sm:text-sm">
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CaseStudyVisual({ id, reduce }: { id: CpgCaseStudyId; reduce: boolean | null }) {
  if (id === "data-platform-modernization") return <PlatformMergeVisual reduce={reduce} />;
  if (id === "cloud-insights-insurance") return <CloudAnalyticsVisual reduce={reduce} />;
  return <LogisticsFlowVisual reduce={reduce} />;
}

/** Resource Prediction & Optimization (ports/logistics): scattered
 * resource nodes flowing into one hub, one pulse travelling each line at
 * a time. */
function LogisticsFlowVisual({ reduce }: { reduce: boolean | null }) {
  const hub = { x: 150, y: 90 };
  const nodes = [
    { x: 30, y: 30 },
    { x: 30, y: 90 },
    { x: 30, y: 150 },
    { x: 150, y: 20 },
    { x: 150, y: 160 },
  ];

  return (
    <svg viewBox="0 0 200 180" className="h-[200px] w-full max-w-xs" aria-hidden="true">
      {nodes.map((n, i) => {
        const d = `M ${n.x} ${n.y} L ${hub.x} ${hub.y}`;
        return (
          <g key={i}>
            <path d={d} stroke="rgba(148,163,184,0.3)" strokeWidth="1" fill="none" />
            <rect x={n.x - 5} y={n.y - 5} width={10} height={10} rx={2} fill="rgba(148,163,184,0.5)" />
            {!reduce ? (
              <motion.circle
                r={2.5}
                fill={BLUE}
                initial={{ offsetDistance: "0%", opacity: 0 }}
                animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.2, delay: i * 0.35, repeat: Infinity, ease: "linear" }}
                style={{ offsetPath: `path('${d}')` }}
              />
            ) : null}
          </g>
        );
      })}
      <motion.circle
        cx={hub.x}
        cy={hub.y}
        r={14}
        fill={BLUE}
        animate={reduce ? undefined : { r: [14, 16, 14] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <circle cx={hub.x} cy={hub.y} r={6} fill="#ffffff" />
    </svg>
  );
}

/** Data Platform Modernization: several fragmented sources merging into
 * one unified platform block. */
function PlatformMergeVisual({ reduce }: { reduce: boolean | null }) {
  const sources = [
    { x: 20, y: 25 },
    { x: 20, y: 65 },
    { x: 20, y: 105 },
    { x: 20, y: 145 },
  ];
  const platform = { x: 150, y: 85, w: 40, h: 60 };

  return (
    <svg viewBox="0 0 200 180" className="h-[200px] w-full max-w-xs" aria-hidden="true">
      {sources.map((s, i) => {
        const d = `M ${s.x + 12} ${s.y} L ${platform.x - platform.w / 2} ${platform.y}`;
        return (
          <g key={i}>
            <path d={d} stroke="rgba(148,163,184,0.3)" strokeWidth="1" fill="none" />
            <rect x={s.x - 12} y={s.y - 9} width={24} height={18} rx={3} fill="rgba(148,163,184,0.45)" />
            {!reduce ? (
              <motion.circle
                r={2.5}
                fill={BLUE}
                initial={{ offsetDistance: "0%", opacity: 0 }}
                animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, ease: "linear" }}
                style={{ offsetPath: `path('${d}')` }}
              />
            ) : null}
          </g>
        );
      })}
      <rect
        x={platform.x - platform.w / 2}
        y={platform.y - platform.h / 2}
        width={platform.w}
        height={platform.h}
        rx={8}
        fill="rgba(59,130,246,0.12)"
        stroke={BLUE}
        strokeWidth="1.5"
      />
      <motion.rect
        x={platform.x - platform.w / 2 + 8}
        y={platform.y - 4}
        width={platform.w - 16}
        height={8}
        rx={4}
        fill={BLUE}
        animate={reduce ? undefined : { opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

/** Cloud Enabled Insights: small analytics tiles arranged beneath a soft
 * cloud shape. */
function CloudAnalyticsVisual({ reduce }: { reduce: boolean | null }) {
  const tiles = [
    { x: 40, y: 120, w: 28, h: 30 },
    { x: 78, y: 105, w: 28, h: 45 },
    { x: 116, y: 115, w: 28, h: 35 },
    { x: 154, y: 100, w: 28, h: 50 },
  ];

  return (
    <svg viewBox="0 0 200 180" className="h-[200px] w-full max-w-xs" aria-hidden="true">
      <path
        d="M 55 70 a 20 20 0 0 1 38 -8 a 16 16 0 0 1 22 15 a 16 16 0 0 1 -4 31 h -58 a 18 18 0 0 1 2 -38 z"
        fill="rgba(59,130,246,0.1)"
        stroke={BLUE}
        strokeWidth="1.5"
      />
      {tiles.map((t, i) => (
        <motion.rect
          key={i}
          x={t.x}
          width={t.w}
          rx={3}
          fill="rgba(59,130,246,0.5)"
          initial={{ height: 0, y: t.y + t.h }}
          whileInView={{ height: t.h, y: t.y }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: reduce ? 0 : i * 0.12, ease: EASE }}
        />
      ))}
    </svg>
  );
}
