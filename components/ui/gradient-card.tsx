"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Gradient card. The 21st.dev "Gradient Bold Card" look: a fine gradient
 * stroke traced along the top edge and curving down the top-right corner,
 * fading to nothing past it, over a soft rose blush blooming from the upper
 * left — on an elevated, softly-shadowed surface.
 *
 * The stroke is a border, not a background: a gradient layer sits behind the
 * card, masked with `mask-composite: exclude` so only a hairline ring shows,
 * then the gradient's own colour stops (accent → transparent) fade it out
 * before it reaches the left or bottom edge. This needs no extra element
 * beyond the two decorative layers, and no library — the reference uses
 * framer-motion only for its own hover choreography, which a CSS transition
 * already covers here.
 *
 * The stroke runs from the brand accent into a rose companion tone (this
 * project's palette has no second accent; rose is close enough in hue to sit
 * beside the orange without reading as an unrelated colour) rather than the
 * reference's own fixed hex values, so it still answers to the accent token
 * if the brand colour ever changes. Both washes intensify slightly on
 * hover/focus; neither is a pointer-follow effect, so nothing here needs a
 * reduced-motion branch.
 */
export function GradientCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group/gradient relative isolate overflow-hidden rounded-[var(--radius-surface)] bg-surface",
        "shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-lift)] focus-within:shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      {/* Gradient stroke: a masked ring, coloured only along the top-right. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-70 transition-opacity duration-300 group-hover/gradient:opacity-100"
        style={{
          padding: 1,
          // Anchored at the top-right corner, sweeping from "down" (along
          // the right edge) to "left" (along the top edge) — the 90° arc
          // that points into the card from that corner — so the colour
          // wraps just that corner and fades out before the far end of
          // either edge, rather than running the full way round.
          background:
            "conic-gradient(from 180deg at 100% 0%, var(--accent) 0deg, color-mix(in oklab, #ec4899 70%, var(--accent)) 35deg, transparent 90deg)",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {/* Inner blush: a soft rose bloom from the upper-left. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 -top-10 -z-10 size-56 rounded-full opacity-60 blur-3xl transition-opacity duration-300 group-hover/gradient:opacity-90"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, #ec4899 22%, transparent) 0%, transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}
