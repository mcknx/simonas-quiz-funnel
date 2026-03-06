"use client";

import { useState } from "react";
import { motion } from "motion/react";
import CTAButton from "./CTAButton";

interface WaterGlassesProps {
  question: string;
  onSubmit: (count: number) => void;
}

function GlassSVG({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 40 56" className="h-14 w-10">
      {/* Glass outline */}
      <path
        d="M4 4 L8 52 L32 52 L36 4 Z"
        fill={filled ? "#2979FF" : "#f0f0f0"}
        stroke="#d0d0d0"
        strokeWidth="1.5"
        rx="2"
      />
      {filled && (
        <path
          d="M6 12 L9 50 L31 50 L34 12 Z"
          fill="#2979FF"
          opacity="0.9"
        />
      )}
      {!filled && (
        <text
          x="20"
          y="32"
          textAnchor="middle"
          className="fill-text-muted text-xl font-light"
        >
          +
        </text>
      )}
    </svg>
  );
}

export default function WaterGlasses({ question, onSubmit }: WaterGlassesProps) {
  const [count, setCount] = useState(0);
  const totalGlasses = 10;

  const toggleGlass = (index: number) => {
    // If clicking a filled glass, unfill from there. If clicking empty, fill up to there.
    if (index < count) {
      setCount(index);
    } else {
      setCount(index + 1);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-center font-heading text-2xl font-bold leading-tight">
        {question}
      </h2>

      <div className="grid grid-cols-5 gap-3">
        {Array.from({ length: totalGlasses }).map((_, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleGlass(i)}
            className="cursor-pointer"
          >
            <GlassSVG filled={i < count} />
          </motion.button>
        ))}
      </div>

      <div className="w-full">
        <CTAButton
          label="Next"
          onClick={() => onSubmit(count)}
          disabled={count === 0}
        />
      </div>
    </div>
  );
}
