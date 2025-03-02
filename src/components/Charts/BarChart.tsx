"use client";

import {
  Bar,
  BarChart as SHADCNBarChart,
  CartesianGrid,
  XAxis,
} from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";

const chartData = [
  { week: "Monday", ontime: 186, late: 80, absent: 29 },
  { week: "Tuesday", ontime: 305, late: 200, absent: 46 },
  { week: "Wednesday", ontime: 237, late: 120, absent: 30 },
  { week: "Thursday", ontime: 73, late: 190, absent: 20 },
  { week: "Friday", ontime: 209, late: 130, absent: 66 },
];

const chartConfigBar = {
  ontime: {
    label: "on-time",
    color: "rgba(17, 91, 38, 1)",
  },
  late: {
    label: "late",
    color: "rgba(234, 118, 46, 1)",
  },
  absent: {
    label: "absent",
    color: "rgba(206, 78, 245, 1)",
  },
};

export default function BarChart() {
  return (
    <ChartContainer
      config={chartConfigBar}
      className="min-h-[200px] max-h-[280px] w-full"
    >
      <SHADCNBarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="week"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          // tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend
          content={<ChartLegendContent className="text-xs font-normal" />}
        />
        <Bar
          dataKey="ontime"
          fill="var(--color-ontime)"
          radius={4}
          width={14}
        />
        <Bar dataKey="late" fill="var(--color-late)" radius={4} width={14} />
        <Bar
          dataKey="absent"
          fill="var(--color-absent)"
          radius={4}
          width={14}
        />
      </SHADCNBarChart>
    </ChartContainer>
  );
}
