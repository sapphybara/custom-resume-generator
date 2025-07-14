"use client";

import ColorModeToggle from "@/components/ui/color-mode-toggle";

export default function Home() {
  return (
    <div className="flex-1 w-full">
      <h1>Custom resume generator</h1>
      <p>
        Utility to make passing the ATS more feasible. Allows for customization
        of sections while abstracting formatting logic.
      </p>
    </div>
  );
}
