"use client";

import { MyAvatar } from "@/components/shared/dashboard/avatar";
import {
  StatusBadge,
  StatusBadgeLeftIcon,
} from "@/components/shared/dashboard/badge";
import { CardSummary } from "@/components/shared/dashboard/card";
import DataTable from "@/components/Table";
import dashboardIcons from "@/lib/assets/dashboard";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Button from "@/components/Button";
import Select from "@/components/Select";
import { PAYROLL_DATA } from "@/lib/constants/companyData";
import { redirect } from "next/navigation";
import { AlertDialogFilter } from "@/components/Alert";
import { FilterIcon } from "@/components/shared/svgs";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import { FormSearchInput } from "@/components/FormSearch";

const PAYROLL_COLUMNS = [
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
    header: "CTC",
    accessorKey: "ctc",
  },
  {
    header: "Salary Per Month",
    accessorKey: "salaryPerMonth",
  },
  {
    header: "Deduction",
    accessorKey: "deduction",
  },
  {
    header: "Tax",
    accessorKey: "tax",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }: { row: { original: { status: string } } }) => {
      return (
        <StatusBadge className="font-normal" status={row.original.status} />
      );
    },
  },
  // {
  //   header: 'Action',
  //   cell: ({ cell, row }) => {
  //     const employeeId = row.original.employeeId;
  //     function handleClick() {
  //       console.log(employeeId);
  //     }

  //     return (
  //       <div className="flex items-center space-x-2">
  //         <Button
  //           className="w-7 h-7 rounded-full px-0.5 hover:bg-slate-200 hover:outline-none"
  //           icon={dashboardIcons.viewIcon}
  //           classIcon="w-6 h-6"
  //           variant="neutral"
  //           onClick={handleClick}
  //         />
  //         <Button
  //           className="w-7 h-7 rounded-full px-0.5 hover:bg-slate-200 hover:outline-none"
  //           icon={dashboardIcons.editIcon}
  //           classIcon="w-6 h-6"
  //           variant="neutral"
  //           onClick={handleClick}
  //         />
  //         <Button
  //           className="w-7 h-7 rounded-full px-0.5 hover:bg-slate-200 hover:outline-none"
  //           icon={dashboardIcons.trashIcon}
  //           classIcon="w-6 h-6"
  //           variant="neutral"
  //           onClick={handleClick}
  //         />
  //       </div>
  //     );
  //   },
  // },
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

const CardPayrollList = () => {
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleRedirect = () => {
    // console.log(url);
    redirect("/dashboard/employees/add-employee");
  };

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  // State to hold the selected value
  const [selected, setSelected] = useState("");

  const alertDialogFilterRef = useRef<{ openDialog: () => void }>(null);

  const handleClickFilter = () => {
    console.log("handleClickFilter");
    if (alertDialogFilterRef.current) {
      alertDialogFilterRef.current.openDialog(); // Open the dialog
    }
  };

  const formMethods = useForm();

  return (
    <>
      <Card className="w-full flex flex-col 2xl:max-w-full bg-background border border-grey-light rounded-[8px] gap-4 pb-5">
        <CardHeader className="flex flex-col gap-4 w-full">
          <CardTitle className="w-full card-title flex justify-between items-center 2xl:space-x-5 gap-5">
            <div className="relative w-full">
              <Form {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(() => {})}>
                  <FormField
                    name="searchValue"
                    render={() => (
                      <FormSearchInput classInput="w-full font-medium pl-12 pr-4 h-12 text-base text-grey-medium/75 border rounded-[8px] border-grey-light focus:outline-none focus:ring-1 focus:ring-primary-from" />
                    )}
                  />
                </form>
              </Form>
            </div>

            <Select
              placeholder="A-Z"
              selectData={options}
              value={selected}
              iconBefore={dashboardIcons.userIcon}
              classIcon="w-6 h-6 pr-1"
              className="w-[168px] h-10 border border-neutral-400 font-extralight text-sm text-neutral-400 rounded-full bg-white focus:outline-none"
              onChange={() => setSelected(selected)}
            />

            <Button
              size="sm"
              className="!ml-0 text-base w-max xl:w-[221px] h-14"
              label="Export Data"
              icon={dashboardIcons.uploadCircleIcon}
              classIcon="w-6 h-6"
              onClick={handleRedirect}
            />
          </CardTitle>

          <div className="flex items-center gap-2">
            <h1 className="text-base uppercase font-medium ">PAYROLL LIST</h1>
            <button
              className="px-2 py-2 rounded-md bg-[#DDDDDD4D] inline-flex items-center justify-center hover:outline-none hover:bg-secondary/10"
              onClick={handleClickFilter}
            >
              <FilterIcon width="20" />
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            data={PAYROLL_DATA}
            columns={PAYROLL_COLUMNS}
            loading={loading}
            isPaginated={true}
            classHeader="bg-[#ededed] text-sm text-secondary p-3 h-[50px]"
            classTable="rounded-t-[8px] overflow-hidden bg-[#FEFBFF]"
            classRow="text-sm text-secondary border-b border-grey-light"
          />
        </CardContent>
      </Card>
      {/* alert dialog */}
      <AlertDialogFilter ref={alertDialogFilterRef} title="Filter" />
    </>
  );
};

export const employeePage = () => {
  return (
    <>
      <div className="flex items-center space-x-2 mb-6">
        <div className="text-xl text-secondary">QUICK SUMMARY</div>
      </div>

      {/* Card QUICK SUMMARY */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <CardSummary
          title="Total CTC"
          description="Update: July 16, 2023"
          count1={456876653}
          countDescription1={"12% are in the office"}
          countDescription1Icon={arrowRoundedLittleIcon()}
          icon={dashboardIcons.employeesBlueIcon}
          classCard="lg:w-[32%] w-full"
        />
        <CardSummary
          title="Mode of Work"
          description="Update: July 16, 2023"
          count1={0}
          countDescription1={"Remote"}
          count2={0}
          countDescription2={"Office"}
          icon={dashboardIcons.attendanceBlueIcon}
          classCard="lg:w-[32%] w-full"
        />
        <CardSummary
          title="Status"
          description="Update: July 16, 2023"
          count1={0}
          count2={badgeIconStatus("on-time")}
          icon={dashboardIcons.leavesBlueIcon}
          classCard="lg:w-[32%] w-full"
        />
      </div>

      {/* Table */}
      <div className="div mt-12">
        <CardPayrollList />
      </div>
    </>
  );
};

export default employeePage;
