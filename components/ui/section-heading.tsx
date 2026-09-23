import { cn } from "@/lib/utils";

/**
 * Section header. Deliberately has no eyebrow slot: the page carries zero
 * uppercase micro-labels above headlines. Headline and body stack vertically
 * (no "big headline left, small paragraph right" split header).
 *
 * Static on purpose: a fade-up on every section header is the generic
 * default. The type does the work.
 */
export function SectionHeading({
  title,
  body,
  align = "start",
  className,
  id,
}: {
  title: string;
  body?: string;
  align?: "start" | "center";
  className?: string;
  id?: string;
}) {
  return (
    <header
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      <h2
        id={id}
        className="max-w-[18ch] text-3xl font-semibold tracking-[-0.03em] text-ink text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]"
      >
        {title}
      </h2>
      {body ? (
        <p className="max-w-[58ch] text-base leading-relaxed text-muted">
          {body}
        </p>
      ) : null}
    </header>
  );
}
