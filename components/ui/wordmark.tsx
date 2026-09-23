import { brand } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * The real Exponentia.ai wordmark.
 *
 * The source file is white type with the brand orange accent, drawn for a dark
 * ground. scripts/build-brand-svg.mjs emits two copies: the original for the
 * dark theme, and one with the white recoloured to --ink for the light theme.
 * The orange accent is identical in both.
 *
 * It ships as two cached files rather than inline markup because the wordmark
 * is 14KB of outlined paths and appears three times per page. This is the one
 * place, alongside the theme-paired marks, where the project reaches for the
 * `dark` class variant instead of a token: an <img> src cannot read one.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/logo-light.svg"
        alt={`${brand.fullName} home`}
        width={156}
        height={22}
        className="h-[22px] w-auto dark:hidden"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/logo-dark.svg"
        alt={`${brand.fullName} home`}
        width={156}
        height={22}
        className="hidden h-[22px] w-auto dark:block"
      />
    </span>
  );
}
