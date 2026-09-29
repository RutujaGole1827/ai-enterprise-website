"use client";

import { navLinks, type NavMenuKey } from "@/lib/content";
import { NavItem } from "@/components/layout/nav-item";

/**
 * The full five-item nav, `xl` (1280px) and up only — the one width
 * tier with room for every label plus the full CTA without crowding.
 * Below `xl`, only the logo and the menu button remain in the bar; see
 * site-header.tsx for why the breakpoint sits at `xl` rather than `lg`.
 */
export function DesktopNav({
  openMenu,
  activeMenu,
  reduceMotion,
  triggerRefs,
  onTriggerEnter,
  onTriggerFocus,
  onTriggerClick,
}: {
  openMenu: NavMenuKey | null;
  activeMenu: NavMenuKey | null;
  reduceMotion: boolean | null;
  triggerRefs: React.MutableRefObject<Record<string, HTMLButtonElement | null>>;
  onTriggerEnter: (menu: NavMenuKey) => void;
  onTriggerFocus: (menu: NavMenuKey) => void;
  onTriggerClick: (menu: NavMenuKey) => void;
}) {
  return (
    <nav aria-label="Primary" className="relative hidden xl:block">
      <ul className="flex items-center gap-1">
        {navLinks.map((link) => (
          <li key={link.label}>
            <NavItem
              link={link}
              isOpen={openMenu === link.menu}
              isActive={activeMenu === link.menu}
              reduceMotion={reduceMotion}
              triggerId={`mega-trigger-${link.menu}`}
              panelId={`mega-${link.menu}`}
              triggerRef={(node) => {
                triggerRefs.current[link.menu] = node;
              }}
              onMouseEnter={() => onTriggerEnter(link.menu)}
              onFocus={() => onTriggerFocus(link.menu)}
              onClick={() => onTriggerClick(link.menu)}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
