/**
 * Real recognitions from the live exponentia.ai homepage's own "Awards &
 * Recognition — Earned for Impact" slider (verified against the page's
 * markup, newest first, matching its own ordering). Titles are copied
 * verbatim; `organization`/`year` are parsed out of each real title so the
 * UI can show them as separate fields, and `description` is one original,
 * factual line grounded in the real title — never a claim the title itself
 * doesn't support.
 *
 * Photos are the real award/certificate photography the live site uses
 * (self-hosted under public/brand/awards, downloaded at the site's own
 * "-p-800" size where one existed) rather than a fabricated logo per award,
 * since no separate clean badge asset exists for most of these.
 */
export type Award = {
  id: string;
  title: string;
  organization: string;
  /** Omitted (undefined) only where the real title carries no year. */
  year?: string;
  category: string;
  description: string;
  image: { src: string; alt: string };
};

export const awards: Award[] = [
  {
    id: "great-place-to-work-2026",
    title: "Great Place To Work 2026-2027",
    organization: "Great Place To Work",
    year: "2026–27",
    category: "Workplace Culture",
    description: "Certified for a great workplace culture in India.",
    image: {
      src: "/brand/awards/great-place-to-work.jpg",
      alt: "Great Place To Work 2026-2027 certification",
    },
  },
  {
    id: "top-50-data-scientists-2025",
    title: "Top 50 Best Firms for Data Scientists 2025",
    organization: "Analytics India Magazine (AIM)",
    year: "2025",
    category: "Talent & Culture",
    description:
      "Named among the top firms for data scientists to work for in India.",
    image: {
      src: "/brand/awards/top-50-data-scientists-2025.jpg",
      alt: "Top 50 Best Firms for Data Scientists 2025 recognition",
    },
  },
  {
    id: "databricks-innovation-partner-2024",
    title: "Innovation Partner of the Year 2024",
    organization: "Databricks",
    year: "2024",
    category: "Partner Excellence",
    description: "Recognized by Databricks for driving standout customer outcomes.",
    image: {
      src: "/brand/awards/databricks-innovation-partner-2024.png",
      alt: "Databricks Innovation Partner of the Year 2024 award",
    },
  },
  {
    id: "databricks-apj-partner-2023",
    title: "Databricks APJ Partner Awards - 2023",
    organization: "Databricks",
    year: "2023",
    category: "Partner Excellence",
    description: "Honoured across Databricks' Asia Pacific & Japan partner network.",
    image: {
      src: "/brand/awards/databricks-apj-partner-2023.png",
      alt: "Databricks APJ Partner Awards 2023",
    },
  },
  {
    id: "qlik-most-enabled-partner-2022",
    title: "Qlik's Most Enabled Partner Award - APAC, 2022",
    organization: "Qlik",
    year: "2022",
    category: "Partner Excellence",
    description: "Recognized as Qlik's most enabled partner across Asia Pacific.",
    image: {
      src: "/brand/awards/qlik-most-enabled-partner-2022.avif",
      alt: "Qlik's Most Enabled Partner Award APAC 2022",
    },
  },
  {
    id: "qlik-conversational-bot",
    title: "Winner of Qlik Innovation Award for Conversational Bot",
    organization: "Qlik",
    category: "Product Innovation",
    description: "Recognized for an award-winning Qlik conversational bot implementation.",
    image: {
      src: "/brand/awards/qlik-conversational-bot.avif",
      alt: "Qlik Innovation Award for Conversational Bot",
    },
  },
  {
    id: "microsoft-partner-ciolook-2023",
    title: "The Most Prominent Microsoft Partners To Look At - 2023",
    organization: "CIOLook India",
    year: "2023",
    category: "Partner Excellence",
    description: "Named a standout Microsoft partner by CIOLook India.",
    image: {
      src: "/brand/awards/microsoft-partner-ciolook-2023.avif",
      alt: "CIOLook India: The Most Prominent Microsoft Partners To Look At 2023",
    },
  },
  {
    id: "qlik-channel-growth-2024",
    title: "Qlik's Channel Growth Partner of the Year 2024: Asia Pacific",
    organization: "Qlik",
    year: "2024",
    category: "Partner Excellence",
    description: "Recognized for Qlik channel growth across Asia Pacific.",
    image: {
      src: "/brand/awards/qlik-channel-growth-2024.avif",
      alt: "Qlik Channel Growth Partner of the Year 2024, Asia Pacific",
    },
  },
  {
    id: "digital-impact-awards-2024",
    title:
      "Best Use of Digital in the Technology, Media, and Telecommunications Sector",
    organization: "Digital Impact Awards",
    year: "2024",
    category: "Industry Recognition",
    description: "Honoured for digital impact in technology, media & telecommunications.",
    image: {
      src: "/brand/awards/digital-impact-awards-2024.avif",
      alt: "Digital Impact Awards 2024: Best Use of Digital in TMT",
    },
  },
  {
    id: "qlik-channel-growth-2025",
    title: "Qlik's Channel Growth Partner of the Year 2025: Asia Pacific",
    organization: "Qlik",
    year: "2025",
    category: "Partner Excellence",
    description: "Recognized again for Qlik channel growth across Asia Pacific.",
    image: {
      src: "/brand/awards/qlik-channel-growth-2025.jpg",
      alt: "Qlik Channel Growth Partner of the Year 2025, Asia Pacific",
    },
  },
  {
    id: "qlik-channel-partner-2026-india",
    title: "Channel Partner of the Year 2026 - India Region",
    organization: "Qlik",
    year: "2026",
    category: "Partner Excellence",
    description: "Named Qlik Channel Partner of the Year for the India region.",
    image: {
      src: "/brand/awards/qlik-channel-partner-2026-india.jpg",
      alt: "Qlik Channel Partner of the Year 2026, India Region",
    },
  },
  {
    id: "british-data-awards-agentic-ai-2026",
    title: "Agentic AI Solution of the Year 2026",
    organization: "British Data Awards",
    year: "2026",
    category: "Industry Recognition",
    description: "Recognized for an outstanding agentic AI solution.",
    image: {
      src: "/brand/awards/british-data-awards-agentic-ai-2026.avif",
      alt: "British Data Awards: Agentic AI Solution of the Year 2026",
    },
  },
  {
    id: "british-data-awards-2026",
    title: "British Data Awards 2026",
    organization: "British Data Awards",
    year: "2026",
    category: "Industry Recognition",
    description: "Honoured at the British Data Awards for data & AI excellence.",
    image: {
      src: "/brand/awards/british-data-awards-2026.jpg",
      alt: "British Data Awards 2026",
    },
  },
  {
    id: "qlik-channel-growth-orlando-2025",
    title: "Channel Growth Partner Asia Orlando 2025",
    organization: "Qlik",
    year: "2025",
    category: "Partner Excellence",
    description: "Recognized for Qlik channel growth across the Asia Pacific region.",
    image: {
      src: "/brand/awards/qlik-channel-growth-orlando-2025.jpg",
      alt: "Qlik Channel Growth Partner, Asia Orlando 2025",
    },
  },
];
