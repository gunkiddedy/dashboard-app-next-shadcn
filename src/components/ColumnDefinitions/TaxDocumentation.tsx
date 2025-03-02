"use client";

import { ReactNode } from "react";

import { createColumnHelper } from "@tanstack/react-table";

import { formatDate } from "@/utils";
import { TaxDocumentationType } from "@/services/queries/taxDocumentation/types";

type TaxDocumentationColumms = TaxDocumentationType & {
  action: ReactNode;
};

const columnHelper = createColumnHelper<TaxDocumentationColumms>();

export const columns = [
  columnHelper.accessor("documentType", {
    cell: (info) => {
      return (
        <div className="font-regular text-[12px]">{info.getValue() || "-"}</div>
      );
    },
    header: "Document Type",
  }),
  columnHelper.accessor("creator", {
    cell: (info) => {
      return (
        <div className="font-regular text-[12px]">{info.getValue() || "-"}</div>
      );
    },
    header: "Creator",
  }),
  columnHelper.accessor("dateCreated", {
    cell: (info) => {
      return (
        <div className="font-regular text-[12px]">{info.getValue() || "-"}</div>
      );
    },
    header: "Date Created",
  }),
  columnHelper.accessor("taxStatus", {
    cell: (info) => {
      return (
        <div className="font-regular text-[12px]">
          {formatDate(info.getValue()) || "-"}
        </div>
      );
    },
    header: "Tax Status",
  }),
  columnHelper.accessor("status", {
    cell: (info) => {
      return (
        <div className="font-regular text-[12px]">{info.getValue() || "-"}</div>
      );
    },
    header: "Status",
  }),
  columnHelper.accessor("type", {
    cell: (info) => {
      return (
        <div className="font-regular text-[12px]">{info.getValue() || "-"}</div>
      );
    },
    header: "Type",
  }),
  columnHelper.accessor("action", {
    cell: (info) => {
      return <div>{info.getValue() || "-"}</div>;
    },
    header: "Action",
  }),
];
