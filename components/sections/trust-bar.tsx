import { clients } from "@/lib/content";
import { brandSvg } from "@/lib/brand-svg";
import { FloatingDock, type DockItem } from "@/components/ui/floating-dock";

/**
 * Trusted-by client wall. Sits directly UNDER the hero, never inside it.
 *
 * Every mark is real: the full "Our Clients" list from the live exponentia.ai
 * homepage marquee (lib/content.ts `clients`), not a curated highlight reel,
 * so the section makes the same claim the live site does.
 *
 * The interaction is the Aceternity/21st.dev floating-dock pattern
 * (components/ui/floating-dock.tsx), riding a continuous marquee: every mark
 * stays on screen and scrolling rather than sitting behind a "view all"
 * toggle, and hovering or focusing one pauses the loop, magnifies it toward
 * the pointer and shows its name as a tooltip.
 */
export function TrustBar() {
  const items: DockItem[] = clients.map((client) => ({
    name: client.name,
    // Raw data only: FloatingDock renders each mark itself, at every mount
    // site it needs one (see components/ui/floating-dock.tsx and BrandMark),
    // so a mark's ids can be scoped fresh per mount instead of the same
    // rendered markup being duplicated verbatim into the page more than
    // once.
    logo:
      "mark" in client
        ? { kind: "svg", svg: brandSvg[client.mark] }
        : {
            kind: "image",
            src: client.image.src,
            width: client.image.width,
            height: client.image.height,
          },
  }));

  return (
    <section
      aria-label="Organisations we work with"
      className="min-h-section border-b border-line bg-canvas py-12 md:py-14"
    >
      <div className="shell">
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-lg font-semibold tracking-[-0.01em] text-ink sm:text-xl">
            Trusted by leading enterprises
          </h2>
          <p className="max-w-[52ch] text-sm leading-relaxed text-muted">
            Trusted by organisations across industries to turn data and AI into
            measurable business impact.
          </p>
        </div>

        <FloatingDock items={items} className="mt-8 lg:mt-10" />
      </div>
    </section>
  );
}
