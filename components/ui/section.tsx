import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "@/lib/utils";

const sectionVariants = cva("rounded-lg shadow-sm border", {
  variants: {
    variant: {
      default: "bg-zinc-50 dark:bg-zinc-800",
      highlighted: "bg-white dark:bg-gray-800",
      accent:
        "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
    },
    size: {
      default: "p-6",
      sm: "p-4",
      lg: "p-8",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const sectionHeaderVariants = cva("font-semibold mb-6 border-b pb-2", {
  variants: {
    size: {
      default: "text-xl",
      sm: "text-lg",
      lg: "text-2xl",
    },
    variant: {
      default: "text-gray-900 dark:text-white",
      muted: "text-gray-700 dark:text-gray-300",
    },
  },
  defaultVariants: {
    size: "default",
    variant: "default",
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  title?: string;
  headerVariant?: VariantProps<typeof sectionHeaderVariants>["variant"];
  headerSize?: VariantProps<typeof sectionHeaderVariants>["size"];
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      variant,
      size,
      title,
      headerVariant,
      headerSize,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <section
        className={cn(sectionVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {title && (
          <h2
            className={cn(
              sectionHeaderVariants({
                size: headerSize,
                variant: headerVariant,
              }),
            )}
          >
            {title}
          </h2>
        )}
        {children}
      </section>
    );
  },
);
Section.displayName = "Section";

export { Section, sectionVariants };
