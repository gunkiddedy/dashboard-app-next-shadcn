"use client";

import { createColumnHelper } from "@tanstack/react-table";

import { BackgroundCheckType } from "@/services/queries/backgroundCheck/types";
import StatusText from "../shared/profile/StatusText";

const columnHelper = createColumnHelper<BackgroundCheckType>();

export const columns = [
  columnHelper.accessor("author", {
    cell: (info) => {
      return (
        <div className="font-regular text-[12px]">{info.getValue() || "-"}</div>
      );
    },
    header: "Author",
  }),
  columnHelper.accessor("dateOrdered", {
    cell: (info) => {
      return (
        <div className="font-regular text-[12px]">{info.getValue() || "-"}</div>
      );
    },
    header: "Date Ordered",
  }),
  columnHelper.accessor("amount", {
    cell: (info) => {
      return (
        <div className="font-regular text-[12px]">{info.getValue() || "-"}</div>
      );
    },
    header: "Amount",
  }),
  columnHelper.accessor("status", {
    cell: (info) => {
      return (
        <div className="font-regular text-[12px]">
          <StatusText text={info.getValue()} />
        </div>
      );
    },
    header: "Status",
  }),
];
