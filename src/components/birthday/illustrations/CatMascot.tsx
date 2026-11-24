"use client";

import Image from "next/image";
import { motion, useAnimate } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { CatConfig } from "@/types/birthday";
import { PixelHeart } from "../PixelIcons";
import styles from "./CatMascot.module.css";

type CatMascotProps = {
  cat: CatConfig;
  /** Accessible name of the button, e.g. "Pet the cat". */
  label: string;
  /** Rendered width/height in CSS px. */
  size?: number;
};

const FALLBACK_IDLE = "/cat/cat-idle.webp";

/** Draws the first frame of an animated image, for visitors who asked for reduced motion. */
function StillFrame({ src, onError }: { src: string; onError: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      const c = ref.current;
      if (!c) return;
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      c.getContext("2d")?.drawImage(img, 0, 0);
    };
    img.onerror = onError;
    img.src = src;
  }, [src, onError]);
  return <canvas ref={ref} className={styles.img} aria-hidden="true" />;
}

/**
 * The mascot. Idles on a loop; tapping it bounces and pops a heart, swaps to the
 * reaction image (if one is configured), and every 5th tap it dances and says a word.
 * Reduced motion: still first frame, no bounce.
 */
export function CatMascot({ cat, label, size = 112 }: CatMascotProps) {
  const reduced = usePrefersReducedMotion();
  const [happy, setHappy] = useState(false);
  const [pops, setPops] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const [broken, setBroken] = useState(false);
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const idle = broken ? FALLBACK_IDLE : cat.idle;
  const reaction = cat.happy;

  // Warm the reaction image so the swap is instant.
  useEffect(() => {
    if (!reaction) return;
    const img = new window.Image();
    img.src = reaction;
  }, [reaction]);

  useEffect(() => {
    const t = timers.current;
    return () => t.forEach(clearTimeout);
  }, []);

  const later = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
  };

  const pet = () => {
    const n = pops + 1;
    setPops(n);
    const dance = n % 5 === 0;
    if (reaction) {
      setHappy(true);
      later(() => setHappy(false), dance ? 2600 : 2000);
    }
    if (dance) {
      setSpeaking(true);
      later(() => setSpeaking(false), 1500);
    }
    if (!reduced && scope.current) {
      if (dance) {
        animate(
          scope.current,
          { y: [0, -22, 0, -14, 0], rotate: [0, -10, 10, -8, 0], scaleY: [1, 1.06, 0.94, 1.03, 1] },
          { duration: 1, ease: "easeOut" },
        );
      } else {
        animate(
          scope.current,
          { y: [0, -16, 0, -7, 0], scaleX: [1, 1.05, 0.97, 1.02, 1], scaleY: [1, 0.95, 1.04, 0.99, 1] },
          { duration: 0.75, ease: "easeOut" },
        );
      }
    }
  };

  const src = happy && reaction ? reaction : idle;

  return (
    <div className={styles.wrap} style={{ width: size, height: size }}>
      <button type="button" className={styles.button} onClick={pet} aria-label={label}>
        <div ref={scope} className={styles.cat}>
          {reduced ? (
            <StillFrame src={src} onError={() => setBroken(true)} />
          ) : (
            <Image
              src={src}
              alt=""
              width={size * 2}
              height={size * 2}
              unoptimized
              priority
              className={styles.img}
              onError={() => setBroken(true)}
            />
          )}
        </div>
        <span className={styles.shadow} aria-hidden="true" />
        {pops > 0 && !reduced ? (
          <motion.span
            key={pops}
            className={styles.pop}
            initial={{ opacity: 1, y: 0, scale: 0.7 }}
            animate={{ opacity: 0, y: -34, scale: 1.1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            aria-hidden="true"
          >
            <PixelHeart />
          </motion.span>
        ) : null}
      </button>
      <span className={styles.speech} data-on={speaking || undefined} aria-live="polite">
        {speaking ? cat.speech : ""}
      </span>
    </div>
  );
}
