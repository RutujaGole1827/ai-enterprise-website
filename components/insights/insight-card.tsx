import Image from "next/image";
import Link from "next/link";
import { ArrowRight, DownloadSimple, Play } from "@phosphor-icons/react/ssr";

import type { SignalItem } from "@/lib/insights-signal";
import { cn } from "@/lib/utils";

const TYPE_LABEL: Record<SignalItem["type"], string> = {
  story: "CLIENT SUCCESS STORY",
  blog: "BLOG",
  webinar: "WEBINAR",
  report: "REPORT",
  news: "NEWS & PR",
};

/**
 * One card, five internal layouts switched on `item.type` — the "impact
 * card / editorial card / video card / report card / news card" variants
 * from the brief, kept as one component so the grid can mix sizes freely.
 * Only story and blog entries carry a verified real destination; the
 * others render as informational (no fabricated link).
 */
export function InsightCard({
  item,
  size = "md",
}: {
  item: SignalItem;
  size?: "lg" | "md" | "sm";
}) {
  const isLarge = size === "lg";
  const linkable = Boolean(item.href);

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-surface)] border border-line bg-surface transition-colors duration-300",
        linkable && "hover:border-line-strong",
      )}
    >
      {item.type === "story" ? (
        <ImpactBody item={item} large={isLarge} />
      ) : item.type === "webinar" ? (
        <VideoBody item={item} large={isLarge} />
      ) : item.type === "report" ? (
        <ReportBody item={item} />
      ) : (
        <EditorialBody item={item} large={isLarge} />
      )}

      {linkable ? (
        <Link
          href={item.href!}
          target={item.href!.startsWith("http") ? "_blank" : undefined}
          rel={item.href!.startsWith("http") ? "noopener noreferrer" : undefined}
          className="absolute inset-0"
          aria-label={item.title}
        />
      ) : null}
    </article>
  );
}

function Meta({ item }: { item: SignalItem }) {
  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold tracking-[0.06em] text-muted">
      <span className="text-accent">{TYPE_LABEL[item.type]}</span>
      {item.industry ? <span>{item.industry.toUpperCase()}</span> : null}
    </p>
  );
}

function ImpactBody({ item, large }: { item: SignalItem; large: boolean }) {
  return (
    <div className="flex flex-1 flex-col gap-4 p-6 lg:p-7">
      <Meta item={item} />
      {item.metric ? (
        <div className="flex items-baseline gap-2">
          <span className={cn("font-bold tracking-[-0.02em] text-ink", large ? "text-5xl" : "text-4xl")}>
            {item.metric.value}
          </span>
          <span className="max-w-[18ch] text-xs font-semibold uppercase tracking-[0.06em] text-muted">
            {item.metric.label}
          </span>
        </div>
      ) : null}
      <h3
        className={cn(
          "font-semibold leading-snug tracking-[-0.015em] text-ink text-pretty transition-colors group-hover:text-accent",
          large ? "text-xl lg:text-2xl" : "text-lg",
        )}
      >
        {item.title}
      </h3>
      <p className="max-w-[48ch] text-[0.9375rem] leading-relaxed text-muted">
        {item.description}
      </p>
      {item.href ? (
        <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-ink">
          Explore impact
          <ArrowRight
            size={14}
            weight="bold"
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </span>
      ) : null}
    </div>
  );
}

function EditorialBody({ item, large }: { item: SignalItem; large: boolean }) {
  return (
    <>
      {item.image ? (
        <div className={cn("relative w-full overflow-hidden", large ? "aspect-[16/9]" : "aspect-[16/10]")}>
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes={large ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 1024px) 100vw, 32vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col gap-3 p-6 lg:p-7">
        <Meta item={item} />
        <h3
          className={cn(
            "font-semibold leading-snug tracking-[-0.015em] text-ink text-pretty transition-colors group-hover:text-accent",
            large ? "text-xl lg:text-2xl" : "text-lg",
          )}
        >
          {item.title}
        </h3>
        <p className="line-clamp-2 max-w-[48ch] text-[0.9375rem] leading-relaxed text-muted">
          {item.description}
        </p>
        <p className="mt-auto flex items-center gap-1.5 pt-2 text-sm font-semibold text-ink">
          {item.date}
          <span className="mx-1 text-muted">·</span>
          Read article
          <ArrowRight
            size={14}
            weight="bold"
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </p>
      </div>
    </>
  );
}

function VideoBody({ item, large }: { item: SignalItem; large: boolean }) {
  return (
    <>
      <div
        className={cn(
          "relative flex w-full items-center justify-center overflow-hidden bg-surface-2",
          large ? "aspect-[16/9]" : "aspect-[16/10]",
        )}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(var(--ink) 1px, transparent 1px), linear-gradient(90deg, var(--ink) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <span className="relative flex size-14 items-center justify-center rounded-full border border-control-border bg-surface shadow-[var(--shadow-card)] transition-transform duration-200 group-hover:scale-105">
          <Play size={20} weight="fill" className="translate-x-0.5 text-ink" aria-hidden="true" />
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6 lg:p-7">
        <Meta item={item} />
        <h3 className="text-lg font-semibold leading-snug tracking-[-0.015em] text-ink text-pretty">
          {item.title}
        </h3>
        <p className="text-sm text-muted">{item.date}</p>
      </div>
    </>
  );
}

function ReportBody({ item }: { item: SignalItem }) {
  return (
    <div className="flex flex-1 flex-col gap-4 p-6 lg:p-7">
      <Meta item={item} />
      <h3 className="text-lg font-semibold leading-snug tracking-[-0.015em] text-ink text-pretty">
        {item.title}
      </h3>
      <p className="text-[0.9375rem] leading-relaxed text-muted">{item.description}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-ink">
        {item.date}
        <DownloadSimple size={14} weight="bold" aria-hidden="true" className="ml-1" />
      </span>
    </div>
  );
}
