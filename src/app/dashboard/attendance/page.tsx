"use client";

import * as React from "react";
import { MyAvatar } from "@/components/shared/dashboard/avatar";
import {
  StatusBadge,
  StatusBadgeLeftIcon,
} from "@/components/shared/dashboard/badge";
import { CardSummary } from "@/components/shared/dashboard/card";
import DataTable from "@/components/Table";
import dashboardIcons from "@/lib/assets/dashboard";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "@/components/DatePicker";
import { ATTENDANCE_DATA } from "@/lib/constants/companyData";

const ATTENDANCE_COLUMNS = [
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

const arrowRoundedLittleIcon = () => (
  <Image
    src={dashboardIcons.arrowRoundedLittleIcon}
    alt="arrow Rounded Little Icon"
    style={{ width: "9px", height: "auto" }}
  />
);

const badgeIconStatus = (status: string) => {
  return (
    <StatusBadgeLeftIcon
      status={status}
      leftIcon={dashboardIcons.arrowRoundedLittleIcon}
    />
  );
};

const CardAttendanceOverview = () => {
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Card className="w-full 2xl:max-w-full bg-background border border-grey-medium/50 rounded-[8px] pb-5">
      <CardHeader className="mb-4">
        <CardTitle className="card-title flex items-center space-x-2 justify-between">
          <span className="text-base uppercase font-medium">
            ATTENDANCE LIST
          </span>
          <DatePicker placeholder="Today" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          data={ATTENDANCE_DATA}
          columns={ATTENDANCE_COLUMNS}
          loading={loading}
          classHeader="bg-[#ededed] text-sm text-secondary p-3 h-[50px]"
          classTable="rounded-t-[8px] overflow-hidden bg-[#FEFBFF]"
          classRow="text-sm text-secondary border-b border-grey-medium/50"
        />
      </CardContent>
    </Card>
  );
};

export default function AttendancePage() {
  return (
    <>
      <div className="flex items-center space-x-2 mb-6">
        <div className="text-xl text-secondary">QUICK SUMMARY</div>
      </div>

      {/* Card QUICK SUMMARY */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <CardSummary
          title="Total Employee"
          description="Update: July 16, 2023"
          count1={560}
          countDescription1={"12% are in the office"}
          countDescription1Icon={arrowRoundedLittleIcon()}
          icon={dashboardIcons.employeesBlueIcon}
          classCard="lg:w-[32%] w-full"
        />
        <CardSummary
          title="Type Attendance"
          description="Update: July 16, 2023"
          count1={30}
          countDescription1={"Remote"}
          count2={30}
          countDescription2={"Office"}
          icon={dashboardIcons.attendanceBlueIcon}
          classCard="lg:w-[32%] w-full"
        />
        <CardSummary
          title="Status"
          description="Update: July 16, 2023"
          count1={560}
          count2={badgeIconStatus("on-time")}
          icon={dashboardIcons.leavesBlueIcon}
          classCard="lg:w-[32%] w-full"
        />
      </div>

      {/* Table */}
      <div className="div mt-12">
        <CardAttendanceOverview />
      </div>
    </>
  );
}
