"use client";

import { CardSummary } from "@/components/shared/dashboard/card";
import DataTable from "@/components/Table";
import dashboardIcons from "@/lib/assets/dashboard";
import Image from "next/image";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Button from "@/components/Button";
import Select from "@/components/Select";
import { HOLIDAYS_DATA } from "@/lib/constants/companyData";
import { redirect } from "next/navigation";
import { StatusBadgeLeftIcon } from "@/components/shared/dashboard/badge";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import { FormSearchInput } from "@/components/FormSearch";

const HOLIDAYS_COLUMNS = [
  {
    header: "Date",
    accessorKey: "date",
    cell: ({
      cell,
      row,
    }: {
      cell: any;
      row: { original: { date: string } };
    }) => {
      return (
        <div className="border-l-4 pl-2 border-[#ebe9ee] py-5 mt-2 flex items-center">
          {row.original.date}
        </div>
      );
    },
  },
  {
    header: "Day",
    accessorKey: "day",
  },
  {
    header: "Holiday Name",
    accessorKey: "holidayName",
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

const CardHolidayList = () => {
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
                      <FormSearchInput classInput="xl:w-[644px] w-full font-medium pl-12 pr-4 h-12 text-base text-grey-medium/75 border rounded-[8px] border-grey-light focus:outline-none focus:ring-1 focus:ring-primary-from" />
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
              label="Add New Holiday"
              className="w-max xl:w-[221px] h-14 rounded-[8px] text-base"
              icon={dashboardIcons.featherAddIcon}
              classIcon="w-6 h-6"
              onClick={handleRedirect}
            />
          </CardTitle>

          <div className="card-title flex items-center space-x-3">
            <span className="text-base uppercase font-medium">Holidays</span>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            data={HOLIDAYS_DATA}
            columns={HOLIDAYS_COLUMNS}
            loading={loading}
            isRadioItems={true}
            isPaginated={true}
            classHeader="p-3 h-[50px] border-b border-[#f5f2f7]"
            classHead="text-base font-light text-[#A2A1A8] text-left px-0"
            classTable="rounded-t-[8px] overflow-hidden bg-[#FEFBFF]"
            classRow="text-sm text-secondary border-b border-[#f5f2f7] p-0"
            columnHeight="h-auto p-0"
          />
        </CardContent>
      </Card>
    </>
  );
};

export const holidaysPage = () => {
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
        <CardHolidayList />
      </div>
    </>
  );
};

export default holidaysPage;
