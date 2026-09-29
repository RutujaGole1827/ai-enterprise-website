"use client";

import * as React from "react";
import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * Hamburger that morphs into an X — three bars whose middle one fades
 * while the top/bottom rotate and close the gap into a cross, rather
 * than swapping one icon for another. Pure CSS transforms/opacity
 * (`transition-transform`/`transition-opacity`), no per-frame JS; under
 * `prefers-reduced-motion` the transform/opacity still apply but at a
 * near-zero duration via the project's own global reduced-motion
 * backstop in globals.css, so this component doesn't need its own
 * branch for it.
 */
export const MenuButton = React.forwardRef<
  HTMLButtonElement,
  {
    open: boolean;
    onClick: () => void;
    className?: string;
    "aria-controls"?: string;
  }
>(function MenuButton(
  { open, onClick, className, "aria-controls": ariaControls },
  ref,
) {
  const reduce = useReducedMotion();

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-label={open ? "Close navigation" : "Open navigation"}
      aria-expanded={open}
      aria-controls={ariaControls}
      className={cn(
        "relative inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-line text-ink active:translate-y-[1px]",
        className,
      )}
    >
      <span className="relative flex h-[11px] w-[18px] flex-col justify-between">
        <span
          aria-hidden="true"
          className={cn(
            "h-[1.5px] w-full origin-center rounded-full bg-current transition-transform duration-300",
            !reduce && "ease-[var(--ease-out-expo)]",
            open && "translate-y-[4.75px] rotate-45",
          )}
        />
        <span
          aria-hidden="true"
          className={cn(
            "h-[1.5px] w-full rounded-full bg-current transition-opacity duration-200",
            open && "opacity-0",
          )}
        />
        <span
          aria-hidden="true"
          className={cn(
            "h-[1.5px] w-full origin-center rounded-full bg-current transition-transform duration-300",
            !reduce && "ease-[var(--ease-out-expo)]",
            open && "-translate-y-[4.75px] -rotate-45",
          )}
        />
      </span>
    </button>
  );
});
