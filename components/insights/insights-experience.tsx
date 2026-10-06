"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";

import { InsightsHero } from "@/components/insights/insights-hero";
import { IntelligenceStreams } from "@/components/insights/intelligence-streams";
import { FeaturedStory } from "@/components/insights/featured-story";
import { FilterCommandBar } from "@/components/insights/filter-command-bar";
import { InsightGrid, PAGE_SIZE } from "@/components/insights/insight-grid";
import {
  signalItems,
  featuredStory,
  filterSignals,
  DEFAULT_FILTERS,
  SIGNAL_TYPES,
  type SignalFilters,
  type SignalType,
} from "@/lib/insights-signal";

function initialTypeFromQuery(value: string | null): SignalType | "all" {
  return SIGNAL_TYPES.some((s) => s.id === value) ? (value as SignalType) : "all";
}

/**
 * Orchestrates the Insights page: tabs, the featured story, the filter
 * bar and the content grid, all driven by one shared `filters` state so
 * selecting any of them updates the grid with no page reload. Matches
 * the real exponentia.ai/insights structure (heading, tabs, filters,
 * featured + grid) rather than the earlier "AI Signal" concept sections
 * (animated hero network, trending topics, a signal map, a business-
 * problem explorer, a dark CTA band) — those were this rebuild's own
 * invention and have been removed since they don't exist on the live
 * page.
 */
export function InsightsExperience() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = React.useState<SignalFilters>(() => ({
    ...DEFAULT_FILTERS,
    type: initialTypeFromQuery(searchParams.get("type")),
  }));
  const [visibleCount, setVisibleCount] = React.useState(PAGE_SIZE);

  const results = React.useMemo(() => filterSignals(signalItems, filters), [filters]);

  const updateFilters = (next: SignalFilters) => {
    setFilters(next);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <>
      <InsightsHero />
      <IntelligenceStreams
        active={filters.type}
        onSelect={(type) => updateFilters({ ...filters, type })}
      />
      <FeaturedStory story={featuredStory} />

      <FilterCommandBar filters={filters} onChange={updateFilters} resultCount={results.length} />

      <section className="section-y">
        <InsightGrid
          items={results}
          visibleCount={visibleCount}
          onLoadMore={() => setVisibleCount((v) => v + PAGE_SIZE)}
        />
      </section>
    </>
  );
}
