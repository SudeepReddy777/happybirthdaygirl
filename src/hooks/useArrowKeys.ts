"use client";

import { useEffect } from "react";

type Handlers = { onLeft?: () => void; onRight?: () => void; enabled?: boolean };

/** ArrowLeft / ArrowRight shortcuts for paging. Ignored with modifier keys or while typing. */
export function useArrowKeys({ onLeft, onRight, enabled = true }: Handlers) {
  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (e.key === "ArrowLeft") onLeft?.();
      else if (e.key === "ArrowRight") onRight?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enabled, onLeft, onRight]);
}
