"use client";

import { motion, type PanInfo } from "motion/react";
import { useState } from "react";
import { useArrowKeys } from "@/hooks/useArrowKeys";
import type { BirthdayContent } from "@/types/birthday";
import { ProgressDots } from "./ProgressDots";
import { RetroButton } from "./RetroButton";
import { StoryWindow } from "./StoryWindow";
import { useWindowChrome } from "./WindowChrome";
import styles from "./StoryArchive.module.css";

type StoryArchiveProps = {
  content: BirthdayContent["story"];
  dayCount: number;
  rangeLabel: string;
  index: number;
  onPrev: () => void;
  onNext: () => void;
  onLetter: () => void;
};

export function StoryArchive({
  content,
  dayCount,
  rangeLabel,
  index,
  onPrev,
  onNext,
  onLetter,
}: StoryArchiveProps) {
  const total = content.panels.length;
  const last = index === total - 1;
  const [picked, setPicked] = useState<Record<string, string | null>>({});
  const live = useWindowChrome()?.interactive ?? true;

  // ← / → turn the panels (the last panel's "read letter" stays a deliberate click).
  useArrowKeys({
    enabled: live,
    onLeft: () => index > 0 && onPrev(),
    onRight: () => !last && onNext(),
  });

  // Swipe sideways on the window, like flipping through photos.
  const onSwipe = (_: PointerEvent, info: PanInfo) => {
    const { x, y } = info.offset;
    if (Math.abs(x) < 60 || Math.abs(x) < Math.abs(y) * 1.5) return;
    if (x < 0 && !last) onNext();
    else if (x > 0 && index > 0) onPrev();
  };

  return (
    <div className={styles.wrap}>
      <h1 className={styles.eyebrow} data-scene-heading tabIndex={-1}>
        {content.eyebrow}
      </h1>

      <div className={styles.meta}>
        <p className={styles.counter}>
          {content.counterLabel} {index + 1} OF {total}
        </p>
        <ProgressDots total={total} current={index} />
      </div>

      <motion.div className={styles.swipe} onPanEnd={onSwipe}>
      <StoryWindow
        panels={content.panels}
        index={index}
        footerLabel={content.footerLabel}
        picked={picked}
        onPick={(panelId, revealId) => setPicked((p) => ({ ...p, [panelId]: revealId }))}
        dayCount={dayCount}
        rangeLabel={rangeLabel}
      />
      </motion.div>

      <div className={styles.controls}>
        <RetroButton variant="secondary" compact arrowBack onClick={onPrev} disabled={index === 0}>
          PREVIOUS
        </RetroButton>
        {last ? (
          <RetroButton compact onClick={onLetter}>
            READ LETTER
          </RetroButton>
        ) : (
          <RetroButton compact onClick={onNext}>
            NEXT
          </RetroButton>
        )}
      </div>
      <p className={styles.hint}>{last ? "ONE MORE THING" : "TAP TO CONTINUE"}</p>
    </div>
  );
}
