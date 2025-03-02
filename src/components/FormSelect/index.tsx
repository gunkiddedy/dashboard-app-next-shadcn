import React, { SelectHTMLAttributes } from "react";
import {
  Select as ShadSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import cx from "classnames";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { FieldError } from "react-hook-form";
import { cn } from "@/lib/utils";

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
  placeholder: string;
  label?: string;
  selectData: { value: string; label: string }[];
  disabled?: boolean;
  error?: FieldError;
  containerClass?: string;
  className?: string;
  subText?: string;
  onChange: (e: any) => void;
  value: string;
}

/**
 *
 * NOTE: Must be used in a Form(shadcn form)
 */

const FormSelect = (props: IProps) => {
  const {
    selectData,
    label,
    disabled,
    className,
    id,
    error,
    required,
    containerClass,
    subText,
    onChange,
    value,
    placeholder,
  } = props;
  return (
    <FormItem
      className={cx(
        "space-y-0",
        { "flex flex-col gap-1": !!label },
        { [`${containerClass}`]: !!containerClass },
      )}
    >
      {label ? (
        <FormLabel
          className={cx(
            "text-sm font-medium leading-[1.4rem] text-secondary-100",
            {
              "text-danger-100": !!error,
            },
          )}
          htmlFor={id}
        >
          {label} {required && <span className="text-danger-50">*</span>}
        </FormLabel>
      ) : null}
      {/* <FormLabel className="pl-0">{label}</FormLabel> */}
      <ShadSelect
        disabled={!!disabled}
        onValueChange={(val: string) => {
          if (val) onChange(val);
        }}
        value={value}
      >
        <FormControl>
          <SelectTrigger
            className={cn("!w-full h-[54px] rounded-[10px]", className)}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {selectData.map(({ value, label }, index) => (
            <SelectItem key={index} value={value.toString()}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </ShadSelect>
      {!!error && <FormMessage className="text-xs" />}
      {subText && (
        <p className="mt-0.5 text-xs font-normal leading-4 text-neutral-600">
          {subText}
        </p>
      )}
    </FormItem>
  );
};

export default FormSelect;
