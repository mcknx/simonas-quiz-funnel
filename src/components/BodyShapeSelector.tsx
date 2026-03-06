"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";

interface BodyShape {
  id: string;
  label: string;
}

interface BodyShapeSelectorProps {
  question: string;
  shapes: BodyShape[];
  onSelect: (shapeId: string) => void;
}

const shapeIcons: Record<string, ReactNode> = {
  rounded: (
    <svg viewBox="0 0 60 100" className="h-20 w-12">
      <ellipse cx="30" cy="18" rx="10" ry="12" fill="#f0c8a0" />
      <ellipse cx="30" cy="60" rx="22" ry="30" fill="#8ecae6" />
      <rect x="20" y="85" width="8" height="15" fill="#f0c8a0" rx="2" />
      <rect x="32" y="85" width="8" height="15" fill="#f0c8a0" rx="2" />
    </svg>
  ),
  triangle: (
    <svg viewBox="0 0 60 100" className="h-20 w-12">
      <ellipse cx="30" cy="18" rx="10" ry="12" fill="#f0c8a0" />
      <polygon points="30,35 10,85 50,85" fill="#e07070" />
      <rect x="20" y="85" width="8" height="15" fill="#f0c8a0" rx="2" />
      <rect x="32" y="85" width="8" height="15" fill="#f0c8a0" rx="2" />
    </svg>
  ),
  rectangle: (
    <svg viewBox="0 0 60 100" className="h-20 w-12">
      <ellipse cx="30" cy="18" rx="10" ry="12" fill="#f0c8a0" />
      <rect x="15" y="35" width="30" height="50" fill="#90ee90" rx="4" />
      <rect x="20" y="85" width="8" height="15" fill="#f0c8a0" rx="2" />
      <rect x="32" y="85" width="8" height="15" fill="#f0c8a0" rx="2" />
    </svg>
  ),
  "inverted-triangle": (
    <svg viewBox="0 0 60 100" className="h-20 w-12">
      <ellipse cx="30" cy="18" rx="10" ry="12" fill="#f0c8a0" />
      <polygon points="10,35 50,35 30,85" fill="#70c070" />
      <rect x="20" y="85" width="8" height="15" fill="#f0c8a0" rx="2" />
      <rect x="32" y="85" width="8" height="15" fill="#f0c8a0" rx="2" />
    </svg>
  ),
  hourglass: (
    <svg viewBox="0 0 60 100" className="h-20 w-12">
      <ellipse cx="30" cy="18" rx="10" ry="12" fill="#f0c8a0" />
      <path d="M12,35 Q30,55 12,85 L48,85 Q30,55 48,35 Z" fill="#6090d0" />
      <rect x="20" y="85" width="8" height="15" fill="#f0c8a0" rx="2" />
      <rect x="32" y="85" width="8" height="15" fill="#f0c8a0" rx="2" />
    </svg>
  ),
};

export default function BodyShapeSelector({
  question,
  shapes,
  onSelect,
}: BodyShapeSelectorProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-center font-heading text-2xl font-bold leading-tight">
        {question}
      </h2>

      <div className="grid grid-cols-3 gap-3">
        {shapes.map((shape, index) => (
          <motion.button
            key={shape.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(shape.id)}
            className={`flex flex-col items-center gap-2 rounded-xl border border-card-border bg-white p-4 transition-colors hover:border-text-muted ${
              index >= 3 ? "col-span-1" : ""
            }`}
          >
            <div className="flex h-24 items-center justify-center rounded-lg bg-blue/5 px-3">
              {shapeIcons[shape.id] || (
                <div className="h-16 w-10 rounded bg-gray-200" />
              )}
            </div>
            <span className="text-sm font-medium">{shape.label}</span>
            <div className="h-3 w-3 rounded-full border-2 border-blue/40" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
