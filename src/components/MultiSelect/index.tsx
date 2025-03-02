"use client";
import React from "react";
import Image from "next/image";

import Multiselect from "multiselect-react-dropdown";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import cx from "classnames";

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import authAssets from "@/lib/assets/Auth";

const style: any = {
  multiselectContainer: {
    // To change css for multiselect (Width,height,etc..)
    width: "100%",
    background: "white",
  },
  searchBox: {
    // To change search box element look
    height: "54px",
    fontSize: "14px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
  },
  inputField: {
    // To change input field position or margin
    margin: "5px",
    width: "100%",
  },
  chips: {
    // To change css chips(Selected options)
    background: "#F8F8FD",
    color: "var(--primary)",
  },
  optionContainer: {
    // To change css for option container
    border: "1px solid #E2E8F0",
    background: "white",
  },
  option: {
    // To change css for dropdown options
    color: "#667185",
    fontWeight: 500,
    textSize: "16px",
  },
  groupHeading: {
    // To change group heading style
  },
};

const options = [
  { name: "Option", id: 1 },
  { name: "Option 2", id: 2 },
  { name: "Option 3", id: 3 },
  { name: "Option 4", id: 4 },
];

interface IProps {
  label?: string;
  containerClass?: string;
  // NOTE:typescript made me use this, I think it is linked to how the schema of the form is defined
  error?:
    | Merge<
        FieldError,
        (
          | Merge<FieldError, FieldErrorsImpl<{ name: string; id: number }>>
          | undefined
        )[]
      >
    | undefined;
  required?: boolean;
  id?: string;
  placeholder?: string;
  hidePlaceholder?: boolean;
  onSelect: (val: any) => void;
  selected: any;
}

/**
 *
 * NOTE: Must be used in a Form(shadcn form)
 */

const MultiselectComponent = (props: IProps) => {
  const {
    label,
    required = false,
    containerClass,
    error,
    id,
    placeholder = "Start typing to search for skills",
    hidePlaceholder = true,
    onSelect,
    selected,
  } = props;
  // const [selected, setSelected] = useState<Array<any>>([]);
  return (
    <>
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
        <FormControl>
          <Multiselect
            options={options}
            selectedValues={selected}
            onSelect={(selectList /* , selectedItem */) => {
              // setSelected((prev) => [...prev, selectedItem]);
              onSelect(selectList);
              // console.log({ selectList }, { selectedItem });
            }}
            onRemove={(selectList, removedItem) => {
              false && console.log({ selectList }, { removedItem });
              onSelect(selectList);
            }}
            displayValue="name"
            style={style}
            placeholder={placeholder}
            customCloseIcon={
              <Image
                alt=""
                src={authAssets.multiselectcloseIcon}
                className="w-[12.01px] h-[12px] mx-2 cursor-pointer"
              />
            }
            avoidHighlightFirstOption
            keepSearchTerm
            selectionLimit={-1}
            loading={false}
            hidePlaceholder={hidePlaceholder}
          />
        </FormControl>
        {!!error && <FormMessage className="text-xs" />}
      </FormItem>
    </>
  );
};

export default MultiselectComponent;
