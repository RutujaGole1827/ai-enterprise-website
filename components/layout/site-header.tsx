"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";

import { NAV_CTA, brand, type NavMenuKey } from "@/lib/content";
import { DesktopNav } from "@/components/layout/desktop-nav";
import { MenuButton } from "@/components/layout/menu-button";
import { MegaMenu } from "@/components/layout/mega-menu";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Wordmark } from "@/components/ui/wordmark";
import { Z } from "@/lib/z-index";
import { cn } from "@/lib/utils";

/** Which mega-menu "owns" a given route, for the active-section
 * indicator — independent of hover/open state. Routes not covered
 * (the home page, case-study pages) simply have no active item, which
 * is correct: none of the five menus is "the" section for them. */
function menuKeyForPathname(pathname: string): NavMenuKey | null {
  if (pathname.startsWith("/industries/")) return "industries";
  if (pathname.startsWith("/partners-")) return "partners";
  if (pathname.startsWith("/insights/")) return "insights";
  return null;
}

/**
 * Sticky site header — one responsive system with two tiers, matching
 * the reference redesign's own navbar (which uses exactly one
 * breakpoint, `lg`/1024px, and nothing narrower than that shows a
 * reduced desktop nav — just logo + menu button):
 *
 *   xl (1280px+)   DesktopNav: full five-item mega-menu bar
 *   below xl       logo + compact CTA + menu button only; every menu
 *                  is reached through MobileNav's own full panel
 *
 * (This project's breakpoint is `xl` rather than the reference's `lg`
 * because "Our Expertise" is a longer label than any of the reference's
 * five links — `xl` is where the full bar first has room for it
 * alongside the CTA without crowding.) A partial/reduced nav tier
 * between the two was tried and removed: the reference doesn't have
 * one, and it doesn't fully solve anything the panel doesn't already
 * cover.
 *
 * Scroll state is one discrete Motion event (crossing an 8px threshold),
 * not a per-frame listener, so this re-renders once on crossing it
 * rather than continuously: past that point the bar firms up (stronger
 * blur/border, a solid-er surface, a touch shorter) instead of staying
 * static, matching the plain content-height sections below it that
 * don't otherwise announce "you've scrolled."
 */
export function SiteHeader() {
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const activeMenu = menuKeyForPathname(pathname ?? "");

  const [openMenu, setOpenMenu] = React.useState<NavMenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRefs = React.useRef<Record<string, HTMLButtonElement | null>>(
    {},
  );
  const barRef = React.useRef<HTMLDivElement>(null);
  const headerRef = React.useRef<HTMLElement>(null);
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const next = latest > 8;
    setScrolled((current) => (current === next ? current : next));
  });

  const clearCloseTimer = React.useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = React.useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  }, [clearCloseTimer]);

  // Escape closes the panel and returns focus to the trigger that opened it.
  React.useEffect(() => {
    if (!openMenu) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const trigger = triggerRefs.current[openMenu];
      setOpenMenu(null);
      trigger?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openMenu]);

  // Click (or tap) anywhere outside the header/panel closes it — the
  // mouseleave-based scheduleClose above only fires when the pointer
  // physically leaves the header, which a touch tap or a click that
  // lands elsewhere without crossing that boundary wouldn't trigger.
  React.useEffect(() => {
    if (!openMenu) return;
    const onPointerDown = (event: PointerEvent) => {
      if (headerRef.current?.contains(event.target as Node)) return;
      setOpenMenu(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openMenu]);

  React.useEffect(() => clearCloseTimer, [clearCloseTimer]);

  // Give focus back to the menu button once the sheet has closed.
  const wasMobileOpen = React.useRef(false);
  React.useEffect(() => {
    if (wasMobileOpen.current && !mobileOpen) {
      menuButtonRef.current?.focus();
    }
    wasMobileOpen.current = mobileOpen;
  }, [mobileOpen]);

  // Resizing past the `xl` breakpoint (desktop nav takes over) closes an
  // open sheet/mega-menu instead of leaving it stranded underneath the
  // desktop bar. A `matchMedia` change listener, not a `resize` listener
  // — it only fires when the breakpoint is actually crossed, not on
  // every pixel of a drag-resize.
  React.useEffect(() => {
    const query = window.matchMedia("(min-width: 1280px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (!event.matches) return;
      setMobileOpen(false);
      setOpenMenu(null);
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
      ref={headerRef}
      style={{ zIndex: Z.stickyNav }}
      onMouseLeave={scheduleClose}
      className={cn(
        "sticky top-0 w-full border-b transition-[background-color,border-color,backdrop-filter] duration-300",
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
            "group/bar relative isolate flex items-center justify-between gap-3 transition-[height] duration-300 sm:gap-6",
            scrolled ? "h-14" : "h-16",
          )}
        >
          {/* Cursor-following wash across the whole bar. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/bar:opacity-100"
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

          <DesktopNav
            openMenu={openMenu}
            activeMenu={activeMenu}
            reduceMotion={reduce}
            triggerRefs={triggerRefs}
            onTriggerEnter={(menu) => {
              clearCloseTimer();
              setOpenMenu(menu);
            }}
            onTriggerFocus={setOpenMenu}
            onTriggerClick={(menu) =>
              setOpenMenu((current) => (current === menu ? null : menu))
            }
          />

          <div className="relative flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <a
              href={NAV_CTA.href}
              target="_blank"
              rel="noreferrer"
              aria-label={NAV_CTA.label}
              className={cn(
                "group hidden items-center gap-1.5 rounded-lg text-sm font-medium",
                "bg-accent text-accent-contrast shadow-md shadow-accent/20 dark:text-white",
                "transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/35",
                // Icon-only from `sm` (the compact tablet/mobile CTA); the
                // full label only fits from `xl`, alongside DesktopNav.
                "sm:inline-flex sm:size-9 sm:justify-center sm:px-0",
                "xl:h-8 xl:w-auto xl:justify-start xl:px-3",
              )}
            >
              <span className="hidden xl:inline">{NAV_CTA.label}</span>
              <ArrowUpRight
                size={14}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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

      <AnimatePresence>
        {openMenu ? (
          <MegaMenu
            key={openMenu}
            menu={openMenu}
            id={`mega-${openMenu}`}
            labelledBy={`mega-trigger-${openMenu}`}
            onNavigate={() => setOpenMenu(null)}
            onMouseEnter={clearCloseTimer}
          />
        ) : null}
      </AnimatePresence>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
