"use client";

import * as React from "react";
import { MeshGradient } from "@paper-design/shaders-react";

interface HeroSectionProps {
  title?: string;
  highlightText?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  onButtonClick?: () => void;
  lightColors?: string[];
  darkColors?: string[];
  distortion?: number;
  swirl?: number;
  speed?: number;
  offsetX?: number;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  buttonClassName?: string;
  maxWidth?: string;
  veilOpacity?: string;
  fontFamily?: string;
  fontWeight?: number;
}

/** Soft mint / teal / warm cream / light peach — the light-mode palette. */
const DEFAULT_LIGHT_COLORS = [
  "#72b9bb",
  "#b5d9d9",
  "#ffd1bd",
  "#ffebe0",
  "#8cc5b8",
  "#dbf4a4",
];

/** Deep navy / dark teal / muted blue / dark violet / subtle emerald —
 * genuinely darker (not the light palette under a black veil), so the
 * shader itself changes with the theme, not just its overlay. */
const DEFAULT_DARK_COLORS = [
  "#0b1220",
  "#0f3a37",
  "#1f3c5c",
  "#2b1f42",
  "#123a2c",
  "#161a35",
];

/**
 * MeshGradient-backed hero (@paper-design/shaders-react), adapted from the
 * supplied base: same shader setup (distortion/swirl/speed/offsetX, resize-
 * tracked dimensions, mount guard to avoid an SSR/hydration mismatch on the
 * canvas size), plus:
 *  - a light/dark color pair instead of one fixed `colors` array. The
 *    project's theme toggle (components/layout/theme-toggle.tsx) just
 *    flips a `dark` class on `<html>` with no shared context to subscribe
 *    to, so this component watches that class itself with a
 *    `MutationObserver` — self-contained, no change to the header/toggle —
 *    and re-picks the color array when it flips.
 *  - `text-ink`/`text-accent` for the title (already theme-aware: near-
 *    black/near-white and the brand orange invert with `--ink`/`--accent`
 *    in globals.css) and `text-ink/80` for the description, replacing a
 *    hardcoded `text-white` that read fine in dark mode but failed in
 *    light mode.
 *  - a solid `bg-accent`/`text-accent-contrast` pill for the CTA: a fixed
 *    saturated color reads reliably over a moving multi-color gradient in
 *    both themes, rather than a border/ghost button whose own contrast
 *    would need separate light/dark tuning against a background that
 *    itself changes per theme.
 *  - the shadcn tokens the original used (`bg-background`, `border-card`)
 *    don't exist in this project's Tailwind theme, so they're swapped for
 *    the equivalent tokens this project actually has (`bg-canvas`,
 *    `border-line`).
 *  - `fontFamily`/`fontWeight` default to unset rather than a hardcoded
 *    "Satoshi", so the heading inherits the project's own `font-sans`
 *    (Geist) already set on `<body>`, instead of introducing a second
 *    typeface just for this section.
 *  - `min-h-screen` (100vh) replaced with a height that subtracts the
 *    site header's own real rendered height, including its 1px bottom
 *    border (site-header.tsx: 60px + 1px below `lg`, 68px + 1px at `lg`
 *    and up), using `100dvh` so mobile browser chrome is accounted for
 *    too. The header is `sticky`, not `fixed`, so it still takes up real
 *    layout space above the hero; leaving the hero at a full 100vh on top
 *    of that pushed the page one header's height taller than the
 *    viewport, forcing a scroll to see the rest of the hero.
 */
export function HeroSection({
  title = "Transforming the CPG Industry with",
  highlightText = "AI",
  description = "Empowering consumer packaged goods companies with AI-driven solutions to accelerate growth, improve efficiency, and deliver exceptional customer experiences.",
  buttonText = "",
  buttonHref,
  onButtonClick,
  lightColors = DEFAULT_LIGHT_COLORS,
  darkColors = DEFAULT_DARK_COLORS,
  distortion = 0.8,
  swirl = 0.6,
  speed = 0.42,
  offsetX = 0.08,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  buttonClassName = "",
  maxWidth = "max-w-6xl",
  veilOpacity = "bg-white/20 dark:bg-black/25",
  fontFamily,
  fontWeight,
}: HeroSectionProps) {
  const [dimensions, setDimensions] = React.useState({
    width: 1920,
    height: 1080,
  });
  const [mounted, setMounted] = React.useState(false);
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));

    const update = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    update();
    window.addEventListener("resize", update);

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, []);

  const colors = isDark ? darkColors : lightColors;

  return (
    <section
      className={`relative w-full h-[calc(100dvh-61px)] lg:h-[calc(100dvh-69px)] overflow-hidden bg-canvas flex items-center justify-center ${className}`}
    >
      <div className="absolute inset-0 w-full h-full">
        {mounted && (
          <>
            <MeshGradient
              width={dimensions.width}
              height={dimensions.height}
              colors={colors}
              distortion={distortion}
              swirl={swirl}
              grainMixer={0}
              grainOverlay={0}
              speed={speed}
              offsetX={offsetX}
            />
            <div
              className={`absolute inset-0 pointer-events-none ${veilOpacity}`}
            />
          </>
        )}
      </div>

      <div className={`relative z-10 ${maxWidth} mx-auto px-6 w-full`}>
        <div className="text-center">
          <h1
            className={`font-bold text-ink text-balance text-4xl sm:text-5xl md:text-6xl xl:text-[80px] leading-tight sm:leading-tight md:leading-tight lg:leading-tight xl:leading-[1.1] mb-6 lg:text-7xl ${titleClassName}`}
            style={fontFamily ? { fontFamily, fontWeight } : undefined}
          >
            {title} <span className="text-accent">{highlightText}</span>
          </h1>

          <p
            className={`text-lg sm:text-xl text-ink/80 text-pretty max-w-2xl mx-auto leading-relaxed mb-10 px-4 ${descriptionClassName}`}
          >
            {description}
          </p>

          {buttonText ? (
            buttonHref ? (
              <a
                href={buttonHref}
                className={`inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 sm:px-7 sm:py-3.5 text-sm sm:text-base font-semibold text-accent-contrast shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)] transition-colors duration-200 hover:bg-accent-hover ${buttonClassName}`}
              >
                {buttonText}
              </a>
            ) : (
              <button
                onClick={onButtonClick}
                className={`inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 sm:px-7 sm:py-3.5 text-sm sm:text-base font-semibold text-accent-contrast shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)] transition-colors duration-200 hover:bg-accent-hover ${buttonClassName}`}
              >
                {buttonText}
              </button>
            )
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
