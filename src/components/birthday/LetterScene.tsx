"use client";

import { AnimatePresence, motion, type PanInfo } from "motion/react";
import { useArrowKeys } from "@/hooks/useArrowKeys";
import { useCallback, useEffect, useRef, useState } from "react";
import type { BirthdayContent } from "@/types/birthday";
import { EnvelopeArt } from "./illustrations/EnvelopeArt";
import { PixelHeart } from "./PixelIcons";
import { RetroButton } from "./RetroButton";
import { RetroWindow } from "./RetroWindow";
import { useWindowChrome } from "./WindowChrome";
import styles from "./LetterScene.module.css";

type LetterSceneProps = {
  content: BirthdayContent["letter"];
  recipientName: string;
  onBack: () => void;
  onFinish: () => void;
};

type Phase = "sealed" | "opening" | "open";

export function LetterScene({ content, recipientName, onBack, onFinish }: LetterSceneProps) {
  const [phase, setPhase] = useState<Phase>("sealed");
  const [page, setPage] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = content.pages.length;
  const last = page === total - 1;

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  // The paper mounts only after the envelope has faded out, so focus it the moment it exists.
  // (Stable callback ref: runs once on mount, never on re-render.)
  const focusPaper = useCallback((el: HTMLDivElement | null) => {
    el?.focus({ preventScroll: true });
  }, []);

  const live = useWindowChrome()?.interactive ?? true;
  const goPrev = useCallback(() => setPage((p) => Math.max(0, p - 1)), []);
  const goNext = useCallback(() => setPage((p) => Math.min(total - 1, p + 1)), [total]);

  // ← / → turn the pages once the letter is open.
  useArrowKeys({ enabled: live && phase === "open", onLeft: goPrev, onRight: goNext });

  const onSwipe = (_: PointerEvent, info: PanInfo) => {
    const { x, y } = info.offset;
    if (Math.abs(x) < 60 || Math.abs(x) < Math.abs(y) * 1.5) return;
    if (x < 0) goNext();
    else goPrev();
  };

  const open = () => {
    if (phase !== "sealed") return;
    setPhase("opening");
    timer.current = setTimeout(() => setPhase("open"), 1250);
  };

  return (
    <RetroWindow fileName={content.fileName} footerLabel={content.footerLabel} fill>
      <AnimatePresence mode="wait" initial={false}>
        {phase !== "open" ? (
          <motion.div
            key="sealed"
            className={styles.sealed}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28 }}
          >
            <h1 className={styles.sealedTitle} data-scene-heading tabIndex={-1}>
              {content.sealedTitle}
            </h1>
            <p className={styles.sealedHint}>
              <PixelHeart className={styles.heart} /> {content.sealedHint}
            </p>
            {/* tapping the envelope itself also opens it; the button is the keyboard route */}
            <div className={styles.envelope} onClick={open}>
              <EnvelopeArt opened={phase === "opening"} />
            </div>
            <RetroButton onClick={open} disabled={phase === "opening"}>
              {content.openLabel}
            </RetroButton>
          </motion.div>
        ) : (
          <motion.div
            key="open"
            className={styles.open}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              ref={focusPaper}
              onPanEnd={onSwipe}
              className={styles.paper}
              tabIndex={-1}
              role="group"
              aria-label={`Letter for ${recipientName}`}
            >
              <div className={styles.paperHead} aria-hidden="true">
                <PixelHeart className={styles.heart} />
                <span className={styles.pageNo}>
                  PAGE {page + 1} OF {total}
                </span>
                <PixelHeart className={styles.heart} />
              </div>

              <div className={styles.stack}>
                {content.pages.map((pg, i) => {
                  const active = i === page;
                  return (
                    <motion.div
                      key={i}
                      className={styles.page}
                      aria-hidden={!active}
                      inert={!active}
                      initial={false}
                      animate={{ opacity: active ? 1 : 0, y: active ? 0 : i < page ? -8 : 8 }}
                      transition={{ duration: active ? 0.34 : 0.16, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {i === 0 ? <h2 className={styles.salutation}>{content.salutation}</h2> : null}
                      {pg.paragraphs.map((text, j) => (
                        <p key={j} className={styles.para}>
                          {text}
                        </p>
                      ))}
                      {i === total - 1 ? <p className={styles.signOff}>{content.signOff}</p> : null}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <p className="sr-only" role="status">
              Page {page + 1} of {total}
            </p>

            <div className={styles.controls}>
              <RetroButton
                variant="secondary"
                compact
                arrowBack
                onClick={page === 0 ? onBack : () => setPage(page - 1)}
              >
                BACK
              </RetroButton>
              {last ? (
                <RetroButton compact onClick={onFinish}>
                  MAKE A WISH
                </RetroButton>
              ) : (
                <RetroButton compact onClick={() => setPage(page + 1)}>
                  NEXT PAGE
                </RetroButton>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </RetroWindow>
  );
}
