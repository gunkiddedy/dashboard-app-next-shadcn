"use client";

import React from "react";
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel,
  // PaginationState,
} from "@tanstack/react-table";
import {
  Table as ShadCnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import TableLoader from "../loaders/table-loader";
import TableSkeleton from "../TableSkeleton";
import {
  Select,
  SelectContent,
  // SelectGroup,
  SelectItem,
  // SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import Pagination from "./pagination";

interface DataTableProps<TData extends object> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TData, any>[];
  data: TData[];
  loading: boolean;
  classHeader?: string;
  classHead?: string;
  classTable?: string;
  classRow?: string;
  columnHeight?: string;
  isRadioItems?: boolean;
  isPaginated?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DataTable = <T extends object>({
  data,
  columns,
  loading = true,
  classHeader,
  classHead = "text-sm text-secondary",
  classTable,
  classRow,
  columnHeight = "h-[63px]",
  isRadioItems = false,
  isPaginated = false,
}: DataTableProps<T>) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      rowSelection,
    },
  });

  const skeletonHeaders = [
    { header: "Employee Name " },
    { header: "Role" },
    { header: "Mode Of Work " },
    { header: "Check In Time " },
    { header: "Check Out Time " },
    { header: "Status" },
  ];

  // TODO: Add loader
  if (loading)
    return (
      <>
        <TableSkeleton isUsingAvatar={true} headers={skeletonHeaders} />
      </>
    );

  // TODO: Border for the table
  return (
    <>
      <ShadCnTable className={`${classTable}`}>
        <TableHeader className={classHeader}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className="" key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead className={classHead} key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={columnHeight}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell className={classRow} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </ShadCnTable>

      {/* radio items */}
      {isRadioItems && (
        <RadioGroup
          defaultValue="comfortable"
          className="flex items-center space-x-2 my-7"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="default" id="r1" />
            <Label
              htmlFor="r1"
              className="text-sm text-[#16151C] font-semibold"
            >
              Upcoming
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label
              htmlFor="r2"
              className="text-sm text-[#16151C] font-semibold"
            >
              Past Holidays
            </Label>
          </div>
        </RadioGroup>
      )}

      {/* pagination controls */}
      {isPaginated && (
        <div className="flex items-center justify-between gap-2 bg-background mt-8">
          <div className="flex items-center gap-2">
            <p className="text-sm font-normal text-[#8B8985]">Showing</p>
            <Select
              value={table.getState().pagination.pageSize.toString()}
              onValueChange={(value) => {
                return table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="w-14">
                <SelectValue placeholder="Showing" />
              </SelectTrigger>
              <SelectContent className="px-2">
                {[5, 10, 20, 50, 100].map((pageSize) => (
                  <SelectItem
                    className="text-sm font-normal text-[#8B8985 mr-2"
                    key={pageSize}
                    value={pageSize.toString()}
                  >
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <p className="text-sm font-normal text-[#8B8985]">
            Showing{" "}
            {table.getRowCount() > 0
              ? table.getState().pagination.pageIndex *
                  table.getState().pagination.pageSize +
                1
              : 0}{" "}
            {""} to{" "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              table.getRowCount(),
            )}{" "}
            of {table.getRowCount().toLocaleString()} records
          </p>

          {/* pagination component */}
          <Pagination table={table} />
        </div>
      )}
    </>
  );
};

export default DataTable;
