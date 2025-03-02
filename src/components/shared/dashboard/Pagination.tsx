"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

import cx from "classnames";

import { RenderIf } from "../render-if";
import { getParseFloat } from "@/utils";
import dashboard from "@/lib/assets/dashboard";
import Select from "@/components/Select";
import usePagination from "@/hooks/usePagination";
import { PaginationType } from "@/services/generalTypes";

interface IProps {
  isLoading?: boolean;
  isError?: boolean;

  meta: PaginationType;
}

const Pagination = (props: IProps) => {
  const { meta, isLoading, isError } = props;

  const [handleNext, handlePrev, changePerPage] = usePagination({
    totalPages: meta.totalPages,
  });

  const searchParams = useSearchParams();
  const page = searchParams.get("skip");

  const currentPageNumber = page ? getParseFloat(page) + 1 : 1;

  const pageSelectOptions = new Array(meta.totalPages).fill(0).map((_, i) => {
    const ide = i + 1;
    return {
      value: ide.toString(),
      label: `Show ${ide}`,
    };
  });

  return (
    <div className=" mt-5">
      <div className="flex items-center justify-between">
        <div className="">
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="w-8 h-8 border border-neutral-550 rounded-lg flex items-center justify-center mr-5"
              disabled={currentPageNumber === 1}
              onClick={handlePrev}
            >
              <div
                className={cx("w-4 h-4", {
                  "opacity-40": currentPageNumber === 1,
                })}
              >
                <Image src={dashboard.left} alt="left icon" />
              </div>
            </button>
            {new Array(meta.totalPages).fill(1).flatMap((_, i) => {
              const ide = i + 1;
              if (ide < currentPageNumber && meta.totalPages - ide > 3)
                return [];
              if (ide - currentPageNumber < 3 || ide === meta.totalPages)
                return (
                  <button
                    key={i}
                    type="button"
                    className={cx(
                      "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold text-secondary-100",
                      { "bg-neutral-200": currentPageNumber === i + 1 },
                    )}
                    onClick={() => {
                      changePerPage(ide.toString());
                    }}
                  >
                    {i + 1}
                  </button>
                );
              if (ide - currentPageNumber === 3) return "...";
              return [];
            })}
            <button
              type="button"
              className="w-8 h-8 border border-neutral-550 rounded-lg flex items-center justify-center ml-5"
              disabled={currentPageNumber === meta?.totalPages}
              onClick={handleNext}
            >
              <div
                className={cx("w-4 h-4", {
                  "opacity-40": currentPageNumber === meta?.totalPages,
                })}
              >
                <Image src={dashboard.right} alt="left icon" />
              </div>
            </button>
          </div>
        </div>
        <div>
          <RenderIf condition={!isLoading && !isError}>
            <div className="flex items-center gap-4">
              <p className="text-neutral-500 font-medium text-xs">
                Showing{" "}
                <span>{Number(meta?.skip) * Number(meta?.limit) + 1} </span>
                to{" "}
                <span>
                  {Math.min(
                    (Number(meta?.skip) + 1) * Number(meta?.limit),
                    meta?.totalRecords,
                  )}{" "}
                </span>
                of <span>{meta?.totalRecords}</span> entries
              </p>
              <div>
                <Select
                  selectData={pageSelectOptions}
                  className="h-8 w-[95px]"
                  value={currentPageNumber.toString()}
                  onChange={(value) => {
                    changePerPage(value);
                  }}
                />
              </div>
            </div>
          </RenderIf>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
