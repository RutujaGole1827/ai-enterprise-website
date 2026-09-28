"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, CaretDown, X } from "@phosphor-icons/react";

import {
  NAV_CTA,
  expertiseMenu,
  industries,
  insightsMenu,
  partnersMenu,
  solutionsMenu,
} from "@/lib/content";
import { Wordmark } from "@/components/ui/wordmark";
import { Z } from "@/lib/z-index";
import { cn } from "@/lib/utils";

/**
 * Mobile navigation drawer. Not the desktop mega menus shrunk down — each
 * of the five (Our Expertise, Solutions, Industries, Partners, Insights)
 * becomes its own expandable disclosure group, one open at a time, each
 * animating its own height open/closed. Nothing in the desktop menus is
 * dropped, only re-shaped for a single column.
 */
export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const [expanded, setExpanded] = React.useState<string | null>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);

  // Lock the page behind the drawer and close on Escape.
  React.useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const groups = [
    {
      key: "expertise",
      label: "Our Expertise",
      items: expertiseMenu.map((i) => ({ label: i.label, href: i.href })),
    },
    {
      key: "solutions",
      label: "Solutions",
      items: solutionsMenu.flatMap((c) => c.links),
    },
    {
      key: "industries",
      label: "Industries",
      items: industries.map((i) => ({ label: i.name, href: i.href })),
    },
    {
      key: "partners",
      label: "Partners",
      items: partnersMenu.map((p) => ({ label: p.name, href: p.href })),
    },
    {
      key: "insights",
      label: "Insights",
      items: insightsMenu,
    },
  ];

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          style={{ zIndex: Z.mobileDrawer }}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 overflow-y-auto bg-canvas lg:hidden"
        >
          <div className="shell flex h-[60px] items-center justify-between">
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

          <nav className="shell pb-16 pt-4">
            <ul className="flex flex-col">
              {groups.map((group) => {
                const isOpen = expanded === group.key;
                return (
                  <li key={group.key} className="border-b border-line">
                    <button
                      type="button"
                      onClick={() => setExpanded(isOpen ? null : group.key)}
                      aria-expanded={isOpen}
                      aria-controls={`mobile-group-${group.key}`}
                      className="flex w-full items-center justify-between py-4 text-left text-lg font-medium text-ink"
                    >
                      {group.label}
                      <CaretDown
                        size={18}
                        weight="regular"
                        className={cn(
                          "text-muted transition-transform duration-300",
                          isOpen && "rotate-180",
                        )}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          id={`mobile-group-${group.key}`}
                          initial={reduce ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={reduce ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <ul className="flex flex-col gap-1 pb-4">
                            {group.items.map((item) => (
                              <li key={item.label}>
                                <a
                                  href={item.href}
                                  onClick={onClose}
                                  className="block rounded-[var(--radius-control)] px-3 py-2.5 -mx-3 text-[0.9375rem] text-muted transition-colors hover:bg-surface-2 hover:text-ink"
                                >
                                  {item.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>

            <a
              href={NAV_CTA.href}
              target="_blank"
              rel="noreferrer"
              onClick={onClose}
              className="mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 text-[0.9375rem] font-semibold text-accent-contrast dark:text-white transition-colors duration-200 hover:bg-accent-hover"
            >
              {NAV_CTA.label}
              <ArrowUpRight size={16} weight="bold" />
            </a>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
