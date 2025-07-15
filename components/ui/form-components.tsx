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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { MoveUpRightIcon } from "lucide-react";

interface FormInputProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  className?: string;
  required?: boolean;
}

interface InputFormControlProps extends Omit<FormInputProps, "label" | "type"> {
  field: ControllerRenderProps<FieldValues, string>;
  prefix?: string;
  type: string;
}

const isValidURL = (value: string) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

const InputFormControl = ({
  field,
  name,
  placeholder,
  prefix,
  ...props
}: InputFormControlProps) => {
  const hasPrefix = Boolean(prefix);
  let urlToShow: string | undefined;
  if (name === "linkedin") {
    urlToShow = `https://www.linkedin.com/in/${field.value}`;
  } else if (isValidURL(field.value)) {
    urlToShow = field.value;
  }

  return (
    <FormControl>
      <div className="relative">
        {hasPrefix && (
          <span className="absolute left-3 top-[52%] transform -translate-y-1/2 text-gray-400 text-sm select-none">
            {prefix}
          </span>
        )}
        <Input
          id={name}
          placeholder={placeholder}
          className={cn(hasPrefix && "pl-28")}
          {...field}
          {...props}
        />
        {urlToShow && (
          <Button
            asChild
            className="absolute right-1 top-[52%] transform -translate-y-1/2 size-8"
            variant="ghost"
            size="icon"
          >
            <a href={urlToShow} target="_blank" rel="noopener noreferrer">
              <MoveUpRightIcon />
            </a>
          </Button>
        )}
      </div>
    </FormControl>
  );
};

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
        <FormItem className={className}>
          <FormLabel
            htmlFor={name}
            className={cn(
              required && "after:content-['*'] after:text-red-500 gap-1"
            )}
          >
            {label}
          </FormLabel>
          <InputFormControl
            name={name}
            type={type}
            placeholder={placeholder}
            required={required}
            field={field}
            {...props}
          />
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
  type = "text",
  ...props
}: PrefixInputProps) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel
            htmlFor={name}
            className={cn(
              required && "after:content-['*'] after:text-red-500 gap-1"
            )}
          >
            {label}
          </FormLabel>
          <InputFormControl
            field={field}
            name={name}
            placeholder={placeholder}
            prefix={prefix}
            type={type}
            required={required}
            {...props}
          />
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
    "sm:grid-cols-2",
    "md:grid-cols-3",
    "lg:grid-cols-4",
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={cn(gridClasses, className)}>{children}</div>;
};

export { FormInput, PrefixInput, FormTextArea, GridContainer };
