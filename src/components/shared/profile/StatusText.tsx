import React from "react";

import cx from "classnames";

import { capitalizeFirstLetter } from "@/utils";

interface IProps {
  text: "active" | "inactive" | "pending";
}

const StatusText = ({ text }: IProps) => {
  return (
    <div
      className={cx("w-17 h-7 flex items-center justify-center rounded-lg", {
        "bg-success-50": text === "active",
        "bg-danger-200": text === "inactive",
        "bg-warning-50": text === "pending",
      })}
    >
      <p
        className={cx("text-xs font-bold", {
          "text-success-100": text === "active",
          "text-danger-50 ": text === "inactive",
          "text-warning-500 ": text === "pending",
        })}
      >
        {capitalizeFirstLetter(text)}
      </p>
    </div>
  );
};

export default StatusText;
