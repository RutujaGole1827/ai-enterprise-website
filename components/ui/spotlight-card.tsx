"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Spotlight card. The 21st.dev spotlight / glow card pattern: a soft accent
 * wash that follows the pointer across a bordered surface, plus a rotating
 * gradient border that only becomes visible on hover.
 *
 * The pointer position is written to two CSS custom properties on the node,
 * so moving the mouse never re-renders React. The wash only exists for fine
 * pointers (`pointer-fine:`); on touch the card is a plain surface, because a
 * glow that appears under a tap and stays there reads as a stuck state.
 *
 * The border is a separate layer: a conic gradient masked down to a hairline
 * ring (`mask-composite: exclude`, the standard gradient-border technique),
 * sitting at `opacity-0` until hover/focus reveals it. It's genuinely
 * moving, not just present: `--gradient-angle` (registered in globals.css so
 * it's animatable) spins continuously via `.animate-gradient-border`,
 * started when the card gets hovered rather than left running at all times,
 * so a page with several of these cards isn't animating ones nobody is
 * looking at. Where @property isn't supported the gradient just holds still
 * at one angle instead of sweeping — a border either way, never a missing
 * one. The global reduced-motion rule (globals.css) collapses the spin to a
 * single frame for anyone who's asked for that.
 */
export function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const box = node.getBoundingClientRect();
    node.style.setProperty("--spot-x", `${event.clientX - box.left}px`);
    node.style.setProperty("--spot-y", `${event.clientY - box.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={cn(
        "group/spot relative isolate overflow-hidden rounded-[var(--radius-surface)] border border-line bg-surface",
        "transition-colors duration-300 hover:border-line-strong",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 hidden opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100 pointer-fine:block"
        style={{
          background:
            "radial-gradient(22rem circle at var(--spot-x, 50%) var(--spot-y, 0%), color-mix(in oklab, var(--accent) 12%, transparent), transparent 70%)",
        }}
      />
      <span
        aria-hidden="true"
        className="animate-gradient-border pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100 group-hover/spot:[animation-play-state:running] group-focus-within/spot:opacity-100 group-focus-within/spot:[animation-play-state:running]"
        style={{
          padding: 1,
          background:
            "conic-gradient(from var(--gradient-angle), var(--accent), color-mix(in oklab, #ec4899 70%, var(--accent)), var(--brand-navy), var(--accent))",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {children}
    </div>
  );
}
