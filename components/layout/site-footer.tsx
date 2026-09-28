import Image from "next/image";
import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  XLogo,
  YoutubeLogo,
} from "@phosphor-icons/react/ssr";

import {
  brand,
  certifications,
  footerColumns,
  footerIntro,
  footerLegal,
  socialLinks,
  type SocialLink,
} from "@/lib/content";
import { ContactLink } from "@/components/layout/contact-link";
import { Wordmark } from "@/components/ui/wordmark";

const SOCIAL_ICONS: Record<SocialLink["icon"], typeof FacebookLogo> = {
  facebook: FacebookLogo,
  x: XLogo,
  linkedin: LinkedinLogo,
  youtube: YoutubeLogo,
  instagram: InstagramLogo,
};

/** Soft accent glow behind a column heading, referring to 21st.dev's
 * "glowing footer" text treatment: a colour-mixed text-shadow rather than a
 * Tailwind class, since the arbitrary-value syntax can't cleanly hold a
 * `color-mix()` call's own commas. Kept subtle enough that dark ink on a
 * light surface still reads as the strongest thing on the line, not the
 * glow around it. */
const HEADING_GLOW = {
  textShadow: "0 0 16px color-mix(in oklab, var(--accent) 55%, transparent)",
} as const;

/** Every footer link (column links, the contact link, legal links) hovers
 * to this same accent color — matching the one hover treatment this footer
 * already had, on the `hello@exponentia.ai` link, rather than each group
 * inventing its own. */
const LINK_HOVER = "text-muted transition-colors duration-200 hover:text-accent";

/**
 * Site footer. Column headings and every link label are the live
 * exponentia.ai footer's own content — including its two columns both
 * literally headed "Industries" — with a rounded-top surface panel
 * (matching the project's own `--radius-surface`, not a new shape) and
 * soft ambient accent-orange glows behind it for depth (stronger in dark
 * mode, where a darker surface needs more intensity to read at the same
 * visual weight). No glass/blur treatment — this project's existing
 * sections already avoid heavy glassmorphism, and a footer read
 * densely-packed with real link text is a worse place than most to add
 * one. No build strings, no locale or time strips, no version stamps.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden rounded-t-[var(--radius-surface)] border-t border-line bg-surface">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 -top-16 -z-10 size-72 rounded-full bg-accent/20 blur-3xl dark:bg-accent/35"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 right-0 -z-10 size-80 rounded-full bg-accent/20 blur-3xl dark:bg-accent/35"
      />
      <div className="shell relative py-16 md:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          <div className="max-w-[34ch] lg:w-80 lg:shrink-0">
            <Wordmark />
            <h2 className="mt-6 text-base font-semibold text-ink">
              {footerIntro.heading}
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
              {footerIntro.body}
            </p>
            <a
              href={`mailto:${brand.email}`}
              className="mt-6 inline-block text-[0.9375rem] font-medium text-ink underline-offset-4 hover:text-accent hover:underline"
            >
              {brand.email}
            </a>

            <ul className="mt-6 flex flex-wrap gap-2.5">
              {socialLinks.map((social) => {
                const Icon = SOCIAL_ICONS[social.icon];
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="inline-flex size-9 items-center justify-center rounded-[10px] border border-line bg-canvas text-ink transition-colors duration-200 hover:border-accent hover:text-accent"
                    >
                      <Icon size={17} weight="fill" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>

            <ul className="mt-6 flex flex-wrap gap-3">
              {certifications.map((cert) => (
                <li key={cert.label}>
                  <Image
                    src={cert.src}
                    alt={cert.label}
                    width={cert.width}
                    height={cert.height}
                    className="h-16 w-auto"
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grow grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {footerColumns.map((column, index) => (
              <nav key={`${column.heading}-${index}`} aria-label={column.heading}>
                <h2
                  style={HEADING_GLOW}
                  className="text-sm font-semibold text-ink"
                >
                  {column.heading}
                </h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.href === "#contact" ? (
                        <ContactLink className={`text-sm leading-snug ${LINK_HOVER}`}>
                          {link.label}
                        </ContactLink>
                      ) : (
                        <a
                          href={link.href}
                          className={`text-sm leading-snug ${LINK_HOVER}`}
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            {year} {brand.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {footerLegal.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={`text-sm ${LINK_HOVER}`}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
