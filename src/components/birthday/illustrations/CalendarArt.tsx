"use client";

import { animate, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import styles from "./art.module.css";
import local from "./CalendarArt.module.css";

type CalendarArtProps = {
  active: boolean;
  stamped: boolean;
  onToggle: () => void;
  dayCount: number;
  rangeLabel: string;
};

/** Calendar page with a day counter that counts up the first time it is seen. */
export function CalendarArt({ active, stamped, onToggle, dayCount, rangeLabel }: CalendarArtProps) {
  const reduced = usePrefersReducedMotion();
  const [n, setN] = useState(0);
  const played = useRef(false);

  // Count up once, the first time this panel is on screen.
  useEffect(() => {
    if (!active || played.current) return;
    played.current = true;
    if (reduced) return;
    animate(0, dayCount, {
      duration: 1.3,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
  }, [active, reduced, dayCount]);

  const shown = reduced ? dayCount : n;

  return (
    <div className={styles.art}>
      <svg className={styles.svg} viewBox="0 0 300 180" aria-hidden="true" focusable="false">
        <ellipse cx="150" cy="172" rx="76" ry="4.5" fill="var(--ink)" opacity="0.1" />
        <rect x="78" y="14" width="152" height="150" rx="9" transform="rotate(3.5 150 90)" fill="#f3dff0" stroke="var(--line)" strokeWidth="2.5" />
        <rect x="70" y="12" width="156" height="152" rx="9" fill="#fff" stroke="var(--line)" strokeWidth="3" />
        <path d="M79 12 H217 a9 9 0 0 1 9 9 V44 H70 V21 a9 9 0 0 1 9 -9 Z" fill="var(--pink)" stroke="var(--line)" strokeWidth="3" strokeLinejoin="round" />
        {[104, 186].map((x) => (
          <rect key={x} x={x} y="4" width="10" height="20" rx="5" fill="#fff" stroke="var(--line)" strokeWidth="2.5" />
        ))}
        <text x="148" y="35" textAnchor="middle" className={styles.pixel} fontSize="12" fontWeight="700" fill="#fff" letterSpacing="2" style={{ paintOrder: "stroke" }} stroke="var(--pink-button-edge)" strokeWidth="2.4">
          2026
        </text>
        {[0, 1].flatMap((r) =>
          Array.from({ length: 7 }, (_, c) => {
            const x = 86 + c * 19;
            const y = 134 + r * 15;
            const hit = r === 1 && c === 5;
            return (
              <rect
                key={`${r}-${c}`}
                x={x}
                y={y}
                width="13"
                height="10"
                rx="2.5"
                fill={hit ? "var(--pink)" : "#f6e7f2"}
                stroke="var(--line)"
                strokeWidth="1.6"
              />
            );
          }),
        )}
      </svg>

      <div className={local.counter} aria-hidden="true">
        <span className={local.number}>{shown}</span>
        <span className={local.unit}>DAYS</span>
        <span className={local.range}>{rangeLabel}</span>
      </div>

      <span className={local.stampPos} aria-hidden="true">
        <motion.svg
          className={local.stamp}
          viewBox="-2 -2 28 26"
          focusable="false"
          initial={false}
          animate={{ scale: stamped ? 1 : 0, rotate: stamped ? -10 : 40, opacity: stamped ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 420, damping: 14 }}
        >
          <path
            d="M12 20 C-4 9 5 0 12 7 C19 0 28 9 12 20 Z"
            fill="var(--pink)"
            stroke="var(--line)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </motion.svg>
      </span>

      <button
        type="button"
        className={styles.hit}
        style={{ left: "22%", top: "4%", width: "56%", height: "92%" }}
        aria-label={stamped ? "Clear the circled date" : "Circle the birthday on the calendar"}
        aria-pressed={stamped}
        onClick={onToggle}
        tabIndex={active ? 0 : -1}
      />
    </div>
  );
}
