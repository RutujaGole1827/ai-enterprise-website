"use client";

import * as React from "react";
import Link, { type LinkProps } from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";

import { Z } from "@/lib/z-index";
import { cn } from "@/lib/utils";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** A premium, non-bouncy ease — the whole drawer system shares these two
 * variant objects rather than scattering transition values across the
 * component. */
const DRAWER_EASE = [0.22, 1, 0.36, 1] as const;

export const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const drawerVariants = {
  hidden: { x: "100%", opacity: 0.8 },
  visible: { x: 0, opacity: 1 },
};

type SidebarContextValue = { open: boolean; setOpen: (open: boolean) => void };
const SidebarContext = React.createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used inside a <Sidebar>.");
  return context;
}

/**
 * The supplied component's `Sidebar`/`SidebarProvider`/`SidebarBody`
 * API, adapted for a navbar's mobile/tablet drawer rather than a
 * permanent dashboard rail: the desktop half of the original component
 * (a hover-to-expand side rail) has no equivalent here — this project's
 * desktop nav is `DropdownNavigation`, a horizontal bar — so
 * `SidebarBody` renders only `MobileSidebar`. The demo's own content
 * ("Acet Labs", Dashboard/Profile/Settings/Logout, an avatar) is gone;
 * what's inside is entirely up to the caller, same as any other layout
 * primitive.
 */
export function Sidebar({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <SidebarContext.Provider value={{ open, setOpen: onOpenChange }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function SidebarProvider({
  children,
}: {
  children: (context: SidebarContextValue) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children({ open, setOpen })}
    </SidebarContext.Provider>
  );
}

/** Only ever renders the mobile/tablet sheet — see the note on
 * `Sidebar` above for why there's no desktop rail here. */
export function SidebarBody(props: React.ComponentProps<typeof MobileSidebar>) {
  return <MobileSidebar {...props} />;
}

/**
 * The supplied component left `props?: LinkProps` declared but then
 * spread `{...props}` onto the element — `LinkProps` doesn't carry the
 * DOM attributes (`className`, `onClick`, ...) actually being passed
 * that way, so this never typechecked correctly. Fixed by extending
 * `Link`'s own real prop type directly (minus `href`, which comes from
 * `link.href` instead) rather than a separate, narrower `LinkProps`
 * slice.
 */
export type SidebarLinkItem = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export type SidebarLinkProps = {
  link: SidebarLinkItem;
  className?: string;
} & Omit<React.ComponentProps<typeof Link>, "href">;

export function SidebarLink({ link, className, ...props }: SidebarLinkProps) {
  return (
    <Link
      href={link.href}
      className={cn(
        "flex items-center gap-3 rounded-[var(--radius-control)] px-3 py-3 text-[0.9375rem] font-medium text-ink transition-colors duration-200 hover:bg-surface-2",
        className,
      )}
      {...props}
    >
      {link.icon}
      <span>{link.label}</span>
    </Link>
  );
}

/**
 * The mobile/tablet navigation drawer: a partial-width panel pinned to
 * the right edge (`fixed inset-y-0 right-0`, not `inset-0`), not a
 * full-screen sheet — the page stays visible behind a dimmed backdrop,
 * so opening the menu doesn't feel like leaving the page. Width is
 * viewport-relative with a cap, not a single fixed number: ~88vw (very
 * small phones) → ~82vw (`min-[380px]`) → ~45vw, max 560px (`md`/tablet
 * and up, still below the `xl` breakpoint where the desktop nav takes
 * over and this drawer stops mounting at all) — a compact floating
 * panel rather than a full-width menu. `min-h-[100dvh]` backs
 * up the `inset-y-0` height for browsers where that isn't automatic.
 *
 * `header`/`footer` render outside the scrollable region (the sheet's
 * own logo/close row, and the CTA respectively); `children` is the
 * scrollable middle. Body scroll is locked while open and restored on
 * close; focus moves in on open, is trapped inside via Tab/Shift+Tab,
 * and returns to whatever triggered `onOpenChange(false)` — the caller
 * owns that ref, same as it owns the open state.
 *
 * Animation reads off the shared `backdropVariants`/`drawerVariants`
 * above rather than one-off transition objects; the actual staggered
 * reveal of the nav items themselves lives in the caller
 * (components/layout/mobile-navigation.tsx), since this shell doesn't
 * know what its `children` are.
 */
export function MobileSidebar({
  open,
  onOpenChange,
  header,
  footer,
  children,
  panelId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  panelId?: string;
}) {
  const reduce = useReducedMotion();
  const panelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
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
  }, [open, onOpenChange]);

  return (
    <AnimatePresence>
      {open
        ? [
            <motion.div
              key="backdrop"
              aria-hidden="true"
              onClick={() => onOpenChange(false)}
              variants={backdropVariants}
              initial={reduce ? false : "hidden"}
              animate="visible"
              exit={reduce ? undefined : "hidden"}
              transition={{ duration: 0.3 }}
              style={{ zIndex: Z.mobileDrawer, background: "rgba(10,15,30,0.18)" }}
              className="fixed inset-0"
            />,
            <motion.div
              key="panel"
              id={panelId}
              ref={panelRef}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              onClick={(event) => event.stopPropagation()}
              style={{ zIndex: Z.mobileDrawer }}
              variants={drawerVariants}
              initial={reduce ? false : "hidden"}
              animate="visible"
              exit={reduce ? undefined : "hidden"}
              transition={{ duration: 0.35, ease: DRAWER_EASE }}
              className="fixed inset-y-0 right-0 flex w-[88vw] max-w-[420px] min-h-[100dvh] flex-col overflow-hidden border-l border-line bg-canvas shadow-[-12px_0_40px_rgba(0,0,0,0.08)] min-[380px]:w-[82vw] md:w-[45vw] md:max-w-[560px]"
            >
              {header}
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]">
                {children}
              </div>
              {footer}
            </motion.div>,
          ]
        : null}
    </AnimatePresence>
  );
}

/** Hamburger that morphs into an X (lucide `Menu`/`X` crossfaded with a
 * slight rotation and scale, ~220ms) rather than swapping icons
 * abruptly. */
export const MenuButton = React.forwardRef<
  HTMLButtonElement,
  {
    open: boolean;
    onClick: () => void;
    className?: string;
    "aria-controls"?: string;
  }
>(function MenuButton(
  { open, onClick, className, "aria-controls": ariaControls },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-label={open ? "Close navigation" : "Open navigation"}
      aria-expanded={open}
      aria-controls={ariaControls}
      className={cn(
        "relative inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-line text-ink active:translate-y-[1px]",
        className,
      )}
    >
      <span className="relative flex size-[18px] items-center justify-center">
        <Menu
          size={18}
          strokeWidth={1.75}
          className={cn(
            "absolute transition-[opacity,transform] duration-200 ease-out",
            open ? "rotate-45 opacity-0" : "rotate-0 opacity-100",
          )}
        />
        <X
          size={18}
          strokeWidth={1.75}
          className={cn(
            "absolute transition-[opacity,transform] duration-200 ease-out",
            open ? "rotate-0 opacity-100" : "-rotate-45 opacity-0",
          )}
        />
      </span>
    </button>
  );
});
