import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/ssr";

import { CTA_PRIMARY, caseStudies } from "@/lib/content";
import { caseStudyDetails } from "@/lib/detail-content";
import { Button } from "@/components/ui/button";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return caseStudies.map((study) => ({ slug: study.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((entry) => entry.id === slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.body,
    openGraph: { title: study.title, description: study.body },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((entry) => entry.id === slug);
  if (!study) notFound();

  const detail = caseStudyDetails[study.id];

  return (
    <article className="border-b border-line">
      <div className="shell pb-16 pt-12 md:pb-24 md:pt-16">
        <Link
          href="/#case-studies"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={16} weight="regular" aria-hidden="true" />
          All case studies
        </Link>

        <header className="mt-10 max-w-[52rem]">
          <p className="text-sm text-muted">
            {study.client}, {study.sector}
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-[-0.035em] text-ink text-balance sm:text-4xl lg:text-5xl">
            {study.title}
          </h1>
          <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-muted">
            {study.body}
          </p>
        </header>

        <div className="relative mt-12 aspect-[16/9] w-full overflow-hidden rounded-[var(--radius-surface)] border border-line bg-surface-2">
          <Image
            src={study.image.src}
            alt={study.image.alt}
            fill
            priority
            sizes="(max-width: 1400px) 100vw, 1320px"
            className="object-cover"
          />
        </div>

        <dl className="mt-10 grid grid-cols-1 gap-8 border-y border-line py-8 sm:grid-cols-3">
          {study.results.map((result) => (
            <div key={result.label} className="flex flex-col gap-1">
              <dt className="order-2 text-sm leading-snug text-muted">
                {result.label}
              </dt>
              <dd className="order-1 text-2xl font-semibold tracking-[-0.025em] text-accent">
                {result.value}
              </dd>
            </div>
          ))}
          <div className="flex flex-col gap-1">
            <dt className="order-2 text-sm leading-snug text-muted">
              Platform
            </dt>
            <dd className="order-1 text-[0.9375rem] leading-snug text-ink">
              {detail.stack.join(", ")}
            </dd>
          </div>
        </dl>

        <div className="mt-14 grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <section>
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink">
                The situation
              </h2>
              <p className="mt-4 max-w-[68ch] text-base leading-relaxed text-muted">
                {detail.situation}
              </p>
            </section>

            <section className="mt-12">
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink">
                What we did
              </h2>
              <ol className="mt-6 flex flex-col gap-6">
                {detail.approach.map((step) => (
                  <li
                    key={step.slice(0, 32)}
                    className="max-w-[68ch] border-l-2 border-line pl-5 text-base leading-relaxed text-muted"
                  >
                    {step}
                  </li>
                ))}
              </ol>
            </section>

            <section className="mt-12">
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink">
                Where it landed
              </h2>
              <p className="mt-4 max-w-[68ch] text-base leading-relaxed text-muted">
                {detail.outcome}
              </p>
            </section>
          </div>

          <aside className="lg:col-span-4">
            <div className="rounded-[var(--radius-surface)] border border-line bg-surface p-7 lg:sticky lg:top-28">
              <h2 className="text-lg font-semibold tracking-[-0.02em] text-ink">
                Facing something similar?
              </h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                The first conversation is a diagnosis, not a pitch. It usually
                takes forty minutes.
              </p>
              <Button asChild className="mt-6 w-full">
                <Link href="/#contact">{CTA_PRIMARY}</Link>
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
