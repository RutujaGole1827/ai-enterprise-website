"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  X,
} from "lucide-react";

import { NAV_CTA } from "@/lib/content";
import { navigation, isNestedMenu } from "@/components/layout/navigation-data";
import { MobileSidebar } from "@/components/ui/sidebar";
import { Wordmark } from "@/components/ui/wordmark";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/** The root list's own reveal: a small stagger starting just after the
 * drawer itself begins sliding in (`delayChildren`), not simultaneous
 * with it — per the brief, content should follow the drawer, not race
 * it. Kept fast (0.05s per item, 0.25s each) rather than a showy
 * cascade. */
const navListVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};
const navItemVariants = {
  hidden: { opacity: 0, x: 15 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.25 } },
};

/**
 * The mobile/tablet navigation drawer — `MobileSidebar` (components/ui/
 * sidebar.tsx) as the shell, this file as the actual accordion/nested-
 * navigation content, both reading `navigation` (components/layout/
 * navigation-data.ts), the same source `DropdownNavigation` reads on
 * desktop.
 *
 * Typography scale, tightened for a compact panel rather than a
 * full-screen app menu:
 *   primary item   17px / 18px (`md`) / medium
 *   sub-item       14px / regular, `text-accent` + medium when it's the
 *                  current route (`usePathname`)
 * Sub-items get a shared `SubmenuLink`: pointer hover shifts the label
 * right 4px and reveals a small arrow (CSS `group-hover`, not per-item
 * Framer Motion state — there can be a dozen-plus of these, and a CSS
 * transition costs nothing extra per item); touch gets `active:` scale/
 * background feedback instead, since hover doesn't exist there.
 *
 * One state (`expandedId`) still drives both interaction patterns
 * rather than two competing ones: for a short menu it expands that
 * item's content in place, in normal accordion fashion; for Solutions
 * specifically (`isNestedMenu` — more than 6 links across its three
 * groups) the same state instead swaps the whole panel to a dedicated
 * "← Solutions" screen. Root and drill views are two `AnimatePresence`
 * array children with their own keys, not a `<React.Fragment>` around
 * them.
 */
export function MobileNavigation({
  open,
  onOpenChange,
  panelId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  panelId?: string;
}) {
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const [expandedId, setExpandedId] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (open) setExpandedId(null);
  }, [open]);

  const expandedItem = navigation.find((item) => item.id === expandedId) ?? null;
  const isDrilled = expandedItem ? isNestedMenu(expandedItem) : false;

  const close = () => onOpenChange(false);

  return (
    <MobileSidebar
      open={open}
      onOpenChange={onOpenChange}
      panelId={panelId}
      header={
        <div className="mx-auto flex h-[56px] w-full max-w-xl shrink-0 items-center justify-between border-b border-line px-6 md:px-8">
          <Wordmark className="[&_img]:h-[28px]" />
          <button
            type="button"
            onClick={close}
            aria-label="Close navigation"
            className="inline-flex size-9 items-center justify-center rounded-[var(--radius-control)] border border-control-border bg-surface text-ink transition-colors hover:bg-surface-2 active:translate-y-[1px]"
          >
            <X size={17} strokeWidth={1.75} />
          </button>
        </div>
      }
      footer={
        <div className="mx-auto flex w-full max-w-xl flex-col gap-2.5 border-t border-line px-6 py-5 md:px-8">
          <a
            href="/#contact"
            onClick={close}
            className="flex h-[50px] w-full items-center justify-center rounded-2xl border border-control-border bg-surface text-[0.9375rem] font-semibold text-ink transition-colors duration-200 hover:border-ink hover:bg-surface-2"
          >
            Contact Us
          </a>

          <a
            href={NAV_CTA.href}
            target="_blank"
            rel="noreferrer"
            onClick={close}
            className="group flex h-[50px] w-full items-center justify-center gap-2 rounded-2xl bg-accent px-6 text-[0.9375rem] font-semibold text-accent-contrast shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)] transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-[0_12px_28px_-8px_rgba(0,0,0,0.4)] dark:text-white"
          >
            {NAV_CTA.label}
            <ArrowUpRight
              size={15}
              strokeWidth={2}
              className="shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-1"
            />
          </a>
        </div>
      }
    >
      {/* No `absolute` positioning on the two panels below: `mode="wait"`
          guarantees only one is ever mounted at a time, so each is free
          to sit in normal flow and contribute its own real height to
          this scrollable region — an absolutely-positioned pair would
          each be constrained to the viewport's height instead of their
          own (taller, for Solutions) content, clipping it. */}
      <AnimatePresence mode="wait" initial={false}>
        {isDrilled && expandedItem ? (
          <motion.div
            key={`drill-${expandedItem.id}`}
            initial={reduce ? false : { x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={reduce ? undefined : { x: "100%", opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            <button
              type="button"
              onClick={() => setExpandedId(null)}
              className="mx-auto flex w-full max-w-xl items-center gap-2 px-6 py-3.5 text-left text-sm font-medium text-muted transition-colors hover:text-ink md:px-8"
            >
              <ArrowLeft size={15} strokeWidth={2} aria-hidden="true" />
              {expandedItem.label}
            </button>

            <div className="mx-auto flex w-full max-w-xl flex-col gap-5 px-6 pb-8 md:px-8">
              {expandedItem.subMenus?.map((group, index) => (
                <div key={group.title ?? index}>
                  {group.title ? (
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                      {group.title}
                    </p>
                  ) : null}
                  <ul className="flex flex-col gap-2.5">
                    {group.items.map((item) => (
                      <li key={item.label}>
                        <SubmenuLink
                          href={item.href}
                          label={item.label}
                          onClick={close}
                          isActive={pathname === item.href}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="root"
            initial={reduce ? false : { x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={reduce ? undefined : { x: "-100%", opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            <nav className="mx-auto flex w-full max-w-xl flex-col px-6 pb-8 pt-1 md:px-8">
              <motion.ul
                variants={navListVariants}
                initial={reduce ? false : "hidden"}
                animate="visible"
                className="flex flex-col"
              >
                {navigation.map((item, index) => {
                  const nested = isNestedMenu(item);
                  const isExpanded = expandedId === item.id && !nested;
                  const panelIdForItem = `mobile-panel-${item.id}`;
                  const isLast = index === navigation.length - 1;

                  return (
                    <motion.li
                      key={item.id}
                      variants={navItemVariants}
                      className={cn(!isLast && "border-b border-line")}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedId((current) =>
                            nested ? item.id : current === item.id ? null : item.id,
                          )
                        }
                        aria-expanded={nested ? undefined : isExpanded}
                        aria-controls={nested ? undefined : panelIdForItem}
                        className="group flex min-h-[52px] w-full items-center justify-between py-3.5 text-left"
                      >
                        <span className="text-[17px] font-medium text-ink transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:text-accent md:text-[18px]">
                          {item.label}
                        </span>
                        {nested ? (
                          <ChevronRight
                            size={18}
                            strokeWidth={1.75}
                            className="shrink-0 text-muted transition-colors duration-200 group-hover:text-accent"
                          />
                        ) : (
                          <ChevronDown
                            size={18}
                            strokeWidth={1.75}
                            className={cn(
                              "shrink-0 text-muted transition-[transform,color] duration-200 group-hover:text-accent",
                              isExpanded && "rotate-180",
                            )}
                          />
                        )}
                      </button>

                      {!nested ? (
                        <AnimatePresence initial={false}>
                          {isExpanded ? (
                            <motion.div
                              id={panelIdForItem}
                              initial={reduce ? false : { height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={reduce ? undefined : { height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: EASE }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col gap-4 pb-4">
                                {item.subMenus?.map((group, index) => (
                                  <div key={group.title ?? index}>
                                    {group.title ? (
                                      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                                        {group.title}
                                      </p>
                                    ) : null}
                                    <ul className="flex flex-col gap-2.5">
                                      {group.items.map((link) => (
                                        <li key={link.label}>
                                          <SubmenuLink
                                            href={link.href}
                                            label={link.label}
                                            onClick={close}
                                            isActive={pathname === link.href}
                                          />
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      ) : null}
                    </motion.li>
                  );
                })}
              </motion.ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </MobileSidebar>
  );
}

/**
 * One sub-navigation link, shared by the in-place accordion and the
 * Solutions drill-down screen. Pointer hover: label shifts 4px right,
 * a small arrow fades/slides in from the left, text darkens toward
 * `--ink` — all CSS `group-hover`, ~200ms. Touch has no hover state, so
 * `active:` (a tap, not a pointer-over) gives a brief scale + background
 * instead. The current route gets the accent-orange "active" treatment
 * regardless of pointer/touch.
 */
function SubmenuLink({
  href,
  label,
  onClick,
  isActive,
}: {
  href: string;
  label: string;
  onClick: () => void;
  isActive: boolean;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "group -mx-3 flex min-h-[38px] items-center justify-between gap-2 rounded-[var(--radius-control)] px-3 py-1.5 text-sm transition-[background-color,transform] duration-200 active:scale-[0.98] active:bg-surface-2",
        isActive
          ? "font-medium text-accent"
          : "text-muted hover:translate-x-1 hover:text-ink",
      )}
    >
      <span>{label}</span>
      <ArrowRight
        size={13}
        strokeWidth={2}
        className={cn(
          "shrink-0 transition-all duration-200",
          isActive
            ? "text-accent opacity-100"
            : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
        )}
      />
    </a>
  );
}
