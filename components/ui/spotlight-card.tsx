"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Spotlight card. The 21st.dev spotlight / glow card pattern: a soft accent
 * wash that follows the pointer across a bordered surface.
 *
 * The pointer position is written to two CSS custom properties on the node,
 * so moving the mouse never re-renders React. The wash only exists for fine
 * pointers (`pointer-fine:`); on touch the card is a plain surface, because a
 * glow that appears under a tap and stays there reads as a stuck state.
 *
 * It responds to the user and to nothing else, so it needs no reduced-motion
 * branch: the wash fades in on hover and does not travel on its own.
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
      {children}
    </div>
  );
}
