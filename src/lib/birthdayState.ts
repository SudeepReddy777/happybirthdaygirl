import type { Scene } from "@/types/birthday";

export type ExperienceState = {
  scene: Scene;
  storyIndex: number;
  /** The boot prompt only types once per run. */
  bootTyped: boolean;
  /** Bumped by REPLAY; used as a React key so every scene remounts clean. */
  run: number;
};

export type ExperienceAction =
  | { type: "TYPED" }
  | { type: "START" }
  | { type: "EXPLORE" }
  | { type: "STORY_NEXT" }
  | { type: "STORY_PREV" }
  | { type: "TO_LETTER" }
  | { type: "LETTER_BACK" }
  | { type: "TO_FINALE" }
  | { type: "FINALE_BACK" }
  | { type: "REPLAY" };

export const STORY_LENGTH = 3;

export const initialState: ExperienceState = {
  scene: "boot",
  storyIndex: 0,
  bootTyped: false,
  run: 0,
};

/** Every transition is guarded by the current scene, so double taps and stale events are harmless. */
export function experienceReducer(
  state: ExperienceState,
  action: ExperienceAction,
): ExperienceState {
  switch (action.type) {
    case "TYPED":
      return state.bootTyped ? state : { ...state, bootTyped: true };
    case "START":
      return state.scene === "boot" ? { ...state, scene: "reveal" } : state;
    case "EXPLORE":
      return state.scene === "reveal" ? { ...state, scene: "story", storyIndex: 0 } : state;
    case "STORY_NEXT":
      return state.scene === "story" && state.storyIndex < STORY_LENGTH - 1
        ? { ...state, storyIndex: state.storyIndex + 1 }
        : state;
    case "STORY_PREV":
      return state.scene === "story" && state.storyIndex > 0
        ? { ...state, storyIndex: state.storyIndex - 1 }
        : state;
    case "TO_LETTER":
      return state.scene === "story" && state.storyIndex === STORY_LENGTH - 1
        ? { ...state, scene: "letter" }
        : state;
    case "LETTER_BACK":
      return state.scene === "letter" ? { ...state, scene: "story", storyIndex: STORY_LENGTH - 1 } : state;
    case "TO_FINALE":
      return state.scene === "letter" ? { ...state, scene: "finale" } : state;
    case "FINALE_BACK":
      return state.scene === "finale" ? { ...state, scene: "letter" } : state;
    case "REPLAY":
      return { ...initialState, run: state.run + 1 };
    default:
      return state;
  }
}
