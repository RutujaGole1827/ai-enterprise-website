import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/ssr";

import { CTA_PRIMARY, insights } from "@/lib/content";
import { insightBodies } from "@/lib/detail-content";
import { Button } from "@/components/ui/button";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return insights.map((article) => ({ slug: article.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = insights.find((entry) => entry.id === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default async function InsightPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = insights.find((entry) => entry.id === slug);
  if (!article) notFound();

  const body = insightBodies[article.id];
  const related = insights.filter((entry) => entry.id !== article.id).slice(0, 3);

  return (
    <>
      <article className="border-b border-line">
        <div className="shell pb-16 pt-12 md:pb-20 md:pt-16">
          <Link
            href="/#insights"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft size={16} weight="regular" aria-hidden="true" />
            All writing
          </Link>

          <header className="mx-auto mt-10 max-w-[46rem]">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
              <span className="font-medium text-accent">
                {article.category}
              </span>
              <span>{article.date}</span>
              <span>{article.readingTime}</span>
            </p>
            <h1 className="mt-4 text-3xl font-semibold leading-[1.12] tracking-[-0.035em] text-ink text-balance sm:text-4xl lg:text-[2.75rem]">
              {article.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              {article.excerpt}
            </p>
          </header>

          <div className="relative mx-auto mt-12 aspect-[16/9] w-full max-w-[62rem] overflow-hidden rounded-[var(--radius-surface)] border border-line bg-surface-2">
            <Image
              src={article.image.src}
              alt={article.image.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 992px"
              className="object-cover"
            />
          </div>

          <div className="mx-auto mt-12 flex max-w-[46rem] flex-col gap-6">
            {body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="text-lg leading-[1.75] text-muted"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mx-auto mt-14 max-w-[46rem] rounded-[var(--radius-surface)] border border-line bg-surface p-7 sm:flex sm:items-center sm:justify-between sm:gap-8">
            <p className="max-w-[42ch] text-[0.9375rem] leading-relaxed text-ink">
              If this describes where you are, the first conversation is a
              diagnosis rather than a pitch.
            </p>
            <Button asChild className="mt-5 w-full sm:mt-0 sm:w-auto sm:shrink-0">
              <Link href="/#contact">{CTA_PRIMARY}</Link>
            </Button>
          </div>
        </div>
      </article>

      <section
        className="section-y min-h-section"
        aria-labelledby="related-heading"
      >
        <div className="shell">
          <h2
            id="related-heading"
            className="text-2xl font-semibold tracking-[-0.025em] text-ink"
          >
            More writing
          </h2>
          <ul className="mt-8 flex flex-col">
            {related.map((entry, index) => (
              <li
                key={entry.id}
                className={index > 0 ? "border-t border-line" : undefined}
              >
                <Link
                  href={`/insights/${entry.id}`}
                  className="group flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:gap-8"
                >
                  <span className="text-sm text-muted sm:w-40 sm:shrink-0">
                    {entry.category}, {entry.date}
                  </span>
                  <span className="text-lg font-medium leading-snug text-ink text-pretty transition-colors group-hover:text-accent">
                    {entry.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
