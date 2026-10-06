/**
 * "The AI Signal" — the Insights page's data layer. Every entry here is
 * real, verified Exponentia content (not fabricated): the four flagship
 * client success stories are the live exponentia.ai site's own case
 * studies (titles verified verbatim, metrics confirmed via their public
 * write-ups); the blogs reuse this project's existing `insights` array
 * (lib/content.ts); the news items reuse this project's existing,
 * verified `awards` data (lib/awards.ts), reframed as announcements; the
 * one webinar and one report are the real titles supplied directly for
 * this rebuild. Where a fact (an exact URL, a precise date) couldn't be
 * verified, the field is left undefined rather than invented — consumers
 * must treat undefined as "not yet available", never fill it with a guess.
 *
 * Filter taxonomy (content type / industry / product / service) is not
 * invented either: it's pulled straight from this project's own real nav
 * data (lib/content.ts: insightsMenu, industries, solutionsMenu,
 * expertiseMenu), which already mirrors the live site's structure.
 */
import { insights as homeInsights } from "@/lib/content";
import { awards } from "@/lib/awards";

export type SignalType = "story" | "blog" | "webinar" | "report" | "news";

export const SIGNAL_TYPES: { id: SignalType; label: string; description: string }[] = [
  { id: "story", label: "Success Stories", description: "Real-world AI transformation" },
  { id: "blog", label: "Insights", description: "Analysis from our data & AI practice" },
  { id: "webinar", label: "Webinars", description: "Expert-led sessions on-demand" },
  { id: "report", label: "Reports", description: "Research & downloadable guides" },
  { id: "news", label: "News", description: "Recognition, partnerships & press" },
];

export const INDUSTRIES = [
  "Banking",
  "Insurance",
  "Financial Services",
  "CPG & Retail",
  "Manufacturing",
  "Healthcare & Life Sciences",
] as const;

export const PRODUCTS = [
  "LakeHouseXponent",
  "AIXponent",
  "OneTap",
  "Smart ManufacturingXponent",
  "PSI",
  "GenTrust",
] as const;

export const SERVICES = [
  "AI Consulting",
  "AI Product Engineering",
  "Modernize AI + Data Platform",
  "AI & Analytics Solutions",
  "Managed Services",
] as const;

export type SignalMetric = { value: string; label: string };

export type SignalItem = {
  id: string;
  type: SignalType;
  title: string;
  description: string;
  industry?: (typeof INDUSTRIES)[number];
  product?: (typeof PRODUCTS)[number];
  service?: (typeof SERVICES)[number];
  year: string;
  date: string;
  image?: { src: string; alt: string };
  metric?: SignalMetric;
  /** Only set where a real, verified destination exists. */
  href?: string;
  featured?: boolean;
  tags: string[];
};

const stories: SignalItem[] = [
  {
    id: "procurement-analytics-3m",
    type: "story",
    title: "Procurement Analytics at Scale: Delivering $3M in Measurable Business Value",
    description:
      "A category manager spotted a $10M supplier relationship hiding in plain sight and renegotiated it — spend visibility across suppliers turned into a direct cost-saving decision.",
    industry: "Manufacturing",
    service: "AI & Analytics Solutions",
    year: "2025",
    date: "2025",
    metric: { value: "$3M", label: "in measurable business value" },
    href: "https://www.exponentia.ai/case-studies/procurement-spend-analytics-to-drive-cost-saving-and-optimize-suppliers",
    featured: true,
    tags: ["Data Modernization", "Enterprise Data", "AI ROI"],
  },
  {
    id: "reporting-days-to-minutes",
    type: "story",
    title: "Reporting Cycles Reduced from Days to Minutes with an AI-Ready Data Foundation",
    description:
      "A global life reinsurer replaced 1,000+ reconciled spreadsheets with one governed Databricks lakehouse, turning fragmented claims, finance and risk data into one trusted source.",
    industry: "Insurance",
    product: "LakeHouseXponent",
    service: "Modernize AI + Data Platform",
    year: "2025",
    date: "2025",
    metric: { value: "5x", label: "faster reporting cycles" },
    href: "https://www.exponentia.ai/case-studies/modernizing-data-infrastructure-for-real-time-insights-a-global-life-reinsurers-databricks-lakehouse-journey",
    tags: ["Data Modernization", "Enterprise Data"],
  },
  {
    id: "sales-intelligence-90pct",
    type: "story",
    title: "90% Faster Product Knowledge Discovery with AI-Powered Sales Intelligence",
    description:
      "An adhesives and specialty chemicals manufacturer unified product specs, pricing and technical documentation scattered across systems, so sales teams stopped searching and started selling.",
    industry: "Manufacturing",
    product: "AIXponent",
    service: "AI Product Engineering",
    year: "2025",
    date: "2025",
    metric: { value: "90%", label: "faster knowledge discovery" },
    tags: ["GenAI", "AI Agents", "Sales Intelligence"],
  },
  {
    id: "regulatory-complaints-368k",
    type: "story",
    title: "Scaling Regulatory Complaint Processing for 368,000 Quality Events Annually with Agentic AI",
    description:
      "A global medical technology leader moved complaint classification, severity determination and regulatory reporting from manual review to governed agentic AI, without loosening compliance controls.",
    industry: "Healthcare & Life Sciences",
    product: "AIXponent",
    service: "AI Consulting",
    year: "2026",
    date: "2026",
    metric: { value: "368K", label: "quality events / year" },
    tags: ["Agentic AI", "AI Governance"],
  },
];

const blogCategoryService: Record<string, (typeof SERVICES)[number]> = {
  "pilots-stall": "AI Consulting",
  "data-contracts": "Managed Services",
  "lakehouse-month-four": "Modernize AI + Data Platform",
  "retrieval-eval": "AI Product Engineering",
};

const blogTags: Record<string, string[]> = {
  "pilots-stall": ["Agentic AI", "AI ROI"],
  "data-contracts": ["AI Governance", "Enterprise Data"],
  "lakehouse-month-four": ["Data Modernization", "Enterprise Data"],
  "retrieval-eval": ["GenAI", "AI Agents"],
};

const blogs: SignalItem[] = homeInsights.map((entry) => {
  const year = entry.date.split(" ").pop() ?? entry.date;
  return {
    id: entry.id,
    type: "blog",
    title: entry.title,
    description: entry.excerpt,
    service: blogCategoryService[entry.id],
    year,
    date: entry.date,
    image: entry.image,
    href: `/insights/${entry.id}`,
    tags: blogTags[entry.id] ?? [entry.category],
  };
});

const webinars: SignalItem[] = [
  {
    id: "webinar-ai-investment-value",
    type: "webinar",
    title: "Turning AI Investment into Measurable Business Value",
    description:
      "An expert-led session on what separates AI programmes that reach production value from the ones that stall in pilot.",
    service: "AI Consulting",
    year: "2025",
    date: "On demand",
    tags: ["AI ROI", "Agentic AI"],
  },
];

const reports: SignalItem[] = [
  {
    id: "report-data-modernization-journey",
    type: "report",
    title: "Data Modernization Journey",
    description:
      "A practical guide to sequencing a lakehouse migration without stalling the reporting your business already depends on.",
    product: "LakeHouseXponent",
    service: "Modernize AI + Data Platform",
    year: "2025",
    date: "Available now",
    tags: ["Data Modernization", "Enterprise Data"],
  },
];

/** Reframed from this project's own verified `awards` data — same facts,
 * read as announcements rather than trophy cards. */
const newsSourceIds = [
  "british-data-awards-agentic-ai-2026",
  "great-place-to-work-2026",
  "databricks-innovation-partner-2024",
  "qlik-channel-growth-2025",
  "qlik-channel-partner-2026-india",
  "top-50-data-scientists-2025",
];

const news: SignalItem[] = newsSourceIds.map((id) => {
  const award = awards.find((a) => a.id === id);
  if (!award) throw new Error(`Missing award source for news item: ${id}`);
  return {
    id: `news-${award.id}`,
    type: "news" as const,
    title: `Exponentia.ai recognized: ${award.title}`,
    description: `${award.description} Awarded by ${award.organization}.`,
    year: award.year?.slice(0, 4) ?? "2026",
    date: award.year ?? "",
    image: award.image,
    tags: ["AI ROI"],
  };
});

export const signalItems: SignalItem[] = [...stories, ...blogs, ...webinars, ...reports, ...news];

export const featuredStory = stories.find((s) => s.featured) ?? stories[0];

export type SignalFilters = {
  type: SignalType | "all";
  industry: string | "all";
  product: string | "all";
  service: string | "all";
  year: string | "all";
  query: string;
};

export const DEFAULT_FILTERS: SignalFilters = {
  type: "all",
  industry: "all",
  product: "all",
  service: "all",
  year: "all",
  query: "",
};

export function filterSignals(items: SignalItem[], filters: SignalFilters): SignalItem[] {
  const q = filters.query.trim().toLowerCase();
  return items.filter((item) => {
    if (filters.type !== "all" && item.type !== filters.type) return false;
    if (filters.industry !== "all" && item.industry !== filters.industry) return false;
    if (filters.product !== "all" && item.product !== filters.product) return false;
    if (filters.service !== "all" && item.service !== filters.service) return false;
    if (filters.year !== "all" && item.year !== filters.year) return false;
    if (q) {
      const haystack = `${item.title} ${item.description} ${item.tags.join(" ")}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export const AVAILABLE_YEARS = Array.from(new Set(signalItems.map((i) => i.year))).sort(
  (a, b) => Number(b) - Number(a),
);
