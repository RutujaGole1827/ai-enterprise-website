/**
 * Long-form content for the case study and article detail routes.
 * Keyed by the ids in content.ts so the index pages and detail pages can never
 * drift apart: a missing key is a build-time type error, not a 404 in the wild.
 */

import { caseStudies, insights } from "@/lib/content";

type CaseStudyId = (typeof caseStudies)[number]["id"];
type InsightId = (typeof insights)[number]["id"];

export type CaseStudyDetail = {
  situation: string;
  approach: string[];
  outcome: string;
  stack: string[];
};

/* mock: illustrative engagements, written to show the shape of a real case
   study page. Replace with approved client narratives before launch. */
export const caseStudyDetails: Record<CaseStudyId, CaseStudyDetail> = {
  aurelis: {
    situation:
      "Nine regional teams each maintained their own day-ahead load forecast in a spreadsheet. When two regions disagreed, the dispute went to a weekly meeting rather than to a model, and procurement hedged against the gap.",
    approach: [
      "Consolidated fourteen years of interval meter data, weather history and outage records into a single governed store, with the regional definitions reconciled before any modelling started.",
      "Built one forecasting service with regional parameters rather than nine separate models, so an improvement in method reaches every region at once.",
      "Put the service behind the same monitoring as the rest of the platform: input drift, prediction distribution and downstream consumption are all alerted on.",
      "Ran the new forecast in parallel with the spreadsheets for a full quarter before anyone was asked to switch.",
    ],
    outcome:
      "Planners now review one forecast and spend their time on the exceptions it flags. The spreadsheets were retired, not banned, because the model earned the swap during the parallel run.",
    stack: [
      "Snowflake",
      "Apache Airflow",
      "Kubernetes",
      "PostgreSQL",
      "Terraform",
    ],
  },
  brightmoor: {
    situation:
      "Demand signals existed but arrived as a Monday morning report. By the time an allocation decision was made, the week it described was already half gone.",
    approach: [
      "Moved point-of-sale ingestion from a nightly batch to a streaming pipeline, so store-level sales are queryable within minutes.",
      "Published a single demand signal as a contract that the replenishment system consumes directly, instead of a report a person reads and retypes.",
      "Gave category managers an override path with an audit trail, because a forecast that cannot be argued with does not get used.",
    ],
    outcome:
      "Allocation now runs overnight against the current week. The reporting pack still exists, but it describes what happened rather than driving what happens next.",
    stack: ["Apache Kafka", "Databricks", "dbt", "Qlik"],
  },
  kellner: {
    situation:
      "Production machines predated any notion of connected instrumentation. Maintenance was scheduled by calendar and performed by reaction, and the ERP history that would have explained failures was never joined to anything.",
    approach: [
      "Retrofitted vibration and temperature sensors on the highest-value assets first, rather than instrumenting the whole floor on principle.",
      "Joined the new telemetry to two decades of ERP work orders in one lakehouse, which made the failure history usable as training data for the first time.",
      "Scored assets daily and pushed the result into the existing maintenance planning tool, so no technician had to learn a new system.",
    ],
    outcome:
      "Maintenance moved from calendar-driven to condition-driven on the instrumented assets. The rollout to the remaining floor is being run by the client's own engineering team.",
    stack: ["Apache Spark", "Databricks", "MongoDB", "Docker"],
  },
};

export const insightBodies: Record<InsightId, string[]> = {
  "pilots-stall": [
    "Almost every stalled AI programme we are called into has a working model. The notebook runs, the numbers look defensible, and someone has already presented them to a steering committee. What is missing is everything between that notebook and a system that a business process can depend on.",
    "Three gaps account for most of it. First, nobody owns the model in production, because the data science team is funded for discovery and the platform team never agreed to operate something they did not build. Second, there is no evaluation harness, so the only way to know the model still works is to wait for a complaint. Third, the deployment path does not exist: no CI, no rollback, no way to serve a prediction to the system that needs it.",
    "None of those are modelling problems, which is why more modelling does not fix them. The cheapest correction is to decide who operates the thing before you build it, and to make the first workload deliberately small enough that the operating question has a real answer.",
    "A useful test: ask who gets paged when the model degrades at two in the morning. If the honest answer is nobody, the pilot is not close to production regardless of how good the metrics look.",
  ],
  "data-contracts": [
    "Data contracts get introduced as a schema problem. A producing team publishes a definition, consuming teams validate against it, and the pipeline fails loudly instead of quietly. That part is straightforward and mostly solved by tooling.",
    "The part that is not solved by tooling is what happens when the contract breaks. Someone has to be accountable for the producing system, available when it fails, and empowered to refuse a change that would break a downstream consumer. If that person does not exist, the contract is documentation.",
    "This is why contract programmes tend to succeed in organisations that already have clear system ownership, and stall in organisations that do not. The contract exposes the ownership gap; it does not close it.",
    "Our practical advice is to introduce contracts on the three or four datasets that already have a named owner, prove the discipline there, and use the results to argue for ownership on the rest. Rolling contracts out across an estate with no owners produces a great deal of validation and very little reliability.",
  ],
  "lakehouse-month-four": [
    "Lakehouse migrations rarely fail on correctness. The tables land, the queries return the right answers, and the first two months look like a success story. Month four is when the finance business partner asks why the cloud bill has tripled.",
    "The spend usually hides in three places. Small-file writes from streaming ingestion, which inflate storage operations far beyond what the data volume suggests. Unpartitioned or badly partitioned tables that force full scans for queries that should touch a fraction of the data. And compute left running because nobody owns the cluster policy.",
    "All three are fixable, and all three are much cheaper to fix before the migration than after. Compaction and partition strategy should be decided alongside the ingestion design, not retrofitted once the tables are large enough to be painful to rewrite.",
    "The organisational fix matters as much as the technical one. Put cost on the same dashboard as freshness and quality, owned by the same team. A platform where cost is somebody else's report will drift, every time.",
  ],
  "retrieval-eval": [
    "The standard advice for evaluating a retrieval system assumes a labelled set: questions paired with the documents that should have been returned. Most enterprises do not have one, and building it properly is a months-long annotation project nobody has budget for.",
    "There is a reasonable path that does not require one. Start with synthetic questions generated from the corpus itself: take a passage, generate a question it answers, and check whether retrieval returns that passage. This is not a substitute for real user questions, but it catches chunking and embedding problems quickly and costs almost nothing.",
    "Layer on human judgement where it is cheapest. Ask three domain experts to rate fifty real answers on a simple scale, and use their disagreements to find the queries that actually matter. Fifty carefully chosen examples tell you more than a thousand generated ones.",
    "Finally, instrument the live system. Log which retrieved passages the generation step actually cited, and treat a passage that is retrieved but never cited as a signal that ranking is off. Production traffic is the labelled set you did not have to build.",
  ],
};
