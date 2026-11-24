"use client";

import { motion } from "motion/react";
import styles from "./EnvelopeArt.module.css";

type EnvelopeArtProps = { opened: boolean };

const flip = { transformBox: "fill-box", transformOrigin: "50% 0%" } as const;

/** Envelope that opens: the seal lets go, the flap folds back, the letter slides up. */
export function EnvelopeArt({ opened }: EnvelopeArtProps) {
  return (
    <svg className={styles.svg} viewBox="0 0 240 190" aria-hidden="true" focusable="false">
      <ellipse cx="120" cy="178" rx="92" ry="5" fill="var(--ink)" opacity="0.1" />
      <rect x="20" y="62" width="200" height="108" rx="8" fill="#f9c8e4" stroke="var(--line)" strokeWidth="3" />

      {/* open flap, hidden behind the letter */}
      <motion.path
        d="M20 66 L120 8 L220 66 Z"
        fill="#fbd5ea"
        stroke="var(--line)"
        strokeWidth="3"
        strokeLinejoin="round"
        style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
        initial={false}
        animate={{ opacity: opened ? 1 : 0, scaleY: opened ? 1 : 0.2 }}
        transition={{ duration: 0.45, delay: opened ? 0.12 : 0 }}
      />

      {/* the letter */}
      <motion.g
        initial={false}
        animate={{ y: opened ? -52 : 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: opened ? 0.3 : 0 }}
      >
        <rect x="40" y="74" width="160" height="92" rx="4" fill="#fffdf4" stroke="var(--line)" strokeWidth="2.6" />
        {[92, 106, 120].map((y) => (
          <path key={y} d={`M54 ${y} H${y === 120 ? 130 : 186}`} stroke="#ecd0e4" strokeWidth="3" strokeLinecap="round" />
        ))}
        <path d="M168 148 C160 142 163 136 168 139 C173 136 176 142 168 148 Z" fill="var(--pink)" stroke="var(--line)" strokeWidth="1.6" strokeLinejoin="round" />
      </motion.g>

      {/* front pocket */}
      <path
        d="M20 170 V70 L120 128 L220 70 V170 Z"
        fill="#fff1f8"
        stroke="var(--line)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M20 170 L92 114 M220 170 L148 114" fill="none" stroke="var(--line)" strokeWidth="2.4" strokeLinecap="round" />

      {/* closed flap */}
      <motion.path
        d="M20 66 L220 66 L120 128 Z"
        fill="#f7ddf0"
        stroke="var(--line)"
        strokeWidth="3"
        strokeLinejoin="round"
        style={flip}
        initial={false}
        animate={{ scaleY: opened ? -0.7 : 1, opacity: opened ? 0 : 1 }}
        transition={{ duration: 0.42, ease: [0.65, 0, 0.35, 1] }}
      />
      <motion.g
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        initial={false}
        animate={{ scale: opened ? 1.5 : 1, opacity: opened ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <circle cx="120" cy="124" r="11" fill="var(--pink)" stroke="var(--line)" strokeWidth="2.6" />
        <path d="M120 130 C113 125 115 119 120 122 C125 119 127 125 120 130 Z" fill="#fff" />
      </motion.g>
    </svg>
  );
}
