"use client";

import { useState, useCallback } from "react";
import { motion } from "motion/react";
import CTAButton from "./CTAButton";

interface SliderInputProps {
  question: string;
  labels: string[];
  onSubmit: (value: number) => void;
}

export default function SliderInput({
  question,
  labels,
  onSubmit,
}: SliderInputProps) {
  const [value, setValue] = useState(3);
  const min = 1;
  const max = labels.length;

  const getLabel = useCallback(() => {
    return labels[value - 1] || "";
  }, [value, labels]);

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col items-center gap-8">
      <h2 className="text-center font-heading text-2xl font-bold leading-tight">
        {question}
      </h2>

      <div className="relative w-full px-2 pt-12">
        {/* Tooltip */}
        <motion.div
          className="absolute -top-1 rounded-lg bg-blue px-3 py-1.5 text-sm font-semibold text-white shadow-md"
          style={{ left: `${percentage}%`, transform: "translateX(-50%)" }}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          key={value}
        >
          {getLabel()}
          <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-blue" />
        </motion.div>

        {/* Slider track */}
        <div className="relative h-1.5 w-full rounded-full bg-progress-inactive">
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-blue"
            style={{ width: `${percentage}%` }}
          />
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-blue [&::-webkit-slider-thumb]:shadow-md"
          />
        </div>

        {/* Tick marks */}
        <div className="mt-2 flex justify-between px-0">
          {Array.from({ length: max }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="h-2 w-px bg-text-muted" />
              <span className="mt-1 text-xs text-text-muted">{i + 1}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 w-full">
        <CTAButton label="Continue" onClick={() => onSubmit(value)} />
      </div>
    </div>
  );
}
