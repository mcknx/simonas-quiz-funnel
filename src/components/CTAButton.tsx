"use client";

import { motion } from "motion/react";

interface CTAButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export default function CTAButton({
  label,
  onClick,
  disabled = false,
}: CTAButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-full py-4 text-base font-semibold text-white transition-colors ${
        disabled
          ? "cursor-not-allowed bg-primary/50"
          : "bg-primary hover:bg-primary-hover"
      }`}
    >
      {label}
    </motion.button>
  );
}
