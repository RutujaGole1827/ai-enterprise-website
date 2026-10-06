"use client";

import * as React from "react";
import { CaretDown } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

/**
 * One command-bar dropdown. A native-feeling listbox built from scratch
 * (not a checkbox sidebar): a single button that opens a short menu,
 * closes on outside click/Escape, and reports the chosen value up.
 */
export function FilterDropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onDocClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-[var(--radius-control)] border px-3.5 text-sm font-medium transition-colors",
          value !== "all"
            ? "border-accent/40 bg-accent/[0.06] text-ink"
            : "border-control-border bg-surface text-ink hover:border-line-strong",
        )}
      >
        {value === "all" ? label : value}
        <CaretDown size={13} weight="bold" aria-hidden="true" className="text-muted" />
      </button>

      {open ? (
        <ul
          role="listbox"
          className="absolute left-0 top-[calc(100%+6px)] z-20 min-w-[12rem] overflow-hidden rounded-[var(--radius-control)] border border-control-border bg-surface py-1.5 shadow-[var(--shadow-lift)]"
        >
          <li>
            <button
              type="button"
              role="option"
              aria-selected={value === "all"}
              onClick={() => {
                onChange("all");
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center px-3.5 py-2 text-left text-sm transition-colors hover:bg-surface-2",
                value === "all" ? "font-semibold text-accent" : "text-muted",
              )}
            >
              All {label.toLowerCase()}
            </button>
          </li>
          {options.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                role="option"
                aria-selected={value === opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center px-3.5 py-2 text-left text-sm transition-colors hover:bg-surface-2",
                  value === opt ? "font-semibold text-accent" : "text-ink",
                )}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
