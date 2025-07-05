import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-xl border px-2.5 py-0.5 text-xs font-light transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-[#0B001A] bg-tranparent text-[#0B001A] shadow hover:bg-[#670EE2]/90 hover:text-white hover:border-transparent",
        secondary:
          "border-[#0B001A] bg-secondary text-secondary-foreground hover:bg-[#670EE2]/90 hover:text-white hover:border-transparent",
        destructive:
          "border-[#0B001A] bg-destructive text-destructive-foreground shadow hover:bg-[#670EE2]/90 hover:text-white hover:border-transparent",
        outline:
          "text-foreground hover:bg-[#670EE2]/90 hover:text-white hover:border-transparent",
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
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
