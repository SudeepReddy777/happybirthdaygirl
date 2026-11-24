export type Scene = "boot" | "reveal" | "story" | "letter" | "finale";

export type StoryReveal = { id: string; label: string; message: string };

export type StoryPanel = {
  id: "note" | "chat" | "calendar";
  fileName: string;
  title: string;
  supporting?: string;
  body: string;
  /** Shown until the visitor taps the illustration. */
  hint: string;
  /** Accessible description of the illustration. */
  artAlt: string;
  /** What tapping reveals. The chat panel has three, the others one. */
  reveals: StoryReveal[];
};

export type LetterPage = { paragraphs: string[] };

export type CatConfig = {
  /** Idle animation. To use your own GIF: put it in public/cat/ and point this at it. */
  idle: string;
  /** Optional reaction image shown for ~2s when the cat is tapped. null = bounce + heart only. */
  happy: string | null;
  /** Little speech bubble on every 5th tap. */
  speech: string;
};

export type WindowCopy = {
  closeLabel: string;
  minimizeLabel: string;
  zoomLabel: string;
  unzoomLabel: string;
  closedTitle: string;
  closedHint: string;
  reopenLabel: string;
  dockHint: string;
};

export type BirthdayContent = {
  cat: CatConfig;
  window: WindowCopy;
  recipientName: string;
  senderName: string;
  birthdayDateISO: string;
  firstConversationISO: string;
  dayCount: number;
  dateRangeLabel: string;
  boot: {
    fileName: string;
    microLabel: string;
    prompt: string;
    buttonLabel: string;
    hint: string;
    footerLabel: string;
    catLabel: string;
  };
  reveal: {
    fileName: string;
    heading: string;
    subtitle: string;
    intro: string;
    buttonLabel: string;
    footerLabel: string;
    buntingLabel: string;
  };
  story: {
    eyebrow: string;
    counterLabel: string;
    footerLabel: string;
    panels: StoryPanel[];
  };
  letter: {
    fileName: string;
    sealedTitle: string;
    sealedHint: string;
    openLabel: string;
    salutation: string;
    pages: LetterPage[];
    signOff: string;
    footerLabel: string;
  };
  finale: {
    fileName: string;
    microLabel: string;
    instruction: string;
    message: string;
    headline: string;
    footerLabel: string;
    candlesLabel: string;
    celebrateAgainLabel: string;
  };
};
