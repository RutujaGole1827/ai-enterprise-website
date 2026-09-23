"use client";

import * as React from "react";
import { Moon, Sun } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

export const THEME_STORAGE_KEY = "exponentia-theme";

/**
 * Runs before paint in <head> so the correct theme is on <html> for the first
 * frame. Defaults to the operating system preference; an explicit choice is
 * remembered. Kept as a string because it must be inlined, not hydrated.
 */
export const themeInitScript = `
(function(){
  try {
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var dark = stored ? stored === 'dark' : prefersDark;
    document.documentElement.classList.toggle('dark', dark);
  } catch (e) {
    document.documentElement.classList.toggle(
      'dark',
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  }
})();
`;

export function ThemeToggle({ className }: { className?: string }) {
  const [isDark, setIsDark] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  // Follow the OS while the visitor has not made an explicit choice.
  React.useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => {
      if (localStorage.getItem(THEME_STORAGE_KEY)) return;
      document.documentElement.classList.toggle("dark", event.matches);
      setIsDark(event.matches);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggle = React.useCallback(() => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light");
    } catch {
      // Storage can be unavailable in private modes. The toggle still works
      // for this page view; it just will not be remembered.
    }
    setIsDark(next);
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        mounted
          ? isDark
            ? "Switch to light theme"
            : "Switch to dark theme"
          : "Switch theme"
      }
      aria-pressed={mounted ? isDark : undefined}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-[var(--radius-control)]",
        "border border-line bg-surface text-ink",
        "transition-colors duration-200 hover:border-line-strong hover:bg-surface-2",
        "active:translate-y-[1px]",
        className,
      )}
    >
      {mounted && isDark ? (
        <Sun size={18} weight="regular" />
      ) : (
        <Moon size={18} weight="regular" />
      )}
    </button>
  );
}
