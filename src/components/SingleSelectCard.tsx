"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface SingleSelectOption {
  id: string;
  label: string;
  description?: string;
}

interface SingleSelectCardProps {
  question: string;
  subtitle?: string;
  options: SingleSelectOption[];
  onSelect: (optionId: string) => void;
}

export default function SingleSelectCard({
  question,
  subtitle,
  options,
  onSelect,
}: SingleSelectCardProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-bold leading-tight">
          {question}
        </h2>
        {subtitle && (
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex w-full flex-col gap-3">
        {options.map((option, index) => (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onSelect(option.id)}
            className="flex items-center justify-between rounded-xl border border-card-border bg-white px-5 py-4 text-left transition-colors hover:border-text-muted"
          >
            <span className="text-base">{option.label}</span>
            <ArrowRight className="h-5 w-5 text-text-muted" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
