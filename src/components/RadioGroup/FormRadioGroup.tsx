import React from "react";

import { twMerge } from "tailwind-merge";

import {
  RadioGroup as ShadCnRadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RenderIf } from "../shared";

// NOTE: Must be used within a form i.e. React hook form and shadcn form
interface IProps {
  options: { value: string; label: string; id: string; description?: string }[];
  value: string;
  onChange: (val: string) => void;
  className?: string;
  itemClassName?: string;
}

const FormRadioGroup = (props: IProps) => {
  const {
    options,
    value,
    onChange,
    className = "",
    itemClassName = "",
  } = props;
  return (
    <FormItem>
      <FormControl>
        <ShadCnRadioGroup
          onValueChange={onChange}
          value={value}
          className={className}
        >
          {options.map(({ value, label, id, description }) => (
            <FormItem
              className={twMerge(
                " space-y-0 py-6 border-t border-neutral-350",
                itemClassName,
              )}
              key={id}
            >
              <div className="flex items-center gap-2">
                <FormControl>
                  <RadioGroupItem value={value} />
                </FormControl>
                <FormLabel className="text-neutral-600 text-base font-medium leading-[19.2px]">
                  {label}
                </FormLabel>
              </div>
              <RenderIf condition={!!description}>
                <FormDescription className="pt-1 px-7  text-sm text-neutral-1000">
                  {description}
                </FormDescription>
              </RenderIf>
            </FormItem>
          ))}
        </ShadCnRadioGroup>
      </FormControl>
    </FormItem>
  );
};

export default FormRadioGroup;
