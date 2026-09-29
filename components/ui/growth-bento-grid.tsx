"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

import type { GrowthCard, GrowthCardId } from "@/lib/industries/cpg";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;
/** This section's own accent — a blue distinct from the site's orange
 * `--accent`, matching the AI-forward treatment this page's other
 * technical sections already use, rather than the marketing-site accent. */
const BLUE = "#3B82F6";

/**
 * The CPG page's eight use-case cards (its own copy, unedited) in an
 * asymmetric bento grid: cards marked `size: "lg"` in the data get a wider
 * grid slot and a two-column internal layout with more room for their
 * visualization; the rest stay compact with the visual stacked below the
 * text.
 *
 * Reuses this project's existing spotlight-card technique
 * (components/ui/spotlight-card.tsx): pointer position written straight to
 * CSS custom properties so the glow never triggers a React re-render, and
 * `pointer-fine:` so it only exists for a mouse, not a finger. This
 * section's own instance rather than that shared component because the
 * hover border/glow here is explicitly blue, not this project's orange
 * `--accent`.
 */
export function GrowthBentoGrid({
  heading,
  cards,
}: {
  heading: string;
  cards: GrowthCard[];
}) {
  return (
    <section className="min-h-section border-b border-line bg-canvas py-20 md:py-28">
      <div className="shell max-w-[1280px]">
        <h2 className="max-w-2xl text-balance font-semibold tracking-[-0.03em] text-ink [font-size:clamp(2rem,3.6vw,3rem)] leading-[1.1]">
          {heading}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {cards.map((card) => (
            <BentoCard
              key={card.id}
              card={card}
              className={card.size === "lg" ? "sm:col-span-2 lg:col-span-3" : "lg:col-span-2"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function BentoCard({ card, className }: { card: GrowthCard; className?: string }) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const wide = card.size === "lg";

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const box = node.getBoundingClientRect();
    node.style.setProperty("--spot-x", `${event.clientX - box.left}px`);
    node.style.setProperty("--spot-y", `${event.clientY - box.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={cn(
        "group/card relative isolate flex flex-col overflow-hidden rounded-[var(--radius-surface)] border border-line bg-surface p-7 transition-colors duration-[350ms] sm:p-8",
        className,
      )}
      style={{ borderColor: "var(--card-border, var(--line))" }}
      onMouseEnter={(event) =>
        event.currentTarget.style.setProperty("--card-border", `${BLUE}80`)
      }
      onMouseLeave={(event) =>
        event.currentTarget.style.removeProperty("--card-border")
      }
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 hidden opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 pointer-fine:block"
        style={{
          background: `radial-gradient(22rem circle at var(--spot-x, 50%) var(--spot-y, 0%), color-mix(in oklab, ${BLUE} 10%, transparent), transparent 70%)`,
        }}
      />

      <div
        className={cn(
          "relative flex h-full flex-1 flex-col transition-transform duration-[350ms] group-hover/card:-translate-y-1",
          wide && "md:flex-row md:items-center md:gap-10",
        )}
      >
        <div className={cn("flex flex-1 flex-col", wide && "md:max-w-[58%]")}>
          <span className="text-xs font-medium tracking-[0.1em] text-muted">
            {card.number}
          </span>
          <h3 className="mt-3 text-xl font-semibold text-ink sm:text-2xl">
            {card.title}
          </h3>
          <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-muted sm:text-base">
            {card.description}
          </p>
        </div>

        <div className={cn("mt-8 flex flex-1 items-center", wide && "md:mt-0")}>
          <CardVisual id={card.id} reduce={reduce} />
        </div>
      </div>
    </motion.div>
  );
}

function CardVisual({ id, reduce }: { id: GrowthCardId; reduce: boolean | null }) {
  switch (id) {
    case "sales-performance":
      return <BarsVisual highlightIndex={3} reduce={reduce} />;
    case "decision-making":
      return <AnomalyLineVisual reduce={reduce} />;
    case "sales-forecasting":
      return <ForecastLineVisual reduce={reduce} />;
    case "business-analyst":
      return <FlowVisual variant="analyst" reduce={reduce} />;
    case "performance-management":
      return <ProgressRowsVisual reduce={reduce} />;
    case "inventory-optimization":
      return <DualLineVisual reduce={reduce} />;
    case "product-launch":
      return <TimelineCompareVisual reduce={reduce} />;
    case "trade-promotion":
      return <FlowVisual variant="promotion" reduce={reduce} />;
  }
}

/** Boost your Sales Performance: a small bar chart with the top product
 * (tallest bar) picked out in blue. */
function BarsVisual({
  highlightIndex,
  reduce,
}: {
  highlightIndex: number;
  reduce: boolean | null;
}) {
  const bars = [22, 34, 26, 46, 30];

  return (
    <svg viewBox="0 0 240 90" className="h-[90px] w-full" aria-hidden="true">
      {bars.map((h, i) => {
        const x = 20 + i * 48;
        const isTop = i === highlightIndex;
        return (
          <rect
            key={i}
            x={x}
            y={90 - h}
            width={18}
            height={h}
            rx={2}
            fill={isTop ? BLUE : "rgba(148,163,184,0.4)"}
          />
        );
      })}
      {!reduce ? (
        <motion.circle
          cx={20 + highlightIndex * 48 + 9}
          cy={90 - bars[highlightIndex] - 10}
          r={3}
          fill={BLUE}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}
    </svg>
  );
}

/** Accelerate Decision Making: a KPI line with one unexpected spike
 * highlighted, per the anomaly-detection use case. */
function AnomalyLineVisual({ reduce }: { reduce: boolean | null }) {
  const d = "M 15 60 L 60 55 L 105 58 L 140 20 L 175 56 L 220 50";
  const spike = { x: 140, y: 20 };

  return (
    <svg viewBox="0 0 240 90" className="h-[90px] w-full" aria-hidden="true">
      <path d={d} stroke="rgba(148,163,184,0.45)" strokeWidth="1.5" fill="none" />
      <circle cx={spike.x} cy={spike.y} r={4} fill="#f59e0b" />
      {!reduce ? (
        <motion.circle
          cx={spike.x}
          cy={spike.y}
          r={4}
          fill="none"
          stroke="#f59e0b"
          strokeWidth="1.5"
          animate={{ r: [4, 10, 4], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}
    </svg>
  );
}

/** Sales Forecasting: a solid historical line continuing as a dashed
 * forecast, with small SKU tick marks along the base. */
function ForecastLineVisual({ reduce }: { reduce: boolean | null }) {
  const historical = "M 15 62 L 60 50 L 105 54 L 135 40";
  const forecast = "M 135 40 L 170 32 L 205 26 L 225 20";

  return (
    <svg viewBox="0 0 240 90" className="h-[90px] w-full" aria-hidden="true">
      {Array.from({ length: 8 }).map((_, i) => (
        <rect
          key={i}
          x={15 + i * 29}
          y={80}
          width={2}
          height={6}
          rx={1}
          fill="rgba(148,163,184,0.35)"
        />
      ))}
      <path d={historical} stroke={BLUE} strokeWidth="1.5" fill="none" />
      <motion.path
        d={forecast}
        stroke={BLUE}
        strokeWidth="1.5"
        strokeDasharray="4 4"
        fill="none"
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, repeat: reduce ? 0 : Infinity, repeatDelay: 1, ease: "easeInOut" }}
      />
      <circle cx={135} cy={40} r={3} fill={BLUE} />
    </svg>
  );
}

/** Shared three-stage flow: used for "AI Based Business Analyst" (data
 * documents converging into one AI core, then out to insight cards) and
 * "Trade Promotion Optimization" (promotion → sales lift → ROI). */
function FlowVisual({
  variant,
  reduce,
}: {
  variant: "analyst" | "promotion";
  reduce: boolean | null;
}) {
  const left = [{ x: 20, y: 20 }, { x: 20, y: 45 }, { x: 20, y: 70 }];
  const center = { x: 90, y: 45 };
  const right = [{ x: 165, y: 25 }, { x: 165, y: 45 }, { x: 165, y: 65 }];

  const nodeShape = variant === "analyst" ? 2 : 0; // rect for documents, circle for promotion

  return (
    <svg viewBox="0 0 190 90" className="h-[110px] w-full" aria-hidden="true">
      {left.map((p, i) => (
        <g key={`l-${i}`}>
          <path
            d={`M ${p.x} ${p.y} L ${center.x} ${center.y}`}
            stroke="rgba(148,163,184,0.3)"
            strokeWidth="1"
            fill="none"
          />
          {nodeShape === 2 ? (
            <rect x={p.x - 6} y={p.y - 6} width={12} height={12} rx={2} fill="rgba(148,163,184,0.5)" />
          ) : (
            <circle cx={p.x} cy={p.y} r={5} fill="rgba(148,163,184,0.5)" />
          )}
          {!reduce ? (
            <motion.circle
              r={2.2}
              fill={BLUE}
              initial={{ offsetDistance: "0%", opacity: 0 }}
              animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2, delay: i * 0.4, repeat: Infinity, ease: "linear" }}
              style={{ offsetPath: `path('M ${p.x} ${p.y} L ${center.x} ${center.y}')` }}
            />
          ) : null}
        </g>
      ))}

      <motion.circle
        cx={center.x}
        cy={center.y}
        r={10}
        fill={BLUE}
        animate={reduce ? undefined : { r: [10, 12, 10] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />

      {right.map((p, i) => (
        <g key={`r-${i}`}>
          <path
            d={`M ${center.x} ${center.y} L ${p.x} ${p.y}`}
            stroke="rgba(148,163,184,0.3)"
            strokeWidth="1"
            fill="none"
          />
          <rect x={p.x - 6} y={p.y - 5} width={14} height={10} rx={2} fill="rgba(59,130,246,0.35)" />
        </g>
      ))}
    </svg>
  );
}

/** Performance Management of Sales Team: a small set of scorecard
 * progress bars at different fill levels. */
function ProgressRowsVisual({ reduce }: { reduce: boolean | null }) {
  const rows = [0.85, 0.55, 0.7];

  return (
    <svg viewBox="0 0 220 70" className="h-[70px] w-full" aria-hidden="true">
      {rows.map((fill, i) => {
        const y = i * 24 + 6;
        return (
          <g key={i}>
            <rect x={0} y={y} width={220} height={8} rx={4} fill="rgba(148,163,184,0.25)" />
            {!reduce ? (
              <motion.rect
                x={0}
                y={y}
                height={8}
                rx={4}
                fill={BLUE}
                initial={{ width: 0 }}
                whileInView={{ width: 220 * fill }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: EASE }}
              />
            ) : (
              <rect x={0} y={y} width={220 * fill} height={8} rx={4} fill={BLUE} />
            )}
          </g>
        );
      })}
    </svg>
  );
}

/** Inventory Optimization: inventory level vs demand as two crossing
 * lines. */
function DualLineVisual({ reduce }: { reduce: boolean | null }) {
  const stock = "M 15 30 L 70 40 L 125 35 L 180 55 L 225 48";
  const demand = "M 15 60 L 70 50 L 125 58 L 180 32 L 225 45";

  return (
    <svg viewBox="0 0 240 90" className="h-[90px] w-full" aria-hidden="true">
      <path d={stock} stroke={BLUE} strokeWidth="1.5" fill="none" />
      <path d={demand} stroke="rgba(148,163,184,0.55)" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
      {!reduce ? (
        <motion.circle
          r={3}
          fill={BLUE}
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{ offsetPath: `path('${stock}')` }}
        />
      ) : null}
    </svg>
  );
}

/** Product Launch Benchmarking and Cannibalization: a launch marker on a
 * timeline, plus a small market-share comparison. */
function TimelineCompareVisual({ reduce }: { reduce: boolean | null }) {
  return (
    <svg viewBox="0 0 190 90" className="h-[110px] w-full" aria-hidden="true">
      <line x1={10} y1={20} x2={180} y2={20} stroke="rgba(148,163,184,0.35)" strokeWidth="1" />
      <circle cx={60} cy={20} r={3} fill="rgba(148,163,184,0.6)" />
      <circle cx={120} cy={20} r={5} fill={BLUE} />
      {!reduce ? (
        <motion.circle
          cx={120}
          cy={20}
          r={5}
          fill="none"
          stroke={BLUE}
          strokeWidth="1.5"
          animate={{ r: [5, 11, 5], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}
      <text x={120} y={12} textAnchor="middle" className="fill-muted" style={{ fontSize: 8 }}>
        launch
      </text>

      {[
        { x: 20, h: 34, color: "rgba(148,163,184,0.4)" },
        { x: 55, h: 46, color: BLUE },
      ].map((bar, i) => (
        <rect
          key={i}
          x={bar.x}
          y={80 - bar.h}
          width={22}
          height={bar.h}
          rx={2}
          fill={bar.color}
        />
      ))}
    </svg>
  );
}
