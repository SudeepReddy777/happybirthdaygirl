"use client";

import { useEffect, useState } from "react";

type Options = {
  msPerChar?: number;
  startDelayMs?: number;
  /** Skip the animation entirely (reduced motion, or already played once). */
  instant?: boolean;
  onDone?: () => void;
};

/** Returns how many characters of `length` are currently revealed. Plays once per mount. */
export function useTypewriter(
  length: number,
  { msPerChar = 48, startDelayMs = 650, instant = false, onDone }: Options = {},
) {
  const [typed, setTyped] = useState(0);
  const count = instant ? length : typed;

  useEffect(() => {
    if (instant) {
      onDone?.();
      return;
    }
    let n = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        n += 1;
        setTyped(n);
        if (n >= length) {
          clearInterval(interval);
          onDone?.();
        }
      }, msPerChar);
    }, startDelayMs);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
    // onDone is intentionally excluded: the animation must not restart if the parent re-renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instant, length, msPerChar, startDelayMs]);

  return count;
}
