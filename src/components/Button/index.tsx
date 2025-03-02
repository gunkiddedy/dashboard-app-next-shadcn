import React from "react";
import Image from "next/image";

import cx from "classnames";

import { Button as ShadCNButton } from "@/components/ui/button";
import Loader from "../Loader";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  variant?: "default" | "danger" | "outline" | "secondary" | "ghost" | "link";
  icon?: string;
  iconAfter?: string | StaticImport;
  iconBefore?: string | StaticImport;
  loading?: boolean;
  size?: "default" | "sm" | "lg" | "icon";
  classIcon?: string;
  classIconAfter?: string;
  classIconBefore?: string;
}

const Button = (props: IButton) => {
  const {
    label,
    variant,
    icon,
    iconAfter,
    iconBefore,
    loading,
    className,
    disabled,
    type = "submit",
    classIcon = "w-[17px] h-[17px]",
    classIconAfter = "",
    classIconBefore = "",
    ...rest
  } = props;
  return (
    <>
      <ShadCNButton
        disabled={loading || disabled}
        variant={variant}
        className={cx(
          className,
          {
            "border-neutral-500 bg-neutral-150 cursor-not-allowed": disabled,
          },
          { "cursor-progress opacity-85": loading },
          { "flex gap-4": loading || !!iconAfter || !!icon },
        )}
        type={type}
        {...rest}
      >
        {loading ? <Loader /> : null}
        {icon ? <Image src={icon} className={classIcon} alt="" /> : ""}
        {iconBefore ? (
          <Image
            src={iconBefore}
            className={`${classIconBefore} pr-1`}
            alt=""
          />
        ) : (
          ""
        )}
        {label}
        {iconAfter ? (
          <Image src={iconAfter} className={`${classIconAfter} pl-1`} alt="" />
        ) : (
          ""
        )}
      </ShadCNButton>
    </>
  );
};

export default Button;
