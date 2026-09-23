import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Button. shadcn / 21st.dev component contract (CVA variants + `asChild`),
 * restyled onto this project's tokens rather than shipped in default state.
 *
 * SHAPE LOCK: interactive controls use --radius-control (10px).
 * CONTRAST: every variant pairs an explicit foreground with its background.
 *   primary   accent bg        + accent-contrast text  (4.97:1 light, 7.36:1 dark)
 *   secondary surface bg       + ink text, 3:1 --control-border boundary
 *   ghost     transparent      + ink text, visible 1px border on hover/focus
 */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-[var(--radius-control)] font-medium",
    "transition-[background-color,border-color,color,transform,box-shadow]",
    "duration-200 ease-[var(--ease-out-expo)]",
    "active:translate-y-[1px]",
    "disabled:pointer-events-none disabled:opacity-55",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-contrast hover:bg-accent-hover shadow-[var(--shadow-card)]",
        secondary:
          "bg-surface text-ink border border-control-border hover:border-ink hover:bg-surface-2",
        ghost:
          "bg-transparent text-ink border border-transparent hover:border-control-border hover:bg-surface-2",
      },
      size: {
        sm: "h-9 px-3.5 text-sm",
        md: "h-11 px-5 text-[0.9375rem]",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ className, variant, size, asChild = false, ...props }, ref) {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);

export { buttonVariants };
