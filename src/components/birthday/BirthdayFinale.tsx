"use client";

import { motion, useAnimate } from "motion/react";
import { useState } from "react";
import type { BirthdayContent } from "@/types/birthday";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { CakeArt } from "./illustrations/CakeArt";
import { PixelHeart } from "./PixelIcons";
import { RetroButton } from "./RetroButton";
import { RetroWindow } from "./RetroWindow";
import styles from "./BirthdayFinale.module.css";

type BirthdayFinaleProps = {
  content: BirthdayContent["finale"];
  onBack: () => void;
  onReplay: () => void;
};

const COLORS = ["var(--pink)", "var(--dot-yellow)", "var(--dot-blue)", "#e9c9f0"];

// Fixed table (not random) so the burst looks the same every time and never mismatches on hydration.
const CONFETTI = Array.from({ length: 24 }, (_, i) => ({
  x: (i * 41 + 7) % 100,
  size: 6 + ((i * 5) % 5),
  delay: ((i * 53) % 40) / 100,
  dur: 1.7 + ((i * 7) % 9) / 10,
  rot: ((i * 97) % 360) - 180,
  color: COLORS[i % COLORS.length],
}));

export function BirthdayFinale({ content, onBack, onReplay }: BirthdayFinaleProps) {
  const reduced = usePrefersReducedMotion();
  const [blown, setBlown] = useState(false);
  const [bursts, setBursts] = useState(0);
  const [cakeScope, animateCake] = useAnimate<HTMLDivElement>();

  // First tap blows the candles out. Every tap after that throws another handful of confetti.
  const celebrate = () => {
    setBlown(true);
    setBursts((n) => n + 1);
    if (blown && !reduced && cakeScope.current) {
      animateCake(cakeScope.current, { rotate: [0, -2.5, 2.5, -1.5, 0], y: [0, -6, 0] }, { duration: 0.55 });
    }
  };

  return (
    <RetroWindow fileName={content.fileName} footerLabel={content.footerLabel} fill>
      <div className={styles.scene}>
        <h1 className="sr-only" data-scene-heading tabIndex={-1}>
          {content.microLabel}
        </h1>

        {bursts > 0 && !reduced ? (
          <div key={bursts} className={styles.confetti} aria-hidden="true">
            {CONFETTI.map((c, i) => (
              <motion.i
                key={i}
                className={styles.piece}
                style={{ left: `${c.x}%`, width: c.size, height: c.size, background: c.color }}
                initial={{ y: -24, opacity: 0, rotate: 0 }}
                animate={{ y: 560, opacity: [0, 1, 1, 0], rotate: c.rot }}
                transition={{ duration: c.dur, delay: 0.2 + c.delay, ease: "easeIn" }}
              />
            ))}
          </div>
        ) : null}

        <p className={styles.micro} aria-hidden="true">
          <PixelHeart className={styles.heart} /> {content.microLabel} <PixelHeart className={styles.heart} />
        </p>

        <div className={styles.cake} ref={cakeScope}>
          <CakeArt blown={blown} />
          <button
            type="button"
            className={styles.candles}
            aria-label={blown ? content.celebrateAgainLabel : content.candlesLabel}
            onClick={celebrate}
          />
        </div>

        <div className={styles.texts} aria-live="polite">
          <p className={styles.instruction} aria-hidden={blown} style={{ opacity: blown ? 0 : 1 }}>
            {content.instruction}
          </p>
          <motion.div
            className={styles.wish}
            aria-hidden={!blown}
            initial={false}
            animate={{ opacity: blown ? 1 : 0, y: blown ? 0 : 10 }}
            transition={{ duration: 0.6, delay: blown ? 0.7 : 0, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className={styles.message}>{content.message}</p>
            <h2 className={styles.headline}>{content.headline}</h2>
          </motion.div>
        </div>

        <div className={styles.actions}>
          <div className={styles.slot} style={{ opacity: blown ? 0 : 1 }} aria-hidden={blown} inert={blown}>
            <RetroButton variant="secondary" compact arrowBack onClick={onBack}>
              BACK
            </RetroButton>
          </div>
          <motion.div
            className={styles.slot}
            initial={false}
            animate={{ opacity: blown ? 1 : 0 }}
            transition={{ duration: 0.4, delay: blown ? 1.1 : 0 }}
            aria-hidden={!blown}
            inert={!blown}
          >
            <RetroButton onClick={onReplay}>REPLAY</RetroButton>
          </motion.div>
        </div>
      </div>
    </RetroWindow>
  );
}
