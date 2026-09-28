"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Z } from "@/lib/z-index";

interface ExponentiaLoaderProps {
  /** Externally controlled loading state. Omit to run on a timer instead. */
  isLoading?: boolean;
  /** Timer duration in ms, used only when `isLoading` is not provided. */
  duration?: number;
  onComplete?: () => void;
}

const RING_SIZE = 148;
const STROKE = 1.5;
const RADIUS = (RING_SIZE - STROKE) / 2;
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Full-screen brand loader shown once on the site's initial load: the real
 * Exponentia wordmark (public/brand/logo-*.svg — the same asset Wordmark
 * uses) fades in inside a thin ring that draws itself with Motion's
 * `pathLength`, then the whole overlay fades away to reveal the page
 * already rendered underneath (nothing is render-blocked; this only sits
 * on top of it). Uncontrolled by default (runs off `duration`); pass
 * `isLoading` to drive it from real load state instead.
 */
export function ExponentiaLoader({
  isLoading,
  duration = 1800,
  onComplete,
}: ExponentiaLoaderProps) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = React.useState(true);
  const [exiting, setExiting] = React.useState(false);
  const controlled = isLoading !== undefined;

  React.useEffect(() => {
    if (controlled) {
      if (!isLoading) setExiting(true);
      return;
    }
    const timer = setTimeout(() => setExiting(true), duration);
    return () => clearTimeout(timer);
  }, [controlled, isLoading, duration]);

  if (!mounted) return null;

  return (
    <AnimatePresence
      onExitComplete={() => {
        setMounted(false);
        onComplete?.();
      }}
    >
      {!exiting ? (
        <motion.div
          key="exponentia-loader"
          role="status"
          aria-live="polite"
          aria-label="Loading Exponentia.ai"
          exit={{ opacity: 0, scale: reduce ? 1 : 1.02 }}
          transition={{ duration: reduce ? 0.25 : 0.6, ease: EASE }}
          className="fixed inset-0 flex items-center justify-center overflow-hidden"
          style={{ zIndex: Z.pageLoader }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 dark:hidden"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 45%, rgba(201,64,15,0.10), transparent 70%), linear-gradient(160deg, #fbf7f4, #f6ece7)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 hidden dark:block"
            style={{
              background:
                "radial-gradient(55% 50% at 50% 45%, rgba(255,119,52,0.16), transparent 70%), linear-gradient(160deg, #200a12, #120a16 55%, #06070c)",
            }}
          />

          <div
            className="relative flex items-center justify-center"
            style={{ width: RING_SIZE, height: RING_SIZE }}
          >
            {!reduce ? (
              <motion.div
                aria-hidden="true"
                className="absolute inset-0 rounded-full blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,119,52,0.35), transparent 70%)",
                }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: [0, 0.9, 0.55], scale: [0.6, 1.15, 1] }}
                transition={{ duration: 1.2, ease: EASE }}
              />
            ) : null}

            <svg
              width={RING_SIZE}
              height={RING_SIZE}
              viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
              className="absolute inset-0 -rotate-90"
            >
              <circle
                cx={RING_SIZE / 2}
                cy={RING_SIZE / 2}
                r={RADIUS}
                fill="none"
                stroke="currentColor"
                strokeWidth={STROKE}
                className="text-line"
                opacity={0.35}
              />
              <motion.circle
                cx={RING_SIZE / 2}
                cy={RING_SIZE / 2}
                r={RADIUS}
                fill="none"
                stroke="url(#exponentia-loader-gradient)"
                strokeWidth={STROKE}
                strokeLinecap="round"
                style={{ transformOrigin: "50% 50%" }}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  reduce
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: 1, opacity: 1, rotate: 360 }
                }
                transition={
                  reduce
                    ? { duration: 0.4 }
                    : {
                        pathLength: {
                          duration: (duration / 1000) * 0.7,
                          ease: EASE,
                        },
                        opacity: { duration: 0.4 },
                        rotate: {
                          duration: 3.2,
                          repeat: Infinity,
                          ease: "linear",
                          delay: (duration / 1000) * 0.7,
                        },
                      }
                }
              />
              <defs>
                <linearGradient
                  id="exponentia-loader-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#ff7734" />
                  <stop offset="55%" stopColor="#c9400f" />
                  <stop offset="100%" stopColor="#2f8f86" />
                </linearGradient>
              </defs>
            </svg>

            <motion.div
              initial={{ opacity: 0, scale: reduce ? 1 : 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: reduce ? 0.3 : 0.7, ease: EASE, delay: reduce ? 0 : 0.1 }}
              className="relative flex items-center justify-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/logo-light.svg"
                alt="Exponentia.ai"
                width={132}
                height={19}
                className="h-5 w-auto dark:hidden sm:h-6"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/logo-dark.svg"
                alt="Exponentia.ai"
                width={132}
                height={19}
                className="hidden h-5 w-auto dark:block sm:h-6"
              />
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default ExponentiaLoader;
