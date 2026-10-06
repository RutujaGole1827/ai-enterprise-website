"use client";

import * as React from "react";
import { MagnifyingGlass, X } from "@phosphor-icons/react";

import { FilterDropdown } from "@/components/insights/filter-dropdown";
import {
  INDUSTRIES,
  PRODUCTS,
  SERVICES,
  SIGNAL_TYPES,
  AVAILABLE_YEARS,
  type SignalFilters,
} from "@/lib/insights-signal";
import { cn } from "@/lib/utils";

const SUGGESTED_SEARCHES = [
  "Agentic AI",
  "Manufacturing",
  "Data modernization",
  "GenAI",
  "OneTap",
];

export function FilterCommandBar({
  filters,
  onChange,
  resultCount,
}: {
  filters: SignalFilters;
  onChange: (next: SignalFilters) => void;
  resultCount: number;
}) {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const searchRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!searchOpen) return;
    const onDocClick = (event: MouseEvent) => {
      if (!searchRef.current?.contains(event.target as Node)) setSearchOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [searchOpen]);

  const set = <K extends keyof SignalFilters>(key: K, value: SignalFilters[K]) =>
    onChange({ ...filters, [key]: value });

  const pills: { key: keyof SignalFilters; label: string }[] = (
    ["type", "industry", "product", "service", "year"] as const
  )
    .filter((key) => filters[key] !== "all")
    .map((key) => ({
      key,
      label:
        key === "type"
          ? SIGNAL_TYPES.find((s) => s.id === filters.type)?.label ?? String(filters[key])
          : String(filters[key]),
    }));

  const activeCount = pills.length + (filters.query ? 1 : 0);

  return (
    <section className="border-b border-line bg-surface-2/40">
      <div className="shell flex flex-col gap-4 py-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-3">
          <div ref={searchRef} className="relative flex-1 lg:max-w-[22rem]">
            <div className="flex h-10 items-center gap-2 rounded-[var(--radius-control)] border border-control-border bg-surface px-3.5">
              <MagnifyingGlass size={16} weight="regular" className="shrink-0 text-muted" aria-hidden="true" />
              <input
                type="text"
                value={filters.query}
                onChange={(e) => set("query", e.target.value)}
                onFocus={() => setSearchOpen(true)}
                placeholder="Search insights..."
                className="w-full bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none"
                aria-label="Search insights"
              />
              {filters.query ? (
                <button
                  type="button"
                  onClick={() => set("query", "")}
                  aria-label="Clear search"
                  className="text-muted transition-colors hover:text-ink"
                >
                  <X size={14} weight="bold" />
                </button>
              ) : null}
            </div>

            {searchOpen ? (
              <div className="absolute left-0 top-[calc(100%+6px)] z-20 w-full min-w-[16rem] rounded-[var(--radius-control)] border border-control-border bg-surface p-3 shadow-[var(--shadow-lift)]">
                <p className="px-1 text-xs font-medium text-muted">Try:</p>
                <ul className="mt-1.5 flex flex-wrap gap-1.5">
                  {SUGGESTED_SEARCHES.map((term) => (
                    <li key={term}>
                      <button
                        type="button"
                        onClick={() => {
                          set("query", term);
                          setSearchOpen(false);
                        }}
                        className="rounded-full border border-control-border bg-surface-2 px-2.5 py-1 text-xs text-ink transition-colors hover:border-accent/40 hover:text-accent"
                      >
                        {term}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-2">
            <FilterDropdown
              label="Content type"
              value={filters.type === "all" ? "all" : SIGNAL_TYPES.find((s) => s.id === filters.type)?.label ?? "all"}
              options={SIGNAL_TYPES.map((s) => s.label)}
              onChange={(v) => {
                const match = SIGNAL_TYPES.find((s) => s.label === v);
                set("type", match ? match.id : "all");
              }}
            />
            <FilterDropdown label="Industry" value={filters.industry} options={INDUSTRIES} onChange={(v) => set("industry", v)} />
            <FilterDropdown label="Product" value={filters.product} options={PRODUCTS} onChange={(v) => set("product", v)} />
            <FilterDropdown label="Service" value={filters.service} options={SERVICES} onChange={(v) => set("service", v)} />
            <FilterDropdown label="Year" value={filters.year} options={AVAILABLE_YEARS} onChange={(v) => set("year", v)} />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {filters.query ? (
              <Pill label={`"${filters.query}"`} onRemove={() => set("query", "")} />
            ) : null}
            {pills.map((p) => (
              <Pill
                key={p.key}
                label={p.label}
                onRemove={() => set(p.key, "all" as SignalFilters[typeof p.key])}
              />
            ))}
            {activeCount > 0 ? (
              <button
                type="button"
                onClick={() =>
                  onChange({ type: "all", industry: "all", product: "all", service: "all", year: "all", query: "" })
                }
                className="text-xs font-semibold tracking-[0.06em] text-muted transition-colors hover:text-ink"
              >
                CLEAR ALL
              </button>
            ) : null}
          </div>

          <p className="text-xs font-semibold tracking-[0.06em] text-muted">
            {resultCount} {resultCount === 1 ? "RESULT" : "RESULTS"} FOUND
          </p>
        </div>
      </div>
    </section>
  );
}

function Pill({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/[0.08] px-3 py-1 text-xs font-medium text-ink",
      )}
    >
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label} filter`}
        className="text-muted transition-colors hover:text-ink"
      >
        <X size={12} weight="bold" />
      </button>
    </span>
  );
}
