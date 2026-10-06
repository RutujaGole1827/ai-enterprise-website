"use client";

import { InsightCard } from "@/components/insights/insight-card";
import type { SignalItem } from "@/lib/insights-signal";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 6;

/** Four-step asymmetric rhythm repeated down the grid: large/small, then
 * small/large, so no two consecutive rows read the same way. */
function spanFor(indexInPattern: number): { col: string; size: "lg" | "md" } {
  switch (indexInPattern % 4) {
    case 0:
      return { col: "lg:col-span-7", size: "lg" };
    case 1:
      return { col: "lg:col-span-5", size: "md" };
    case 2:
      return { col: "lg:col-span-5", size: "md" };
    default:
      return { col: "lg:col-span-7", size: "lg" };
  }
}

export function InsightGrid({
  items,
  visibleCount,
  onLoadMore,
}: {
  items: SignalItem[];
  visibleCount: number;
  onLoadMore: () => void;
}) {
  const visible = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  if (items.length === 0) {
    return (
      <div className="shell py-20 text-center">
        <p className="text-lg font-medium text-ink">No insights match these filters.</p>
        <p className="mt-2 text-sm text-muted">Try clearing a filter or searching a different term.</p>
      </div>
    );
  }

  return (
    <div className="shell">
      <ul className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        {visible.map((item, i) => {
          const { col, size } = spanFor(i);
          return (
            <li key={item.id} className={cn("col-span-1", col)}>
              <InsightCard item={item} size={size} />
            </li>
          );
        })}
      </ul>

      {hasMore ? (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={onLoadMore}
            className="inline-flex h-12 items-center rounded-full border border-control-border bg-surface px-7 text-sm font-semibold text-ink transition-colors duration-200 hover:border-line-strong hover:bg-surface-2"
          >
            Load more
          </button>
        </div>
      ) : null}
    </div>
  );
}

export { PAGE_SIZE };
