"use client";

import { SIGNAL_TYPES, signalItems, type SignalType } from "@/lib/insights-signal";
import { cn } from "@/lib/utils";

/**
 * Intelligence Stream navigation — five numbered streams in place of
 * ordinary tabs. Selecting one filters the grid below by content type;
 * selecting the active one again clears back to "all".
 */
export function IntelligenceStreams({
  active,
  onSelect,
}: {
  active: SignalType | "all";
  onSelect: (type: SignalType | "all") => void;
}) {
  const counts = SIGNAL_TYPES.reduce<Record<SignalType, number>>(
    (acc, s) => ({ ...acc, [s.id]: signalItems.filter((i) => i.type === s.id).length }),
    {} as Record<SignalType, number>,
  );

  return (
    <nav aria-label="Intelligence streams" className="border-b border-line">
      <div className="shell">
        <ul className="flex flex-wrap gap-1 py-2 sm:flex-nowrap sm:gap-0 sm:divide-x sm:divide-line">
          {SIGNAL_TYPES.map((stream, index) => {
            const isActive = active === stream.id;
            return (
              <li key={stream.id} className="flex-1 min-w-[9rem]">
                <button
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onSelect(isActive ? "all" : stream.id)}
                  className={cn(
                    "group flex w-full flex-col gap-1 px-4 py-5 text-left transition-colors duration-200",
                    isActive ? "bg-surface-2" : "hover:bg-surface-2/60",
                  )}
                >
                  <span className="flex items-baseline gap-2">
                    <span className="text-xs font-semibold text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "text-sm font-semibold tracking-[0.04em] transition-colors",
                        isActive ? "text-accent" : "text-ink",
                      )}
                    >
                      {stream.label.toUpperCase()}
                    </span>
                  </span>
                  <span className="text-xs text-muted">{stream.description}</span>
                  <span className="mt-1 flex items-center gap-2">
                    <span
                      className={cn(
                        "h-px flex-1 origin-left bg-accent transition-transform duration-300",
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50",
                      )}
                    />
                    <span
                      className={cn(
                        "text-xs font-medium tabular-nums",
                        isActive ? "text-ink" : "text-muted",
                      )}
                    >
                      {counts[stream.id]}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
