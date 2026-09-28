"use client";

import { motion, useReducedMotion, type Transition } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * Border beam. The Magic UI / 21st.dev "Animated Border Beam" component,
 * structurally matched to the real, well-known open-source original rather
 * than the looser first pass this project shipped before: one beam element
 * (a `via`-gradient square following the card's rounded-rect `offset-path`,
 * defaulting to the reference's own signature orange-to-purple), plus one
 * more heavily blurred copy behind it for bloom — not a redesign of the
 * effect, a correction back to it. Defaults match the reference's own
 * (`size=50`, `duration=15`, `#ffaa40` → `#9c40ff`) so using this with no
 * overrides reproduces the familiar look; this project's callers can still
 * override colours to stay on-brand where that's wanted.
 *
 * `offset-path`'s default `offset-rotate: auto` turns the element to match
 * the path's tangent, so the same gradient direction reads correctly on
 * every edge without extra rotation logic.
 *
 * GPU-cheap (`transform`, `opacity`, `filter` only), purely decorative
 * (`aria-hidden`, `pointer-events-none`), and under prefers-reduced-motion
 * the beam holds at its start position instead of travelling.
 */
export function BorderBeam({
  className,
  size = 50,
  borderRadius = 24,
  duration = 15,
  delay = 0,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  borderWidth = 1,
  reverse = false,
  initialOffset = 0,
  transition,
}: {
  className?: string;
  /** Diameter of the glowing beam head, in px. */
  size?: number;
  /** Must match the card's own border radius (in px) so the beam's path
   * traces the card's actual corners rather than its own, unrelated ones. */
  borderRadius?: number;
  /** Seconds for one full lap of the perimeter. */
  duration?: number;
  /** Negative start offset into the loop, in seconds. */
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  /** Must match the card's own border width for the beam to sit flush. */
  borderWidth?: number;
  reverse?: boolean;
  /** Where round the perimeter (0–100%) the beam starts. */
  initialOffset?: number;
  transition?: Transition;
}) {
  const reduce = useReducedMotion();

  const from = `${initialOffset}%`;
  const to = reverse ? `${initialOffset - 100}%` : `${initialOffset + 100}%`;
  const offsetPath = `rect(0% auto auto 0% round ${borderRadius}px)`;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent",
        "[mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]",
        className,
      )}
      style={{ borderWidth }}
    >
      {/* Bloom: the same beam, larger and blurred, directly behind it. */}
      <motion.div
        className="absolute aspect-square opacity-70 blur-sm"
        style={{
          width: size,
          offsetPath,
          background: `linear-gradient(to left, ${colorFrom}, ${colorTo}, transparent)`,
        }}
        initial={{ offsetDistance: from }}
        animate={
          reduce ? { offsetDistance: from } : { offsetDistance: [from, to] }
        }
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
          delay: -delay,
          ...transition,
        }}
      />
      {/* The crisp beam itself. */}
      <motion.div
        className="absolute aspect-square"
        style={{
          width: size,
          offsetPath,
          background: `linear-gradient(to left, ${colorFrom}, ${colorTo}, transparent)`,
        }}
        initial={{ offsetDistance: from }}
        animate={
          reduce ? { offsetDistance: from } : { offsetDistance: [from, to] }
        }
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
          delay: -delay,
          ...transition,
        }}
      />
    </div>
  );
}
