"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, CaretDown, X } from "@phosphor-icons/react";

import {
  NAV_CTA,
  expertiseMenu,
  industries,
  insightsMenu,
  navLinks,
  partnersMenu,
  solutionsMenu,
  type NavMenuKey,
} from "@/lib/content";
import { Wordmark } from "@/components/ui/wordmark";
import { Z } from "@/lib/z-index";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

type MobileItem = { label: string; href: string; description?: string };
type MobileSection = { heading?: string; items: MobileItem[] };
type MobileGroup = { key: NavMenuKey; label: string; sections: MobileSection[] };

/** The same five source-of-truth menus DesktopNav/MegaMenu read,
 * reshaped into one flat, section-aware list per group — Solutions'
 * three headings survive as section labels; every other menu becomes a
 * single unlabelled section. Nothing here is a second copy of the
 * content, only of its shape. */
const GROUPS: MobileGroup[] = [
  {
    key: "expertise",
    label: "Our Expertise",
    sections: [
      {
        items: expertiseMenu.map((item) => ({
          label: item.label,
          href: item.href,
          description: item.description,
        })),
      },
    ],
  },
  {
    key: "solutions",
    label: "Solutions",
    sections: solutionsMenu.map((column) => ({
      heading: column.heading,
      items: column.links,
    })),
  },
  {
    key: "industries",
    label: "Industries",
    sections: [
      {
        items: industries.map((item) => ({
          label: item.name,
          href: item.href,
          description: item.body,
        })),
      },
    ],
  },
  {
    key: "partners",
    label: "Partners",
    sections: [
      {
        items: partnersMenu.map((item) => ({
          label: item.name,
          href: item.href,
          description: item.description,
        })),
      },
    ],
  },
  {
    key: "insights",
    label: "Insights",
    sections: [
      {
        items: insightsMenu.map((item) => ({
          label: item.label,
          href: item.href,
          description: item.description,
        })),
      },
    ],
  },
];

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Full-screen mobile/tablet navigation sheet (everything below `xl`
 * reaches every menu through this). One accordion, one open section at
 * a time — a top-level row expands in place (height/opacity, the whole
 * panel scrolls to accommodate it) rather than sliding to a separate
 * screen. An earlier version used a forward/back "drill into a new
 * panel" pattern instead; that turned out to be the wrong interaction
 * for this menu, so this reverts to the simpler accordion.
 *
 * `position: fixed; inset: 0` (not `w-screen h-screen`/`100vh`), so the
 * sheet always matches the actual visual viewport, including on mobile
 * browsers whose chrome shows and hides as the page scrolls. The sheet
 * itself never scrolls — only its content region does
 * (`overflow-y-auto overscroll-contain`), so the sheet's own header
 * (logo + close) and bottom padding stay put regardless of how tall the
 * expanded section gets.
 *
 * Backdrop and panel are passed to `AnimatePresence` as two array
 * elements with their own `key`s, not grouped in a `<React.Fragment>` —
 * `AnimatePresence` needs each direct child individually keyed to track
 * its exit animation; a Fragment wrapping multiple children is a known
 * way for that tracking to misbehave, which is the root cause this
 * fixes: the previous implementation grouped them in a Fragment.
 *
 * Focus is trapped inside while open (Tab/Shift+Tab wrap at the panel's
 * boundary), moves in on open, and returns to the menu button on close
 * (see site-header.tsx, which owns that ref). Escape closes; clicking
 * the backdrop closes; clicking inside the panel does not (the panel
 * stops the click from bubbling to the backdrop's own handler). Body
 * scroll is locked for the duration and restored exactly to what it was
 * — all of this only ever runs inside `useEffect`, never during SSR.
 */
export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const [expandedGroup, setExpandedGroup] = React.useState<NavMenuKey | null>(
    null,
  );
  const panelRef = React.useRef<HTMLDivElement>(null);

  const toggleGroup = (key: NavMenuKey) => {
    setExpandedGroup((current) => (current === key ? null : key));
  };

  // Reset to a fully-collapsed list every time the sheet is (re)opened.
  React.useEffect(() => {
    if (open) setExpandedGroup(null);
  }, [open]);

  // Move focus in, trap Tab within the panel, close on Escape, lock
  // background scroll (restoring the exact previous value) — all for
  // the duration the sheet is open.
  React.useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((el) => el.offsetParent !== null);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open
        ? [
            <motion.div
              key="backdrop"
              aria-hidden="true"
              onClick={onClose}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.2, ease: EASE }}
              style={{ zIndex: Z.mobileDrawer }}
              className="fixed inset-0 bg-ink/20 backdrop-blur-[2px] xl:hidden"
            />,
            <motion.div
              key="panel"
              id="mobile-nav-sheet"
              ref={panelRef}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              onClick={(event) => event.stopPropagation()}
              style={{ zIndex: Z.mobileDrawer }}
              initial={reduce ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="fixed inset-0 flex flex-col overflow-hidden bg-canvas xl:hidden"
            >
              <div className="shell flex h-[60px] shrink-0 items-center justify-between border-b border-line">
                <Wordmark />
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close navigation"
                  className="inline-flex size-10 items-center justify-center rounded-[var(--radius-control)] border border-control-border bg-surface text-ink active:translate-y-[1px]"
                >
                  <X size={18} weight="regular" />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]">
                <nav className="shell flex flex-col pb-10 pt-4">
                  {/* Two columns from `sm` (tablet and up) so the closed
                      list isn't twice as tall as it needs to be there;
                      back to one column below that, where two columns of
                      "Our Expertise"-length labels would crowd. Whichever
                      item is expanded spans both columns for its content,
                      via `sm:col-span-2` below — the rest reflow after it
                      through ordinary grid auto-placement, no JS involved. */}
                  <ul className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                    {navLinks.map((link) => {
                      const group = GROUPS.find((entry) => entry.key === link.menu);
                      const isExpanded = expandedGroup === link.menu;
                      const panelId = `mobile-panel-${link.menu}`;

                      return (
                        <li
                          key={link.label}
                          className={cn(
                            "border-b border-line",
                            isExpanded && "sm:col-span-2",
                          )}
                        >
                          <button
                            type="button"
                            onClick={() => toggleGroup(link.menu)}
                            aria-expanded={isExpanded}
                            aria-controls={panelId}
                            className="flex w-full items-center justify-between py-4 text-left text-lg font-medium text-ink"
                          >
                            {link.label}
                            <CaretDown
                              size={18}
                              weight="regular"
                              className={cn(
                                "shrink-0 text-muted transition-transform duration-300",
                                isExpanded && "rotate-180",
                              )}
                            />
                          </button>

                          <AnimatePresence initial={false}>
                            {isExpanded && group ? (
                              <motion.div
                                id={panelId}
                                initial={reduce ? false : { height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={reduce ? undefined : { height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: EASE }}
                                className="overflow-hidden"
                              >
                                <div className="flex flex-col gap-5 pb-5">
                                  {group.sections.map((section, index) => (
                                    <div key={section.heading ?? index}>
                                      {section.heading ? (
                                        <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                                          {section.heading}
                                        </p>
                                      ) : null}
                                      <ul className="flex flex-col gap-0.5">
                                        {section.items.map((item) => (
                                          <li key={item.label}>
                                            <a
                                              href={item.href}
                                              onClick={onClose}
                                              className="-mx-3 block rounded-[var(--radius-control)] px-3 py-2 text-[0.9375rem] text-muted transition-colors hover:bg-surface-2 hover:text-ink"
                                            >
                                              {item.label}
                                            </a>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            ) : null}
                          </AnimatePresence>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-8 flex flex-col items-center gap-4">
                    <a
                      href="/#contact"
                      onClick={onClose}
                      className="text-[0.9375rem] font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:text-accent"
                    >
                      Contact Us
                    </a>
                    <a
                      href={NAV_CTA.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={onClose}
                      className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 text-[0.9375rem] font-semibold text-accent-contrast transition-colors duration-200 hover:bg-accent-hover dark:text-white"
                    >
                      {NAV_CTA.label}
                      <ArrowUpRight size={16} weight="bold" />
                    </a>
                  </div>
                </nav>
              </div>
            </motion.div>,
          ]
        : null}
    </AnimatePresence>
  );
}
