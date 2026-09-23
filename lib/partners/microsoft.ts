/**
 * Copy for /partners-microsoft.
 *
 * Every sentence here is the live exponentia.ai/partners-microsoft copy. The
 * only additions are structural: the metric figures are split into value and
 * suffix so they can count, each offering's one-line summary is broken into
 * its own clauses for the detail panel, and each industry result has its
 * headline figure pulled out. None of those introduce a claim the live page
 * does not already make.
 */
import type { BrandSvgKey } from "@/lib/brand-svg";
import type { Testimonial } from "@/lib/content";

export type Cta = { label: string; href: string };

export const microsoftHero = {
  title: "Accelerating Data to Action with Microsoft",
  body: [
    "Exponentia.ai is a strategic Microsoft Partner, helping enterprises modernize their data platforms, unlock AI-driven insights, and drive business transformation with Microsoft Fabric, Power BI, and Copilot Studio.",
    "Our deep expertise in data engineering, analytics, and AI enables organizations to unify fragmented systems, reduce legacy tech debt, and scale innovation securely.",
  ],
  /** The live page's hero CTA. */
  primaryCta: { label: "Learn More", href: "#offerings" },
  /** Bold in the lead paragraph on the live page. */
  emphasis: [
    "Exponentia.ai is a strategic Microsoft Partner",
    "Microsoft Fabric, Power BI, and Copilot Studio.",
  ],
  /** Platforms named in the live copy. Drawn as labelled nodes, not logos. */
  platforms: [
    "Microsoft Fabric",
    "Power BI",
    "Azure Synapse",
    "Power Platform",
    "Copilot Studio",
  ],
} as const;

export type Metric =
  | { kind: "count"; value: number; suffix?: string; label: string }
  | { kind: "badge"; label: string };

export const microsoftMetrics: Metric[] = [
  {
    kind: "count",
    value: 45,
    suffix: "+",
    label: "Power BI Certified Resources",
  },
  { kind: "count", value: 45, suffix: "+", label: "BI Solution Architects" },
  { kind: "count", value: 20, suffix: "+", label: "Power Platform Engineers" },
  { kind: "badge", label: "Official Microsoft Certified Partner" },
  { kind: "count", value: 50, suffix: "+", label: "Projects Delivered" },
];

/** The certification badges shown on the live page, as one strip. */
export const microsoftCertifications = {
  src: "/brand/partners/microsoft-certifications.png",
  width: 3200,
  height: 393,
  alt: "Microsoft certifications held by the Exponentia.ai team: Microsoft Certified Trainer, Azure Solutions Architect Expert, Fabric Analytics Engineer Associate, Power BI Data Analyst Associate, Azure Data Engineer Associate, Azure Fundamentals and Power Platform Fundamentals",
} as const;

export type ValuePillar = {
  title: string;
  body: string;
  icon: "stack" | "certificate" | "lightning" | "cpu" | "chart";
};

export const microsoftPillars: ValuePillar[] = [
  {
    title: "End-to-End Expertise",
    body: "From advisory to implementation across Microsoft Fabric, Power BI, Azure Synapse, and Copilot Studio",
    icon: "stack",
  },
  {
    title: "Certified Talent",
    body: "45+ BI architects, 20+ Power Platform engineers, and Microsoft Certified Trainers",
    icon: "certificate",
  },
  {
    title: "Accelerated Delivery",
    body: "Proprietary frameworks like FabricMigrate360 and FabricAdvisory reduce time-to-value by up to 30%",
    icon: "lightning",
  },
  {
    title: "AI-Ready Platforms",
    body: "Build scalable, compliant, and governed data estates with embedded AI agents and automation",
    icon: "cpu",
  },
  {
    title: "Proven Impact",
    body: "100+ Microsoft-aligned projects across healthcare, manufacturing, logistics, BFSI, and CPG",
    icon: "chart",
  },
];

export type Offering = {
  id: string;
  name: string;
  summary: string;
  /** The summary's own clauses, listed in the detail panel. */
  includes: string[];
  highlight?: { value: string; label: string };
};

export const microsoftOfferings = {
  title: "Our Microsoft Offerings",
  body: "Accelerators & Frameworks",
  items: [
    {
      id: "fabricmigrate360",
      name: "FabricMigrate360",
      summary:
        "Reduce migration time/cost by 30% with structured roadmap and automation",
      includes: ["Structured roadmap", "Automation"],
      highlight: {
        value: "30%",
        label: "reduction in migration time and cost",
      },
    },
    {
      id: "data-ingestion",
      name: "Data Ingestion Framework",
      summary:
        "Metadata-driven orchestration with real-time monitoring and audit trails",
      includes: [
        "Metadata-driven orchestration",
        "Real-time monitoring",
        "Audit trails",
      ],
    },
    {
      id: "ai-enablement",
      name: "AI Enablement Roadmap",
      summary:
        "Unified data lake, agentic AI development, and governance-first architecture",
      includes: [
        "Unified data lake",
        "Agentic AI development",
        "Governance-first architecture",
      ],
    },
    {
      id: "fabric-coe",
      name: "Fabric Center of Excellence",
      summary:
        "Maturity assessment and enablement for scalable, compliant adoption",
      includes: [
        "Maturity assessment",
        "Enablement for scalable, compliant adoption",
      ],
    },
  ] satisfies Offering[],
};

export type IndustryResult = {
  id: string;
  name: string;
  body: string;
  icon: string;
  stat: { value: string; label: string };
};

export const microsoftIndustries = {
  title: "Industries We Serve",
  items: [
    {
      id: "healthcare",
      name: "Healthcare",
      body: "Migrated 738 Qlik apps for a large US network to Fabric, enabling 20% cost savings and real-time insights",
      icon: "/brand/industries/healthcare.svg",
      stat: { value: "738", label: "Qlik apps migrated to Fabric" },
    },
    {
      id: "manufacturing",
      name: "Manufacturing",
      body: "Delivered 100+ KPIs via Power BI for a UK-based packaging firm with 1.7TB of data ingestion",
      icon: "/brand/industries/manufacturing.svg",
      stat: { value: "100+", label: "KPIs delivered via Power BI" },
    },
    {
      id: "logistics",
      name: "Logistics",
      body: "Enabled 15% improvement in turnaround time for India’s largest port operator using Power BI and Azure",
      icon: "/brand/industries/logistics.svg",
      stat: { value: "15%", label: "improvement in turnaround time" },
    },
    {
      id: "insurance-bfsi",
      name: "Insurance & BFSI",
      body: "Streamlined reporting and reduced cloud costs by 35% for a leading life insurer using Azure Data Mesh",
      icon: "/brand/industries/insurance.svg",
      stat: { value: "35%", label: "reduction in cloud costs" },
    },
    {
      id: "cpg",
      name: "CPG",
      body: "Built real-time machine downtime reporting for a global food company using Synapse and Power BI",
      icon: "/brand/industries/cpg-retail.svg",
      stat: { value: "Real-time", label: "machine downtime reporting" },
    },
  ] satisfies IndustryResult[],
};

/**
 * Both quotes are from Microsoft account executives about the engagement with
 * their client, not from the client. The attribution says so, as the live
 * page does; it must not be reworded into a client quote.
 */
export const microsoftTestimonials: Testimonial[] = [
  {
    id: "mankind",
    quote:
      "The agility, dedication and resilience is truly commendable… the project is nothing short of transformative.",
    name: "Hitesh Bhayana",
    role: "Microsoft AE for Mankind Pharma",
    mark: "clientsMankind" satisfies BrandSvgKey,
  },
  {
    id: "pidilite",
    quote:
      "Great clarity on the solutioning and work with a great collaborative approach.",
    name: "Deepti Mittal",
    role: "Microsoft AE for Pidilite",
  },
];

export const microsoftCta = {
  title: "Let’s Build the Future of Data & AI Together",
  body: "Whether you're migrating from Qlik, Tableau, or SAP BO, or building a new AI-powered data estate, Exponentia.ai brings the tools, talent, and frameworks to make your Microsoft journey seamless and impactful.",
  cta: { label: "Contact Our Team", href: "#contact" } satisfies Cta,
};
