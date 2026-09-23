"use client";

import { useEffect, useState } from "react";
import { statusFor, type OpenState } from "@/lib/hours";
import type { OpeningHour } from "@/lib/types";

/**
 * "Open now until 1 AM", worked out in the visitor's browser against
 * Lebanese time, so it's right whenever the page is opened, not just
 * when it was built. Renders nothing if the hours can't be read.
 */
export function OpenStatus({ week, className = "" }: { week?: OpeningHour[]; className?: string }) {
  const [state, setState] = useState<OpenState | null>(null);

  useEffect(() => {
    const update = () => setState(statusFor(week));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [week]);

  if (!state) return null;

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className={`size-2 rounded-full ${state.open ? "bg-emerald-400 shadow-[0_0_0_4px_rgb(52_211_153/0.18)]" : "bg-current opacity-40"}`}
      />
      {state.label}
    </span>
  );
}
