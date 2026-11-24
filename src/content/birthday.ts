import { daysBetween } from "@/lib/dates";
import type { BirthdayContent } from "@/types/birthday";

/**
 * Every word on screen lives here. Components never hard-code personal copy.
 *
 * Facts used (supplied by the creator): birthday 24 Nov 2026; first conversation
 * 23 Jan 2026; it began with one note and a misunderstanding involving the
 * creator's brother's friend; they have not met in person.
 * Do NOT add the note's wording, dialogue or events that were not supplied.
 */
const birthdayDateISO = "2026-11-24";
const firstConversationISO = "2026-01-23";
const dayCount = daysBetween(firstConversationISO, birthdayDateISO); // 305

export const birthday: BirthdayContent = {
  recipientName: "Akansha",
  senderName: "Sudeep",
  birthdayDateISO,
  firstConversationISO,
  dayCount,
  dateRangeLabel: "JAN 23 → NOV 24",

  // To use the Tenor "Happy Cat Dance" GIF: save it as public/cat/happy-cat-dance.gif, then set
  //   idle: "/cat/happy-cat-dance.gif",  happy: null
  cat: {
    idle: "/cat/cat-idle.webp",
    happy: "/cat/cat-happy.webp",
    speech: "MEOW!",
  },

  window: {
    closeLabel: "Close window",
    minimizeLabel: "Minimize window",
    zoomLabel: "Enter full screen",
    unzoomLabel: "Exit full screen",
    closedTitle: "OOPS. YOU CLOSED IT.",
    closedHint: "DON'T WORRY, YOUR SURPRISE IS STILL HERE.",
    reopenLabel: "REOPEN",
    dockHint: "TAP TO OPEN",
  },

  boot: {
    fileName: "BIRTHDAY.EXE",
    microLabel: "A little something for you",
    prompt: "OPEN YOUR SURPRISE",
    buttonLabel: "OPEN",
    hint: "TAP TO BEGIN",
    footerLabel: "READY",
    catLabel: "Pet the cat",
  },

  reveal: {
    fileName: "PARTY.EXE",
    heading: "HAPPY BIRTHDAYYYY!",
    subtitle: "HEY AKANSHA, THIS LITTLE SURPRISE IS FOR YOU.",
    intro:
      "Some beginnings are completely unexpected. This one started with a note, a little misunderstanding, and turned into a friendship worth celebrating.",
    buttonLabel: "EXPLORE THE MEMORIES",
    footerLabel: "SURPRISE LOADED",
    buntingLabel: "Shake the bunting",
  },

  story: {
    eyebrow: "A little story about how it started...",
    counterLabel: "STORY",
    footerLabel: "STORY LOADED",
    panels: [
      {
        id: "note",
        fileName: "STORY_01.PNG",
        title: "It started with one note.",
        supporting: "And one misunderstanding involving my brother's friend.",
        body: "A pretty unexpected way for two people to start talking, honestly.",
        hint: "TAP THE NOTE",
        artAlt:
          "A little paper note with a doodle on it, a pencil beside it and a few small pink hearts.",
        reveals: [
          {
            id: "note",
            label: "THE NOTE",
            message: "Not exactly how anyone plans to start talking.",
          },
        ],
      },
      {
        id: "chat",
        fileName: "STORY_02.PNG",
        title: "And then came the conversations.",
        body: "What started as a random little mix-up slowly became conversations, random jokes, movie discussions and all those little moments that made the friendship its own thing.",
        hint: "TAP A BUBBLE",
        artAlt:
          "A small chat window with three round speech bubbles: a film clapper, a laughing face and a sparkle.",
        reveals: [
          { id: "movies", label: "MOVIES", message: "Movie discussions." },
          { id: "jokes", label: "JOKES", message: "Random jokes." },
          { id: "moments", label: "MOMENTS", message: "All those little moments." },
        ],
      },
      {
        id: "calendar",
        fileName: "STORY_03.PNG",
        title: `${dayCount} days later...`,
        body: "We still haven't met in person, but that doesn't make the beginning any less interesting. It's funny how something so unexpected can turn into a friendship worth remembering.",
        hint: "TAP THE CALENDAR",
        artAlt: `A calendar page with a counter that reads ${dayCount} days.`,
        reveals: [
          {
            id: "calendar",
            label: "THE DAYS",
            message: "From January 23 to your birthday on November 24.",
          },
        ],
      },
    ],
  },

  letter: {
    fileName: "LETTER.TXT",
    sealedTitle: "One more thing...",
    sealedHint: "THERE'S A LETTER INSIDE",
    openLabel: "OPEN THE LETTER",
    salutation: "Happy Birthday, Akansha!",
    pages: [
      {
        paragraphs: [
          "Okayyy, so... Happy Birthday!! 🎀",
          "I wanted to make something a little different for your birthday instead of just sending another ordinary birthday message.",
        ],
      },
      {
        paragraphs: [
          "It's actually funny thinking about how this all started. One note, a misunderstanding involving my brother's friend, and somehow that became the beginning of us talking.",
          "I don't think either of us would have guessed that such a random beginning would turn into all these conversations, movie discussions, jokes and little moments along the way.",
        ],
      },
      {
        paragraphs: [
          `And here we are, ${dayCount} days after that first conversation.`,
          "We haven't even met in person, which makes the whole story a little unusual, but I'm genuinely glad our paths crossed.",
        ],
      },
      {
        paragraphs: [
          "I hope this new year of your life brings you so many good things. More happiness, more reasons to laugh, new experiences, exciting opportunities and plenty of moments you'll look back on with a smile.",
          "Keep being curious, keep exploring the things you love, and keep being yourself. I hope you get to do all the things you've been looking forward to.",
        ],
      },
      {
        paragraphs: [
          "Anyway, I didn't want to make this an unnecessarily long speech 😭",
          "I just wanted you to have something that reminds you that your birthday mattered enough for someone to put a little effort into making something special.",
        ],
      },
      {
        paragraphs: [
          "Have the loveliest birthday, Akansha. You deserve a wonderful year ahead.",
          "Happy Birthday once again! 🎂",
        ],
      },
    ],
    signOff: "— Sudeep",
    footerLabel: "SENT W/ LOVE",
  },

  finale: {
    fileName: "WISH.EXE",
    microLabel: "Make a wish",
    instruction: "TAP THE CANDLES TO MAKE A WISH",
    message:
      "Here's to another year of happiness, new experiences, unexpected little adventures and lots of reasons to smile.",
    headline: "HAPPY BIRTHDAY, AKANSHA!",
    footerLabel: "WISH GRANTED",
    candlesLabel: "Blow out the candles and make a wish",
    celebrateAgainLabel: "Celebrate again with more confetti",
  },
};
