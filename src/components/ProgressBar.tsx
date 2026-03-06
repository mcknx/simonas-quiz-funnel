"use client";

import { Check } from "lucide-react";

interface ProgressBarProps {
  /** Which segment (0-3) is currently active */
  activeSegment: number;
  /** Progress within the active segment (0 to 1) */
  segmentProgress: number;
  totalSegments?: number;
}

export default function ProgressBar({
  activeSegment,
  segmentProgress,
  totalSegments = 4,
}: ProgressBarProps) {
  return (
    <div className="flex items-center justify-center gap-0 py-6">
      {Array.from({ length: totalSegments }).map((_, i) => {
        const isComplete = i < activeSegment;
        const isActive = i === activeSegment;

        return (
          <div key={i} className="flex items-center">
            {/* Node */}
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full border-2 transition-colors ${
                isComplete || isActive
                  ? "border-primary bg-primary text-white"
                  : "border-progress-inactive bg-white text-progress-inactive"
              }`}
            >
              <Check className="h-4 w-4" strokeWidth={3} />
            </div>

            {/* Connector line (not after last node) */}
            {i < totalSegments - 1 && (
              <div className="relative h-[2px] w-16 bg-progress-inactive">
                <div
                  className="absolute left-0 top-0 h-full bg-primary transition-all duration-300"
                  style={{
                    width: isComplete
                      ? "100%"
                      : isActive
                        ? `${segmentProgress * 100}%`
                        : "0%",
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
