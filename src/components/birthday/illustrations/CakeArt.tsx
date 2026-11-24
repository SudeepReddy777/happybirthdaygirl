"use client";

import { motion } from "motion/react";
import styles from "./CakeArt.module.css";

type CakeArtProps = { blown: boolean };

const CANDLES = [
  { x: 96, fill: "var(--pink)" },
  { x: 120, fill: "var(--dot-yellow)" },
  { x: 144, fill: "var(--dot-blue)" },
];

const SPRINKLES = [
  [50, 160, 20, "var(--pink)"],
  [74, 168, -30, "var(--dot-yellow)"],
  [186, 158, 40, "var(--dot-blue)"],
  [182, 166, -20, "var(--pink)"],
  [155, 172, 10, "var(--dot-yellow)"],
  [62, 172, 70, "var(--dot-blue)"],
] as const;

const STARS = [
  { x: 36, y: 62, s: 1, d: 0.1 },
  { x: 206, y: 50, s: 1.25, d: 0.25 },
  { x: 214, y: 118, s: 0.8, d: 0.4 },
  { x: 28, y: 122, s: 0.9, d: 0.35 },
];

const star = (x: number, y: number, s: number) =>
  `M${x} ${y - 9 * s} L${x + 2.6 * s} ${y - 2.6 * s} L${x + 9 * s} ${y} L${x + 2.6 * s} ${y + 2.6 * s} L${x} ${y + 9 * s} L${x - 2.6 * s} ${y + 2.6 * s} L${x - 9 * s} ${y} L${x - 2.6 * s} ${y - 2.6 * s} Z`;

/** Original two-tier cake. Flames flicker gently until the candles are blown out. */
export function CakeArt({ blown }: CakeArtProps) {
  return (
    <svg className={styles.svg} viewBox="0 0 240 200" aria-hidden="true" focusable="false">
      <ellipse cx="120" cy="187" rx="104" ry="9" fill="#fff" stroke="var(--line)" strokeWidth="3" />

      {/* bottom tier */}
      <rect x="42" y="124" width="156" height="58" rx="10" fill="#fbd5ea" stroke="var(--line)" strokeWidth="3" />
      {[66, 120, 172].map((x, i) => (
        <ellipse key={x} cx={x} cy={i === 1 ? 146 : 142} rx="7" ry="9" fill="#fff7ee" stroke="var(--line)" strokeWidth="2.6" />
      ))}
      <rect x="42" y="124" width="156" height="17" rx="8.5" fill="#fff7ee" stroke="var(--line)" strokeWidth="3" />
      {SPRINKLES.map(([x, y, r, c], i) => (
        <rect key={i} x={x} y={y} width="9" height="3.6" rx="1.8" fill={c} transform={`rotate(${r} ${x + 4} ${y + 2})`} />
      ))}
      {/* face */}
      <ellipse cx="102" cy="159" rx="3" ry="4" fill="var(--ink)" />
      <ellipse cx="138" cy="159" rx="3" ry="4" fill="var(--ink)" />
      <ellipse cx="91" cy="167" rx="6.5" ry="3.6" fill="#f6a0c6" opacity="0.8" />
      <ellipse cx="149" cy="167" rx="6.5" ry="3.6" fill="#f6a0c6" opacity="0.8" />
      <path d="M114 165 Q120 172 126 165" fill="none" stroke="var(--ink)" strokeWidth="2.4" strokeLinecap="round" />

      {/* top tier */}
      <rect x="72" y="86" width="96" height="42" rx="9" fill="#fff3df" stroke="var(--line)" strokeWidth="3" />
      {[92, 120, 148].map((x, i) => (
        <ellipse key={x} cx={x} cy={i === 1 ? 108 : 104} rx="6" ry="8" fill="var(--pink)" stroke="var(--line)" strokeWidth="2.4" />
      ))}
      <rect x="72" y="86" width="96" height="15" rx="7.5" fill="var(--pink)" stroke="var(--line)" strokeWidth="3" />

      {/* candles */}
      {CANDLES.map((c, i) => (
        <g key={c.x}>
          <rect x={c.x - 5} y="54" width="10" height="33" rx="3" fill={c.fill} stroke="var(--line)" strokeWidth="2.5" />
          <path d={`M${c.x - 5} 66 L${c.x + 5} 61 M${c.x - 5} 77 L${c.x + 5} 72`} stroke="#fff" strokeWidth="2.4" opacity="0.85" />
          <path d={`M${c.x} 54 V48`} stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />

          <motion.g
            style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
            initial={false}
            animate={blown ? { scale: 0, opacity: 0, y: -6 } : { scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: blown ? i * 0.12 : 0 }}
          >
            <g className={styles.flame} style={{ animationDelay: `${i * 260}ms` }}>
              <path
                d={`M${c.x} 28 C${c.x + 9} 36 ${c.x + 7} 47 ${c.x} 48 C${c.x - 7} 47 ${c.x - 9} 36 ${c.x} 28 Z`}
                fill="#ffd766"
                stroke="var(--line)"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              <path d={`M${c.x} 37 C${c.x + 3} 41 ${c.x + 3} 45 ${c.x} 46 C${c.x - 3} 45 ${c.x - 3} 41 ${c.x} 37 Z`} fill="#ff9f5a" />
            </g>
          </motion.g>

          <motion.path
            d={`M${c.x} 44 q5 -7 0 -13 t0 -13`}
            fill="none"
            stroke="#b9a8c4"
            strokeWidth="2.4"
            strokeLinecap="round"
            initial={false}
            animate={blown ? { opacity: [0, 0.9, 0], y: [0, -10, -24] } : { opacity: 0, y: 0 }}
            transition={{ duration: 1.3, delay: blown ? 0.2 + i * 0.12 : 0, ease: "easeOut" }}
          />
        </g>
      ))}

      {STARS.map((s, i) => (
        <motion.path
          key={i}
          d={star(s.x, s.y, s.s)}
          fill="var(--dot-yellow)"
          stroke="var(--line)"
          strokeWidth="1.8"
          strokeLinejoin="round"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          initial={false}
          animate={blown ? { scale: 1, opacity: 1, rotate: 0 } : { scale: 0, opacity: 0, rotate: -40 }}
          transition={{ type: "spring", stiffness: 300, damping: 13, delay: blown ? 0.35 + s.d : 0 }}
        />
      ))}
    </svg>
  );
}
