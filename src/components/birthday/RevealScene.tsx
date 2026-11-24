"use client";

import { motion } from "motion/react";
import type { BirthdayContent } from "@/types/birthday";
import { CatMascot } from "./illustrations/CatMascot";
import { Bunting } from "./illustrations/Bunting";
import { PixelHeart } from "./PixelIcons";
import { RetroButton } from "./RetroButton";
import { RetroWindow } from "./RetroWindow";
import styles from "./RevealScene.module.css";

type RevealSceneProps = {
  content: BirthdayContent["reveal"];
  cat: BirthdayContent["cat"];
  catLabel: string;
  onExplore: () => void;
};

const rise = (i: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 + i * 0.09 },
});

export function RevealScene({ content, cat, catLabel, onExplore }: RevealSceneProps) {
  // "HAPPY BIRTHDAYYYY!" → two lines: HAPPY / BIRTHDAYYYY!
  const [first, ...rest] = content.heading.split(" ");
  const second = rest.join(" ");

  return (
    <RetroWindow fileName={content.fileName} footerLabel={content.footerLabel} fill>
      <div className={styles.scene}>
        <div className={styles.bunting}>
          <Bunting label={content.buntingLabel} />
        </div>

        <motion.div className={styles.cat} {...rise(0)}>
          <CatMascot cat={cat} label={catLabel} size={76} />
        </motion.div>

        <motion.p className={styles.subtitle} {...rise(1)}>
          <PixelHeart className={styles.heart} /> {content.subtitle}{" "}
          <PixelHeart className={styles.heart} />
        </motion.p>

        <motion.h1 className={styles.heading} data-scene-heading tabIndex={-1} {...rise(2)}>
          <span className="sr-only">{content.heading}</span>
          <span aria-hidden="true" className={styles.line}>
            {first}
          </span>
          <span aria-hidden="true" className={`${styles.line} ${styles.second}`}>
            {second}
          </span>
        </motion.h1>

        <motion.p className={styles.intro} {...rise(3)}>
          {content.intro}
        </motion.p>

        <motion.div className={styles.action} {...rise(4)}>
          <RetroButton compact onClick={onExplore}>{content.buttonLabel}</RetroButton>
        </motion.div>
      </div>
    </RetroWindow>
  );
}
