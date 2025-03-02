import React from "react";
import cx from "classnames";

interface IProps {
  total: number;
  step: number;
}

const DotProcess = (props: IProps) => {
  const { total, step } = props;
  return (
    <div className="flex gap-3">
      {new Array(total).fill(0).map((_, i) => (
        <div
          key={i}
          className={cx(
            "w-[10px] h-[10px] border border-primary-50 rounded-xl",
            { "bg-primary-50": i + 1 === step },
          )}
        />
      ))}
    </div>
  );
};

export default DotProcess;
