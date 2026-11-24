"use client";

import type { PointerEvent, ReactNode } from "react";
import { PixelHeart } from "./PixelIcons";
import { useWindowChrome } from "./WindowChrome";
import styles from "./RetroWindow.module.css";

type RetroWindowProps = {
  /** Shown right-aligned in the title bar, e.g. "BIRTHDAY.EXE". Decorative. */
  fileName: string;
  /** Tiny pixel status in the footer strip, e.g. "READY". Omit to hide the footer. */
  footerLabel?: string;
  /** Stretch to fill the available height (page-sized windows). */
  fill?: boolean;
  children: ReactNode;
};

/**
 * The one window frame used by every scene: dark outline, hard pink offset shadow,
 * inset pink title bar with macOS-style close / minimize / full-screen buttons,
 * and an optional lavender status strip.
 *
 * Title bar: drag to move the window (it springs back), double-click to toggle full screen.
 */
export function RetroWindow({ fileName, footerLabel, fill = false, children }: RetroWindowProps) {
  const chrome = useWindowChrome();

  const onBarPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    // Buttons keep their own behaviour; only the bare bar starts a drag.
    if ((e.target as HTMLElement).closest("button")) return;
    chrome?.startDrag(e);
  };

  return (
    <div className={`${styles.window} ${fill ? styles.fill : ""}`}>
      <div className={styles.barWrap}>
        <div
          className={styles.bar}
          data-draggable={chrome && !chrome.zoomed ? "" : undefined}
          onPointerDown={onBarPointerDown}
          onDoubleClick={(e) => {
            if (!(e.target as HTMLElement).closest("button")) chrome?.toggleZoom();
          }}
        >
          <span className={styles.lights} role="group" aria-label="Window controls">
            <button
              type="button"
              className={`${styles.light} ${styles.red}`}
              aria-label={chrome?.labels.closeLabel ?? "Close window"}
              onClick={chrome?.close}
              disabled={!chrome}
            >
              <svg className={styles.glyph} viewBox="0 0 8 8" aria-hidden="true" focusable="false">
                <path d="M1.4 1.4 L6.6 6.6 M6.6 1.4 L1.4 6.6" />
              </svg>
            </button>
            <button
              type="button"
              className={`${styles.light} ${styles.yellow}`}
              aria-label={chrome?.labels.minimizeLabel ?? "Minimize window"}
              onClick={chrome?.minimize}
              disabled={!chrome}
            >
              <svg className={styles.glyph} viewBox="0 0 8 8" aria-hidden="true" focusable="false">
                <path d="M1.2 4 H6.8" />
              </svg>
            </button>
            <button
              type="button"
              className={`${styles.light} ${styles.green}`}
              aria-label={
                chrome?.zoomed
                  ? (chrome.labels.unzoomLabel ?? "Exit full screen")
                  : (chrome?.labels.zoomLabel ?? "Enter full screen")
              }
              aria-pressed={chrome?.zoomed ?? false}
              onClick={chrome?.toggleZoom}
              disabled={!chrome}
            >
              <svg className={styles.glyph} viewBox="0 0 8 8" aria-hidden="true" focusable="false">
                {chrome?.zoomed ? (
                  <path d="M1 3.4 H4.6 V7 M7 4.6 H3.4 V1" />
                ) : (
                  <path d="M1.2 6.8 V3.2 L4.8 6.8 Z M6.8 1.2 V4.8 L3.2 1.2 Z" className={styles.fillGlyph} />
                )}
              </svg>
            </button>
          </span>
          <span className={styles.file} aria-hidden="true">
            {fileName}
          </span>
        </div>
      </div>
      <div className={styles.body}>{children}</div>
      {footerLabel ? (
        <div className={styles.footer} aria-hidden="true">
          <span className={styles.status}>
            <PixelHeart className={styles.footerHeart} />
            {footerLabel}
          </span>
          <i className={styles.footerDot} />
        </div>
      ) : null}
    </div>
  );
}
