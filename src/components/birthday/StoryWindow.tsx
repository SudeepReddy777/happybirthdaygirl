"use client";

import { motion } from "motion/react";
import type { StoryPanel } from "@/types/birthday";
import { CalendarArt } from "./illustrations/CalendarArt";
import { ChatArt } from "./illustrations/ChatArt";
import { NoteArt } from "./illustrations/NoteArt";
import { RetroWindow } from "./RetroWindow";
import { PixelHeart } from "./PixelIcons";
import styles from "./StoryWindow.module.css";

type StoryWindowProps = {
  panels: StoryPanel[];
  index: number;
  footerLabel: string;
  /** panel id → id of the reveal the visitor tapped (null = none yet) */
  picked: Record<string, string | null>;
  onPick: (panelId: string, revealId: string | null) => void;
  dayCount: number;
  rangeLabel: string;
};

/**
 * One reusable window; all three panels are stacked in the same grid cell so the
 * frame is always as tall as the tallest panel and never jumps between steps.
 */
export function StoryWindow({
  panels,
  index,
  footerLabel,
  picked,
  onPick,
  dayCount,
  rangeLabel,
}: StoryWindowProps) {
  return (
    <RetroWindow fileName={panels[index].fileName} footerLabel={footerLabel}>
      <div className={styles.stack}>
        {panels.map((panel, i) => {
          const active = i === index;
          const sel = picked[panel.id] ?? null;
          const chosen = panel.reveals.find((r) => r.id === sel);
          const dir = i < index ? -14 : 14;

          return (
            <motion.section
              key={panel.id}
              className={styles.panel}
              aria-label={`Story ${i + 1} of ${panels.length}: ${panel.title}`}
              aria-hidden={!active}
              inert={!active}
              initial={false}
              animate={{ opacity: active ? 1 : 0, x: active ? 0 : dir }}
              transition={{ duration: active ? 0.38 : 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {panel.id === "note" ? (
                <NoteArt active={active} open={sel !== null} onToggle={() => onPick(panel.id, sel ? null : "note")} />
              ) : null}
              {panel.id === "chat" ? (
                <ChatArt
                  active={active}
                  reveals={panel.reveals}
                  selected={sel}
                  onSelect={(id) => onPick(panel.id, id)}
                />
              ) : null}
              {panel.id === "calendar" ? (
                <CalendarArt
                  active={active}
                  stamped={sel !== null}
                  onToggle={() => onPick(panel.id, sel ? null : "calendar")}
                  dayCount={dayCount}
                  rangeLabel={rangeLabel}
                />
              ) : null}

              <h2 className={styles.title}>{panel.title}</h2>
              {panel.supporting ? <p className={styles.supporting}>{panel.supporting}</p> : null}
              <p className={styles.body}>{panel.body}</p>

              <p className={styles.reveal} aria-live="polite">
                {chosen ? (
                  <motion.span key={chosen.id} className={styles.message} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                    <PixelHeart className={styles.heart} /> {chosen.message}
                  </motion.span>
                ) : (
                  <span className={styles.hintText}>
                    <PixelHeart className={styles.heart} /> {panel.hint}
                  </span>
                )}
              </p>
            </motion.section>
          );
        })}
      </div>
    </RetroWindow>
  );
}
