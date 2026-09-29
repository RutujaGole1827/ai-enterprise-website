"use client";

import { motion, useReducedMotion } from "motion/react";

import { useContactHref } from "@/components/layout/contact-link";
import { cn } from "@/lib/utils";
import { BorderBeam } from "@/components/ui/border-beam";

/**
 * The closing panel — heading, body and one "Contact Our Team" button,
 * exactly what the live page's own closing section holds, inside one
 * near-black enclosure with a continuously travelling cyan/blue/white beam
 * tracing its perimeter.
 *
 * This is a separate component from the shared CtaBand
 * (components/sections/cta-band.tsx); CtaBand still renders the home
 * page's plain brand-navy closing block untouched.
 *
 * The panel fades up once as it enters view. Under prefers-reduced-motion:
 * the beam holds still, the cursor-glow doesn't track, and the entrance
 * renders in its end state immediately.
 */
export function FinalCta({
  title,
  titleHighlight,
  body,
  ctaLabel,
  beamColorFrom = "#22d3ee",
  beamColorTo = "#3b82f6",
  highlightTo = "#67e8f9",
  glowColor = "59,130,246",
}: {
  title: string;
  titleHighlight: string;
  body: string;
  ctaLabel: string;
  /** The travelling border beam's gradient. Defaults to the Microsoft
   * page's cyan → blue. */
  beamColorFrom?: string;
  beamColorTo?: string;
  /** Hex/rgb color the title highlight fades into, from white. */
  highlightTo?: string;
  /** `r,g,b` used for the two ambient corner glows and the cursor glow. */
  glowColor?: string;
}) {
  const reduce = useReducedMotion();
  const contactHref = useContactHref();

  return (
    <section className="min-h-section border-b border-line bg-canvas">
      <div className="shell py-6 md:py-10">
        <PointerGlowPanel glowColor={glowColor}>
          <BorderBeam
            borderRadius={28}
            size={90}
            duration={6}
            borderWidth={2}
            colorFrom={beamColorFrom}
            colorTo={beamColorTo}
          />

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto max-w-[68ch] text-center"
          >
            <h2 className="font-semibold tracking-[-0.03em] text-white [font-size:clamp(1.75rem,3vw,2.25rem)] [line-height:1.2]">
              {renderTitle(title, titleHighlight, highlightTo)}
            </h2>
            <p className="mx-auto mt-6 max-w-[68ch] text-lg leading-relaxed text-white/70 sm:text-xl">
              {body}
            </p>

            <div className="mt-9 flex justify-center">
              <a
                href={contactHref}
                className="inline-flex h-12 items-center rounded-full bg-white px-6 text-[0.9375rem] font-semibold text-[#05070a] shadow-[0_0_0_0_rgba(34,211,238,0)] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_32px_4px_rgba(34,211,238,0.35)]"
              >
                {ctaLabel}
              </a>
            </div>
          </motion.div>
        </PointerGlowPanel>
      </div>
    </section>
  );
}

/**
 * Renders `title` with `phrase` in a white → cyan gradient, breaking onto a
 * second line right before it on desktop (`lg:` and up) — a fixed two-line
 * split rather than a max-width narrow enough to wrap there on its own,
 * since the latter would drift with viewport width and font-size changes.
 * Below `lg`, the line wraps naturally, same as before.
 */
function renderTitle(title: string, phrase: string, highlightTo: string) {
  const at = title.indexOf(phrase);
  if (at === -1) return title;
  const before = title.slice(0, at).trimEnd();
  const after = title.slice(at + phrase.length);
  return (
    <>
      <span className="lg:whitespace-nowrap">{before}</span>{" "}
      <br className="hidden lg:block" />
      <span className="lg:whitespace-nowrap">
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff, ${highlightTo})`,
          }}
        >
          {phrase}
        </span>
        {after}
      </span>
    </>
  );
}

/**
 * The panel itself: near-black enclosure, a hairline grid, two soft blue/
 * cyan ambient glows, and a glow that follows the pointer — `group` lets
 * the beam opt into a subtle hover boost via `group-hover/panel:`, rather
 * than separate pointer state for every layer that should brighten
 * together.
 *
 * The background gradient is genuinely theme-aware rather than one fixed
 * value: light mode gets a cool blue-black (already far from the light
 * page canvas), dark mode gets a deep violet-black distinct in hue from
 * both that blue-black and the page's own navy dark canvas (--canvas:
 * #060c19) — without a real hue shift, a near-black panel on a near-black
 * page reads as the same surface, not a distinct block.
 */
function PointerGlowPanel({
  children,
  glowColor,
}: {
  children: React.ReactNode;
  glowColor: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div
      onPointerMove={(event) => {
        if (reduce) return;
        const node = event.currentTarget;
        const box = node.getBoundingClientRect();
        node.style.setProperty("--glow-x", `${event.clientX - box.left}px`);
        node.style.setProperty("--glow-y", `${event.clientY - box.top}px`);
      }}
      className={cn(
        "group/panel relative mx-auto w-full max-w-4xl overflow-hidden rounded-[24px] border border-white/[0.08] px-6 py-16 sm:rounded-[32px] sm:px-10 md:py-20 lg:px-14",
        "bg-[radial-gradient(120%_100%_at_50%_0%,#0c1220_0%,#080b10_60%)]",
        "dark:bg-[radial-gradient(120%_100%_at_50%_0%,#1b1032_0%,#0b0716_65%)]",
      )}
    >
      {/* Hairline grid, extremely low opacity. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      {/* Two soft ambient glows, opposite corners. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-1/4 -top-1/4 size-96 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, rgba(${glowColor},0.14) 0%, transparent 70%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-1/4 -right-1/4 size-96 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, rgba(${glowColor},0.14) 0%, transparent 70%)`,
        }}
      />
      {/* Cursor-following glow; centred and static under reduced motion,
          and a touch brighter on hover via group-hover/panel. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-500 group-hover/panel:opacity-60"
        style={{
          background: reduce
            ? `radial-gradient(28rem circle at 50% 30%, rgba(${glowColor},0.18), transparent 70%)`
            : `radial-gradient(28rem circle at var(--glow-x, 50%) var(--glow-y, 30%), rgba(${glowColor},0.18), transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}
