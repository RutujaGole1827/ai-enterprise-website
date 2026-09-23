"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Sequence reveal. Used in exactly ONE place on the site: the four stages of
 * the engagement in components/sections/journey.tsx, where the content really
 * is a sequence and the reveal is part of the same scroll-linked moment as the
 * progress line beside it.
 *
 * It is deliberately not applied section by section down the page. A
 * fade-and-slide on every block is decoration, not information, and it makes
 * the whole page feel machine-assembled.
 *
 * Animates transform and opacity only. Under prefers-reduced-motion this
 * renders a plain element with no initial hidden state, so nothing can get
 * stuck invisible.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
