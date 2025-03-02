"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { InsuranceType } from "@/services/queries/insurance/types";
import InsurancePopover from "../shared/profile/popovers/InsurancePopover";
import { formatDate } from "@/utils";
import StatusText from "../shared/profile/StatusText";

const columnHelper = createColumnHelper<InsuranceType>();

export const columns = [
  columnHelper.accessor("insurance_type", {
    cell: (info) => {
      return (
        <div className="font-regular text-[12px]">{info.getValue() || "-"}</div>
      );
    },
    header: "Type",
  }),
  columnHelper.accessor("insurance_id", {
    cell: (info) => {
      return (
        <div className="font-regular text-[12px]">{info.getValue() || "-"}</div>
      );
    },
    header: "Policy Number",
  }),
  columnHelper.accessor("provider", {
    cell: (info) => {
      return (
        <div className="font-regular text-[12px]">{info.getValue() || "-"}</div>
      );
    },
    header: "Provider",
  }),
  columnHelper.accessor("coverage_amount", {
    cell: (info) => {
      return (
        <div className="font-regular text-[12px]">{info.getValue() || "-"}</div>
      );
    },
    header: "Amount",
  }),
  columnHelper.accessor("approval_status", {
    cell: (info) => {
      return (
        <div className="font-regular text-[12px]">
          <StatusText text={info.getValue().toLowerCase() as "pending"} />
        </div>
      );
    },
    header: "Status",
  }),
  columnHelper.accessor("issue_date", {
    cell: (info) => {
      return (
        <div className="font-regular text-[12px]">
          {formatDate(info.getValue(), true) || "-"}
        </div>
      );
    },
    header: "Issue Date",
  }),
  columnHelper.accessor("expiry_date", {
    cell: (info) => {
      return (
        <div className="font-regular text-[12px]">
          {formatDate(info.getValue(), true) || "-"}
        </div>
      );
    },
    header: "Expiry Date",
  }),
  columnHelper.display({
    id: "action",
    cell: (info) => {
      return (
        <div>
          <InsurancePopover id={info.row.original.insurance_id} />
        </div>
      );
    },
    header: "Action",
  }),
];
