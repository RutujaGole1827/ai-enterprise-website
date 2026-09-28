"use client";

import { usePathname } from "next/navigation";

/** Routes that render the Contact section, so `#contact` resolves on them. */
const PAGES_WITH_CONTACT = new Set(["/"]);

/**
 * Where "contact" points from the current route: the on-page form when the
 * page has one, otherwise the home page's form. A bare `#contact` on a page
 * without the section is a dead link.
 */
export function useContactHref() {
  const pathname = usePathname();
  return PAGES_WITH_CONTACT.has(pathname) ? "#contact" : "/#contact";
}

/** For server components (the footer) that cannot read the pathname. */
export function ContactLink(props: React.ComponentPropsWithoutRef<"a">) {
  return <a {...props} href={useContactHref()} />;
}
