"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceDot,
  ReferenceLine,
} from "recharts";
import CTAButton from "./CTAButton";

interface WeightChartProps {
  currentWeight: number;
  goalWeight: number;
  goalDate: string;
  onContinue: () => void;
}

export default function WeightChart({
  currentWeight,
  goalWeight,
  goalDate,
  onContinue,
}: WeightChartProps) {
  const data = [
    { month: "Mar", weight: currentWeight },
    { month: "", weight: currentWeight - 3 },
    { month: "Apr", weight: currentWeight - 5 },
    { month: "", weight: currentWeight - 8 },
    { month: "May", weight: goalWeight + 2 },
    { month: "", weight: goalWeight },
    { month: "Jun", weight: goalWeight },
  ];

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-bold leading-tight">
          You&rsquo;re in good hands!
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
          Judging by your responses to our behavioural questions and individual
          targets, you&rsquo;re heading towards your goal weight of
        </p>
        <p className="mt-1 text-base font-semibold text-blue underline">
          {goalWeight} lbs by {goalDate}
        </p>
      </div>

      <div className="w-full rounded-2xl bg-white p-4">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart
            data={data}
            margin={{ top: 15, right: 60, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="gradWeight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E91E7B" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#E91E7B" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#eee"
              vertical
              horizontal={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              domain={[goalWeight - 5, currentWeight + 5]}
            />
            <Area
              type="monotone"
              dataKey="weight"
              stroke="#E91E7B"
              strokeWidth={2.5}
              fill="url(#gradWeight)"
              dot={false}
            />
            {/* Start dot */}
            <ReferenceDot
              x="Mar"
              y={currentWeight}
              r={6}
              fill="white"
              stroke="#E91E7B"
              strokeWidth={2}
            />
            {/* Goal dot */}
            <ReferenceDot
              x="Jun"
              y={goalWeight}
              r={6}
              fill="#E91E7B"
              stroke="white"
              strokeWidth={2}
            />
            {/* Goal label line */}
            <ReferenceLine
              y={goalWeight}
              stroke="#E91E7B"
              strokeDasharray="4 4"
              strokeOpacity={0.4}
            />
          </AreaChart>
        </ResponsiveContainer>

        {/* Goal label */}
        <div className="flex justify-end -mt-4 mr-2">
          <div className="rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white">
            Goal<br />{goalWeight} lbs
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-text-secondary">
        With the insights we&rsquo;ve gathered about you, we&rsquo;re confident
        that you&rsquo;ll <strong className="text-foreground">reach {goalWeight} lbs sooner</strong>
      </p>

      <div className="w-full">
        <CTAButton label="Continue" onClick={onContinue} />
      </div>
    </div>
  );
}
