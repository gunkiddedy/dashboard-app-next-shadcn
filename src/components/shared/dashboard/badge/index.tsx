import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

interface StatusBadgeProps {
  status: string | Number;
  className?: String;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge
      className={clsx(
        { "bg-[#E2FDE6] text-[#115B26]": status === "on-time" },
        { "bg-[#FFEBDF] text-[#EA762E]": status === "late" },
        { "bg-[#FFF3F3] text-[#D64545]": status === "absent" },
        { "bg-[#f3e6f9] text-[#5D30BE]": status === "permanent" },
        { "bg-[#FFEBDF] text-[#EA762E]": status === "Pending" },
        { "bg-[#E2FDE6] text-[#115B26]": status === "Successful" },
        className,
      )}
    >
      {status}
    </Badge>
  );
}

export function StatusBadgeLeftIcon({ status, leftIcon }) {
  return (
    <div
      className={clsx(
        { "bg-[#E2FDE6] text-[#115B26]": status === "on-time" },
        { "bg-[#FFEBDF] text-[#EA762E]": status === "late" },
        { "bg-[#FFF3F3] text-[#D64545]": status === "absent" },
        "flex items-center space-x-2 w-[75px] h-[26px] rounded-[5px] px-2",
      )}
    >
      <Image
        src={leftIcon}
        alt={status}
        style={{ width: "9px", height: "auto" }}
      />
      <span
        className={clsx(
          { "bg-[#E2FDE6] text-[#115B26]": status === "on-time" },
          { "bg-[#FFEBDF] text-[#EA762E]": status === "late" },
          { "bg-[#FFF3F3] text-[#D64545]": status === "absent" },
          "text-[11px]",
        )}
      >
        {status}
      </span>
    </div>
  );
}

export function StatusBadgeRightIcon({ status, rightIcon }) {
  return (
    <div
      className={clsx(
        { "bg-[#E2FDE6] text-[#115B26]": status === "on-time" },
        { "bg-[#FFEBDF] text-[#EA762E]": status === "late" },
        { "bg-[#FFF3F3] text-[#D64545]": status === "absent" },
        "flex items-center space-x-2 w-[75px] h-[26px] rounded-[5px] px-2",
      )}
    >
      <span
        className={clsx(
          { "bg-[#E2FDE6] text-[#115B26]": status === "on-time" },
          { "bg-[#FFEBDF] text-[#EA762E]": status === "late" },
          { "bg-[#FFF3F3] text-[#D64545]": status === "absent" },
          "text-[11px]",
        )}
      >
        {status}
      </span>
      <Image
        src={rightIcon}
        alt={status}
        style={{ width: "9px", height: "auto" }}
      />
    </div>
  );
}
