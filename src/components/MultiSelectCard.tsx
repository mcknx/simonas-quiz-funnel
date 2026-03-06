"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { motion } from "motion/react";
import CTAButton from "./CTAButton";

interface MultiSelectOption {
  id: string;
  label: string;
}

interface MultiSelectCardProps {
  question: string;
  options: MultiSelectOption[];
  onSubmit: (selectedIds: string[]) => void;
}

export default function MultiSelectCard({
  question,
  options,
  onSubmit,
}: MultiSelectCardProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-center font-heading text-2xl font-bold leading-tight">
        {question}
      </h2>

      <div className="flex w-full flex-col gap-3">
        {options.map((option, index) => {
          const isSelected = selected.includes(option.id);
          return (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleOption(option.id)}
              className={`flex items-center gap-3 rounded-xl border px-5 py-4 text-left transition-colors ${
                isSelected
                  ? "border-blue bg-blue/5"
                  : "border-card-border bg-white hover:border-text-muted"
              }`}
            >
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  isSelected
                    ? "border-blue bg-blue text-white"
                    : "border-card-border"
                }`}
              >
                {isSelected && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
              </div>
              <span
                className={`text-base ${isSelected ? "text-primary" : "text-foreground"}`}
              >
                {option.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {selected.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
        >
          <CTAButton label="Next" onClick={() => onSubmit(selected)} />
        </motion.div>
      )}
    </div>
  );
}
