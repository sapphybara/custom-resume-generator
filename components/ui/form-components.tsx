import * as React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

interface FormInputProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  className?: string;
  required?: boolean;
}

const FormInput = ({
  name,
  label,
  placeholder,
  type = "text",
  className,
  required,
  ...props
}: FormInputProps) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel
            htmlFor={name}
            className={
              required ? "after:content-['*'] after:text-red-500 gap-1" : ""
            }
          >
            {label}
          </FormLabel>
          <FormControl>
            <Input
              id={name}
              type={type}
              placeholder={placeholder}
              className={className}
              required={required}
              {...field}
              {...props}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

interface PrefixInputProps extends FormInputProps {
  prefix: string;
}

const PrefixInput = ({
  name,
  label,
  placeholder,
  prefix,
  className,
  required,
  ...props
}: PrefixInputProps) => {
  const form = useFormContext();
  // Calculate padding based on prefix length
  const paddingClass = prefix === "linkedin.com/in/" ? "pl-28" : "pl-20";

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel
            htmlFor={name}
            className={
              required
                ? "after:content-['*'] after:text-red-500 after:ml-1"
                : ""
            }
          >
            {label}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm select-none">
                {prefix}
              </span>
              <Input
                id={name}
                placeholder={placeholder}
                className={cn(paddingClass, className)}
                {...field}
                {...props}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

interface FormTextAreaProps {
  name: string;
  label: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  rows?: number;
}

const FormTextArea = ({
  name,
  label,
  placeholder,
  className,
  required,
  rows = 4,
  ...props
}: FormTextAreaProps) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel
            htmlFor={name}
            className={
              required
                ? "after:content-['*'] after:text-red-500 after:ml-1"
                : ""
            }
          >
            {label}
          </FormLabel>
          <FormControl>
            <Textarea
              id={name}
              placeholder={placeholder}
              className={className}
              required={required}
              rows={rows}
              {...field}
              {...props}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

interface GridContainerProps {
  children: React.ReactNode;
  cols?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: number;
  className?: string;
}

const GridContainer: React.FC<GridContainerProps> = ({
  children,
  gap = 4,
  className,
}) => {
  const gridClasses = [
    `grid`,
    `gap-${gap}`,
    "grid-cols-1",
    "md:grid-cols-2",
    "lg:grid-cols-3",
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={cn(gridClasses, className)}>{children}</div>;
};

export { FormInput, PrefixInput, FormTextArea, GridContainer };
