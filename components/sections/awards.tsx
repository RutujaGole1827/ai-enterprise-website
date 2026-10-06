"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@phosphor-icons/react";

import { awards } from "@/lib/awards";
import { NumberTicker } from "@/components/ui/number-ticker";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTO_ROTATE_MS = 5500;

/**
 * Awards & Recognition — "Earned for Impact". A fixed light, always-in-its-
 * own-palette showcase (navy/charcoal on off-white, blue/violet accents)
 * rather than a themed section, the same kind of deliberate exception this
 * project's other signature panels carry (e.g. the partner pages' dark
 * FinalCta block) — a wall of physical recognitions reads as one fixed
 * object, not something the visitor's light/dark toggle should recolour.
 *
 * One featured award plus a horizontal selector rail beneath/beside it,
 * auto-advancing every 5.5s and pausing on hover/focus/reduced-motion.
 * Every award, title, organization and year is real, taken from the live
 * exponentia.ai homepage's own awards slider (see lib/awards.ts) — nothing
 * here is invented.
 */
export function Awards() {
  const reduce = useReducedMotion();
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const railRef = React.useRef<HTMLUListElement>(null);
  const count = awards.length;

  React.useEffect(() => {
    if (reduce || paused) return;
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % count);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(timer);
  }, [reduce, paused, count]);

  React.useEffect(() => {
    const rail = railRef.current;
    const item = rail?.querySelector<HTMLElement>(`[data-index="${active}"]`);
    item?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [active, reduce]);

  const goTo = (index: number) => setActive(((index % count) + count) % count);
  const featured = awards[active];

  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section
      id="awards"
      className="section-y min-h-section relative overflow-hidden border-b border-line bg-[#F7F8FA]"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setPaused(false);
        }
      }}
    >
      <AwardsBackdrop reduce={!!reduce} />

      <div className="shell relative z-10">
        <motion.div {...enter(0)} className="flex max-w-[46rem] flex-col gap-4">
          <p className="text-xs font-semibold tracking-[0.16em] text-[#3B6FE8]">
            AWARDS &amp; RECOGNITION
          </p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#0B1220] text-balance sm:text-4xl">
              Earned for Impact
            </h2>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0B1220]/10 bg-white px-3.5 py-1.5 text-xs font-semibold tracking-[0.04em] text-[#0B1220]">
              <NumberTicker value={count} />+ INDUSTRY RECOGNITIONS
            </span>
          </div>
          <p className="max-w-[62ch] text-base leading-relaxed text-[#475569]">
            Recognition from leading technology platforms and industry
            organizations for the impact we create through AI, data and
            digital transformation.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          <motion.div {...enter(0.08)} className="lg:col-span-5">
            <FeaturedCard award={featured} reduce={!!reduce} />
          </motion.div>

          <motion.div {...enter(0.16)} className="flex flex-col gap-4 lg:col-span-7">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[#475569]">
                {active + 1} / {count}
              </p>
              <div className="flex gap-2">
                <NavButton
                  label="Previous award"
                  onClick={() => goTo(active - 1)}
                >
                  <ArrowLeft size={16} weight="bold" />
                </NavButton>
                <NavButton label="Next award" onClick={() => goTo(active + 1)}>
                  <ArrowRight size={16} weight="bold" />
                </NavButton>
              </div>
            </div>

            <ul
              ref={railRef}
              className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {awards.map((award, index) => (
                <li key={award.id} data-index={index} className="shrink-0 snap-start">
                  <SelectorItem
                    award={award}
                    active={index === active}
                    onSelect={() => goTo(index)}
                  />
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({
  award,
  reduce,
}: {
  award: (typeof awards)[number];
  reduce: boolean;
}) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-[#0B1220]/10 bg-white p-7 shadow-[0_1px_2px_rgba(11,18,32,0.04)] sm:p-9">
      {/* soft ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-[#4D9FFF] opacity-[0.08] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-10 size-56 rounded-full bg-[#8067FF] opacity-[0.07] blur-3xl"
      />
      {/* oversized translucent year */}
      {award.year ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-6 right-2 select-none text-[6.5rem] font-bold leading-none tracking-tighter text-[#0B1220]/[0.05] sm:text-[8rem]"
        >
          {award.year.slice(0, 4)}
        </span>
      ) : null}
      {/* fine grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#0B1220 1px, transparent 1px), linear-gradient(90deg, #0B1220 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={award.id}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="relative flex flex-col gap-6"
        >
          <div className="relative mx-auto aspect-[4/3] w-full max-w-[220px] overflow-hidden rounded-2xl border border-[#0B1220]/10 bg-[#F7F8FA]">
            <Image
              src={award.image.src}
              alt={award.image.alt}
              fill
              sizes="220px"
              className="object-contain p-4"
            />
          </div>

          <div className="flex flex-col gap-2 text-center">
            <p className="text-xs font-semibold tracking-[0.1em] text-[#3B6FE8]">
              {award.organization.toUpperCase()}
            </p>
            <h3 className="text-xl font-semibold leading-snug tracking-[-0.02em] text-[#0B1220] text-balance">
              {award.title}
            </h3>
            {award.year ? (
              <p className="text-sm text-[#475569]">{award.year}</p>
            ) : null}
            <p className="mx-auto mt-1 max-w-[36ch] text-[0.9375rem] leading-relaxed text-[#475569]">
              {award.description}
            </p>
          </div>

          <div className="flex justify-center border-t border-[#0B1220]/8 pt-5">
            <a
              href={award.image.src}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.08em] text-[#0B1220] transition-colors hover:text-[#3B6FE8]"
            >
              VIEW RECOGNITION
              <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
            </a>
          </div>

          {/* connected-ecosystem indicator */}
          <div className="flex items-center justify-center gap-2" aria-hidden="true">
            {awards.map((a) => (
              <span
                key={a.id}
                className={cn(
                  "size-1.5 rounded-full transition-colors duration-300",
                  a.id === award.id ? "bg-[#3B6FE8]" : "bg-[#0B1220]/12",
                )}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function SelectorItem({
  award,
  active,
  onSelect,
}: {
  award: (typeof awards)[number];
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      aria-label={`${award.title}${award.year ? `, ${award.year}` : ""}`}
      className={cn(
        "group flex w-[15.5rem] items-center gap-3 rounded-2xl border bg-white p-3 text-left transition-[transform,border-color,box-shadow] duration-300",
        active
          ? "border-[#3B6FE8]/40 shadow-[0_0_0_3px_rgba(59,111,232,0.08)]"
          : "border-[#0B1220]/10 hover:-translate-y-0.5 hover:border-[#0B1220]/20 hover:shadow-[0_0_0_3px_rgba(128,103,255,0.06)]",
      )}
    >
      <span className="relative size-11 shrink-0 overflow-hidden rounded-xl border border-[#0B1220]/10 bg-[#F7F8FA]">
        <Image
          src={award.image.src}
          alt=""
          aria-hidden="true"
          fill
          sizes="44px"
          className={cn(
            "object-contain p-1 transition-opacity",
            active ? "opacity-100" : "opacity-80 group-hover:opacity-100",
          )}
        />
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="truncate text-sm font-medium leading-snug text-[#0B1220]">
          {award.title}
        </span>
        <span className="text-xs text-[#475569]">
          {award.year ?? award.organization}
        </span>
      </span>
      <ArrowRight
        size={14}
        weight="bold"
        aria-hidden="true"
        className={cn(
          "ml-auto shrink-0 text-[#3B6FE8] transition-opacity",
          active ? "opacity-100" : "opacity-0 group-hover:opacity-60",
        )}
      />
    </button>
  );
}

function NavButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex size-10 items-center justify-center rounded-full border border-[#0B1220]/12 bg-white text-[#0B1220] transition-colors duration-200 hover:bg-[#0B1220] hover:text-white active:translate-y-[1px]"
    >
      {children}
    </button>
  );
}

function AwardsBackdrop({ reduce }: { reduce: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-70">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 22% 20%, rgba(77,159,255,0.07), transparent 70%), radial-gradient(55% 50% at 85% 75%, rgba(128,103,255,0.06), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(#0B1220 1px, transparent 1px), linear-gradient(90deg, #0B1220 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(70% 70% at 50% 40%, black, transparent 100%)",
          opacity: 0.04,
        }}
      />
      {!reduce ? (
        <div
          className="absolute right-[8%] top-[18%] size-72 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(77,159,255,0.10), transparent 70%)",
            animation: "awards-drift 14s ease-in-out infinite",
          }}
        />
      ) : null}
      <style>{`
        @keyframes awards-drift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-16px, 12px); }
        }
      `}</style>
    </div>
  );
}
