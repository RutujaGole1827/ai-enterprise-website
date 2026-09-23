import type { BrandSvgKey } from "@/lib/brand-svg";

/**
 * Single source of truth for every visible string on the marketing site.
 * Keeping copy out of components means a content edit never touches layout.
 *
 * BRAND: Exponentia.ai. The wordmark renders `name` plus `nameSuffix`, with
 * the suffix carried in the brand accent.
 *
 * CONTACT DETAILS BELOW ARE PLACEHOLDERS. Replace the phone number and both
 * office lines with the real ones before this ships.
 */

export const brand = {
  name: "Exponentia",
  nameSuffix: ".ai",
  fullName: "Exponentia.ai",
  legalName: "Exponentia.ai",
  descriptor: "AI and data engineering for enterprise operations",
  email: "hello@exponentia.ai",
  phone: "+91 22 6142 8800",
  offices: [
    { city: "Mumbai", line: "Placeholder address, replace before launch" },
    { city: "London", line: "Placeholder address, replace before launch" },
  ],
} as const;

/** One label per intent, reused in nav, hero, CTA band and footer. */
export const CTA_PRIMARY = "Book a consultation";
export const CTA_SECONDARY = "See case studies";

export const hero = {
  headline: "Make enterprise data answer to the business",
  subtext:
    "We build the data platforms, AI systems and governance that move pilots into production. Measured in quarters, not years.",
  image: {
    src: "/brand/hero.jpg",
    width: 1280,
    height: 720,
    alt: "Exponentia.ai enterprise AI and data platform",
  },
} as const;

/**
 * Logo wall directly under the hero. Real client marks taken from the live
 * site and recoloured to `currentColor` by scripts/build-brand-svg.mjs, so
 * they follow the page token in both themes.
 */
export const trustedBy = [
  { name: "PayPal", mark: "clientsPaypal" },
  { name: "Kotak Mahindra Bank", mark: "clientsKotak" },
  { name: "Adani", mark: "clientsAdani" },
  { name: "Capita", mark: "clientsCapita" },
  { name: "SSP", mark: "clientsSsp" },
  { name: "DS Smith", mark: "clientsDssmith" },
] as const;

export type Solution = {
  id: string;
  title: string;
  body: string;
  /** Bento treatment. Drives which cell gets photography, tint or texture. */
  media: "photo" | "tint" | "texture" | "plain";
  image?: { src: string; alt: string };
  /** Navy service tile from the live site. */
  icon: string;
};

export const solutions: Solution[] = [
  {
    id: "data-platform",
    title: "Modern AI and data platform",
    icon: "/brand/solutions/modern-ai-data.svg",
    body: "Consolidate warehouses, lakes and streams into one governed platform your teams will actually query.",
    media: "photo",
    image: {
      src: "/brand/insights/agentic.png",
      alt: "Agentic AI and data platform architecture",
    },
  },
  {
    id: "ml-engineering",
    title: "AI product engineering",
    icon: "/brand/solutions/ai-product-engineering.svg",
    body: "AI products built for the constraints of your operation, shipped with monitoring, retraining and a rollback path.",
    media: "plain",
  },
  {
    id: "generative-ai",
    title: "AI consulting",
    icon: "/brand/solutions/ai-consulting.svg",
    body: "Where to start, what it costs and what it returns. Retrieval, evaluation and guardrails designed before anyone writes code.",
    media: "tint",
  },
  {
    id: "governance",
    title: "Managed services",
    icon: "/brand/solutions/managed-services.svg",
    body: "We run the platform after it ships. Lineage, quality contracts and access control that hold up when the auditors arrive.",
    media: "texture",
  },
  {
    id: "analytics",
    title: "Analytics solutions",
    icon: "/brand/solutions/analytics-solutions.svg",
    body: "Metrics your teams agree on, delivered into the tool where the decision actually gets made.",
    media: "plain",
  },
];

export const industries = [
  {
    id: "banking",
    name: "Banking",
    body: "Risk, fraud and regulatory reporting built on lineage that survives an examination.",
    icon: "/brand/industries/banking.svg",
  },
  {
    id: "insurance",
    name: "Insurance",
    body: "Underwriting and claims decisions supported by data the actuarial team will stand behind.",
    icon: "/brand/industries/insurance.svg",
  },
  {
    id: "financial-services",
    name: "Financial services",
    body: "Portfolio, treasury and compliance reporting on one governed platform instead of nine.",
    icon: "/brand/industries/financial-services.svg",
  },
  {
    id: "cpg-retail",
    name: "CPG and retail",
    body: "Demand forecasting and assortment calls that reach store managers, not just dashboards.",
    icon: "/brand/industries/cpg-retail.svg",
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    body: "Predictive maintenance and yield analytics across plants that were never instrumented for it.",
    icon: "/brand/industries/manufacturing.svg",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    body: "Clinical and operational data unified under controls your compliance team will sign off on.",
    icon: "/brand/industries/healthcare.svg",
  },
] as const;

/** Transformation journey. Verb labels, no "Stage 1 / Phase 02" numbering. */
export const journey = [
  {
    id: "diagnose",
    label: "Diagnose",
    body: "Two to four weeks mapping your data estate, the decisions it feeds and the places where value is stuck.",
    detail: "Ends with a costed backlog, not a slide deck.",
  },
  {
    id: "architect",
    label: "Architect",
    body: "A reference architecture and delivery plan sized to your cloud, your team and the budget you actually have.",
    detail: "Reviewed with your platform and security leads before anyone writes code.",
  },
  {
    id: "industrialize",
    label: "Industrialize",
    body: "The first workload reaches production with tests, monitoring and a named owner on your side of the table.",
    detail: "We do not hand over a notebook and call it a system.",
  },
  {
    id: "scale",
    label: "Scale",
    body: "Platform patterns, enablement and governance, so the next ten workloads do not need us in the room.",
    detail: "Our success measure is how quickly you stop calling.",
  },
] as const;

/* mock: illustrative engagements. Replace with approved client references
   and verified figures before this site goes live. */
export const caseStudies = [
  {
    id: "aurelis",
    client: "Aurelis Energy",
    sector: "Energy and utilities",
    title: "One load forecast the grid planners actually trust",
    body: "Nine regional forecasting spreadsheets became a single model service, retrained weekly and monitored in production alongside the systems that consume it.",
    results: [
      { value: "A third", label: "lower day-ahead forecast error" },
      { value: "5 days to 1", label: "planning cycle time" },
    ],
    image: {
      src: "/brand/work/rect67.png",
      alt: "Enterprise data platform in operation",
    },
    featured: true,
  },
  {
    id: "brightmoor",
    client: "Brightmoor Retail Group",
    sector: "Retail and CPG",
    title: "Allocation decisions that reach the store floor",
    body: "Demand signals now land in the replenishment system overnight instead of in a Monday morning slide.",
    results: [{ value: "600 stores", label: "on one demand signal" }],
    image: {
      src: "/brand/work/rect68.png",
      alt: "Retail demand planning workspace",
    },
    featured: false,
  },
  {
    id: "kellner",
    client: "Kellner Werke",
    sector: "Manufacturing",
    title: "Predictive maintenance on machines older than the cloud",
    body: "Retrofitted sensor data joins decades of ERP history in one lakehouse, so maintenance gets scheduled instead of triggered.",
    results: [{ value: "A fifth", label: "less unplanned downtime" }],
    image: {
      src: "/brand/work/financial-services.png",
      alt: "Financial services analytics",
    },
    featured: false,
  },
] as const;

/**
 * Technology partners. These are the four real alliances shown on the live
 * site, so this renders as a row of four rather than a marquee: a scrolling
 * band of four logos would be filler.
 */
export const partners = [
  { name: "Amazon Web Services", icon: "/brand/partners/aws.svg" },
  { name: "Databricks", icon: "/brand/partners/databricks.svg" },
  { name: "Microsoft", icon: "/brand/partners/microsoft.svg" },
  { name: "Qlik", icon: "/brand/partners/qlik.svg" },
] as const;

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  /** Omitted when `role` already names the organisation. */
  company?: string;
  /** Inline brand mark shown above the quote, from lib/brand-svg.ts. */
  mark?: BrandSvgKey;
};

export const testimonials: Testimonial[] = [
  {
    id: "halvorsen",
    quote:
      "They shipped a working model in the first quarter, then spent the second one teaching our engineers to own it. Nobody else offered that second part.",
    name: "Ingrid Halvorsen",
    role: "VP Data Platforms",
    company: "Aurelis Energy",
  },
  {
    id: "reinholt",
    quote:
      "Our governance story used to be a slide. It is now a system the auditors can query for themselves.",
    name: "Tobias Reinholt",
    role: "Chief Data Officer",
    company: "Kellner Werke",
  },
  {
    id: "raghunathan",
    quote:
      "The forecast is not perfect. It is defensible, and the planners can see exactly why it says what it says.",
    name: "Priya Raghunathan",
    role: "Director of Supply Planning",
    company: "Brightmoor Retail Group",
  },
];

export const insights = [
  {
    id: "pilots-stall",
    title: "Why most AI pilots stall before production",
    excerpt:
      "The blocker is almost never model quality. It is ownership, evaluation and the absence of a deployment path.",
    category: "Applied AI",
    date: "June 2026",
    readingTime: "8 min read",
    image: {
      src: "/brand/insights/ai-solutions.png",
      alt: "AI solutions overview",
    },
    featured: true,
  },
  {
    id: "data-contracts",
    title: "A data contract is a staffing decision, not a schema",
    excerpt:
      "Contracts only hold when someone is paid to answer the pager the moment one breaks.",
    category: "Governance",
    date: "May 2026",
    readingTime: "6 min read",
    image: {
      src: "/brand/insights/industry.png",
      alt: "Industry solutions overview",
    },
    featured: false,
  },
  {
    id: "lakehouse-month-four",
    title: "Lakehouse migrations: what breaks in month four",
    excerpt:
      "Cost, not correctness, is what usually ends these programmes. Here is where the spend hides.",
    category: "Architecture",
    date: "April 2026",
    readingTime: "11 min read",
    image: {
      src: "/brand/insights/context-gap.jpg",
      alt: "The enterprise AI context gap",
    },
    featured: false,
  },
  {
    id: "retrieval-eval",
    title: "Evaluating retrieval quality without a labelled set",
    excerpt:
      "Practical ways to measure a retrieval system when nobody has annotated your corpus.",
    category: "Applied AI",
    date: "March 2026",
    readingTime: "7 min read",
    image: {
      src: "/brand/insights/agentic.png",
      alt: "Agentic AI and data platform",
    },
    featured: false,
  },
] as const;

/* ---------------------------------- NAV ---------------------------------- */

export type MegaColumn = {
  heading: string;
  links: { label: string; href: string; description: string }[];
};

export const solutionsMenu: MegaColumn[] = [
  {
    heading: "Data foundation",
    links: [
      {
        label: "Data platform modernization",
        href: "/#solutions",
        description: "Warehouse, lakehouse and streaming, consolidated",
      },
      {
        label: "Real-time pipelines",
        href: "/#solutions",
        description: "Event ingestion your operations can depend on",
      },
      {
        label: "Data governance and trust",
        href: "/#solutions",
        description: "Lineage, contracts and access control",
      },
    ],
  },
  {
    heading: "Applied AI",
    links: [
      {
        label: "Machine learning engineering",
        href: "/#solutions",
        description: "Models that survive contact with production",
      },
      {
        label: "Generative AI systems",
        href: "/#solutions",
        description: "Retrieval, evaluation and guardrails",
      },
      {
        label: "Forecasting and optimization",
        href: "/#solutions",
        description: "Demand, load, capacity and pricing",
      },
    ],
  },
  {
    heading: "Run and scale",
    links: [
      {
        label: "MLOps and reliability",
        href: "/#solutions",
        description: "Monitoring, retraining and incident response",
      },
      {
        label: "Analytics enablement",
        href: "/#solutions",
        description: "Semantic layers and self-serve reporting",
      },
      {
        label: "Team enablement",
        href: "/#journey",
        description: "Your engineers own it after we leave",
      },
    ],
  },
];

export type NavLink = {
  label: string;
  href: string;
  menu: "solutions" | "industries" | null;
};

export const navLinks: NavLink[] = [
  { label: "Solutions", href: "/#solutions", menu: "solutions" },
  { label: "Industries", href: "/#industries", menu: "industries" },
  { label: "Case studies", href: "/#case-studies", menu: null },
  { label: "Insights", href: "/#insights", menu: null },
];

export const footerColumns = [
  {
    heading: "Solutions",
    links: [
      { label: "Data platform modernization", href: "/#solutions" },
      { label: "Machine learning engineering", href: "/#solutions" },
      { label: "Generative AI systems", href: "/#solutions" },
      { label: "Data governance and trust", href: "/#solutions" },
    ],
  },
  {
    heading: "Industries",
    links: [
      { label: "Manufacturing", href: "/#industries" },
      { label: "Financial services", href: "/#industries" },
      { label: "Retail and CPG", href: "/#industries" },
      { label: "Energy and utilities", href: "/#industries" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "How we work", href: "/#journey" },
      { label: "Case studies", href: "/#case-studies" },
      { label: "Insights", href: "/#insights" },
      { label: "Microsoft partnership", href: "/partners-microsoft" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

export const footerLegal = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Accessibility", href: "#" },
];
