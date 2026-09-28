"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowsClockwise,
  ArrowUpRight,
  ChartLineUp,
  Compass,
  PuzzlePiece,
  Target,
  Wrench,
} from "@phosphor-icons/react";

import {
  caseStudies,
  expertiseMenu,
  industries,
  insightsMenu,
  partnersMenu,
  solutionsMenu,
  type NavMenuKey,
} from "@/lib/content";
import { Z } from "@/lib/z-index";
import { cn } from "@/lib/utils";

const EXPERTISE_ICONS = [Compass, PuzzlePiece, ArrowsClockwise, ChartLineUp, Wrench];

const featured = caseStudies.find((entry) => entry.featured) ?? caseStudies[0];

const PANEL_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.02 } },
};
const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Mega menu panel — a contained, rounded "command center" card below the
 * floating header pill (not a full-bleed strip): a soft gradient wash, a
 * thin border, backdrop blur and a cursor-following spotlight (the same
 * pointer-tracked CSS-variable technique this project's `SpotlightCard`
 * already uses elsewhere, reused here rather than reinvented). Content
 * staggers in on open (skipped under `prefers-reduced-motion`, where it
 * simply appears); the parent (site-header) owns open state, hover
 * intent, Escape handling and focus return.
 */
export function MegaMenu({
  menu,
  id,
  labelledBy,
  onNavigate,
  onMouseEnter,
}: {
  menu: NavMenuKey;
  id: string;
  labelledBy: string;
  onNavigate: () => void;
  onMouseEnter: () => void;
}) {
  const reduce = useReducedMotion();
  const panelRef = React.useRef<HTMLDivElement>(null);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = panelRef.current;
    if (!node) return;
    const box = node.getBoundingClientRect();
    node.style.setProperty("--spot-x", `${event.clientX - box.left}px`);
    node.style.setProperty("--spot-y", `${event.clientY - box.top}px`);
  };

  return (
    <motion.div
      id={id}
      role="region"
      aria-labelledby={labelledBy}
      onMouseEnter={onMouseEnter}
      initial={reduce ? false : { opacity: 0, y: -8, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduce ? undefined : { opacity: 0, y: -8, scale: 0.99 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={{ zIndex: Z.megaMenu }}
      className="absolute inset-x-0 top-full hidden justify-center px-4 pt-3 lg:flex"
    >
      <div
        ref={panelRef}
        onPointerMove={onPointerMove}
        className={cn(
          "group/panel relative isolate w-full max-w-[1200px] overflow-hidden rounded-[28px]",
          "border border-line bg-surface/95 shadow-[var(--shadow-lift)] backdrop-blur-2xl",
        )}
      >
        {/* Cursor-following spotlight + a faint standing gradient wash. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/panel:opacity-100"
          style={{
            background:
              "radial-gradient(28rem circle at var(--spot-x, 50%) var(--spot-y, 0%), color-mix(in oklab, var(--accent) 8%, transparent), transparent 70%)",
          }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
        />

        <motion.div
          initial={reduce ? false : "hidden"}
          animate="visible"
          variants={PANEL_VARIANTS}
          className="relative p-8"
        >
          {menu === "expertise" ? (
            <ExpertisePanel onNavigate={onNavigate} />
          ) : menu === "solutions" ? (
            <SolutionsPanel onNavigate={onNavigate} />
          ) : menu === "industries" ? (
            <IndustriesPanel onNavigate={onNavigate} />
          ) : menu === "partners" ? (
            <PartnersPanel onNavigate={onNavigate} />
          ) : (
            <InsightsPanel onNavigate={onNavigate} />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

function ExpertisePanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid grid-cols-5 gap-3">
      {expertiseMenu.map((item, i) => {
        const Icon = EXPERTISE_ICONS[i % EXPERTISE_ICONS.length];
        return (
          <motion.a
            key={item.label}
            href={item.href}
            onClick={onNavigate}
            variants={ITEM_VARIANTS}
            className="group flex flex-col gap-3 rounded-[var(--radius-control)] border border-transparent p-4 transition-colors duration-200 hover:border-line hover:bg-surface-2"
          >
            <span className="inline-flex size-9 items-center justify-center rounded-full bg-accent-soft text-accent">
              <Icon size={17} weight="regular" aria-hidden="true" />
            </span>
            <span className="block text-[0.9375rem] font-medium text-ink transition-colors group-hover:text-accent">
              {item.label}
            </span>
            <span className="block text-sm leading-snug text-muted">
              {item.description}
            </span>
          </motion.a>
        );
      })}
    </div>
  );
}

function SolutionsPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid grid-cols-12 gap-x-10 gap-y-8">
      {solutionsMenu.map((column) => (
        <div key={column.heading} className="col-span-3">
          <p className="mb-4 text-sm font-semibold text-ink">{column.heading}</p>
          <ul className="flex flex-col gap-1">
            {column.links.map((link) => (
              <motion.li key={link.label} variants={ITEM_VARIANTS}>
                <a
                  href={link.href}
                  onClick={onNavigate}
                  className="group block rounded-[var(--radius-control)] px-3 py-2 -mx-3 text-[0.9375rem] font-medium text-ink transition-colors duration-200 hover:bg-surface-2 hover:text-accent"
                >
                  {link.label}
                </a>
              </motion.li>
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
  );
}

function IndustriesPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <ul className="grid grid-cols-3 gap-x-10 gap-y-1">
      {industries.map((industry) => (
        <motion.li key={industry.id} variants={ITEM_VARIANTS}>
          <a
            href={industry.href}
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
        </motion.li>
      ))}
    </ul>
  );
}

function PartnersPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {partnersMenu.map((partner) => (
        <motion.a
          key={partner.name}
          href={partner.href}
          onClick={onNavigate}
          variants={ITEM_VARIANTS}
          className="group flex h-24 items-center justify-center rounded-[var(--radius-surface)] border border-line bg-canvas px-4 text-center transition-colors duration-200 hover:border-line-strong"
        >
          <span className="text-base font-semibold text-ink transition-colors group-hover:text-accent">
            {partner.name}
          </span>
        </motion.a>
      ))}
    </div>
  );
}

function InsightsPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <ul className="grid grid-cols-3 gap-2">
      {insightsMenu.map((item) => (
        <motion.li key={item.label} variants={ITEM_VARIANTS}>
          <a
            href={item.href}
            onClick={onNavigate}
            className="group flex items-center justify-between rounded-[var(--radius-control)] px-4 py-3.5 transition-colors duration-200 hover:bg-surface-2"
          >
            <span className="text-[0.9375rem] font-medium text-ink transition-colors group-hover:text-accent">
              {item.label}
            </span>
            <ArrowUpRight
              size={15}
              weight="regular"
              aria-hidden="true"
              className="text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
            />
          </a>
        </motion.li>
      ))}
    </ul>
  );
}
