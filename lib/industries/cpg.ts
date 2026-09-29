/**
 * Copy for /industries/exponentia-for-cpg-sector. Built section by section.
 */
export const cpgHero = {
  title: "Transforming the CPG Industry with",
  highlightText: "AI",
  description:
    "Empowering consumer packaged goods companies with AI-driven solutions to accelerate growth, improve efficiency, and deliver exceptional customer experiences.",
  // The live page's own heading, repeated as a subheading beneath this
  // description there too.
  subheading: "Exponentia for CPG & Retail Sector",
  buttonText: "Explore how AI Agents can transform your CPG Business",
  // No Contact section on this page: sends to the home page's form, same as
  // every other "contact" link on non-home pages (components/layout/contact-link.tsx).
  buttonHref: "/#contact",
};

/**
 * Section 2. The live page repeats the CPG paragraph twice; this renders it
 * once, per the request that asked for this section. Everything else is
 * the live page's own copy, unedited.
 */
export const cpgStory = {
  eyebrow: "CPG & Retail",
  quote:
    "You’ve got to start with the customer experience and work back toward the technology, not the other way around",
  quoteAttribution: "Steve Jobs",
  heading: "Turning CPG data into decisions that drive growth",
  body: "CPG is one of the most competitive and rapidly growing industries in the world. With a huge customer base, the CPG industry is generating huge volumes of data from product purchases, secondary sales, marketing activities, product performance etc. on a daily basis. This data has the potential to generate insights into market trends, sales performance and demand forecasting. Adopt data-driven decision-making practices and stay ahead of its competitors.",
  ctaLabel: "Learn More",
  // The live page's own destination for this CTA: an in-page anchor to its
  // client success stories section. That section doesn't exist on this page
  // yet (built one section at a time), so the link is inert until it does,
  // exactly like the live page's own id-based anchor would be if that
  // section were removed.
  ctaHref: "#client-success-stories",
};

export type GrowthCardId =
  | "sales-performance"
  | "decision-making"
  | "sales-forecasting"
  | "business-analyst"
  | "performance-management"
  | "inventory-optimization"
  | "product-launch"
  | "trade-promotion";

export type GrowthCard = {
  id: GrowthCardId;
  number: string;
  title: string;
  description: string;
  /** "lg" cards get a wider visual and more grid width; the rest stay
   * compact. Sizes match the live page's own emphasis, not a layout
   * decided independently of the content. */
  size: "lg" | "sm";
  /** The live page's own image for this solution, downloaded from its CDN
   * (Webflow CMS collection, "cpg-section-image-N") — see
   * public/brand/cpg-solutions/. Used by CPGSolutionsScrolling; the
   * bento-grid rendering (GrowthBentoGrid) draws its own visuals instead
   * and ignores this field. */
  image: string;
};

/**
 * Section 3: the CPG page's own eight use-case cards — no section heading
 * exists above them on the live page, so this uses the suggested one
 * ("CPG Solutions Powered by Data & AI"); every title and description
 * below is the live page's own copy, unedited, in its own order.
 */
export const cpgGrowth = {
  heading: "CPG Solutions Powered by Data & AI",
  cards: [
    {
      id: "sales-performance",
      number: "01",
      title: "Boost your Sales Performance",
      description:
        "Drive higher sales with our intelligent sales analytics solution that provides insights to help you understand your top customers, top products, product sales trends, product contribution in overall revenue, most profitable products and so on. Use these insights to build a powerful sales strategy focusing more on the sensitive business touchpoints and grow your revenue.",
      size: "lg",
      image: "/brand/cpg-solutions/solution-1.png",
    },
    {
      id: "decision-making",
      number: "02",
      title: "Accelerate Decision Making",
      description:
        "Address any critical issue or key opportunity immediately with our proprietary ML-based anomaly detection algorithm- that rightly identifies any unexpected pattern in sales trends, or other business KPIs. These alerts are trained with historical data, reference data changes and other inputs as specified to flag the alerts at the right moment to users for immediate action.",
      size: "sm",
      image: "/brand/cpg-solutions/solution-2.png",
    },
    {
      id: "sales-forecasting",
      number: "03",
      title: "Sales Forecasting",
      description:
        "Accurately predict future sales volumes at SKU level. Our solutions help CPG players develop a robust sales forecasting model, improve target setting by identifying current market conditions and improve customer sales. The structured scenario analysis also improves decision making.",
      size: "sm",
      image: "/brand/cpg-solutions/solution-3.png",
    },
    {
      id: "business-analyst",
      number: "04",
      title: "AI Based Business Analyst",
      description:
        "Now integrate product data, specifications, research reports and all information to quickly collate and summarize your data into actionable insights using our latest GenAI based solution.",
      size: "lg",
      image: "/brand/cpg-solutions/solution-4.png",
    },
    {
      id: "performance-management",
      number: "05",
      title: "Performance Management of Sales Team",
      description:
        "Track and manage performance of the sales team with performance scorecards. The performance of the team is measured based on effort, effectiveness, regularity and consistency. The regular performance scorecards help CPG companies identify areas that can be improved or incentivised as per the sales representatives.",
      size: "sm",
      image: "/brand/cpg-solutions/solution-5.png",
    },
    {
      id: "inventory-optimization",
      number: "06",
      title: "Inventory Optimization",
      description:
        "Improve inventory forecasting by obtaining insights from vast volumes of data at the SKU level on a weekly/daily basis. Develop robust demand forecasts to perform inventory stock level vs lost sales scenario analysis, suggest order quantity recommendations to reduce out-of-stock frequency, optimize inventory and align inventory planning, forecasting and execution capabilities across the organization.",
      size: "lg",
      image: "/brand/cpg-solutions/solution-6.png",
    },
    {
      id: "product-launch",
      number: "07",
      title: "Product Launch Benchmarking and Cannibalization",
      description:
        "Leverage analytics to plan a successful product launch and avoid cannibalization. Our solutions let you identify factors critical to new product success. Understand how sales and contribution margin of a new product should be benchmarked to assess performance, measure a product launch, estimate impact of the product launch on overall market share and analyse the level of cannibalisation from newly launched products- thus enabling organizations to plan effectively for the future.",
      size: "lg",
      image: "/brand/cpg-solutions/solution-7.png",
    },
    {
      id: "trade-promotion",
      number: "08",
      title: "Trade Promotion Optimization",
      description:
        "Improve decision making with Analytics to identify and optimize promotional offers that maximizes sales lift, ROI and improves performance of newly launched products. Drive better decisions by understanding the critical factors responsible for successful promotions, identifying target audience, customising promotional activity plans and calculating ROI.",
      size: "sm",
      image: "/brand/cpg-solutions/solution-8.png",
    },
  ] satisfies GrowthCard[],
};

export type CpgCaseStudyId =
  | "ports-logistics"
  | "data-platform-modernization"
  | "cloud-insights-insurance";

export type CpgCaseStudy = {
  id: CpgCaseStudyId;
  title: string;
  tags: string[];
  date: string;
  client?: string;
  ctaLabel: string;
  ctaHref: string;
  /** The live page's own image for this card, downloaded from its CDN —
   * see public/brand/case-studies/. */
  image: string;
};

/**
 * Section 4: the live page's "Client success stories" feed, filtered to
 * its own three CPG-tagged posts, in their own order. The live page shows
 * only a title, its "Blogs"/"CPG" tags, a date, sometimes a one-line
 * client description, and a "Read more" link to its own case-studies
 * page — no body copy or metrics, so none is invented here. The third
 * post is about an insurance client, not CPG, despite carrying the "CPG"
 * tag on the live page; that's the live page's own tagging, preserved
 * as-is rather than corrected or dropped.
 *
 * No supporting line exists above the case studies on the live page, so
 * `body` uses the suggested fallback copy; `heading` is the live page's
 * own ("Client success stories"), which does exist.
 */
export const cpgCaseStudies = {
  heading: "Client success stories",
  body: "Real-world applications of data, AI and analytics across the CPG industry.",
  items: [
    {
      id: "ports-logistics",
      title:
        "Resource Prediction & Optimization for India's largest integrated ports and logistics company",
      tags: ["Blogs", "CPG"],
      date: "February 21, 2024",
      client: "India's largest integrated ports and logistics company",
      ctaLabel: "Read more",
      // The live page's own case-studies page for this post; this project
      // has no matching route, so this is inert like the footer's other
      // "#" placeholders for real labels with no page behind them here.
      ctaHref: "#",
      image: "/brand/case-studies/ports-logistics.jpg",
    },
    {
      id: "data-platform-modernization",
      title: "Accelerating Business Outcomes with Data Platform Modernization",
      tags: ["Blogs", "CPG"],
      date: "February 21, 2024",
      ctaLabel: "Read more",
      ctaHref: "#",
      image: "/brand/case-studies/data-platform-modernization.jpg",
    },
    {
      id: "cloud-insights-insurance",
      title:
        "Cloud Enabled Insights: Transforming Analytics for a Leading Indian Insurance Giant",
      tags: ["Blogs", "CPG"],
      date: "February 2, 2024",
      client: "Leading Indian Insurance Giant",
      ctaLabel: "Read more",
      ctaHref: "#",
      image: "/brand/case-studies/cloud-insights-insurance.jpg",
    },
  ] satisfies CpgCaseStudy[],
};
