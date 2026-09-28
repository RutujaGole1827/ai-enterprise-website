/**
 * Copy for /partners-databricks.
 *
 * Every sentence here is the live exponentia.ai/partners-databricks copy.
 * The only additions are structural, matching the convention set in
 * lib/partners/microsoft.ts: metric figures split into value/suffix so
 * they can count, each offering's one-line summary broken into its own
 * clauses for the detail panel, and the live page's own tabbed capability
 * groups (Consulting & Architecture / GenAI & MLOps / SAP Modernization /
 * Migration with Lakebridge) kept as categories rather than flattened.
 *
 * One deliberate correction: the live page's closing-section body ends
 * "...make your Microsoft journey seamless and impactful" — a copy-paste
 * artifact from the Microsoft partner page's own closing section, left
 * over inside an otherwise Databricks-only sentence. It reads "Databricks"
 * here instead; nothing else in that sentence changed.
 */
import type { Cta, Metric, Offering } from "@/lib/partners/microsoft";

export const databricksHero = {
  title: "Your Trusted Partner for Data & AI Excellence with",
  highlight: "Databricks",
  body: [
    "As a Databricks Select Consulting Partner, Exponentia.ai helps enterprises design, build, and run end-to-end data and AI solutions on the Databricks Lakehouse platform.",
    "Our deep expertise across GenAI, MLOps, SAP modernization, and Databricks migration enables organizations to activate real-time intelligence, modernize legacy systems, and accelerate time-to-value.",
  ],
  /** The live page's hero CTA, an in-page anchor to the offerings section. */
  primaryCta: { label: "Learn More", href: "#offerings" } satisfies Cta,
  /** Bold in the lead paragraph on the live page. */
  emphasis: [
    "Databricks Select Consulting Partner",
    "GenAI, MLOps, SAP modernization, and Databricks",
  ],
} as const;

/** The certification badges shown on the live page, as one strip. */
export const databricksCertifications = {
  src: "/brand/partners/databricks/certifications.avif",
  width: 6000,
  height: 650,
  alt: "Databricks certifications and status held by the Exponentia.ai team",
} as const;

export const databricksMetrics: Metric[] = [
  { kind: "count", value: 100, suffix: "+", label: "Databricks Practitioners" },
  { kind: "count", value: 75, suffix: "+", label: "Databricks Certifications" },
  { kind: "count", value: 75, suffix: "+", label: "Certified GenAI Engineers" },
];

export const databricksOfferings = {
  title: "Offerings with Databricks",
  body: "At Exponentia.ai, we embed Databricks' powerful data, analytics, and automation capabilities across our core service pillars:",
  items: [
    {
      id: "aixponent",
      name: "AIXponent",
      summary:
        "Agentic AI accelerator for structured & unstructured data, deployable in 4 weeks",
      includes: [
        "Agentic AI accelerator",
        "Structured & unstructured data",
      ],
      highlight: { value: "4 weeks", label: "to deployment" },
      icon: "/brand/partners/databricks/aixponent.svg",
    },
    {
      id: "lakehousexponent",
      name: "LakehouseXponent",
      summary:
        "Production-ready Lakehouse setup in 4 weeks with Data Quality & Automated Ingestion and FinOps framework.",
      includes: [
        "Data Quality & Automated Ingestion",
        "FinOps framework",
      ],
      highlight: { value: "4 weeks", label: "to a production-ready Lakehouse" },
      icon: "/brand/partners/databricks/lakehousexponent.svg",
    },
    {
      id: "onetap",
      name: "OneTap",
      summary:
        "Plug-and-play AI Solution to drive conversational intelligence & sales enablement",
      includes: ["Conversational intelligence", "Sales enablement"],
      icon: "/brand/partners/databricks/onetap.svg",
    },
    {
      id: "psi",
      name: "Procurement Spends Intelligence (PSI)",
      summary:
        "GenAI-driven insights for smart procurement optimization in 6 weeks",
      includes: ["GenAI-driven insights", "Smart procurement optimization"],
      highlight: { value: "6 weeks", label: "to procurement optimization" },
      icon: "/brand/partners/databricks/psi.svg",
    },
    {
      id: "gentrust",
      name: "GenTrust",
      summary:
        "Automated & Reliable AI governance framework for secure, compliant model validation",
      includes: ["Automated & reliable AI governance", "Secure, compliant model validation"],
      icon: "/brand/partners/databricks/gentrust.svg",
    },
  ] satisfies Offering[],
};

export type Benefit = { title: string; body: string };

export const databricksWhyIntro =
  "Our partnership with Databricks is built on practical experience, proven outcomes, and a deep understanding of how enterprises evolve their data landscape. We focus on accelerating time-to-insight and enabling confident, governed decision-making at scale.";

export const databricksBenefits: Benefit[] = [
  {
    title: "Business-first approach",
    body: "Translating Databricks capabilities into measurable outcomes for every function",
  },
  {
    title: "Accelerated delivery",
    body: "Proprietary frameworks and ready-to-deploy accelerators speed up implementation",
  },
  {
    title: "Seamless interoperability",
    body: "Integration expertise across SAP, Databricks, Redshift, and Talend ecosystems",
  },
  {
    title: "Continuous enablement",
    body: "Empowering business and technical teams to self-serve, scale, and innovate",
  },
  {
    title: "Data you can trust",
    body: "With Qlik's Trust Score embedded in pipelines, decision-makers can instantly assess data reliability and act with confidence",
  },
];

export type Capability = { name: string; body: string };
export type CapabilityCategory = {
  id: string;
  name: string;
  items: Capability[];
};

export const databricksCapabilities = {
  title: "Our Capabilities on Databricks",
  body: "We offer a full suite of data and AI capabilities across the Databricks ecosystem:",
  categories: [
    {
      id: "consulting-architecture",
      name: "Consulting & Architecture",
      items: [
        {
          name: "Onboarding & Enablement",
          body: "Rapid cloud setup and enablement for Databricks adoption",
        },
        {
          name: "Architecture & Development",
          body: "Scalable platforms using Delta Lake, Spark, MLflow, and CI/CD",
        },
        {
          name: "Data Governance",
          body: "Centralized governance with Unity Catalog and enterprise-grade security",
        },
      ],
    },
    {
      id: "genai-mlops",
      name: "GenAI & MLOps",
      items: [
        {
          name: "GenAI Solutions",
          body: "Chatbots, automation, and embedded GenAI using RAG and vector search",
        },
        {
          name: "Advance MLOps",
          body: "Model monitoring, versioning, retraining, and drift detection",
        },
        {
          name: "GenTrust Framework",
          body: "AI governance for secure, compliant, and responsible deployments",
        },
      ],
    },
    {
      id: "sap-modernization",
      name: "SAP Modernization",
      items: [
        {
          name: "SAP Databricks Integration",
          body: "Unified analytics and AI on SAP and non-SAP data",
        },
        {
          name: "Frictionless AI with AIXponent",
          body: "Agentic workflows and NLP-based data dialogue",
        },
      ],
    },
    {
      id: "migration-lakebridge",
      name: "Migration with Lakebridge",
      items: [
        {
          name: "Lakebridge Suite",
          body: "Analyzer, Code Converter, DDL Accelerator, and Reconciliation Tool",
        },
        {
          name: "Supported Platforms",
          body: "Synapse, Snowflake, Redshift, SQL Server",
        },
        {
          name: "Benefits",
          body: "5x faster SQL conversion, 30% migration acceleration, full auditability",
        },
      ],
    },
  ] satisfies CapabilityCategory[],
};

export const databricksLakebridge = {
  title: "Lakebridge Suite",
  tools: [
    "Analyzer",
    "Code Converter",
    "DDL Accelerator",
    "Reconciliation Tool",
  ],
  flow: ["Legacy Platform", "Lakebridge", "Databricks Lakehouse", "AI / Analytics"],
  /** The live page's own three benefits. The first two carry a figure; the
   * third ("full auditability") does not — it is not given a number here
   * either. */
  benefits: [
    { value: "5x", label: "faster SQL conversion" },
    { value: "30%", label: "migration acceleration" },
    { value: null, label: "full auditability" },
  ],
};

export const databricksCta = {
  title: "Let's Build the Future of Data & AI Together",
  titleHighlight: "Data & AI",
  body: "Whether you're migrating from Qlik, Tableau, or SAP BO, or building a new AI-powered data estate, Exponentia.ai brings the tools, talent, and frameworks to make your Databricks journey seamless and impactful.",
  ctaLabel: "Contact Our Team",
};
