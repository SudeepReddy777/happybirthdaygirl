# Akansha's birthday experience

Five scenes: boot → reveal → story (3 panels) → letter (sealed, then 6 pages) → finale (candles) → replay.

All personal copy: `src/content/birthday.ts`. Credits and licences: `CREDITS.md`.

## Window controls (macOS-style)
Red = close (quiet "reopen" screen), yellow = minimize (dock tab), green = full screen
(real browser full screen on desktop; edge-to-edge on phones). Double-click the title bar = full screen.
Drag the title bar to move the window; it springs back. Nothing is lost by any of them.

## Extra interactions
Cat: tap = bounce + heart, every 5th tap = dance + "MEOW!". Bunting: tap to flutter.
Story and letter: swipe or ← → keys to turn pages. Envelope: tap to open. Cake: tap again for more confetti.

## Swap in your own cat GIF
Save it as `public/cat/happy-cat-dance.gif`, then in `src/content/birthday.ts`:
`cat.idle = "/cat/happy-cat-dance.gif"` and `cat.happy = null`.

## Run
```
npm install
npm run dev                         # http://localhost:3000
npx tsc --noEmit && npm run lint && npm run build
```
