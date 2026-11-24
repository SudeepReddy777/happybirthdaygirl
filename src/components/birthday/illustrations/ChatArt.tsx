"use client";

import { motion } from "motion/react";
import type { StoryReveal } from "@/types/birthday";
import styles from "./art.module.css";
import local from "./ChatArt.module.css";

type ChatArtProps = {
  active: boolean;
  reveals: StoryReveal[];
  selected: string | null;
  onSelect: (id: string) => void;
};

const ICONS: Record<string, { fill: string; pos: React.CSSProperties; path: React.ReactNode }> = {
  movies: {
    fill: "#fde9a8",
    pos: { left: "2%", top: "4%" },
    path: (
      <g stroke="var(--line)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
        <rect x="12" y="15" width="24" height="15" rx="2" fill="#fff" />
        <path d="M12 15 L36 15 L36 10 L12 10 Z" fill="var(--ink)" />
        <path d="M18 10 L21 15 M25 10 L28 15 M32 10 L35 15" stroke="#fff" />
        <path d="M21 20 L21 26 L27 23 Z" fill="var(--pink)" stroke="none" />
      </g>
    ),
  },
  jokes: {
    fill: "#f7ddf0",
    pos: { right: "1%", top: "26%" },
    path: (
      <g stroke="var(--line)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="21" r="11" fill="#fff" />
        <path d="M17 17 L21 19 L17 21 M31 17 L27 19 L31 21" fill="none" />
        <path d="M18 24 Q24 33 30 24 Z" fill="var(--pink)" />
      </g>
    ),
  },
  moments: {
    fill: "#cfeefa",
    pos: { left: "36%", bottom: "-3%" },
    path: (
      <g stroke="var(--line)" strokeWidth="2" strokeLinejoin="round">
        <path d="M24 9 L27 18 L36 21 L27 24 L24 33 L21 24 L12 21 L21 18 Z" fill="#fff" />
        <path d="M36 9 L37.4 12.6 L41 14 L37.4 15.4 L36 19 L34.6 15.4 L31 14 L34.6 12.6 Z" fill="var(--pink)" />
      </g>
    ),
  },
};

/** A tiny chat window with three tappable bubbles. No quotes — only the themes the story names. */
export function ChatArt({ active, reveals, selected, onSelect }: ChatArtProps) {
  return (
    <div className={styles.art}>
      <svg className={styles.svg} viewBox="0 0 300 180" aria-hidden="true" focusable="false">
        <ellipse cx="150" cy="170" rx="86" ry="4.5" fill="var(--ink)" opacity="0.1" />
        <rect x="46" y="14" width="208" height="148" rx="9" fill="#fff" stroke="var(--line)" strokeWidth="3" />
        <rect x="52" y="20" width="196" height="21" rx="5" fill="var(--pink)" stroke="var(--line)" strokeWidth="2.5" />
        {[
          [64, "var(--dot-rose)"],
          [76, "var(--dot-yellow)"],
          [88, "var(--dot-blue)"],
        ].map(([x, c]) => (
          <circle key={x as number} cx={x as number} cy="30.5" r="3.6" fill={c as string} stroke="var(--line)" strokeWidth="1.6" />
        ))}
        <rect x="64" y="54" width="84" height="18" rx="9" fill="#f1dff0" stroke="var(--line)" strokeWidth="2" />
        <rect x="64" y="78" width="56" height="18" rx="9" fill="#f1dff0" stroke="var(--line)" strokeWidth="2" />
        <rect x="150" y="102" width="88" height="18" rx="9" fill="#fbd5ea" stroke="var(--line)" strokeWidth="2" />
        <rect x="176" y="126" width="62" height="18" rx="9" fill="#fbd5ea" stroke="var(--line)" strokeWidth="2" />
        <rect x="64" y="124" width="44" height="20" rx="10" fill="#f1dff0" stroke="var(--line)" strokeWidth="2" />
        {[78, 86, 94].map((x, i) => (
          <circle key={x} className={local.dot} style={{ animationDelay: `${i * 160}ms` }} cx={x} cy="134" r="2.3" fill="var(--plum)" />
        ))}
      </svg>

      {reveals.map((r) => {
        const icon = ICONS[r.id];
        const isOn = selected === r.id;
        return (
          <motion.button
            key={r.id}
            type="button"
            className={local.bubble}
            style={icon.pos}
            aria-label={r.label.charAt(0) + r.label.slice(1).toLowerCase()}
            aria-pressed={isOn}
            tabIndex={active ? 0 : -1}
            onClick={() => onSelect(r.id)}
            animate={{ scale: isOn ? 1.14 : 1, rotate: isOn ? -6 : 0 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 380, damping: 16 }}
          >
            <svg viewBox="0 0 48 44" width="52" height="48" aria-hidden="true" focusable="false">
              <path
                d="M8 3 H40 a6 6 0 0 1 6 6 V28 a6 6 0 0 1 -6 6 H27 L21 41 L19 34 H8 a6 6 0 0 1 -6 -6 V9 a6 6 0 0 1 6 -6 Z"
                fill={icon.fill}
                stroke={isOn ? "var(--plum)" : "var(--line)"}
                strokeWidth="2.4"
                strokeLinejoin="round"
              />
              {icon.path}
            </svg>
          </motion.button>
        );
      })}
    </div>
  );
}
