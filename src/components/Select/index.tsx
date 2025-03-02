import React from "react";

import cx from "classnames";

import {
  Select as ShadSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import { RenderIf } from "../shared";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

interface IProps {
  placeholder?: string;
  label?: string;
  selectData: Array<{ value: string; label: string }>;
  className?: string;
  classIcon?: string;
  // classTrigger?: string;
  value: string;
  iconBefore?: string | StaticImport;
  onChange: (value: string) => void;
}

const Select = (props: IProps) => {
  const {
    placeholder,
    selectData,
    label,
    className = "w-full h-[54px] !ml-0 rounded-[10px]",
    classIcon,
    // classTrigger = 'w-full h-[54px] rounded-[10px]',
    value,
    iconBefore,
    onChange,
  } = props;
  return (
    <ShadSelect
      defaultValue={value}
      onValueChange={(value) => {
        onChange(value);
      }}
    >
      <SelectGroup>
        <RenderIf condition={!!label}>
          <SelectLabel className="pl-0">{label}</SelectLabel>
        </RenderIf>
        <SelectTrigger
          className={cx({
            [`${className}`]: !!className,
          })}
        >
          <div className="flex items-center">
            {iconBefore ? (
              <Image src={iconBefore} className={classIcon} alt="" />
            ) : (
              ""
            )}
            <SelectValue placeholder={placeholder} />
          </div>
        </SelectTrigger>
        <SelectContent>
          {selectData.map((sel, index) => (
            <SelectItem key={index} value={sel.value}>
              {sel.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectGroup>
    </ShadSelect>
  );
};

export default Select;
