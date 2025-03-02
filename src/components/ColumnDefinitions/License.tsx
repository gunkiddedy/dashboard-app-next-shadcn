"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { LicensesType } from "@/services/queries/licenses/types";
import { formatDate } from "@/utils";
import LicensePopover from "../shared/profile/popovers/LicensePopover";
import StatusText from "../shared/profile/StatusText";

const columnHelper = createColumnHelper<LicensesType>();

export const columns = [
  columnHelper.accessor("license_url", {
    cell: (info) => {
      return (
        <div className="font-regular text-[12px]">{info.getValue() || "-"}</div>
      );
    },
    header: "License",
  }),
  columnHelper.accessor("license_number", {
    cell: (info) => {
      return (
        <div className="font-regular text-[12px]">{info.getValue() || "-"}</div>
      );
    },
    header: "License Number",
  }),
  columnHelper.accessor("state", {
    cell: (info) => {
      return (
        <div className="font-regular text-[12px]">{info.getValue() || "-"}</div>
      );
    },
    header: "State",
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
          <LicensePopover id={info.row.original.license_id} />
        </div>
      );
    },
    header: "Action",
  }),
];
