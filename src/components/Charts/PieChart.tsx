"use client";

import { Pie, PieChart as SHADCNPieChart } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";

const chartDataPie = [
  { status: "approved", employeer: 100, fill: "var(--color-approved)" },
  { status: "unapproved", employeer: 25, fill: "var(--color-unapproved)" },
];

const chartConfigPie = {
  approved: {
    label: "approved",
    color: "rgba(4, 113, 214, 1)",
  },
  unapproved: {
    label: "unapproved",
    color: "rgba(243, 178, 57, 1)",
  },
};

export default function PieChart() {
  return (
    <>
      <ChartContainer
        config={chartConfigPie}
        className="mx-auto aspect-square max-h-[280px] w-full"
      >
        <SHADCNPieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <ChartLegend
            content={<ChartLegendContent className="text-xs font-normal" />}
          />
          <Pie
            data={chartDataPie}
            dataKey="employeer"
            nameKey="status"
            innerRadius={60}
            strokeWidth={5}
          />
        </SHADCNPieChart>
      </ChartContainer>
    </>
  );
}
