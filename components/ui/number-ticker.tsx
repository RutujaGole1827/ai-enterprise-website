"use client";

import * as React from "react";
import {
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

import { cn } from "@/lib/utils";

/**
 * Number ticker. The Magic UI / 21st.dev `number-ticker` contract (value,
 * startValue, delay, decimalPlaces), with two changes for this project:
 *
 * 1. The server renders the FINAL value, not the start value. The figure is
 *    the content, so it must be right with JavaScript off, for crawlers, and
 *    on first paint. The count only runs if the number is still below the
 *    fold when the component mounts, so nothing visible ever resets to 0.
 * 2. Under prefers-reduced-motion it never animates.
 *
 * Text is written straight to the DOM node from the spring, so counting does
 * not re-render React. `tabular-nums` keeps the width steady while it runs.
 * The element is aria-hidden: the parent supplies the accessible text, so a
 * screen reader never hears the intermediate numbers.
 */
export function NumberTicker({
  value,
  startValue = 0,
  delay = 0,
  decimalPlaces = 0,
  className,
}: {
  value: number;
  startValue?: number;
  delay?: number;
  decimalPlaces?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const armed = React.useRef(false);
  const motionValue = useMotionValue(startValue);
  const spring = useSpring(motionValue, { damping: 60, stiffness: 100 });
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  const format = React.useCallback(
    (n: number) =>
      Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      }).format(Number(n.toFixed(decimalPlaces))),
    [decimalPlaces],
  );

  // Arm the count only when the number is not on screen yet.
  React.useLayoutEffect(() => {
    const node = ref.current;
    if (!node || reduce) return;
    if (node.getBoundingClientRect().top > window.innerHeight) {
      armed.current = true;
      node.textContent = format(startValue);
    }
  }, [reduce, format, startValue]);

  React.useEffect(
    () =>
      spring.on("change", (latest) => {
        if (armed.current && ref.current) {
          ref.current.textContent = format(latest);
        }
      }),
    [spring, format],
  );

  React.useEffect(() => {
    if (!inView || !armed.current) return;
    const timer = setTimeout(() => motionValue.set(value), delay * 1000);
    return () => clearTimeout(timer);
  }, [inView, motionValue, value, delay]);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn("inline-block tabular-nums", className)}
    >
      {format(value)}
    </span>
  );
}
