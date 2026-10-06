"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";

import { NAV_CTA, brand, type NavMenuKey } from "@/lib/content";
import { navigation, idForMenuKey } from "@/components/layout/navigation-data";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { DropdownNavigation } from "@/components/ui/dorpdown-navigation";
import { MenuButton } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Wordmark } from "@/components/ui/wordmark";
import { Z } from "@/lib/z-index";
import { cn } from "@/lib/utils";

/** Which menu "owns" a given route, for the active-section indicator —
 * independent of hover/open state. Routes not covered (the home page,
 * case-study pages) simply have no active item, which is correct: none
 * of the five menus is "the" section for them. */
function menuKeyForPathname(pathname: string): NavMenuKey | null {
  if (pathname.startsWith("/industries/")) return "industries";
  if (pathname.startsWith("/partners-")) return "partners";
  if (pathname.startsWith("/insights/")) return "insights";
  return null;
}

/**
 * Sticky site header — one responsive system with two tiers, matching
 * the reference redesign's own navbar (which uses exactly one
 * breakpoint, and shows nothing narrower than a plain logo + menu
 * button below it — no partial/reduced desktop nav in between):
 *
 *   xl (1280px+)   DropdownNavigation: full five-item bar with hover
 *                  dropdowns (components/ui/dorpdown-navigation.tsx)
 *   below xl       logo + compact CTA + menu button; every menu is
 *                  reached through MobileNavigation's own full panel
 *                  (components/layout/mobile-navigation.tsx, built on
 *                  the sheet shell in components/ui/sidebar.tsx)
 *
 * Both read the same `navigation` data (components/layout/
 * navigation-data.ts), itself derived from lib/content.ts rather than
 * a second copy of it.
 *
 * (The breakpoint sits at `xl` rather than the reference's `lg` because
 * "Our Expertise" is a longer label than any of the reference's five
 * links — `xl` is where the full bar first has room for it alongside
 * the CTA without crowding.)
 *
 * Scroll state is one discrete Motion event (crossing an 8px threshold),
 * not a per-frame listener: past that point the bar firms up (stronger
 * blur/border, a solid-er surface, a touch shorter) instead of staying
 * static.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const activeId = idForMenuKey(menuKeyForPathname(pathname ?? ""));

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  const barRef = React.useRef<HTMLDivElement>(null);
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const next = latest > 8;
    setScrolled((current) => (current === next ? current : next));
  });

  // Give focus back to the menu button once the sheet has closed.
  const wasMobileOpen = React.useRef(false);
  React.useEffect(() => {
    if (wasMobileOpen.current && !mobileOpen) {
      menuButtonRef.current?.focus();
    }
    wasMobileOpen.current = mobileOpen;
  }, [mobileOpen]);

  // Resizing past `xl` (desktop nav takes over) closes an open sheet
  // instead of leaving it stranded underneath the desktop bar. A
  // `matchMedia` change listener, not a `resize` listener — it only
  // fires when the breakpoint is actually crossed, not on every pixel
  // of a drag-resize.
  React.useEffect(() => {
    const query = window.matchMedia("(min-width: 1280px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMobileOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const onBarPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = barRef.current;
    if (!node) return;
    const box = node.getBoundingClientRect();
    node.style.setProperty("--nav-spot-x", `${event.clientX - box.left}px`);
  };

  return (
    <header
      style={{ zIndex: Z.stickyNav }}
      className={cn(
        "sticky top-0 w-full border-b transition-[background-color,border-color,backdrop-filter] duration-200",
        scrolled
          ? "border-line bg-surface/95 backdrop-blur-xl"
          : "border-line/60 bg-surface/85 backdrop-blur-md",
      )}
    >
      <div className="shell">
        <div
          ref={barRef}
          onPointerMove={onBarPointerMove}
          className={cn(
            "group/bar relative isolate flex items-center justify-between gap-3 transition-[height] duration-200 sm:gap-6",
            scrolled ? "h-14" : "h-16",
          )}
        >
          {/* Cursor-following wash across the whole bar. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover/bar:opacity-100"
            style={{
              background:
                "radial-gradient(16rem circle at var(--nav-spot-x, 50%) 0%, color-mix(in oklab, var(--accent) 6%, transparent), transparent 70%)",
            }}
          />

          <a
            href="/#top"
            className="relative shrink-0 rounded-[var(--radius-control)]"
            aria-label={`${brand.fullName} home`}
          >
            <Wordmark />
          </a>

          <DropdownNavigation
            navItems={navigation}
            activeId={activeId}
            className="hidden xl:flex"
          />

          <div className="relative flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <a
              href={NAV_CTA.href}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "group hidden h-8 items-center gap-1.5 rounded-lg px-3 text-sm font-medium xl:inline-flex",
                "bg-accent text-accent-contrast shadow-md shadow-accent/20 dark:text-white",
                "transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/35",
              )}
            >
              {NAV_CTA.label}
              <ArrowUpRight
                size={14}
                weight="bold"
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <MenuButton
              ref={menuButtonRef}
              open={mobileOpen}
              onClick={() => setMobileOpen((current) => !current)}
              aria-controls="mobile-nav-sheet"
              className="xl:hidden"
            />
          </div>
        </div>
      </div>

      <MobileNavigation
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        panelId="mobile-nav-sheet"
      />
    </header>
  );
}
