"use client";

import { Line, LineChart, ReferenceLine, YAxis } from "recharts";

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
        <YAxis hide domain={["auto", "auto"]} />
        <ReferenceLine
          y={0}
          stroke="currentColor"
          strokeDasharray="2 2"
          opacity={0.2}
        />
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
