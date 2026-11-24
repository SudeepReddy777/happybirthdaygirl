"use client";

import {
  AnimatePresence,
  MotionConfig,
  motion,
  useDragControls,
  type Variants,
} from "motion/react";
import { useCallback, useEffect, useMemo, useReducer, useRef, useState, type ReactNode } from "react";
import { birthday } from "@/content/birthday";
import { experienceReducer, initialState } from "@/lib/birthdayState";
import { BirthdayFinale } from "./BirthdayFinale";
import { BootScene } from "./BootScene";
import { LetterScene } from "./LetterScene";
import { PixelArrow } from "./PixelIcons";
import { RetroButton } from "./RetroButton";
import { RevealScene } from "./RevealScene";
import { StoryArchive } from "./StoryArchive";
import { WindowChromeProvider, type WindowChrome } from "./WindowChrome";
import styles from "./BirthdayExperience.module.css";

type WinState = "open" | "minimized" | "closed";

const EASE = [0.22, 1, 0.36, 1] as const;

// `custom` is how far down the screen the dock tab is, so the window shrinks toward it.
const frameVariants: Variants = {
  open: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 240, damping: 26 } },
  minimized: (dy: number) => ({
    opacity: 0,
    scale: 0.1,
    y: dy,
    transition: { duration: 0.42, ease: [0.65, 0, 0.35, 1] },
  }),
  closed: { opacity: 0, scale: 0.9, y: 8, transition: { duration: 0.26, ease: EASE } },
};

type StepProps = {
  focusOnMount: boolean;
  skipEntrance: boolean;
  children: ReactNode;
};

/** One scene's enter/exit crossfade plus the focus hand-off. */
function SceneStep({ focusOnMount, skipEntrance, children }: StepProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!focusOnMount) return;
    ref.current?.querySelector<HTMLElement>("[data-scene-heading]")?.focus({ preventScroll: true });
    // Mount only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      ref={ref}
      className={styles.step}
      initial={skipEntrance ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.42, ease: EASE } }}
      exit={{ opacity: 0, y: -6, transition: { duration: 0.22, ease: EASE } }}
    >
      {children}
    </motion.div>
  );
}

function DeskIcon() {
  return (
    <svg className={styles.deskIcon} viewBox="0 0 48 44" aria-hidden="true" focusable="false">
      <rect x="3" y="4" width="42" height="36" rx="5" fill="#fffcfa" stroke="var(--line)" strokeWidth="3" />
      <rect x="6.5" y="7.5" width="35" height="9" rx="2.5" fill="var(--pink)" stroke="var(--line)" strokeWidth="2.4" />
      <circle cx="12" cy="12" r="2.2" fill="#ff5f57" />
      <circle cx="18.5" cy="12" r="2.2" fill="#febc2e" />
      <circle cx="25" cy="12" r="2.2" fill="#28c840" />
      <path d="M24 34 C16 28 18 22 24 25.5 C30 22 32 28 24 34 Z" fill="var(--pink)" stroke="var(--line)" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

export function BirthdayExperience() {
  const [state, dispatch] = useReducer(experienceReducer, initialState);
  const typed = useCallback(() => dispatch({ type: "TYPED" }), []);
  const { scene } = state;
  const firstPaint = scene === "boot" && state.run === 0;
  const copy = birthday.window;

  // ---- window state: macOS-style close / minimize / full screen, plus drag ----
  const [win, setWin] = useState<WinState>("open");
  const [zoomed, setZoomed] = useState(false);
  const [dockY, setDockY] = useState(360);
  const dragControls = useDragControls();
  const fsRequested = useRef(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const reopenRef = useRef<HTMLButtonElement>(null);
  const dockRef = useRef<HTMLButtonElement>(null);
  const prevWin = useRef<WinState>("open");

  const close = useCallback(() => setWin("closed"), []);
  const minimize = useCallback(() => {
    setDockY(Math.round(window.innerHeight * 0.42));
    setWin("minimized");
  }, []);
  const restore = useCallback(() => setWin("open"), []);

  const toggleZoom = useCallback(() => {
    const next = !zoomed;
    setZoomed(next);
    // On desktop also use the browser's real full screen; phones just get the edge-to-edge window.
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (next && !coarse && document.fullscreenEnabled) {
      fsRequested.current = true;
      document.documentElement.requestFullscreen?.().catch(() => {
        fsRequested.current = false;
      });
    } else if (!next && document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
      fsRequested.current = false;
    }
  }, [zoomed]);

  // Pressing Esc leaves browser full screen; keep our state in step.
  useEffect(() => {
    const onChange = () => {
      if (fsRequested.current && !document.fullscreenElement) {
        fsRequested.current = false;
        setZoomed(false);
      }
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  // Move focus to whatever is now usable.
  useEffect(() => {
    const was = prevWin.current;
    prevWin.current = win;
    if (win === "closed") reopenRef.current?.focus();
    else if (win === "minimized") dockRef.current?.focus();
    else if (was !== "open") {
      frameRef.current?.querySelector<HTMLElement>("[data-scene-heading]")?.focus({ preventScroll: true });
    }
  }, [win]);

  const chrome = useMemo<WindowChrome>(
    () => ({
      labels: copy,
      interactive: win === "open",
      zoomed,
      close,
      minimize,
      toggleZoom,
      startDrag: (e) => dragControls.start(e),
    }),
    [copy, win, zoomed, close, minimize, toggleZoom, dragControls],
  );

  return (
    <MotionConfig reducedMotion="user">
      <WindowChromeProvider value={chrome}>
        <main className={`${styles.stage} ${zoomed ? styles.zoomed : ""}`}>
          <motion.div
            ref={frameRef}
            className={styles.frame}
            variants={frameVariants}
            custom={dockY}
            initial={false}
            animate={win}
            style={{ transformOrigin: "50% 100%" }}
            drag={win === "open" && !zoomed}
            dragControls={dragControls}
            dragListener={false}
            dragSnapToOrigin
            dragMomentum={false}
            dragElastic={0.2}
            aria-hidden={win !== "open"}
            inert={win !== "open"}
          >
            {/* key={run}: replay remounts every scene with fresh internal state */}
            <AnimatePresence key={state.run} mode="wait" initial={false}>
              <SceneStep key={scene} focusOnMount={!firstPaint} skipEntrance={firstPaint}>
                {scene === "boot" ? (
                  <BootScene
                    content={birthday.boot}
                    cat={birthday.cat}
                    alreadyTyped={state.bootTyped}
                    onTyped={typed}
                    onStart={() => dispatch({ type: "START" })}
                  />
                ) : null}

                {scene === "reveal" ? (
                  <RevealScene
                    content={birthday.reveal}
                    cat={birthday.cat}
                    catLabel={birthday.boot.catLabel}
                    onExplore={() => dispatch({ type: "EXPLORE" })}
                  />
                ) : null}

                {scene === "story" ? (
                  <StoryArchive
                    content={birthday.story}
                    dayCount={birthday.dayCount}
                    rangeLabel={birthday.dateRangeLabel}
                    index={state.storyIndex}
                    onPrev={() => dispatch({ type: "STORY_PREV" })}
                    onNext={() => dispatch({ type: "STORY_NEXT" })}
                    onLetter={() => dispatch({ type: "TO_LETTER" })}
                  />
                ) : null}

                {scene === "letter" ? (
                  <LetterScene
                    content={birthday.letter}
                    recipientName={birthday.recipientName}
                    onBack={() => dispatch({ type: "LETTER_BACK" })}
                    onFinish={() => dispatch({ type: "TO_FINALE" })}
                  />
                ) : null}

                {scene === "finale" ? (
                  <BirthdayFinale
                    content={birthday.finale}
                    onBack={() => dispatch({ type: "FINALE_BACK" })}
                    onReplay={() => dispatch({ type: "REPLAY" })}
                  />
                ) : null}
              </SceneStep>
            </AnimatePresence>
          </motion.div>

          {/* Closed: a quiet desktop with a way back. Nothing is lost. */}
          <div className={styles.desk} data-show={win === "closed" ? "" : undefined} aria-hidden={win !== "closed"} inert={win !== "closed"}>
            <DeskIcon />
            <p className={styles.deskTitle}>{copy.closedTitle}</p>
            <p className={styles.deskHint}>{copy.closedHint}</p>
            <RetroButton ref={reopenRef} onClick={restore}>
              {copy.reopenLabel}
            </RetroButton>
          </div>

          {/* Minimized: a tab on the "dock" at the bottom of the screen. */}
          <button
            ref={dockRef}
            type="button"
            className={styles.dock}
            data-show={win === "minimized" ? "" : undefined}
            aria-hidden={win !== "minimized"}
            inert={win !== "minimized"}
            onClick={restore}
          >
            <span className={styles.dockBar} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className={styles.dockName}>{birthday.boot.fileName}</span>
            <span className={styles.dockHint}>
              <PixelArrow className={styles.dockArrow} /> {copy.dockHint}
            </span>
          </button>
        </main>
      </WindowChromeProvider>
    </MotionConfig>
  );
}
