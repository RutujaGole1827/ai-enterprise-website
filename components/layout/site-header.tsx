"use client";

import * as React from "react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowUpRight, CaretDown, List } from "@phosphor-icons/react";

import { NAV_CTA, brand, navLinks, type NavMenuKey } from "@/lib/content";
import { MegaMenu } from "@/components/layout/mega-menu";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Wordmark } from "@/components/ui/wordmark";
import { Z } from "@/lib/z-index";
import { cn } from "@/lib/utils";

/**
 * Sticky site header: a full-width bar with a single bottom border and a
 * constant backdrop blur/translucency, rather than a floating rounded
 * pill — a plainer, more enterprise treatment that doesn't morph on
 * scroll.
 *
 * Every nav item is a mega-menu trigger (the live site's own five:
 * Our Expertise, Solutions, Industries, Partners, Insights — see
 * lib/content.ts), open on hover with a short close-delay so moving from
 * the trigger into the panel doesn't dismiss it, and on click/focus for
 * keyboard and touch. Escape closes the open panel and returns focus to
 * its trigger.
 */
export function SiteHeader() {
  const reduce = useReducedMotion();
  const [openMenu, setOpenMenu] = React.useState<NavMenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRefs = React.useRef<Record<string, HTMLButtonElement | null>>(
    {},
  );
  const barRef = React.useRef<HTMLDivElement>(null);

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

  React.useEffect(() => clearCloseTimer, [clearCloseTimer]);

  const onBarPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = barRef.current;
    if (!node) return;
    const box = node.getBoundingClientRect();
    node.style.setProperty("--nav-spot-x", `${event.clientX - box.left}px`);
  };

  return (
    <header
      style={{ zIndex: Z.stickyNav }}
      onMouseLeave={scheduleClose}
      className="sticky top-0 w-full border-b border-line/60 bg-surface/85 backdrop-blur-md transition-colors duration-300"
    >
      <div className="shell">
        <div
          ref={barRef}
          onPointerMove={onBarPointerMove}
          className="group/bar relative isolate flex h-16 items-center justify-between gap-6"
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
            className="relative rounded-[var(--radius-control)]"
            aria-label={`${brand.fullName} home`}
          >
            <Wordmark />
          </a>

          <nav aria-label="Primary" className="relative hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isOpen = openMenu === link.menu;
                const panelId = `mega-${link.menu}`;
                const triggerId = `mega-trigger-${link.menu}`;

                return (
                  <li key={link.label}>
                    <button
                      type="button"
                      id={triggerId}
                      ref={(node) => {
                        triggerRefs.current[link.menu] = node;
                      }}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onMouseEnter={() => {
                        clearCloseTimer();
                        setOpenMenu(link.menu);
                      }}
                      onFocus={() => setOpenMenu(link.menu)}
                      onClick={() => setOpenMenu(isOpen ? null : link.menu)}
                      className={cn(
                        "inline-flex h-9 items-center gap-1.5 rounded-lg px-3 py-2",
                        "text-sm font-medium transition-colors duration-200",
                        isOpen ? "text-accent" : "text-ink/85 hover:text-accent",
                      )}
                    >
                      {link.label}
                      <CaretDown
                        size={13}
                        weight="bold"
                        className={cn(
                          "transition-transform duration-300",
                          isOpen && !reduce && "rotate-180",
                        )}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="relative flex items-center gap-2">
            <ThemeToggle />
            <a
              href={NAV_CTA.href}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "group hidden h-8 items-center gap-1.5 rounded-lg px-3 text-sm font-medium sm:inline-flex",
                "bg-accent text-accent-contrast dark:text-white shadow-md shadow-accent/20",
                "transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/35",
              )}
            >
              {NAV_CTA.label}
              <ArrowUpRight
                size={14}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
              aria-expanded={mobileOpen}
              className="inline-flex size-9 items-center justify-center rounded-md border border-line text-ink active:translate-y-[1px] lg:hidden"
            >
              <List size={18} weight="regular" />
            </button>
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
