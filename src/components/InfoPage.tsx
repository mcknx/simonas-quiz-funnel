"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";
import CTAButton from "./CTAButton";

interface InfoPageProps {
  icon: ReactNode;
  heading: string;
  body: ReactNode;
  buttonLabel: string;
  onContinue: () => void;
  pinkBg?: boolean;
}

export default function InfoPage({
  icon,
  heading,
  body,
  buttonLabel,
  onContinue,
  pinkBg = false,
}: InfoPageProps) {
  return (
    <div
      className={`flex min-h-[60vh] flex-col ${pinkBg ? "bg-bg-pink" : "bg-white"}`}
    >
      <div className="flex flex-1 flex-col gap-4 px-1">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex justify-start"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-white text-primary">
            {icon}
          </div>
        </motion.div>

        <h2 className="font-heading text-[28px] font-bold leading-tight">
          {heading}
        </h2>

        <div className="text-base leading-relaxed text-text-secondary">
          {body}
        </div>
      </div>

      <div className="mt-8">
        <CTAButton label={buttonLabel} onClick={onContinue} />
      </div>
    </div>
  );
}
