import { CTA_PRIMARY } from "@/lib/content";
import { Button } from "@/components/ui/button";

/**
 * Closing statement, set as a brand colour block.
 *
 * This is the page's ONE deliberate departure from the surrounding ground: a
 * full-bleed panel in the brand navy, used once, at the moment the page asks
 * for the conversion. Every other section stays on the page theme.
 *
 * It is the same navy in both themes, which means it reads as a strong block
 * against the light canvas and as a deeper, quieter panel against the dark
 * one. Copy is --on-navy at 15.3:1; the button keeps the brand orange it has
 * everywhere else, at 5.8:1 against the navy.
 *
 * Centred on purpose: here the message is the whole composition. The copy
 * defaults to the home page's; other pages pass their own.
 */
export function CtaBand({
  title = "Start with the diagnosis, not the platform",
  body = "Four weeks, a costed backlog and a clear view of what your data can support. If the answer is that you do not need us yet, we will say so.",
  cta = { label: CTA_PRIMARY, href: "#contact" },
}: {
  title?: string;
  body?: string;
  cta?: { label: string; href: string };
}) {
  return (
    <section className="border-b border-line bg-canvas">
      <div className="shell py-6 md:py-10">
        <div className="overflow-hidden rounded-[var(--radius-surface)] bg-brand-navy bg-[radial-gradient(110%_120%_at_85%_0%,var(--brand-navy)_0%,var(--brand-navy-deep)_70%)]">
          <div className="mx-auto flex max-w-[46rem] flex-col items-center gap-6 px-6 py-20 text-center md:py-28">
            <h2 className="max-w-[20ch] text-3xl font-semibold tracking-[-0.03em] text-on-navy text-balance sm:text-4xl lg:text-[2.875rem] lg:leading-[1.06]">
              {title}
            </h2>
            <p className="max-w-[54ch] text-lg leading-relaxed text-on-navy-muted">
              {body}
            </p>
            <Button asChild size="lg" className="mt-2">
              <a href={cta.href}>{cta.label}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
