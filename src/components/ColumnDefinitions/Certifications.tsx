"use client";

import { createColumnHelper } from "@tanstack/react-table";

import { CertificationType } from "@/services/queries/certifications/types";
import CertificatePopover from "../shared/profile/popovers/CertificatePopover";
import { formatDate } from "@/utils";
import StatusText from "../shared/profile/StatusText";

const columnHelper = createColumnHelper<CertificationType>();

export const columns = [
  columnHelper.accessor("title", {
    cell: (info) => {
      return (
        <div className="font-regular text-[12px]">{info.getValue() || "-"}</div>
      );
    },
    header: "Title",
  }),
  columnHelper.accessor("industry", {
    cell: (info) => {
      return (
        <div className="font-regular text-[12px]">{info.getValue() || "-"}</div>
      );
    },
    header: "Industry",
  }),
  columnHelper.accessor("verification_link", {
    cell: (info) => {
      return (
        <div className="font-regular text-[12px]">{info.getValue() || "-"}</div>
      );
    },
    header: "Certification Link",
  }),
  columnHelper.accessor("organization", {
    cell: (info) => {
      return (
        <div className="font-regular text-[12px]">{info.getValue() || "-"}</div>
      );
    },
    header: "Company",
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
    header: "Action",
    cell: (info) => {
      return (
        <div>
          <CertificatePopover id={info.row.original.certificate_id} />
        </div>
      );
    },
  }),
];
