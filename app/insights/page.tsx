import type { Metadata } from "next";
import { Suspense } from "react";

import { InsightsExperience } from "@/components/insights/insights-experience";
import { Contact } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Insights",
  description: "Ideas, intelligence, and real-world transformation shaping the next generation of AI-native enterprises.",
};

export default function InsightsIndexPage() {
  return (
    <>
      <Suspense fallback={null}>
        <InsightsExperience />
      </Suspense>
      <Contact />
    </>
  );
}
