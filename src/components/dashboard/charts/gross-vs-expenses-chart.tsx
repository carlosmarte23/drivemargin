"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { DashboardChartCard } from "@/components/dashboard/dashboard-chart-card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { GrossVsExpensesChartPoint } from "@/lib/charts/dashboardChartData";

type GrossVsExpensesChartProps = {
  data: GrossVsExpensesChartPoint[];
};

const chartConfig = {
  gross: {
    label: "Gross",
    color: "var(--chart-1)",
  },
  expenses: {
    label: "Expenses",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function GrossVsExpensesChart({ data }: GrossVsExpensesChartProps) {
  return (
    <DashboardChartCard
      title="Gross vs expenses"
      description="Gross earnings compared with estimated fuel and other expenses."
    >
      <ChartContainer
        config={chartConfig}
        className="h-48 w-full max-w-full min-w-0 sm:h-52"
        initialDimension={{ width: 240, height: 192 }}
      >
        <BarChart accessibilityLayer data={data}>
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

          <Bar dataKey="gross" fill="var(--color-gross)" radius={6} />
          <Bar dataKey="expenses" fill="var(--color-expenses)" radius={6} />
        </BarChart>
      </ChartContainer>
    </DashboardChartCard>
  );
}
