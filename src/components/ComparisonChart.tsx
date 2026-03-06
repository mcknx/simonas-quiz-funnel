"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import CTAButton from "./CTAButton";

const data = [
  { month: "", restrictive: null, dofasting: null },
  { month: "Start", restrictive: 100, dofasting: 100 },
  { month: "", restrictive: 92, dofasting: 90 },
  { month: "", restrictive: 88, dofasting: 82 },
  { month: "", restrictive: 87, dofasting: 76 },
  { month: "", restrictive: 90, dofasting: 72 },
  { month: "", restrictive: 94, dofasting: 70 },
  { month: "End", restrictive: 98, dofasting: 68 },
];

interface ComparisonChartProps {
  heading: string;
  subtitle?: string;
  onContinue: () => void;
}

export default function ComparisonChart({
  heading,
  subtitle,
  onContinue,
}: ComparisonChartProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-bold leading-tight">
          {heading}
        </h2>
        {subtitle && (
          <p className="mt-2 text-sm text-text-secondary">{subtitle}</p>
        )}
      </div>

      <div className="w-full rounded-2xl bg-bg-pink/50 p-4">
        <div className="mb-2 flex items-center justify-between text-xs text-text-secondary">
          <span>Your current weight</span>
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-full bg-chart-orange" />
              Restrictive diet
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-full bg-primary" />
              DoFasting
            </span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gradOrange" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFB74D" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#FFB74D" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="gradPink" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E91E7B" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#E91E7B" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} domain={[60, 105]} />
            <Area
              type="monotone"
              dataKey="restrictive"
              stroke="#FFB74D"
              strokeWidth={2.5}
              fill="url(#gradOrange)"
              dot={false}
              connectNulls
            />
            <Area
              type="monotone"
              dataKey="dofasting"
              stroke="#E91E7B"
              strokeWidth={2.5}
              fill="url(#gradPink)"
              dot={false}
              connectNulls
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full">
        <CTAButton label="Continue" onClick={onContinue} />
      </div>
    </div>
  );
}
