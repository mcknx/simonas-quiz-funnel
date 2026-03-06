"use client";

import { ArrowLeft } from "lucide-react";

interface HeaderProps {
  onBack?: () => void;
  showBack?: boolean;
}

export default function Header({ onBack, showBack = true }: HeaderProps) {
  return (
    <header className="relative flex h-[60px] items-center justify-center px-4">
      {showBack && onBack && (
        <button
          onClick={onBack}
          className="absolute left-4 flex items-center gap-1 text-sm font-medium"
        >
          <ArrowLeft className="h-5 w-5 text-primary" />
          <span className="text-foreground">BACK</span>
        </button>
      )}
      <div className="flex items-center gap-1 font-heading text-xl font-bold tracking-tight">
        <span className="text-primary">DO</span>
        <span className="text-foreground">FASTING</span>
      </div>
    </header>
  );
}
