import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "relative inline-flex items-center rounded-xl border px-2.5 py-0.5 text-xs font-light transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 overflow-hidden group",
  {
    variants: {
      variant: {
        default:
          "border-violet-400/50 bg-gradient-to-r from-violet-900/80 to-purple-900/80 text-violet-200 shadow hover:text-white hover:border-violet-300",
        secondary:
          "border-violet-400/50 bg-gradient-to-r from-violet-950/80 to-indigo-950/80 text-violet-300 hover:text-white hover:border-violet-300",
        destructive:
          "border-red-400/50 bg-gradient-to-r from-red-900/80 to-red-950/80 text-red-200 shadow hover:text-white hover:border-red-300",
        outline:
          "border-violet-400/30 text-violet-200 hover:text-white hover:border-violet-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <span className="relative z-10">{props.children}</span>
      <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
    </div>
  );
}

export { Badge, badgeVariants };
