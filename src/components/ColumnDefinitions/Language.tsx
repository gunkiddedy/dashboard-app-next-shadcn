"use client";

import { createColumnHelper } from "@tanstack/react-table";

import { LanguageType } from "@/services/queries/language/types";
import { capitalizeFirstLetter } from "@/utils";
import LanguagePopover from "../shared/profile/popovers/LanguagePopover";

const columnHelper = createColumnHelper<LanguageType>();

export const columns = [
  columnHelper.accessor("language", {
    cell: (info) => {
      return (
        <div className="font-regular text-[12px]">
          {capitalizeFirstLetter(info.getValue()) || "-"}
        </div>
      );
    },
    header: "Language",
  }),
  columnHelper.accessor("proficiency", {
    cell: (info) => {
      return (
        <div className="font-regular text-[12px]">
          {capitalizeFirstLetter(info.getValue()) || "-"}
        </div>
      );
    },
    header: "Level",
  }),

  columnHelper.display({
    id: "action",
    cell: (info) => {
      return (
        <div>
          <LanguagePopover id={info.row.original.language_id} />
        </div>
      );
    },
    header: "Action",
  }),
];
