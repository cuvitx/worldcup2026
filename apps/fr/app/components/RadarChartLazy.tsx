"use client";
import dynamic from "next/dynamic";
import type { RadarChartProps } from "./RadarChart";

const RadarChart = dynamic(() => import("./RadarChart"), { ssr: false });

export default function RadarChartLazy(props: RadarChartProps) {
  return <RadarChart {...props} />;
}
