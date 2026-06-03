"use client";

import { Line, LineChart } from "recharts";

import { ChartContainer, type ChartConfig } from "@/components/ui/chart";

type MetricSparklineProps = {
  data: {
    date: string;
    label: string;
    value: number;
  }[];
  color?: string;
};

const chartConfig = {
  value: {
    label: "Value",
    color: "currentColor",
  },
} satisfies ChartConfig;

export function MetricSparkline({ data }: MetricSparklineProps) {
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-full w-full"
      initialDimension={{ width: 180, height: 56 }}
    >
      <LineChart accessibilityLayer data={data}>
        <Line
          dataKey="value"
          type="monotone"
          stroke="currentColor"
          strokeWidth={2}
          dot={false}
          activeDot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
