"use client";

import { motion } from "motion/react";
import styles from "./art.module.css";

type NoteArtProps = { active: boolean; open: boolean; onToggle: () => void };

const heart = (x: number, y: number, s: number) =>
  `M${x} ${y + 4 * s} C${x - 7 * s} ${y - 2 * s} ${x - 2 * s} ${y - 8 * s} ${x} ${y - 3 * s} C${x + 2 * s} ${y - 8 * s} ${x + 7 * s} ${y - 2 * s} ${x} ${y + 4 * s} Z`;

/** A paper note, a pencil and a few hearts. Tapping the note unfolds it and draws a doodle. */
export function NoteArt({ active, open, onToggle }: NoteArtProps) {
  return (
    <div className={styles.art}>
      <svg className={styles.svg} viewBox="0 0 300 180" aria-hidden="true" focusable="false">
        <ellipse cx="150" cy="168" rx="72" ry="5" fill="var(--ink)" opacity="0.1" />

        {[
          [58, 52, 1.5, 0],
          [244, 40, 1.2, 80],
          [256, 118, 1.7, 160],
        ].map(([x, y, s, d], i) => (
          <path
            key={i}
            d={heart(x, y, s)}
            fill="var(--pink)"
            stroke="var(--line)"
            strokeWidth="2"
            strokeLinejoin="round"
            className={styles.popIn}
            style={{ animationDelay: `${d + 200}ms` }}
          />
        ))}

        <motion.g
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          initial={false}
          animate={{ rotate: open ? 0 : -4, scale: open ? 1.05 : 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        >
          <path
            d="M99 18 H187 L205 36 V154 a4 4 0 0 1 -4 4 H99 a4 4 0 0 1 -4 -4 V22 a4 4 0 0 1 4 -4 Z"
            fill="#fffdf4"
            stroke="var(--line)"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path d="M187 18 V36 H205 Z" fill="#f3dff0" stroke="var(--line)" strokeWidth="3" strokeLinejoin="round" />
          {[66, 86, 106, 126].map((y) => (
            <path key={y} d={`M110 ${y} H190`} stroke="#ecd0e4" strokeWidth="3" strokeLinecap="round" />
          ))}
          <path
            d="M110 52 q8 -11 16 0 t16 0 t16 0 t16 0"
            fill="none"
            stroke="var(--plum)"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <path d={heart(176, 140, 1.3)} fill="var(--pink)" stroke="var(--line)" strokeWidth="1.8" strokeLinejoin="round" />
          {/* a doodle that draws itself when the note is opened */}
          <motion.path
            d="M118 142 l5 -10 l5 10 l-9 -6 h8 z"
            fill="none"
            stroke="var(--plum)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={false}
            animate={{ pathLength: open ? 1 : 0, opacity: open ? 1 : 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        </motion.g>

        <g transform="translate(222 148) rotate(-32)" stroke="var(--line)" strokeWidth="2.5" strokeLinejoin="round">
          <rect x="0" y="-6" width="52" height="12" rx="2" fill="var(--dot-yellow)" />
          <rect x="44" y="-6" width="6" height="12" fill="#d8d3e4" />
          <rect x="50" y="-6" width="12" height="12" rx="4" fill="#f6a8cb" />
          <path d="M0 -6 L-17 0 L0 6 Z" fill="#f6d8b0" />
          <path d="M-17 0 L-11 -3 L-11 3 Z" fill="var(--ink)" stroke="none" />
        </g>
      </svg>

      <button
        type="button"
        className={styles.hit}
        style={{ left: "27%", top: "4%", width: "46%", height: "92%" }}
        aria-label={open ? "Fold the note back up" : "Unfold the note"}
        aria-pressed={open}
        onClick={onToggle}
        tabIndex={active ? 0 : -1}
      />
    </div>
  );
}
