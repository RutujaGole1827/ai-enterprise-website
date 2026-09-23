"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";

import { caseStudies, industries, solutionsMenu } from "@/lib/content";
import { Z } from "@/lib/z-index";
import { cn } from "@/lib/utils";

/**
 * Mega Menu Reveal panel. Full-width dropdown below the header bar.
 *
 * Why this motion exists: the panel is a layer, and a 160ms fade plus a 6px
 * settle tells the eye it arrived on top of the page rather than replacing it.
 * Collapses to an instant show under prefers-reduced-motion.
 *
 * The parent (site-header) owns open state, hover intent, Escape handling and
 * focus return; this component only renders and animates.
 */

const featured = caseStudies.find((entry) => entry.featured) ?? caseStudies[0];

export function MegaMenu({
  menu,
  id,
  labelledBy,
  onNavigate,
  onMouseEnter,
}: {
  menu: "solutions" | "industries";
  id: string;
  labelledBy: string;
  onNavigate: () => void;
  onMouseEnter: () => void;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      id={id}
      role="region"
      aria-labelledby={labelledBy}
      onMouseEnter={onMouseEnter}
      initial={reduce ? false : { opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, y: -6 }}
      transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
      style={{ zIndex: Z.megaMenu }}
      className={cn(
        "absolute inset-x-0 top-full hidden lg:block",
        "border-b border-line bg-surface/95 backdrop-blur-xl",
        "shadow-[var(--shadow-lift)]",
      )}
    >
      <div className="shell py-9">
        {menu === "solutions" ? (
          <div className="grid grid-cols-12 gap-x-10 gap-y-8">
            {solutionsMenu.map((column) => (
              <div key={column.heading} className="col-span-3">
                <p className="mb-4 text-sm font-semibold text-ink">
                  {column.heading}
                </p>
                <ul className="flex flex-col gap-1">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={onNavigate}
                        className="group block rounded-[var(--radius-control)] px-3 py-2.5 -mx-3 transition-colors duration-200 hover:bg-surface-2"
                      >
                        <span className="block text-[0.9375rem] font-medium text-ink transition-colors group-hover:text-accent">
                          {link.label}
                        </span>
                        <span className="mt-0.5 block text-sm leading-snug text-muted">
                          {link.description}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <Link
              href={`/work/${featured.id}`}
              onClick={onNavigate}
              className="group col-span-3 overflow-hidden rounded-[var(--radius-surface)] border border-line bg-canvas transition-colors duration-200 hover:border-line-strong"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={featured.image.src}
                  alt={featured.image.alt}
                  fill
                  sizes="320px"
                  className="object-cover transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-5">
                <p className="text-sm text-muted">{featured.client}</p>
                <p className="mt-1.5 text-[0.9375rem] font-medium leading-snug text-ink text-pretty">
                  {featured.title}
                </p>
                <ArrowUpRight
                  size={16}
                  weight="regular"
                  aria-hidden="true"
                  className="mt-3 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
            </Link>
          </div>
        ) : (
          <ul className="grid grid-cols-3 gap-x-10 gap-y-1">
            {industries.map((industry) => (
              <li key={industry.id}>
                <a
                  href="/#industries"
                  onClick={onNavigate}
                  className="group flex gap-3 rounded-[var(--radius-control)] px-3 py-3 -mx-3 transition-colors duration-200 hover:bg-surface-2"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={industry.icon}
                    alt=""
                    aria-hidden="true"
                    width={32}
                    height={32}
                    className="mt-0.5 size-8 shrink-0"
                  />
                  <span className="block">
                    <span className="block text-[0.9375rem] font-medium text-ink transition-colors group-hover:text-accent">
                      {industry.name}
                    </span>
                    <span className="mt-0.5 block max-w-[38ch] text-sm leading-snug text-muted">
                      {industry.body}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}
