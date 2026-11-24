"use client";

import { createContext, useContext, type PointerEvent } from "react";
import type { WindowCopy } from "@/types/birthday";

export type WindowChrome = {
  labels: Pick<WindowCopy, "closeLabel" | "minimizeLabel" | "zoomLabel" | "unzoomLabel">;
  /** The window is currently open and usable. */
  interactive: boolean;
  zoomed: boolean;
  close: () => void;
  minimize: () => void;
  toggleZoom: () => void;
  /** Begin dragging the window by its title bar. */
  startDrag: (e: PointerEvent) => void;
};

const Ctx = createContext<WindowChrome | null>(null);

export const WindowChromeProvider = Ctx.Provider;

/** null when a window is rendered outside the experience (controls become decorative). */
export function useWindowChrome(): WindowChrome | null {
  return useContext(Ctx);
}
