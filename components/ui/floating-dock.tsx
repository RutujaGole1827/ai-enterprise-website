"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Z } from "@/lib/z-index";
import { BrandMark } from "@/components/ui/brand-mark";

export type DockItem = {
  name: string;
  /** Raw logo data, not a pre-built element: each mark is rendered fresh at
   * every mount site (see `DockLogo` below) so its ids can be scoped to that
   * specific mount instead of colliding with the same logo's other,
   * simultaneous copies elsewhere in the dock. Never a link destination:
   * these are proof marks, not nav. */
  logo:
    | { kind: "svg"; svg: string }
    | { kind: "image"; src: string; width: number; height: number };
};

/** Renders one dock item's logo, scoped fresh at its own mount site. */
function DockLogo({ item, className }: { item: DockItem; className?: string }) {
  if (item.logo.kind === "svg") {
    return <BrandMark svg={item.logo.svg} className={className} />;
  }
  return (
    <Image
      src={item.logo.src}
      alt=""
      width={item.logo.width}
      height={item.logo.height}
      loading="lazy"
      sizes="80px"
      className={className}
    />
  );
}

/**
 * Floating dock, as a marquee. Every logo stays on screen and scrolling —
 * there's no "view all" toggle hiding the rest of the list behind a button —
 * and the Aceternity/21st.dev dock's pointer-proximity magnify runs on top
 * of that scroll, the way a real macOS dock still magnifies icons on a
 * moving desktop.
 *
 * The row is two copies of the same list end to end (`.animate-marquee`,
 * the same mechanism components/sections/ecosystem.tsx already uses), looped
 * by a CSS transform so the scroll itself needs no JavaScript. Magnify is
 * layered on independently: each tile's distance from the pointer comes from
 * its live `getBoundingClientRect()`, which is correct whether the tile is
 * standing still or mid-animation. Hovering or focusing any tile pauses the
 * loop so the enlarged logo and its tooltip hold still to read, then resumes
 * on pointer-leave.
 *
 * Items are `<button>`s, not `<a href>`s: there's no per-client URL to send
 * a visitor to, and a dead link would be worse than a plain, honest button.
 *
 * Under prefers-reduced-motion the loop doesn't run — this project's
 * existing `.animate-marquee` rule in globals.css already disables it — and
 * the magnify spring collapses to a constant, so every logo just sits still
 * and legible, still reachable by keyboard.
 */
export function FloatingDock({
  items,
  className,
}: {
  items: DockItem[];
  className?: string;
}) {
  const mouseX = useMotionValue(Infinity);
  const [paused, setPaused] = React.useState(false);
  const reduce = useReducedMotion();

  // `.animate-marquee` (globals.css) translates by exactly -50%, so the one
  // animated element has to contain BOTH copies of the list end to end —
  // two separately animated lists placed side by side would each jump
  // halfway through their own single copy instead of looping seamlessly.
  // The second copy is aria-hidden; the real, reachable list is the first.
  const renderCopy = (copy: 0 | 1) =>
    items.map((item, index) => (
      <DockIcon
        key={`${copy}-${item.name}-${index}`}
        item={item}
        mouseX={mouseX}
        onHoverChange={setPaused}
        hidden={copy === 1}
      />
    ));

  return (
    <div
      role="list"
      aria-label="Client logos"
      onMouseMove={(event) => mouseX.set(event.pageX)}
      // Pausing is triggered here, at the row, not by a single icon's own
      // onMouseEnter: the icons are sliding targets, so a hover that only
      // fires once the pointer is already exactly over one can lose the race
      // against the animation and miss it. Entering the row at all freezes
      // it first; the still-tracked mouseX then drives which icon magnifies.
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        mouseX.set(Infinity);
      }}
      className={cn(
        "marquee-mask flex w-full items-end overflow-hidden py-3",
        className,
      )}
    >
      <ul
        className={cn(
          "flex shrink-0 items-end gap-4 pr-4",
          !reduce && "animate-marquee",
        )}
        style={paused ? { animationPlayState: "paused" } : undefined}
      >
        {renderCopy(0)}
        {renderCopy(1)}
      </ul>
    </div>
  );
}

function DockIcon({
  item,
  mouseX,
  onHoverChange,
  hidden = false,
}: {
  item: DockItem;
  mouseX: MotionValue<number>;
  onHoverChange: (hovered: boolean) => void;
  /** True for the marquee's trailing duplicate copy: present so the loop
   * reads as continuous, but not a second stop for keyboard or AT users. */
  hidden?: boolean;
}) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const [hovered, setHovered] = React.useState(false);

  const distance = useTransform(mouseX, (value) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return value - bounds.x - bounds.width / 2;
  });

  // Height-driven, not a fixed square: most of these are wide wordmarks, not
  // app icons, so a literal square tile would shrink them to an illegible
  // sliver. Width instead follows each logo's natural aspect ratio, with a
  // floor so the near-square marks (the ones already tiled on their own navy
  // square) don't end up narrower than the row is tall. Always a MotionValue
  // (never a bare number), so reduced motion collapses the output range to a
  // constant instead of swapping the spring's input type.
  const heightTransform = useTransform(
    distance,
    [-150, 0, 150],
    reduce ? [44, 44, 44] : [44, 72, 44],
  );
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 14,
  });
  const contentHeight = useTransform(height, (value) => value * 0.52);

  const setHover = (value: boolean) => {
    setHovered(value);
    onHoverChange(value);
  };

  return (
    <li
      role="listitem"
      aria-hidden={hidden || undefined}
      className="relative shrink-0 list-none"
    >
      {hovered ? (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.15 }}
          style={{ zIndex: Z.raised }}
          className="pointer-events-none absolute -top-9 left-1/2 w-max -translate-x-1/2 whitespace-nowrap rounded-[6px] border border-line bg-ink px-2.5 py-1 text-xs font-medium text-canvas shadow-[var(--shadow-sm)]"
        >
          {item.name}
        </motion.div>
      ) : null}
      <motion.button
        ref={ref}
        type="button"
        tabIndex={hidden ? -1 : 0}
        aria-label={item.name}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ height, minWidth: height }}
        className="flex items-center justify-center rounded-[var(--radius-control)] border border-line bg-surface px-3 text-muted shadow-[var(--shadow-card)] transition-colors duration-200 hover:border-line-strong hover:text-ink focus-visible:border-line-strong focus-visible:text-ink"
      >
        <motion.span
          style={{ height: contentHeight }}
          className="flex w-auto items-center"
        >
          <DockLogo
            item={item}
            className="h-full w-auto [&>svg]:h-full [&>svg]:w-auto"
          />
        </motion.span>
      </motion.button>
    </li>
  );
}
