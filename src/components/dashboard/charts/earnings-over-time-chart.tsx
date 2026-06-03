"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { DashboardChartCard } from "@/components/dashboard/dashboard-chart-card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { EarningsOverTimeChartPoint } from "@/lib/charts/dashboardChartData";

type EarningsOverTimeChartProps = {
  data: EarningsOverTimeChartPoint[];
};

const chartConfig = {
  net: {
    label: "Current period",
    color: "var(--chart-1)",
  },
  previousNet: {
    label: "Previous period",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function EarningsOverTimeChart({ data }: EarningsOverTimeChartProps) {
  return (
    <DashboardChartCard
      title="Earnings over time"
      description="Net earnings compared with the previous matching period."
      className="xl:col-span-2"
    >
      <ChartContainer
        config={chartConfig}
        className="aspect-auto h-48 w-full max-w-full min-w-0 overflow-hidden sm:h-52"
        initialDimension={{ width: 240, height: 192 }}
      >
        <LineChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />

          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => `$${value}`}
          />

          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value, name) => (
                  <div className="flex w-full items-center justify-between gap-4">
                    <span className="text-muted-foreground">{name}</span>
                    <span className="font-medium">${value}</span>
                  </div>
                )}
              />
            }
          />

          <Line
            type="monotone"
            name="Current period"
            dataKey="net"
            stroke="var(--color-net)"
            strokeWidth={2}
            dot={{
              r: 3,
              fill: "var(--color-net)",
              stroke: "var(--color-net)",
            }}
            activeDot={{
              r: 5,
              fill: "var(--color-net)",
              stroke: "var(--background)",
              strokeWidth: 2,
            }}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            name="Previous period"
            dataKey="previousNet"
            stroke="var(--color-previousNet)"
            strokeWidth={2}
            strokeDasharray="4 4"
            dot={{
              r: 3,
              fill: "var(--color-previousNet)",
              stroke: "var(--color-previousNet)",
            }}
            activeDot={{
              r: 5,
              fill: "var(--color-previousNet)",
              stroke: "var(--background)",
              strokeWidth: 2,
            }}
            isAnimationActive={false}
          />
        </LineChart>
      </ChartContainer>
    </DashboardChartCard>
  );
}
