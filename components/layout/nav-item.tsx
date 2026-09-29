"use client";

import { CaretDown } from "@phosphor-icons/react";

import type { NavLink } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * One desktop mega-menu trigger. A plain accent-colour text swap on
 * hover/open (no background fill — matches this header's flat, bordered-
 * bar style rather than a pill-button treatment), plus a small accent
 * underline for whichever section the visitor is currently on
 * (independent of open/hover state) and a caret that flips 180° when its
 * panel is open.
 */
export function NavItem({
  link,
  isOpen,
  isActive,
  reduceMotion,
  triggerId,
  panelId,
  triggerRef,
  onMouseEnter,
  onFocus,
  onClick,
}: {
  link: NavLink;
  isOpen: boolean;
  isActive: boolean;
  reduceMotion: boolean | null;
  triggerId: string;
  panelId: string;
  triggerRef: (node: HTMLButtonElement | null) => void;
  onMouseEnter: () => void;
  onFocus: () => void;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      id={triggerId}
      ref={triggerRef}
      aria-expanded={isOpen}
      aria-controls={panelId}
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
      onClick={onClick}
      className={cn(
        "group relative inline-flex h-9 items-center gap-1.5 rounded-lg px-3 py-2",
        "text-sm font-medium transition-colors duration-200",
        isOpen || isActive ? "text-accent" : "text-ink/85 hover:text-accent",
      )}
    >
      {link.label}
      <CaretDown
        size={13}
        weight="bold"
        className={cn(
          "transition-transform duration-300",
          isOpen && !reduceMotion && "rotate-180",
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-x-3 -bottom-px h-px rounded-full bg-accent transition-transform duration-200",
          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
        )}
      />
    </button>
  );
}
