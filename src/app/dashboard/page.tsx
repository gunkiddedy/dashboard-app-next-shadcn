"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dashboardIcons from "@/lib/assets/dashboard";
import DataTable from "@/components/Table";
import { DatePicker } from "@/components/DatePicker";
import Link from "next/link";
import {
  CardAttendanceSummary,
  CardEmployeeMetrics,
  CardSummary,
} from "@/components/shared/dashboard/card";
import { StatusBadge } from "@/components/shared/dashboard/badge";
import { MyAvatar } from "@/components/shared/dashboard/avatar";
import { ATTENDANCE_DATA } from "@/lib/constants/companyData";

const columns = [
  {
    header: "Employee Name",
    accessorKey: "employeeName",
    cell: ({
      cell,
      row,
    }: {
      cell: any;
      row: { original: { employeeName: string } };
    }) => {
      return (
        <div className="flex items-center space-x-2">
          <MyAvatar
            fallback={row.original.employeeName}
            className="w-10 h-10"
          />
          <span>{row.original.employeeName}</span>
        </div>
      );
    },
  },
  {
    header: "Role",
    accessorKey: "role",
  },
  {
    header: "Mode Of Work",
    accessorKey: "modeOfWork",
  },
  {
    header: "Check In Time",
    accessorKey: "checkInTime",
  },
  {
    header: "Check Out Time",
    accessorKey: "checkOutTime",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }: { row: { original: { status: string } } }) => {
      return <StatusBadge status={row.original.status} />;
    },
  },
];

const CardAttendanceOverview = () => {
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3500);
  }, []);

  return (
    <Card className="w-full 2xl:max-w-full bg-background border border-grey-light rounded-[8px] pb-10">
      <CardHeader>
        <CardTitle>
          <div className="card-title pb-4 flex items-center space-x-2 justify-between">
            <h1 className="text-base uppercase font-semibold">
              ATTENDANCE OVERVIEW
            </h1>
            <DatePicker placeholder="Today" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          data={ATTENDANCE_DATA}
          columns={columns}
          loading={loading}
          classHeader="bg-[#ededed] text-sm text-secondary p-3 h-[50px]"
          classTable="rounded-t-[8px] overflow-hidden bg-[#FEFBFF]"
          classRow="text-sm text-secondary border-b border-grey-light"
        />
        <Link
          href={"/dashboard"}
          className="flex justify-center pt-10 text-sm text-primary"
        >
          View All Attendance
        </Link>
      </CardContent>
    </Card>
  );
};

export default function Dashboard() {
  return (
    <section className="flex flex-col gap-4">
      {/* Card QUICK SUMMARY */}
      <div>
        <div className="mb-6">
          <h1 className="text-xl text-secondary"> QUICK SUMMARY </h1>
        </div>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* w-[268px] 2xl:w-96 */}
          <CardSummary
            title="Total Employee"
            description="No employee to show"
            count1={0}
            icon={dashboardIcons.employeesBlueIcon}
            classCard="lg:w-[23%] w-full"
          />
          <CardSummary
            title="Attendance"
            description="No attendance on record"
            count1={0}
            icon={dashboardIcons.attendanceBlueIcon}
            classCard="lg:w-[23%] w-full"
          />
          <CardSummary
            title="Leaves"
            description="No leave on record"
            count1={0}
            icon={dashboardIcons.leavesBlueIcon}
            classCard="lg:w-[23%] w-full"
          />
          <CardSummary
            title="Payroll"
            description="Nobody has been paid"
            count1={0}
            icon={dashboardIcons.payrollBlueIcon}
            classCard="lg:w-[23%] w-full"
          />
        </div>
      </div>

      {/* Card ATTENDANCE SUMMARY & Card EMPLOYEE METRICS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-4 2xl:gap-12 ">
        <CardAttendanceSummary classCard="w-full max-h-[433px]" />
        <CardEmployeeMetrics classCard="w-full max-h-[433px]" />
      </div>

      {/* ATTENDANCE OVERVIEW */}
      <div>
        <CardAttendanceOverview />
      </div>
    </section>
  );
}
