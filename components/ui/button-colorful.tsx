import * as React from "react";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface ButtonColorfulProps extends React.ComponentPropsWithoutRef<"a"> {
  label?: string;
}

/**
 * The "Read More" CTA for case-study cards: a purple → pink gradient-glow
 * treatment (indigo dropped from the original indigo → purple → pink).
 * Composes this project's own `Button` (components/ui/button.tsx — a CVA
 * + Radix `Slot` component, `variant="ghost"` here so its own accent/
 * shadow defaults don't bleed through) via `asChild` around a real `<a>`
 * rather than a plain `<button onClick={() => window.location.href =
 * ...}>`: every "Read More" here already has a real `href`
 * (case-studies-showcase.tsx doesn't use next/link anywhere, just plain
 * anchors), so this preserves that existing navigation mechanism instead
 * of introducing a JS-redirect stand-in for one.
 *
 * The button's own base color inverts by theme on purpose (dark pill in
 * light mode, light pill in dark mode) so the gradient glow reads clearly
 * against it in both.
 *
 * Icon is Phosphor's `ArrowUpRight` in place of `lucide-react` — this
 * project uses Phosphor everywhere else, so this avoids a second icon
 * library for one glyph with the same size/weight/motion either way.
 */
export function ButtonColorful({
  className,
  label = "Read More",
  ...props
}: ButtonColorfulProps) {
  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "group relative h-10 overflow-hidden rounded-md px-5",
        "bg-zinc-900 hover:bg-zinc-900 dark:bg-zinc-100 dark:hover:bg-zinc-100",
        "transition-all duration-200",
        className,
      )}
    >
      <a {...props}>
        {/* Gradient glow layer — behind the content, above the button's
            own base background. */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0",
            "bg-gradient-to-r from-purple-500 to-pink-500",
            "opacity-40 group-hover:opacity-60",
            "blur transition-opacity duration-500",
          )}
        />

        <div className="relative flex items-center justify-center gap-2">
          <span className="text-white dark:text-zinc-900">{label}</span>
          <ArrowUpRight
            size={14}
            weight="bold"
            className={cn(
              "text-white/90 dark:text-zinc-900/90",
              "transition-transform duration-300",
              "group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
            )}
          />
        </div>
      </a>
    </Button>
  );
}
