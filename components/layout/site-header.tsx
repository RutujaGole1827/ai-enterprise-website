"use client";

import * as React from "react";
import {
  AnimatePresence,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { CaretDown, List } from "@phosphor-icons/react";

import { brand, CTA_PRIMARY, navLinks } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { useContactHref } from "@/components/layout/contact-link";
import { MegaMenu } from "@/components/layout/mega-menu";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Wordmark } from "@/components/ui/wordmark";
import { Z } from "@/lib/z-index";
import { cn } from "@/lib/utils";

type MenuKey = "solutions" | "industries";

/**
 * Sticky site header. 68px tall at desktop, single line, never wraps.
 *
 * Scroll state uses Motion's useScroll with a discrete threshold event, so
 * React re-renders once when the header crosses 8px, not on every frame.
 * (No window scroll listeners anywhere in this project.)
 */
export function SiteHeader() {
  const contactHref = useContactHref();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRefs = React.useRef<Record<string, HTMLButtonElement | null>>(
    {},
  );

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

  React.useEffect(() => clearCloseTimer, [clearCloseTimer]);

  return (
    <header
      style={{ zIndex: Z.stickyNav }}
      onMouseLeave={scheduleClose}
      className={cn(
        "sticky top-0 w-full",
        "border-b transition-colors duration-300",
        scrolled
          ? "border-line bg-canvas/85 backdrop-blur-xl"
          : "border-transparent bg-canvas/60 backdrop-blur-sm",
      )}
    >
      <div className="shell flex h-[60px] items-center justify-between gap-6 lg:h-[68px]">
        <a
          href="/#top"
          className="rounded-[var(--radius-control)]"
          aria-label={`${brand.fullName} home`}
        >
          <Wordmark />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isMenu = link.menu !== null;
              const isOpen = openMenu === link.menu;
              const panelId = `mega-${link.menu}`;
              const triggerId = `mega-trigger-${link.menu}`;

              if (!isMenu) {
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onMouseEnter={scheduleClose}
                      className="inline-flex h-9 items-center rounded-[var(--radius-control)] px-3 text-[0.9375rem] text-muted transition-colors duration-200 hover:bg-surface-2 hover:text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                );
              }

              return (
                <li key={link.label}>
                  <button
                    type="button"
                    id={triggerId}
                    ref={(node) => {
                      triggerRefs.current[link.menu as string] = node;
                    }}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onMouseEnter={() => {
                      clearCloseTimer();
                      setOpenMenu(link.menu);
                    }}
                    onFocus={() => setOpenMenu(link.menu)}
                    onClick={() =>
                      setOpenMenu(isOpen ? null : (link.menu as MenuKey))
                    }
                    className={cn(
                      "inline-flex h-9 items-center gap-1.5 rounded-[var(--radius-control)] px-3",
                      "text-[0.9375rem] transition-colors duration-200",
                      isOpen
                        ? "bg-surface-2 text-ink"
                        : "text-muted hover:bg-surface-2 hover:text-ink",
                    )}
                  >
                    {link.label}
                    <CaretDown
                      size={14}
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

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href={contactHref}>{CTA_PRIMARY}</a>
          </Button>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
            aria-expanded={mobileOpen}
            className="inline-flex size-10 items-center justify-center rounded-[var(--radius-control)] border border-control-border bg-surface text-ink active:translate-y-[1px] lg:hidden"
          >
            <List size={18} weight="regular" />
          </button>
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
