/**
 * Plain page heading — the earlier animated "Signal Field" network and
 * "LIVE SIGNAL" live-count badge were this rebuild's own invented
 * theming, not something the real exponentia.ai/insights page carries,
 * so they've been removed. Heading/subtitle reuse the copy already
 * approved for this page earlier in this project.
 */
export function InsightsHero() {
  return (
    <section className="section-y border-b border-line">
      <div className="shell">
        <div className="flex flex-col items-start gap-5">
          <h1 className="max-w-[20ch] text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-ink text-balance sm:text-5xl lg:text-[3.25rem]">
            Our Newest Insights
          </h1>
          <p className="max-w-[40ch] text-lg leading-relaxed text-muted">
            Discover fresh ideas and recent industry insights carefully
            chosen by our team of professionals.
          </p>
        </div>
      </div>
    </section>
  );
}
