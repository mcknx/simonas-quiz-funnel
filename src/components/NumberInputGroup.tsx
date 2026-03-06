"use client";

import { useState } from "react";
import { motion } from "motion/react";
import CTAButton from "./CTAButton";

interface NumberInputGroupProps {
  question: string;
  subtitle?: string;
  onSubmit: (data: {
    unit: "imperial" | "metric";
    height1: number;
    height2: number;
    weight: number;
  }) => void;
}

export default function NumberInputGroup({
  question,
  subtitle,
  onSubmit,
}: NumberInputGroupProps) {
  const [unit, setUnit] = useState<"imperial" | "metric">("imperial");
  const [height1, setHeight1] = useState("");
  const [height2, setHeight2] = useState("");
  const [weight, setWeight] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    const w = Number(weight);
    if (unit === "imperial") {
      if (w < 80 || w > 550) {
        setError("Weight must be between 80 and 550 lb");
        return false;
      }
    } else {
      if (w < 36 || w > 250) {
        setError("Weight must be between 36 and 250 kg");
        return false;
      }
    }
    if (!height1 || !height2) {
      setError("Please enter your height");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit({
        unit,
        height1: Number(height1),
        height2: Number(height2),
        weight: Number(weight),
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-bold leading-tight">
          {question}
        </h2>
        {subtitle && (
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            {subtitle}
          </p>
        )}
      </div>

      {/* Unit toggle */}
      <div className="flex w-full max-w-[300px] overflow-hidden rounded-lg border border-blue">
        <button
          onClick={() => {
            setUnit("imperial");
            setError("");
          }}
          className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
            unit === "imperial"
              ? "bg-blue text-white"
              : "bg-white text-blue"
          }`}
        >
          lb and ft
        </button>
        <button
          onClick={() => {
            setUnit("metric");
            setError("");
          }}
          className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
            unit === "metric"
              ? "bg-blue text-white"
              : "bg-white text-blue"
          }`}
        >
          kg and cm
        </button>
      </div>

      {/* Height inputs */}
      <div className="flex w-full max-w-[300px] gap-3">
        <div className="relative flex-1">
          <input
            type="number"
            value={height1}
            onChange={(e) => setHeight1(e.target.value)}
            placeholder=" "
            className="w-full rounded-lg border border-card-border px-4 py-3 pr-10 text-base outline-none transition-colors focus:border-blue"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-text-muted">
            {unit === "imperial" ? "ft" : "m"}
          </span>
        </div>
        <div className="relative flex-1">
          <input
            type="number"
            value={height2}
            onChange={(e) => setHeight2(e.target.value)}
            placeholder=" "
            className="w-full rounded-lg border border-card-border px-4 py-3 pr-10 text-base outline-none transition-colors focus:border-blue"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-text-muted">
            {unit === "imperial" ? "in" : "cm"}
          </span>
        </div>
      </div>

      {/* Weight input */}
      <div className="w-full max-w-[300px]">
        <div className="relative">
          <input
            type="number"
            value={weight}
            onChange={(e) => {
              setWeight(e.target.value);
              setError("");
            }}
            placeholder="Your current weight"
            className={`w-full rounded-lg border px-4 py-3 pr-10 text-base outline-none transition-colors ${
              error
                ? "border-error text-error"
                : "border-card-border focus:border-blue"
            }`}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-text-muted">
            {unit === "imperial" ? "lb" : "kg"}
          </span>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 flex items-center gap-2 rounded-lg border border-error/30 bg-error/5 px-3 py-2"
          >
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-error text-white text-xs">
              !
            </div>
            <span className="text-sm text-error">{error}</span>
          </motion.div>
        )}
      </div>

      <div className="w-full max-w-[300px]">
        <CTAButton label="Next" onClick={handleSubmit} />
      </div>
    </div>
  );
}
