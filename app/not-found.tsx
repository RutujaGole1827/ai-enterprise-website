import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="section-y min-h-section">
      <div className="shell flex flex-col items-start gap-5">
        <h1 className="text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl">
          That page is not here
        </h1>
        <p className="max-w-[48ch] text-base leading-relaxed text-muted">
          The link may be out of date, or the page may have moved. Everything
          else is one click away.
        </p>
        <Button asChild size="lg" variant="secondary" className="mt-2">
          <Link href="/">Back to the homepage</Link>
        </Button>
      </div>
    </section>
  );
}
