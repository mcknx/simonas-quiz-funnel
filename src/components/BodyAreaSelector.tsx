"use client";

import { useState } from "react";
import { motion } from "motion/react";
import CTAButton from "./CTAButton";

interface BodyArea {
  id: string;
  label: string;
  top: string;
  left: string;
}

interface BodyAreaSelectorProps {
  question: string;
  subtitle?: string;
  areas: BodyArea[];
  onSubmit: (selectedAreas: string[]) => void;
}

export default function BodyAreaSelector({
  question,
  subtitle,
  areas,
  onSubmit,
}: BodyAreaSelectorProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleArea = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-bold leading-tight">
          {question}
        </h2>
        {subtitle && (
          <p className="mt-2 text-sm text-text-secondary">{subtitle}</p>
        )}
      </div>

      {/* Body silhouette with floating labels */}
      <div className="relative mx-auto h-[360px] w-[280px]">
        {/* Simple body silhouette */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 120 240" className="h-[320px] w-auto opacity-30">
            {/* Head */}
            <circle cx="60" cy="24" r="16" fill="#666" />
            {/* Neck */}
            <rect x="54" y="40" width="12" height="12" fill="#666" rx="2" />
            {/* Torso */}
            <path d="M35 52 L85 52 L80 140 L40 140 Z" fill="#666" rx="4" />
            {/* Arms */}
            <path d="M35 55 L15 110 L20 112 L38 62" fill="#666" />
            <path d="M85 55 L105 110 L100 112 L82 62" fill="#666" />
            {/* Legs */}
            <path d="M42 140 L38 230 L48 230 L52 145" fill="#666" />
            <path d="M68 145 L72 230 L82 230 L78 140" fill="#666" />
          </svg>
        </div>

        {/* Floating labels */}
        {areas.map((area) => {
          const isSelected = selected.includes(area.id);
          return (
            <motion.button
              key={area.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleArea(area.id)}
              className={`absolute flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium shadow-md transition-colors ${
                isSelected
                  ? "bg-blue text-white"
                  : "bg-white text-foreground border border-card-border"
              }`}
              style={{ top: area.top, left: area.left }}
            >
              <div
                className={`flex h-4 w-4 items-center justify-center rounded-full text-xs ${
                  isSelected ? "bg-white text-blue" : "bg-blue text-white"
                }`}
              >
                +
              </div>
              {area.label}
            </motion.button>
          );
        })}
      </div>

      <div className="w-full">
        <CTAButton label="Continue" onClick={() => onSubmit(selected)} />
      </div>
    </div>
  );
}
