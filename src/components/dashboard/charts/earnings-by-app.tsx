"use client";

import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";

import { DashboardChartCard } from "@/components/dashboard/dashboard-chart-card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { EarningsByAppChartPoint } from "@/lib/charts/dashboardChartData";

type EarningsByAppChartProps = {
  data: EarningsByAppChartPoint[];
};

const chartConfig = {
  earnings: {
    label: "Earnings",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function EarningsByAppChart({ data }: EarningsByAppChartProps) {
  return (
    <DashboardChartCard
      title="Earnings by app"
      description="Earnings by app for the current period."
    >
      <ChartContainer
        config={chartConfig}
        className="h-44 w-full max-w-full min-w-0 sm:h-48"
        initialDimension={{ width: 240, height: 176 }}
      >
        <BarChart
          accessibilityLayer
          data={data}
          layout="vertical"
          margin={{
            left: 8,
            right: 12,
          }}
        >
          <CartesianGrid horizontal={false} />

          <XAxis
            type="number"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />

          <YAxis
            dataKey="appShortName"
            type="category"
            tickLine={false}
            axisLine={false}
            width={64}
          />

          <ChartTooltip
            content={
              <ChartTooltipContent
                labelFormatter={(_, payload) => {
                  return payload[0]?.payload?.appName ?? "";
                }}
                formatter={(value) => (
                  <div className="flex w-full items-center justify-between gap-4">
                    <span className="text-muted-foreground">Earnings</span>
                    <span className="font-medium">${value}</span>
                  </div>
                )}
              />
            }
          />

          <Bar dataKey="earnings" radius={6}>
            {data.map((point) => (
              <Cell key={point.appName} fill={point.color} />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </DashboardChartCard>
  );
}
