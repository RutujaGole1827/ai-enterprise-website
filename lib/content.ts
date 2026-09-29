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
export type ClientLogo =
  | { name: string; mark: BrandSvgKey }
  | { name: string; image: { src: string; width: number; height: number } };

/**
 * Every client mark shown on the live exponentia.ai homepage's "Our Clients"
 * marquee, in that marquee's order. Marks are the same monochrome brand SVGs
 * (recoloured to `currentColor` by scripts/build-brand-svg.mjs) used
 * elsewhere in this file; `nanavatiMax` is the one logo that ships as a
 * source-resolution PNG because Exponentia's own export embeds it as a raster
 * image rather than vector paths.
 */
export const clients: ClientLogo[] = [
  { name: "Fino Payments Bank", mark: "clientsFino" },
  { name: "Avendus", mark: "clientsAvendus" },
  { name: "Godrej", mark: "clientsGodrej" },
  { name: "PayPal", mark: "clientsPaypal" },
  { name: "Larsen & Toubro", mark: "clientsLarsenToubro" },
  { name: "TUI", mark: "clientsTui" },
  { name: "Kotak Mahindra Bank", mark: "clientsKotak" },
  { name: "SSP", mark: "clientsSsp" },
  { name: "Convatec", mark: "clientsConvatec" },
  { name: "Capita", mark: "clientsCapita" },
  { name: "Jefferson Health", mark: "clientsJeffersonHealth" },
  { name: "Mankind Pharma", mark: "clientsMankind" },
  { name: "NYU Langone Health", mark: "clientsNyuLangone" },
  { name: "Emory University", mark: "clientsEmory" },
  { name: "PayU", mark: "clientsPayu" },
  { name: "AGD Bank", mark: "clientsAgdBank" },
  { name: "Adani", mark: "clientsAdani" },
  {
    name: "Nanavati Max Super Speciality Hospital",
    image: { src: "/brand/clients/nanavati-max.png", width: 957, height: 261 },
  },
  { name: "Xanadu", mark: "clientsXanadu" },
  { name: "Centrum", mark: "clientsCentrum" },
  { name: "BSV", mark: "clientsBsv" },
  { name: "DS Smith", mark: "clientsDssmith" },
  { name: "The IN Group", mark: "clientsTheInGroup" },
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
    href: "/#industries",
  },
  {
    id: "insurance",
    name: "Insurance",
    body: "Underwriting and claims decisions supported by data the actuarial team will stand behind.",
    icon: "/brand/industries/insurance.svg",
    href: "/#industries",
  },
  {
    id: "financial-services",
    name: "Financial services",
    body: "Portfolio, treasury and compliance reporting on one governed platform instead of nine.",
    icon: "/brand/industries/financial-services.svg",
    href: "/#industries",
  },
  {
    id: "cpg-retail",
    name: "CPG and retail",
    body: "Demand forecasting and assortment calls that reach store managers, not just dashboards.",
    icon: "/brand/industries/cpg-retail.svg",
    // The one industry with a real dedicated page in this project.
    href: "/industries/exponentia-for-cpg-sector",
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    body: "Predictive maintenance and yield analytics across plants that were never instrumented for it.",
    icon: "/brand/industries/manufacturing.svg",
    href: "/#industries",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    body: "Clinical and operational data unified under controls your compliance team will sign off on.",
    icon: "/brand/industries/healthcare.svg",
    href: "/#industries",
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
    detail:
      "Reviewed with your platform and security leads before anyone writes code.",
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
/**
 * The global nav's own content — matched to the live exponentia.ai site's
 * actual header structure (five mega-menus: Our Expertise, Solutions,
 * Industries, Partners, Insights) rather than this project's earlier,
 * illustrative "Solutions" grouping used only here. Every label below is
 * the live site's own; a link points into this project only where that
 * page genuinely exists (Partners → Microsoft, the one partner page this
 * project has; Solutions by Industry → the one industry page this project
 * has; Insights → the home page's own case-studies/insights sections);
 * everything else is a "#" placeholder, same convention as the footer.
 */

export type MegaColumn = {
  heading: string;
  links: { label: string; href: string; description?: string; icon?: string }[];
};

export type ExpertiseItem = { label: string; description: string; href: string };

export const expertiseMenu: ExpertiseItem[] = [
  { label: "AI Consulting", description: "Advisory-led AI strategy", href: "#" },
  {
    label: "AI Product Engineering",
    description: "Scalable AI solution design",
    href: "#",
  },
  {
    label: "Modernize AI + Data Platform",
    description: "Legacy-to-modern transformation",
    href: "#",
  },
  {
    label: "AI & Analytics Solutions",
    description: "Advanced analytics enablement",
    href: "#",
  },
  {
    label: "Managed Services",
    description: "AI platform operations & support",
    href: "#",
  },
];

export const solutionsMenu: MegaColumn[] = [
  {
    heading: "Agentic AI & Data Platform Solutions",
    links: [
      {
        label: "LakeHouseXponent",
        href: "#",
        description: "Unified data lake for AI-driven insights",
        icon: "/brand/nav-solutions/lakehousexponent.svg",
      },
      {
        label: "MigrationXponent",
        href: "#",
        description: "Seamless migration to modern AI platforms",
        icon: "/brand/nav-solutions/migrationxponent.svg",
      },
      {
        label: "AIXponent",
        href: "#",
        description: "Agentic AI platform for enterprise growth",
        icon: "/brand/nav-solutions/aixponent.svg",
      },
    ],
  },
  {
    heading: "AI Solutions",
    links: [
      {
        label: "LogisticsXponent",
        href: "#",
        description: "AI-powered logistics for smarter supply chains",
        icon: "/brand/nav-solutions/logisticsxponent.svg",
      },
      {
        label: "Asset ManagementXponent",
        href: "#",
        description: "Intelligent asset lifecycle optimization",
        icon: "/brand/nav-solutions/asset-management-xponent.svg",
      },
      {
        label: "WealthXponent",
        href: "#",
        description: "AI-driven wealth management for BFSI",
        icon: "/brand/nav-solutions/wealth-xponent.svg",
      },
      {
        label: "OneTap",
        href: "#",
        description: "Instant AI insights to close deals faster",
        icon: "/brand/nav-solutions/onetap.svg",
      },
      {
        label: "Smart ManufacturingXponent",
        href: "#",
        description: "AI assistant for agile manufacturing ops",
        icon: "/brand/nav-solutions/smart-manufacturing-xponent.svg",
      },
      {
        label: "PSI",
        href: "#",
        description: "Predictive simulation for planning precision",
        icon: "/brand/nav-solutions/psi.svg",
      },
      {
        label: "GenTrust",
        href: "#",
        description: "Your AI Governance & Validation Framework",
        icon: "/brand/nav-solutions/gentrust.avif",
      },
      {
        label: "PMOXponent",
        href: "#",
        description: "Smarter project orchestration powered by AI",
        icon: "/brand/nav-solutions/pmoxponent.png",
      },
    ],
  },
  {
    heading: "Solutions by Industry",
    links: [
      {
        label: "Agentic AI for CPG",
        href: "/industries/exponentia-for-cpg-sector",
        description: "AI for consumer goods innovation",
        icon: "/brand/nav-solutions/cpg.svg",
      },
      {
        label: "Agentic AI for Manufacturing",
        href: "#",
        description: "Agentic AI driving factory efficiency",
        icon: "/brand/nav-solutions/manufacturing.svg",
      },
      {
        label: "Agentic AI for BFSI",
        href: "#",
        description: "AI agents for financial service automation",
        icon: "/brand/nav-solutions/bfsi.svg",
      },
    ],
  },
];

export type PartnerLink = {
  name: string;
  href: string;
  description?: string;
  icon?: string;
};

export const partnersMenu: PartnerLink[] = [
  {
    name: "Databricks",
    href: "/partners-databricks",
    description: "Unify Data. Accelerate AI.",
    icon: "/brand/partners/databricks.svg",
  },
  {
    name: "Microsoft",
    href: "/partners-microsoft",
    description: "AI-Powered Business Intelligence",
    icon: "/brand/partners/microsoft.svg",
  },
  {
    name: "Amazon Web Services",
    href: "#",
    description: "AI at Cloud Scale",
    icon: "/brand/partners/aws.svg",
  },
  {
    name: "Qlik",
    href: "#",
    description: "AI-Ready Data. Trusted Insights.",
    icon: "/brand/partners/qlik.svg",
  },
];

export type InsightLink = {
  label: string;
  href: string;
  description?: string;
  icon?: string;
};

export const insightsMenu: InsightLink[] = [
  {
    label: "Client Success Stories",
    href: "/#case-studies",
    description: "Real-world impact from data-driven success",
    icon: "/brand/nav-insights/client-success-stories.svg",
  },
  {
    label: "Blogs",
    href: "/#insights",
    description: "Insights and trends from our data experts",
    icon: "/brand/nav-insights/blogs.svg",
  },
  {
    label: "Webinars",
    href: "#",
    description: "Expert-led sessions on data & AI innovation",
    icon: "/brand/nav-insights/webinars.svg",
  },
  {
    label: "Downloads",
    href: "#",
    description: "Brochures, assets & downloads",
    icon: "/brand/nav-insights/downloads.svg",
  },
  {
    label: "News & PR",
    href: "#",
    description: "News, media & press releases",
    icon: "/brand/nav-insights/news.svg",
  },
];

/** The navbar's own CTA — a different destination and label from
 * `CTA_PRIMARY` (used in the hero/journey sections, untouched here): the
 * live site's own external Agentic AI product, not this project's contact
 * form. */
export const NAV_CTA = {
  label: "Explore Agentic AI Solutions",
  href: "https://aixponent.exponentia.ai/a",
};

export type NavMenuKey =
  | "expertise"
  | "solutions"
  | "industries"
  | "partners"
  | "insights";

export type NavLink = {
  label: string;
  href: string;
  menu: NavMenuKey;
};

export const navLinks: NavLink[] = [
  { label: "Our Expertise", href: "#", menu: "expertise" },
  { label: "Solutions", href: "/#solutions", menu: "solutions" },
  { label: "Industries", href: "/#industries", menu: "industries" },
  { label: "Partners", href: "/partners-microsoft", menu: "partners" },
  { label: "Insights", href: "/#insights", menu: "insights" },
];

/** The live exponentia.ai footer's own "Your AI Acceleration Partner" block. */
export const footerIntro = {
  heading: "Your AI Acceleration Partner",
  body: "Exponentia.ai engineers AI-native enterprises. Using a four-pillar operating model and proprietary accelerators, we move agentic AI from pilot into governed production so enterprises across the globe realize measurable business value at scale.",
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "facebook" | "x" | "linkedin" | "youtube" | "instagram";
};

/** The live site's own social accounts, in its own icon order. */
export const socialLinks: SocialLink[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/Exponentiaai/",
    icon: "facebook",
  },
  { label: "X", href: "https://x.com/exponentia_ai", icon: "x" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/exponentia-datalabs/",
    icon: "linkedin",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@exponentiaai7044",
    icon: "youtube",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/exponentia.ai_",
    icon: "instagram",
  },
];

export type Certification = {
  label: string;
  src: string;
  width: number;
  height: number;
};

/** The two ISO badges from the live footer, sourced from its own CDN. */
export const certifications: Certification[] = [
  {
    label: "ISO 22301:2019 (BCMS) certified company",
    src: "/brand/certifications/iso-22301.png",
    width: 166,
    height: 170,
  },
  {
    label: "ISO 27001:2022 certified company",
    src: "/brand/certifications/iso-27001.png",
    width: 166,
    height: 170,
  },
];

/**
 * Matches the live exponentia.ai footer's own column headings and link
 * labels (including its two columns both literally headed "Industries").
 * A link points into this project only where that heading genuinely exists
 * here (Our Journey → the home page's journey section, Partners → the one
 * partner page this project has, the industry links → the home page's
 * industries section, Client Success Stories / Blogs → case studies /
 * insights); every other label is the live site's own product, team or
 * content-hub name with no page behind it in this project, so it's a "#"
 * placeholder rather than a fabricated destination.
 */
export const footerColumns = [
  {
    heading: "About Us",
    links: [
      { label: "Our Journey", href: "/#journey" },
      { label: "Our Values", href: "#" },
      { label: "Our Leadership Team", href: "#" },
      { label: "Partners", href: "/partners-microsoft" },
    ],
  },
  {
    heading: "Our Expertise",
    links: [
      { label: "AI Consulting", href: "#" },
      { label: "AI Product Engineering", href: "#" },
      { label: "Modernize AI + Data Platform", href: "#" },
      { label: "AI & Analytics Solutions", href: "#" },
      { label: "Managed Services", href: "#" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "LakeHouseXponent", href: "#" },
      { label: "MigrationXponent", href: "#" },
      { label: "AIXponent", href: "#" },
      { label: "LogisticsXponent", href: "#" },
      { label: "Asset ManagementXponent", href: "#" },
      { label: "WealthXponent", href: "#" },
    ],
  },
  {
    heading: "Industries",
    links: [
      { label: "OneTap", href: "#" },
      { label: "Smart ManufacturingXponent", href: "#" },
      { label: "PSI", href: "#" },
      { label: "GenTrust", href: "#" },
      { label: "Agentic AI for: CPG / Manufacturing / BFSI", href: "#" },
    ],
  },
  {
    heading: "Careers",
    links: [{ label: "Careers at Exponentia", href: "#" }],
  },
  {
    heading: "Insights",
    links: [
      { label: "Client Success Stories", href: "/#case-studies" },
      { label: "Blogs", href: "/#insights" },
      { label: "Webinars", href: "#" },
      { label: "Downloads", href: "#" },
      { label: "News & PR", href: "#" },
    ],
  },
  {
    heading: "Industries",
    links: [
      { label: "Insurance", href: "/#industries" },
      { label: "Manufacturing", href: "/#industries" },
      { label: "CPG & Retail", href: "/#industries" },
      { label: "Financial Services", href: "/#industries" },
      { label: "Banking", href: "/#industries" },
      { label: "Healthcare and Life Sciences", href: "/#industries" },
    ],
  },
];

export const footerLegal = [
  { label: "Copyright", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Sitemap", href: "#" },
];
