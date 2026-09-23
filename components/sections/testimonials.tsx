import { brandSvg } from "@/lib/brand-svg";
import { testimonials, type Testimonial } from "@/lib/content";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * Quote layout. One lead quote set in display type on the page ground, the
 * supporting quotes in a column beside it, separated by a single hairline.
 *
 * No cards: spacing and type size carry the hierarchy. No avatars, because a
 * generic placeholder face is worse than none. Every quote is three lines or
 * fewer and attributed with name, role and company.
 *
 * Defaults to the home page quotes; other pages pass their own `items`, and a
 * `title` when the section needs a visible heading.
 *
 * Mobile: the two columns stack, lead quote first.
 */
export function Testimonials({
  items = testimonials,
  title,
}: {
  items?: Testimonial[];
  title?: string;
}) {
  const [lead, ...supporting] = items;

  return (
    <section
      className="section-y border-b border-line"
      aria-label={title ? undefined : "Client testimonials"}
      aria-labelledby={title ? "testimonials-heading" : undefined}
    >
      <div className="shell">
        {title ? (
          <SectionHeading
            id="testimonials-heading"
            title={title}
            className="mb-12 lg:mb-16"
          />
        ) : null}

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <figure className="flex h-full flex-col justify-between gap-8">
              {lead.mark ? <Mark name={lead.mark} /> : null}
              <blockquote className="max-w-[24ch] text-2xl font-medium leading-[1.3] tracking-[-0.025em] text-ink text-balance sm:text-3xl lg:text-[2.125rem]">
                &ldquo;{lead.quote}&rdquo;
              </blockquote>
              <figcaption className="text-[0.9375rem] leading-relaxed">
                <span className="font-medium text-ink">{lead.name}</span>
                <span className="block text-muted">{attribution(lead)}</span>
              </figcaption>
            </figure>
          </div>

          <div className="flex flex-col gap-10 lg:col-span-5">
            {supporting.map((entry, index) => (
              <div
                key={entry.id}
                className={index > 0 ? "border-t border-line pt-10" : undefined}
              >
                <figure className="flex flex-col gap-5">
                  {entry.mark ? <Mark name={entry.mark} /> : null}
                  <blockquote className="max-w-[42ch] text-lg leading-relaxed text-ink">
                    &ldquo;{entry.quote}&rdquo;
                  </blockquote>
                  <figcaption className="text-sm leading-relaxed">
                    <span className="font-medium text-ink">{entry.name}</span>
                    <span className="block text-muted">
                      {attribution(entry)}
                    </span>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function attribution(entry: Testimonial) {
  return entry.company ? `${entry.role}, ${entry.company}` : entry.role;
}

/** Decorative: the organisation is already named in the attribution. */
function Mark({ name }: { name: NonNullable<Testimonial["mark"]> }) {
  return (
    <span
      aria-hidden="true"
      className="block text-muted [&>svg]:h-12 [&>svg]:w-auto"
      dangerouslySetInnerHTML={{ __html: brandSvg[name] }}
    />
  );
}
