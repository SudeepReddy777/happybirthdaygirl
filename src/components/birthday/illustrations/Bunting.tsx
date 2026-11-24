"use client";

import { useState } from "react";
import styles from "./Bunting.module.css";

const FLAGS = [
  { x: 14, y: 6, c: "var(--pink)" },
  { x: 60, y: 14, c: "var(--dot-yellow)" },
  { x: 106, y: 20, c: "var(--dot-blue)" },
  { x: 152, y: 22, c: "#e9c9f0" },
  { x: 198, y: 20, c: "var(--pink)" },
  { x: 244, y: 14, c: "var(--dot-yellow)" },
  { x: 290, y: 6, c: "var(--dot-blue)" },
];

/** Original pennant garland. Tap it and the flags flutter in a wave. */
export function Bunting({ label }: { label: string }) {
  const [shakes, setShakes] = useState(0);
  return (
    <button type="button" className={styles.button} onClick={() => setShakes((n) => n + 1)} aria-label={label}>
      <svg className={styles.svg} viewBox="0 0 320 54" preserveAspectRatio="xMidYMin meet" aria-hidden="true" focusable="false">
        <path d="M0 2 Q160 36 320 2" fill="none" stroke="var(--line)" strokeWidth="2" strokeLinecap="round" />
        {FLAGS.map((f, i) => (
          // The wave key restarts the flutter animation on every tap.
          <g key={`${i}-${shakes}`} className={shakes > 0 ? styles.wave : styles.drop} style={{ animationDelay: shakes > 0 ? `${i * 60}ms` : `${120 + i * 70}ms` }}>
            <path
              d={`M${f.x} ${f.y} L${f.x + 26} ${f.y} L${f.x + 13} ${f.y + 26} Z`}
              fill={f.c}
              stroke="var(--line)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </g>
        ))}
      </svg>
    </button>
  );
}
