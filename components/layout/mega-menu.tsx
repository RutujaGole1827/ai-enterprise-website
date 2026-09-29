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
 * intent, Escape handling, click-outside and focus return.
 *
 * Every panel below is built from one data-driven card
 * (`MegaMenuCard`) instead of five bespoke layouts — icon, title, an
 * optional one-line description and an arrow that shifts on hover, the
 * same shape the "Deep Engineering on Leading Platforms" cards on the
 * redesign reference use (soft resting border, a firmer border + lift on
 * hover, no bounce/glassmorphism/neon), adapted to this project's own
 * tokens rather than copied.
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
      className="absolute inset-x-0 top-full hidden justify-center px-4 pt-3 xl:flex"
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
          className="relative max-h-[75vh] overflow-y-auto p-8"
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

/**
 * One card, reused by every panel: a small icon badge, a title with an
 * arrow that shifts right on hover, and an optional one-line description.
 * Resting state is a transparent border on the panel's own surface;
 * hovering firms the border, tints the background, lifts the card ~2px
 * and puts a soft accent ring behind the icon — deliberately restrained
 * next to the reference site's own hover (no scale-bounce, no
 * grayscale-to-color reveal, no glassmorphism), and entirely
 * `transition-*` based, no per-card JS.
 */
function MegaMenuCard({
  href,
  icon,
  iconElement,
  label,
  description,
  onNavigate,
  compact = false,
}: {
  href: string;
  icon?: string;
  iconElement?: React.ReactNode;
  label: string;
  description?: string;
  onNavigate: () => void;
  compact?: boolean;
}) {
  return (
    <motion.a
      href={href}
      onClick={onNavigate}
      variants={ITEM_VARIANTS}
      className={cn(
        "group flex flex-col gap-3 rounded-[var(--radius-control)] border border-transparent transition-[background-color,border-color,transform] duration-200 ease-out hover:-translate-y-[2px] hover:border-line hover:bg-surface-2",
        compact ? "p-3" : "p-4",
      )}
    >
      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent transition-shadow duration-200 group-hover:shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_14%,transparent)]">
        {icon ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={icon}
            alt=""
            aria-hidden="true"
            width={18}
            height={18}
            className="size-[18px] object-contain"
          />
        ) : (
          iconElement
        )}
      </span>
      <span className="flex flex-col gap-1">
        <span className="flex items-center gap-1.5 text-[0.9375rem] font-medium text-ink transition-colors duration-200 group-hover:text-accent">
          {label}
          <ArrowUpRight
            size={13}
            weight="bold"
            aria-hidden="true"
            className="shrink-0 text-muted transition-[transform,color] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
          />
        </span>
        {description ? (
          <span className="block text-sm leading-snug text-muted transition-colors duration-200 group-hover:text-ink/80">
            {description}
          </span>
        ) : null}
      </span>
    </motion.a>
  );
}

function ExpertisePanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {expertiseMenu.map((item, i) => {
        const Icon = EXPERTISE_ICONS[i % EXPERTISE_ICONS.length];
        return (
          <MegaMenuCard
            key={item.label}
            href={item.href}
            label={item.label}
            description={item.description}
            onNavigate={onNavigate}
            iconElement={<Icon size={17} weight="regular" aria-hidden="true" />}
          />
        );
      })}
    </div>
  );
}

function SolutionsPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="flex flex-col gap-8">
      {solutionsMenu.map((column) => (
        <div key={column.heading}>
          <p className="mb-3 text-sm font-semibold text-ink">{column.heading}</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {column.links.map((link) => (
              <MegaMenuCard
                key={link.label}
                href={link.href}
                label={link.label}
                description={link.description}
                icon={link.icon}
                onNavigate={onNavigate}
                compact
              />
            ))}
          </div>
        </div>
      ))}

      <Link
        href={`/work/${featured.id}`}
        onClick={onNavigate}
        className="group flex items-center gap-5 overflow-hidden rounded-[var(--radius-surface)] border border-line bg-canvas p-4 transition-colors duration-200 hover:border-line-strong"
      >
        <div className="relative aspect-[16/9] w-40 shrink-0 overflow-hidden rounded-[var(--radius-control)]">
          <Image
            src={featured.image.src}
            alt={featured.image.alt}
            fill
            sizes="160px"
            className="object-cover transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm text-muted">{featured.client}</p>
          <p className="mt-1 text-[0.9375rem] font-medium leading-snug text-ink text-pretty">
            {featured.title}
          </p>
        </div>
        <ArrowUpRight
          size={16}
          weight="regular"
          aria-hidden="true"
          className="shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </Link>
    </div>
  );
}

function IndustriesPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
      {industries.map((industry) => (
        <MegaMenuCard
          key={industry.id}
          href={industry.href}
          label={industry.name}
          description={industry.body}
          icon={industry.icon}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
}

function PartnersPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
      {partnersMenu.map((partner) => (
        <MegaMenuCard
          key={partner.name}
          href={partner.href}
          label={partner.name}
          description={partner.description}
          icon={partner.icon}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
}

function InsightsPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
      {insightsMenu.map((item) => (
        <MegaMenuCard
          key={item.label}
          href={item.href}
          label={item.label}
          description={item.description}
          icon={item.icon}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
}
