"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";

import { Z } from "@/lib/z-index";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The supplied component's original `Props` type described one nav
 * item's own shape (`{ id, label, ... }`), but the component itself
 * takes an array of them under a `navItems` prop — so every consumer
 * would have failed to typecheck. Fixed here as two real types: a
 * single item's shape, and the props the component actually receives.
 */
export type NavSubMenuItem = {
  label: string;
  href: string;
  description?: string;
  /** A generic icon (this project uses lucide-react here specifically,
   * matching the supplied component — the rest of the site's own icons
   * stay Phosphor; see components/layout/navigation-data.ts). */
  icon?: React.ElementType;
  /** A real brand asset (a downloaded product/partner logo), preferred
   * over `icon` when both are present. */
  iconSrc?: string;
};

export type NavSubMenu = {
  /** Omitted for a menu with only one group — matches this project's
   * flat menus (Partners, Insights, ...), which have no natural
   * sub-heading of their own. */
  title?: string;
  items: NavSubMenuItem[];
};

export type NavItem = {
  id: number;
  label: string;
  /** A plain link when there's nothing to open under it. */
  href?: string;
  subMenus?: NavSubMenu[];
  /** A "View all →" row along the bottom of the panel. Omitted for a
   * menu with no real index page of its own to send someone to. */
  viewAllHref?: string;
  viewAllLabel?: string;
  /** An optional visual anchor for the panel — a real image, not a
   * generic icon, in its own column alongside the link groups. */
  featured?: {
    label: string;
    title: string;
    href: string;
    image: { src: string; alt: string };
  };
};

export type DropdownNavigationProps = {
  navItems: NavItem[];
  /** The item whose section the current route belongs to, for the
   * active-state underline — independent of hover/open state. */
  activeId?: number | null;
  className?: string;
};

/**
 * Desktop/tablet dropdown nav — the rounded hover-pill trigger, animated
 * dropdown (fade + slight rise + scale, matching the reference site's
 * own mega-menu timing) and grouped icon/title/description columns from
 * the supplied component, restyled onto this project's own tokens
 * (`bg-surface`, `border-line`, `text-accent`, `--shadow-lift`) instead
 * of the demo's generic light/dark-agnostic palette.
 *
 * This is a navbar component, not a page: no `<main>`, no
 * `min-h-screen`, no centred demo content — it renders exactly the nav
 * `<nav>` and its dropdown panels, nothing else. The page/header around
 * it owns everything else.
 *
 * Hover opens with a short close-delay so moving from the trigger into
 * the panel (or between adjacent triggers) doesn't flicker closed;
 * click toggles too, for touch and keyboard. Escape and an outside
 * click both close it.
 */
export function DropdownNavigation({
  navItems,
  activeId = null,
  className,
}: DropdownNavigationProps) {
  const [openId, setOpenId] = React.useState<number | null>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = React.useRef<HTMLElement>(null);

  const clearCloseTimer = React.useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = React.useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpenId(null), 150);
  }, [clearCloseTimer]);

  React.useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  React.useEffect(() => {
    if (openId === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenId(null);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (navRef.current?.contains(event.target as Node)) return;
      setOpenId(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openId]);

  return (
    <nav
      ref={navRef}
      aria-label="Primary"
      onMouseLeave={scheduleClose}
      className={cn("relative flex items-center gap-1", className)}
    >
      {navItems.map((item) => {
        const hasMenu = Boolean(item.subMenus?.length);
        const isOpen = openId === item.id;
        const isActive = activeId === item.id;
        const triggerId = `dropdown-trigger-${item.id}`;
        const panelId = `dropdown-panel-${item.id}`;
        const columns = item.subMenus?.length ?? 0;

        return (
          <div
            key={item.id}
            className="relative"
            onMouseEnter={() => {
              if (!hasMenu) return;
              clearCloseTimer();
              setOpenId(item.id);
            }}
          >
            {item.href && !hasMenu ? (
              <Link
                href={item.href}
                className={cn(
                  "relative inline-flex h-9 items-center rounded-lg px-2 text-sm font-medium transition-colors duration-200",
                  isActive ? "text-accent" : "text-ink/85 hover:text-accent",
                )}
              >
                {item.label}
              </Link>
            ) : (
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onFocus={() => hasMenu && setOpenId(item.id)}
                onClick={() =>
                  hasMenu && setOpenId((current) => (current === item.id ? null : item.id))
                }
                className={cn(
                  "group relative inline-flex h-9 items-center gap-1.5 rounded-lg px-2 text-sm font-medium transition-colors duration-200",
                  isOpen || isActive ? "text-accent" : "text-ink/85 hover:text-accent",
                )}
              >
                {item.label}
                {hasMenu ? (
                  <ChevronDown
                    size={14}
                    strokeWidth={2}
                    className={cn(
                      "transition-transform duration-200",
                      isOpen && "rotate-180",
                    )}
                  />
                ) : null}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-2 -bottom-px h-px rounded-full bg-accent transition-transform duration-200",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </button>
            )}

            <AnimatePresence>
              {hasMenu && isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  onMouseEnter={clearCloseTimer}
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  style={{ zIndex: Z.megaMenu }}
                  className={cn(
                    "absolute left-1/2 top-full mt-3 -translate-x-1/2 rounded-[20px] border border-line",
                    "bg-surface/98 p-7 shadow-[var(--shadow-lift)] backdrop-blur-2xl",
                    item.featured
                      ? "w-[min(92vw,860px)]"
                      : columns > 1
                        ? "w-[min(92vw,720px)]"
                        : "w-[min(92vw,340px)]",
                  )}
                >
                  <div
                    className={cn(
                      "grid gap-x-8 gap-y-6",
                      item.featured
                        ? "sm:grid-cols-[1fr_1fr_1fr_15rem]"
                        : columns > 2
                          ? "sm:grid-cols-3"
                          : columns > 1
                            ? "sm:grid-cols-2"
                            : "grid-cols-1",
                    )}
                  >
                    {item.subMenus!.map((group, groupIndex) => (
                      <div key={group.title ?? groupIndex}>
                        {group.title ? (
                          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                            {group.title}
                          </p>
                        ) : null}
                        <ul className="flex flex-col gap-1">
                          {group.items.map((sub) => {
                            const Icon = sub.icon;
                            return (
                              <li key={sub.label}>
                                <Link
                                  href={sub.href}
                                  onClick={() => setOpenId(null)}
                                  className="group/item flex items-start gap-3 rounded-lg p-2.5 transition-colors duration-200 hover:bg-surface-2"
                                >
                                  <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                                    {sub.iconSrc ? (
                                      // eslint-disable-next-line @next/next/no-img-element
                                      <img
                                        src={sub.iconSrc}
                                        alt=""
                                        aria-hidden="true"
                                        width={16}
                                        height={16}
                                        className="size-4 object-contain"
                                      />
                                    ) : Icon ? (
                                      <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
                                    ) : null}
                                  </span>
                                  <span className="flex flex-col">
                                    <span className="text-[0.9375rem] font-medium text-ink transition-colors group-hover/item:text-accent">
                                      {sub.label}
                                    </span>
                                    {sub.description ? (
                                      <span className="text-sm leading-snug text-muted">
                                        {sub.description}
                                      </span>
                                    ) : null}
                                  </span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}

                    {item.featured ? (
                      <Link
                        href={item.featured.href}
                        onClick={() => setOpenId(null)}
                        className="group/featured flex flex-col overflow-hidden rounded-2xl border border-line transition-colors duration-200 hover:border-line-strong"
                      >
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-canvas">
                          <Image
                            src={item.featured.image.src}
                            alt={item.featured.image.alt}
                            fill
                            sizes="240px"
                            className="object-cover transition-transform duration-300 ease-out group-hover/featured:scale-[1.04]"
                          />
                        </div>
                        <div className="p-4">
                          <p className="text-xs font-medium text-muted">
                            {item.featured.label}
                          </p>
                          <p className="mt-1 text-sm font-medium leading-snug text-ink">
                            {item.featured.title}
                          </p>
                        </div>
                      </Link>
                    ) : null}
                  </div>

                  {item.viewAllHref ? (
                    <div className="mt-6 border-t border-line pt-4">
                      <Link
                        href={item.viewAllHref}
                        onClick={() => setOpenId(null)}
                        className="group/all inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors duration-200 hover:text-accent"
                      >
                        {item.viewAllLabel ?? `View all ${item.label.toLowerCase()}`}
                        <ChevronDown
                          size={13}
                          strokeWidth={2}
                          className="-rotate-90 transition-transform duration-200 group-hover/all:translate-x-0.5"
                        />
                      </Link>
                    </div>
                  ) : null}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </nav>
  );
}
