"use client";

import * as React from "react";

/**
 * Renders one of lib/brand-svg.ts's inline marks, with every id in that
 * markup scoped to this mount.
 *
 * The generated marks carry short ids (`id="a"`, `id="b"`...) for their
 * clip-paths, unique only within their own source file. That's fine the
 * first time a mark is inlined on a page, but this project renders the same
 * mark more than once at once — the floating dock (components/ui/floating-
 * dock.tsx) mounts each client logo up to three times simultaneously (the
 * desktop row, the mobile row, and the mobile "view all" grid), each copy
 * injecting the identical raw ids into the same document. A browser resolves
 * `url(#a)` to the FIRST element in the DOM with that id, so the second and
 * third copies silently borrow the first copy's clip-path — which is how a
 * wordmark can render as another logo's shape, or vanish behind an unrelated
 * clip region.
 *
 * `useId()` gives this mount a value that's unique for as long as it stays
 * on the page, so prefixing every id (and every reference to it) with that
 * value fixes it regardless of how many times the same mark is on screen.
 */
export function BrandMark({
  svg,
  className,
}: {
  svg: string;
  className?: string;
}) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");

  const scoped = React.useMemo(() => {
    const ids = [...svg.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
    let out = svg;
    for (const id of new Set(ids)) {
      const ns = `${uid}-${id}`;
      const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      out = out
        .replace(new RegExp(`id="${escaped}"`, "g"), `id="${ns}"`)
        .replace(new RegExp(`url\\(#${escaped}\\)`, "g"), `url(#${ns})`)
        .replace(
          new RegExp(`(xlink:href|href)="#${escaped}"`, "g"),
          (_match, attr: string) => `${attr}="#${ns}"`,
        );
    }
    return out;
  }, [svg, uid]);

  return (
    <span
      aria-hidden="true"
      className={className}
      dangerouslySetInnerHTML={{ __html: scoped }}
    />
  );
}
