"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CaretDown, X } from "@phosphor-icons/react";

import {
  CTA_PRIMARY,
  industries,
  navLinks,
  solutionsMenu,
} from "@/lib/content";
import { useContactHref } from "@/components/layout/contact-link";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/ui/wordmark";
import { Z } from "@/lib/z-index";
import { cn } from "@/lib/utils";

/**
 * Mobile navigation drawer. The mega menu collapses into disclosure groups
 * here; nothing in the desktop menu is dropped, it is re-shaped.
 */
export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const contactHref = useContactHref();
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
      key: "solutions",
      label: "Solutions",
      items: solutionsMenu.flatMap((c) => c.links),
    },
    {
      key: "industries",
      label: "Industries",
      items: industries.map((i) => ({ label: i.name, href: "/#industries" })),
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
                    <div
                      id={`mobile-group-${group.key}`}
                      hidden={!isOpen}
                      className="pb-4"
                    >
                      <ul className="flex flex-col gap-1">
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
                    </div>
                  </li>
                );
              })}

              {navLinks
                .filter((link) => link.menu === null)
                .map((link) => (
                  <li key={link.label} className="border-b border-line">
                    <a
                      href={link.href}
                      onClick={onClose}
                      className="block py-4 text-lg font-medium text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
            </ul>

            <Button asChild size="lg" className="mt-8 w-full">
              <a href={contactHref} onClick={onClose}>
                {CTA_PRIMARY}
              </a>
            </Button>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
