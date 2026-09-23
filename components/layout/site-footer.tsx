import { brand, footerColumns, footerLegal } from "@/lib/content";
import { ContactLink } from "@/components/layout/contact-link";
import { Wordmark } from "@/components/ui/wordmark";

/**
 * Site footer. Link columns, one contact address, legal row.
 * No build strings, no locale or time strips, no version stamps.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-canvas">
      <div className="shell py-16 md:py-20">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-12 lg:gap-x-10">
          <div className="col-span-2 lg:col-span-4">
            <Wordmark />
            <p className="mt-5 max-w-[34ch] text-[0.9375rem] leading-relaxed text-muted">
              {brand.descriptor}. We build the platform, prove one decision,
              then hand the keys over.
            </p>
            <a
              href={`mailto:${brand.email}`}
              className="mt-6 inline-block text-[0.9375rem] font-medium text-ink underline-offset-4 hover:text-accent hover:underline"
            >
              {brand.email}
            </a>
          </div>

          {footerColumns.map((column) => (
            <nav
              key={column.heading}
              aria-label={column.heading}
              className="lg:col-span-2"
            >
              <h2 className="text-sm font-semibold text-ink">
                {column.heading}
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.href === "#contact" ? (
                      <ContactLink className="text-sm leading-snug text-muted transition-colors duration-200 hover:text-ink">
                        {link.label}
                      </ContactLink>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm leading-snug text-muted transition-colors duration-200 hover:text-ink"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 lg:col-span-2">
            <h2 className="text-sm font-semibold text-ink">Offices</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {brand.offices.map((office) => (
                <li key={office.city} className="text-sm leading-snug">
                  <span className="block text-ink">{office.city}</span>
                  <span className="block text-muted">{office.line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            {year} {brand.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {footerLegal.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-muted transition-colors duration-200 hover:text-ink"
                >
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
