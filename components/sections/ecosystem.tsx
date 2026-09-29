import { partners } from "@/lib/content";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * Technology partners.
 *
 * This was a scrolling marquee while the list was a made-up sixteen. The real
 * list is four genuine alliances, and four logos in an endless scrolling band
 * would read as filler, so it is a plain row: each partner gets real size and
 * the section makes a claim it can support.
 *
 * The tiles are the navy squares from the live site, which sit correctly on
 * both the light surface and the dark one without a second copy.
 *
 * Mobile: two columns, then four from md up.
 */
export function Ecosystem() {
  return (
    <section
      id="ecosystem"
      className="section-y min-h-section border-b border-line bg-surface"
    >
      <div className="shell">
        <SectionHeading
          title="We build on what you already run"
          body="No proprietary middleware and no lock-in layer of our own. Your platform stays yours after the engagement closes."
          align="center"
          className="mx-auto items-center"
        />

        <ul className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4 lg:mt-16">
          {partners.map((partner) => (
            <li
              key={partner.name}
              className="flex flex-col items-center gap-4 text-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={partner.icon}
                alt=""
                aria-hidden="true"
                width={72}
                height={72}
                loading="lazy"
                decoding="async"
                className="size-16 lg:size-[4.5rem]"
              />
              <span className="text-[0.9375rem] font-medium leading-snug text-ink">
                {partner.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
