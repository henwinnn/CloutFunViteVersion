"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import TradingView from "../TradingView";

interface InteractiveChartProps {
  tokenName?: string;
  pair?: `0x${string}`;
}

export function InteractiveChart({
  tokenName = "Token",
  pair,
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
        <TradingView pair={pair} />
      </CardContent>
    </Card>
  );
}
