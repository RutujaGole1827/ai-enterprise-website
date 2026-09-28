/**
 * Z-INDEX SCALE.
 * The only permitted stacking values in the project. Do not sprinkle
 * arbitrary `z-10` / `z-50` utilities; import from here instead.
 */
export const Z = {
  base: 0,
  raised: 1,
  stickyNav: 40,
  megaMenu: 45,
  mobileDrawer: 50,
  skipLink: 60,
  pageLoader: 70,
} as const;
