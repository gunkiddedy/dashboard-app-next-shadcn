import React from "react";
import { Skeleton } from "../ui/skeleton";

const SkeletonEmployeeName = () => (
  <div className="flex items-center space-x-2">
    <Skeleton className="w-10 h-10 rounded-full bg-[#EDEDED]" />
    <Skeleton className="w-[78px] h-[15px] rounded-[8px] bg-[#EDEDED]" />
  </div>
);

const SkeletonDefault = () => (
  <Skeleton className="w-[134px] h-[15px] rounded-[8px] bg-[#EDEDED]" />
);

interface TableSkeletonHeaderProps<TData extends object> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers?: Array<{ header: string } & TData>;
  isUsingAvatar?: boolean;
}

const TableSkeleton = <T extends object>({
  headers,
  isUsingAvatar = false,
}: TableSkeletonHeaderProps<T>) => {
  return (
    <table className="w-full rounded-t-[8px] overflow-hidden bg-[#FEFBFF] mt-3">
      <thead className="bg-[#ededed] h-[50px]">
        <tr className="">
          {headers?.map((header, index) => (
            <th className="p-3 text-left text-sm text-secondary" key={index}>
              {String(header.header)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="[&>*:nth-child(odd)]:animate-shimmer bg-1000px [&>*:nth-child(odd)]:bg-[#FEFBFF]">
        {Array.from({ length: 3 }, (_) => null).map((_, idx) => (
          <tr
            key={idx}
            className="text-sm text-secondary border-b border-[#EDEDED]"
          >
            <td className="h-[63px] p-3">
              {isUsingAvatar ? <SkeletonEmployeeName /> : <SkeletonDefault />}
            </td>
            <td>
              <SkeletonDefault />
            </td>
            <td>
              <SkeletonDefault />
            </td>
            <td>
              <SkeletonDefault />
            </td>
            <td>
              <SkeletonDefault />
            </td>
            <td>
              <SkeletonDefault />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableSkeleton;
