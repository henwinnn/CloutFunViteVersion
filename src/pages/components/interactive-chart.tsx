"use client";

import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  ChartContainer,
  ChartTooltip as ShadcnChartTooltip,
  ChartTooltipContent,
} from "./ui/chart"; // Assuming these are available

// Sample data - replace with actual token price history
const chartData = [
  { name: "Jan", price: 65 },
  { name: "Feb", price: 59 },
  { name: "Mar", price: 80 },
  { name: "Apr", price: 81 },
  { name: "May", price: 56 },
  { name: "Jun", price: 55 },
  { name: "Jul", price: 70 },
];

interface InteractiveChartProps {
  tokenName?: string;
}

export function InteractiveChart({
  tokenName = "Token",
}: InteractiveChartProps) {
  return (
    <Card className="bg-card/50 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle>{tokenName} Price Chart</CardTitle>
        <CardDescription>
          Past 7 days performance (example data)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            price: {
              label: "Price (USD)",
              color: "hsl(var(--primary))",
            },
          }}
          className="h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                domain={["dataMin - 5", "dataMax + 5"]}
              />
              <ShadcnChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="price"
                stroke="var(--color-price)"
                strokeWidth={2}
                dot={{ r: 4, fill: "var(--color-price)" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
