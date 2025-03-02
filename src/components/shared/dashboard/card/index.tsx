import { BarChart, PieChart } from "@/components/Charts";
import { DatePicker } from "@/components/DatePicker";
import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import clsx from "clsx";
import Image from "next/image";
import { JSX } from "react";

const Icon = ({ image }: { image: string }) => (
  <button className="relative w-10 h-10 max-h-12 bg-[#f4f2f5] flex items-center justify-center rounded-[8px] focus:outline-none focus:ring-1 focus:ring-primary-from">
    <Image
      src={image}
      alt={`Notification Bell Icon`}
      style={{ width: "20px", height: "auto" }}
    />
  </button>
);

interface CardSummaryProps {
  title?: string;
  description?: string;
  count1?: number;
  countDescription1?: string;
  countDescription1Icon?: JSX.Element;
  count2?: number | JSX.Element;
  countDescription2?: string;
  icon?: string;
  classCard?: string;
}

export function CardSummary({
  title,
  description,
  count1,
  countDescription1,
  countDescription1Icon,
  count2,
  countDescription2,
  icon = "",
  classCard = "w-[268px] 2xl:w-96",
}: CardSummaryProps) {
  return (
    <Card
      className={`${classCard} flex flex-col gap-3 bg-background border border-grey-light rounded-[8px]`}
    >
      <CardHeader>
        <CardTitle className="font-medium">
          <div className="card-title flex items-center space-x-2">
            <Icon image={icon} />
            <p className="text-sm">{title}</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div
          className={clsx(
            { "space-x-6": countDescription1Icon },
            "content1 flex items-center",
          )}
        >
          <div className="card-content1 font-bold text-[32px] text-black">
            {count1}
          </div>
          <div className="card-content-desc1 flex items-center  text-[11px] text-[#131313]">
            <p className="text-xs">{countDescription1Icon}</p>
            <p className="text-xs">{countDescription1}</p>
          </div>
        </div>
        <div className="content2 flex items-center ">
          <div className="card-content2 font-bold text-[32px] text-black">
            {count2}
          </div>
          <span className="card-content-desc2 text-[11px] text-[#131313]">
            {countDescription2}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <div className="footer-card w-full h-full">
          <hr className="border-grey-light" />
          <div className="my-4">
            <p className="text-xs">{description}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

interface CardAttendanceProps {
  classCard?: string;
}

export function CardAttendanceSummary({
  classCard = "w-full 2xl:max-w-full xl:max-w-[610px]",
}: CardAttendanceProps) {
  return (
    <Card
      className={`${classCard} min-h-[376px] bg-background border border-grey-light rounded-[8px]`}
    >
      <CardHeader>
        <CardTitle>
          <div className="card-title flex items-center space-x-2 mb-4 justify-between">
            <span className="text-base uppercase font-medium">
              Attendance Summary
            </span>
            <DatePicker placeholder="Last 7 Days" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center">
          <BarChart />
        </div>
      </CardContent>
    </Card>
  );
}

interface CardEmployeeMetricsProps {
  classCard?: string;
}

export function CardEmployeeMetrics({
  classCard = "w-full 2xl:max-w-full",
}: CardEmployeeMetricsProps) {
  return (
    <Card
      className={`${classCard} min-h-[376px] bg-background border border-grey-light rounded-[8px]`}
    >
      <CardHeader>
        <CardTitle>
          <div className="card-title flex items-center mb-4 space-x-2 justify-between">
            <span className="text-base uppercase font-medium">
              EMPLOYEE METRICS
            </span>
            <DatePicker placeholder="Last 7 Days" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center space-y-2">
          <PieChart />
          <DatePicker placeholder="Leaves" />
        </div>
      </CardContent>
    </Card>
  );
}
