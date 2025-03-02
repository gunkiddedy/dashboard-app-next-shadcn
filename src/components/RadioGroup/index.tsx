import React from "react";

import { Label } from "@/components/ui/label";
import {
  RadioGroup as ShadCnRadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

// NOTE: Can be used outside a form
interface IProps {
  options: { value: string; label: string; id: string }[];
  value?: string;
  defaultValue: string;
  onChange: (e: string) => void;
}

const RadioGroup = (props: IProps) => {
  const { options, defaultValue } = props;
  return (
    <ShadCnRadioGroup
      defaultValue={defaultValue}
      onValueChange={(e) => {
        console.log("e is", e);
      }}
      className="flex"
    >
      {options.map(({ value, label, id }) => (
        <div key={id} className="flex items-center space-x-2">
          <RadioGroupItem value={value} id={id} />
          <Label
            className="text-neutral-600 text-xs font-normal leading-[19.2px]"
            htmlFor={id}
          >
            {label}
          </Label>
        </div>
      ))}
    </ShadCnRadioGroup>
  );
};

export default RadioGroup;
