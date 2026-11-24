"use client";

import { useMemo } from "react";
import type { BirthdayContent } from "@/types/birthday";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useTypewriter } from "@/hooks/useTypewriter";
import { FontWarmup } from "./FontWarmup";
import { CatMascot } from "./illustrations/CatMascot";
import { PixelHeart } from "./PixelIcons";
import { RetroButton } from "./RetroButton";
import { RetroWindow } from "./RetroWindow";
import styles from "./BootScene.module.css";

type BootSceneProps = {
  content: BirthdayContent["boot"];
  cat: BirthdayContent["cat"];
  /** True once the prompt has typed; the animation never replays. */
  alreadyTyped: boolean;
  onTyped: () => void;
  onStart: () => void;
};

export function BootScene({ content, cat, alreadyTyped, onTyped, onStart }: BootSceneProps) {
  const reduced = usePrefersReducedMotion();
  const chars = useMemo(() => Array.from(content.prompt), [content.prompt]);
  const count = useTypewriter(chars.length, {
    instant: reduced || alreadyTyped,
    onDone: onTyped,
  });

  return (
    <RetroWindow fileName={content.fileName} footerLabel={content.footerLabel} fill>
      <div className={styles.scene}>
        <FontWarmup />
        <div className={styles.cluster}>
          <CatMascot cat={cat} label={content.catLabel} size={112} />
          <div className={styles.statusDots} aria-hidden="true">
            <i className={styles.rose} />
            <i className={styles.yellow} />
            <i className={styles.blue} />
          </div>
          <p className={styles.micro}>
            <PixelHeart className={styles.microHeart} /> {content.microLabel}{" "}
            <PixelHeart className={styles.microHeart} />
          </p>
        </div>

        <h1 className={styles.prompt} data-scene-heading tabIndex={-1}>
          <span className="sr-only">{content.prompt}</span>
          <span aria-hidden="true">
            <span className={styles.chevron}>&gt;</span>{" "}
            {chars.slice(0, count).join("")}
            <span className={styles.cursor} />
            <span className={styles.ghost}>{chars.slice(count).join("")}</span>
          </span>
        </h1>

        <div className={styles.action}>
          <RetroButton onClick={onStart}>{content.buttonLabel}</RetroButton>
          <p className={styles.hint}>{content.hint}</p>
        </div>
      </div>
    </RetroWindow>
  );
}
