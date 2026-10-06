import {
  ArrowsClockwise,
  ChartLineUp,
  Compass,
  PuzzlePiece,
  Wrench,
} from "@phosphor-icons/react";

import {
  caseStudies,
  expertiseMenu,
  industries,
  insightsMenu,
  navLinks,
  partnersMenu,
  solutionsMenu,
  type NavMenuKey,
} from "@/lib/content";
import type { NavItem } from "@/components/ui/dorpdown-navigation";

const featuredCaseStudy = caseStudies.find((entry) => entry.featured) ?? caseStudies[0];

/** "Our Expertise" has no per-item image asset of its own (unlike
 * Solutions/Industries/Partners/Insights, each of which carries a real
 * downloaded brand icon) — the same icon-per-index pairing the old
 * mega-menu used, just as a generic fallback rather than a missing
 * icon. */
const EXPERTISE_ICONS = [Compass, PuzzlePiece, ArrowsClockwise, ChartLineUp, Wrench];

/**
 * The one navigation data source `DropdownNavigation` (desktop/tablet)
 * and the mobile sheet both read — see lib/content.ts for the actual
 * copy; this only reshapes it into `NavItem[]`, it doesn't duplicate
 * it. Solutions' three headings become three named sub-menu groups
 * (rendered as columns on desktop, as labelled sections on mobile);
 * every other menu is flat, so it becomes one unnamed group.
 */
export const navigation: NavItem[] = navLinks.map((link, index) => {
  const id = index + 1;

  switch (link.menu) {
    case "expertise":
      return {
        id,
        label: link.label,
        subMenus: [
          {
            items: expertiseMenu.map((item, i) => ({
              label: item.label,
              href: item.href,
              description: item.description,
              icon: EXPERTISE_ICONS[i % EXPERTISE_ICONS.length],
            })),
          },
        ],
      };

    case "solutions":
      return {
        id,
        label: link.label,
        subMenus: solutionsMenu.map((column) => ({
          title: column.heading,
          items: column.links.map((item) => ({
            label: item.label,
            href: item.href,
            description: item.description,
            iconSrc: item.icon,
          })),
        })),
        viewAllHref: link.href,
        viewAllLabel: "View all solutions",
        featured: {
          label: featuredCaseStudy.client,
          title: featuredCaseStudy.title,
          href: `/work/${featuredCaseStudy.id}`,
          image: featuredCaseStudy.image,
        },
      };

    case "industries":
      return {
        id,
        label: link.label,
        subMenus: [
          {
            items: industries.map((item) => ({
              label: item.name,
              href: item.href,
              description: item.body,
              iconSrc: item.icon,
            })),
          },
        ],
        viewAllHref: link.href,
        viewAllLabel: "View all industries",
      };

    case "partners":
      return {
        id,
        label: link.label,
        subMenus: [
          {
            items: partnersMenu.map((item) => ({
              label: item.name,
              href: item.href,
              description: item.description,
              iconSrc: item.icon,
            })),
          },
        ],
      };

    case "insights":
      return {
        id,
        label: link.label,
        subMenus: [
          {
            items: insightsMenu.map((item) => ({
              label: item.label,
              href: item.href,
              description: item.description,
              iconSrc: item.icon,
            })),
          },
        ],
        viewAllHref: link.href,
        viewAllLabel: "View all insights",
      };

    default: {
      // Exhaustiveness guard: every NavMenuKey is handled above.
      const exhaustive: never = link.menu;
      throw new Error(`Unhandled nav menu key: ${exhaustive as NavMenuKey}`);
    }
  }
});

/** Maps a route's owning menu (see site-header.tsx's
 * `menuKeyForPathname`) to that menu's `id` in `navigation`, for the
 * active-section indicator. */
export function idForMenuKey(key: NavMenuKey | null): number | null {
  if (!key) return null;
  const index = navLinks.findIndex((link) => link.menu === key);
  return index === -1 ? null : index + 1;
}

/** A menu drills into its own full sub-screen on mobile instead of
 * expanding in place once it holds more than this many links combined
 * — Solutions (14, across three groups) is the one menu that crosses
 * it today. */
const NESTED_THRESHOLD = 6;

export function isNestedMenu(item: NavItem): boolean {
  const total = item.subMenus?.reduce((sum, group) => sum + group.items.length, 0) ?? 0;
  return total > NESTED_THRESHOLD;
}
