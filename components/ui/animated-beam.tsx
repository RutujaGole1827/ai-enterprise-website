"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * Animated beam. The Magic UI / 21st.dev `animated-beam` contract
 * (containerRef, fromRef, toRef, delay, duration, offsets), adapted:
 *
 * - The path is a horizontal S-curve, so several beams converging on one hub
 *   fan in cleanly instead of bowing over each other.
 * - The travelling pulse runs ONCE (the registry default loops forever). A
 *   perpetual animation beside body copy is ambient decoration; one pass on
 *   load shows the direction of flow and then gets out of the way.
 * - `active` lifts the resting line to the accent, so the parent can tie a
 *   beam to hover or focus on its node.
 * - Colours come from tokens, so both themes work without props.
 *
 * Under prefers-reduced-motion the pulse is not rendered; the line is static.
 * Geometry is measured from the DOM and kept current with a ResizeObserver.
 */
export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  active = false,
  delay = 0,
  duration = 1.6,
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
  className,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
  fromRef: React.RefObject<HTMLElement | null>;
  toRef: React.RefObject<HTMLElement | null>;
  active?: boolean;
  delay?: number;
  duration?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
  className?: string;
}) {
  // useId output contains characters that are not safe inside url(#...).
  const id = `beam${React.useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const reduce = useReducedMotion();
  const [geometry, setGeometry] = React.useState({ d: "", w: 0, h: 0 });

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const update = () => {
      const from = fromRef.current;
      const to = toRef.current;
      if (!from || !to) return;
      const box = container.getBoundingClientRect();
      const a = from.getBoundingClientRect();
      const b = to.getBoundingClientRect();
      // Leave from the right edge of the source, arrive at the left edge of
      // the target: the beam never draws across either box.
      const sx = a.right - box.left + startXOffset;
      const sy = a.top - box.top + a.height / 2 + startYOffset;
      const ex = b.left - box.left + endXOffset;
      const ey = b.top - box.top + b.height / 2 + endYOffset;
      const mx = (sx + ex) / 2;
      setGeometry({
        d: `M ${sx},${sy} C ${mx},${sy} ${mx},${ey} ${ex},${ey}`,
        w: box.width,
        h: box.height,
      });
    };

    const observer = new ResizeObserver(update);
    observer.observe(container);
    update();
    return () => observer.disconnect();
  }, [
    containerRef,
    fromRef,
    toRef,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ]);

  if (!geometry.d) return null;

  return (
    <svg
      aria-hidden="true"
      fill="none"
      width={geometry.w}
      height={geometry.h}
      viewBox={`0 0 ${geometry.w} ${geometry.h}`}
      className={cn("pointer-events-none absolute left-0 top-0", className)}
    >
      <path
        d={geometry.d}
        strokeWidth={active ? 2 : 1.5}
        strokeLinecap="round"
        className={cn(
          "transition-[stroke,stroke-width] duration-300",
          active ? "stroke-accent" : "stroke-line-strong",
        )}
      />
      {reduce ? null : (
        <>
          <path
            d={geometry.d}
            strokeWidth={2}
            strokeLinecap="round"
            stroke={`url(#${id})`}
          />
          <defs>
            <motion.linearGradient
              id={id}
              gradientUnits="userSpaceOnUse"
              initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
              animate={{
                x1: ["10%", "110%"],
                x2: ["0%", "100%"],
                y1: ["0%", "0%"],
                y2: ["0%", "0%"],
              }}
              transition={{ delay, duration, ease: [0.16, 1, 0.3, 1] }}
            >
              <stop style={{ stopColor: "var(--accent)" }} stopOpacity="0" />
              <stop style={{ stopColor: "var(--accent)" }} />
              <stop offset="32.5%" style={{ stopColor: "var(--accent)" }} />
              <stop
                offset="100%"
                style={{ stopColor: "var(--accent)" }}
                stopOpacity="0"
              />
            </motion.linearGradient>
          </defs>
        </>
      )}
    </svg>
  );
}
