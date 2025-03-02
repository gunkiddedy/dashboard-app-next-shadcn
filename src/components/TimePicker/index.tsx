import React from "react";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import cx from "classnames";
import ReactTimePicker from "react-time-picker";

import { RenderIf } from "../shared";
import { FieldError } from "react-hook-form";

interface IProps {
  onChange: (val: any) => void;
  value: any;
  label: string;
  name: string;
  error?: FieldError;
  containerClass: string;
}

const TimePicker = ({
  name,
  label,
  error,
  containerClass,
  value,
  onChange,
}: IProps) => {
  return (
    <div
      className={cx(
        "space-y-0 flex flex-col ",
        { "gap-1": !!label },
        { [`${containerClass}`]: !!containerClass },
      )}
    >
      <RenderIf condition={!!label}>
        <label
          htmlFor={name}
          className={cx(
            "text-sm font-medium leading-[1.4rem] text-secondary-100",
            {
              "text-danger-100": !!error,
            },
          )}
        >
          {label}
        </label>
      </RenderIf>
      <ReactTimePicker
        onChange={onChange}
        value={value}
        className="border-none h-[54px]  focus:ring-transparent focus-visible:ring-transparent"
      />
      {!!error && (
        <p className="text-[10px] text-danger-100">{error.message}</p>
      )}
    </div>
  );
};

export default TimePicker;
