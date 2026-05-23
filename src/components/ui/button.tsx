import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-body font-medium text-sm transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-ink shadow-sm hover:bg-primary-hover hover:shadow-lift active:bg-primary-active active:shadow-press rounded-pill",
        green:
          "bg-hero-green text-white shadow-sm hover:bg-hero-green-hover hover:shadow-lift active:shadow-press rounded-pill",
        "outline-on-dark":
          "border border-white/40 text-white hover:bg-white/10 rounded-pill",
        "outline-green":
          "border border-hero-green text-hero-green hover:bg-hero-green/5 rounded-pill",
        outline:
          "border border-hairline text-ink hover:bg-canvas-parchment rounded-pill",
        ghost: "text-ink hover:bg-canvas-parchment rounded-pill",
      },
      size: {
        default: "h-11 px-6",
        lg: "h-12 px-7 text-base",
        sm: "h-9 px-4",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
