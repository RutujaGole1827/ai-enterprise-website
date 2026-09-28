"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * The Databricks hero's own decorative layer, rendered inside PartnerHero's
 * `background` slot, over the shared `.brand-ground` wash every partner
 * hero starts from: a dark charcoal corner, a Databricks red/orange glow,
 * the project's existing hairline grid texture (bg-hairline-grid, reused
 * rather than redrawn), and two thin data-flow lines that sweep once on
 * load. Not a literal Databricks screenshot — just enough of its palette
 * to read as its own page next to Microsoft's blue diagram hero.
 */
export function DatabricksHeroBackground() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          background:
            "radial-gradient(140% 90% at 100% 100%, color-mix(in oklab, var(--ink) 30%, transparent) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 dark:hidden"
        style={{
          background:
            "radial-gradient(60% 60% at 12% 8%, rgba(255,54,33,0.10), transparent 65%)",
        }}
      />
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          background:
            "radial-gradient(60% 60% at 12% 8%, rgba(255,86,48,0.22), transparent 65%)",
        }}
      />
      {/* Weighted toward the top-right corner, the same origin
          `.brand-ground` itself radiates from, and well clear of the hero
          copy's own column so grid lines never sit behind the heading or
          paragraphs. */}
      <div className="bg-hairline-grid absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(55%_55%_at_92%_8%,black,transparent)]" />

      {!reduce ? (
        <>
          {/* Anchored to the section's own top/bottom edges, well clear of
              the vertically-centred hero copy, rather than a mid-section
              percentage that would cut across the heading or paragraphs
              on shorter viewports. */}
          <motion.span
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "0% 50%" }}
            className="absolute left-0 top-10 h-px w-2/5 bg-gradient-to-r from-transparent via-[#ff5630]/45 to-transparent sm:top-14"
          />
          <motion.span
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "100% 50%" }}
            className="absolute bottom-10 right-0 h-px w-1/3 bg-gradient-to-l from-transparent via-[#ff5630]/35 to-transparent sm:bottom-14"
          />
        </>
      ) : null}
    </div>
  );
}
