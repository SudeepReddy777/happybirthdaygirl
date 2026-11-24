# Credits and licences

## Animated cat (`public/cat/*`)
- Artwork: **Fluent Emoji** — 🐱 "cat face" (`1f431`) and 😻 "smiling cat with heart-eyes" (`1f63b`), animated versions.
- Obtained from the npm packages `@lobehub/fluent-emoji-anim-1` and `@lobehub/fluent-emoji-anim-3` (v1.0.0), repository https://github.com/lobehub/fluent-emoji.
- Licence: **MIT** (stated in each package's `package.json` and README). Base emoji designs © Microsoft, also MIT (https://github.com/microsoft/fluentui-emoji).
- Modifications: resized to 176 px and re-encoded at half the frame rate to reduce file size; still poster frames extracted for reduced-motion users. Stored locally; nothing is hotlinked.
- Format: animated WebP, not GIF — GIF would give hard, jagged edges and a much larger file.
- Not independently verified: who first drew the animation frames. Attribution above reflects only what the packages state.

## Optional: the Tenor "Happy Cat Dance" GIF (not bundled)
- Requested by the creator: https://tenor.com/en-GB/view/happy-cat-cat-dance-jump-gif-1512023495064698839 (Tenor user *amaraay28*; 498x486, 2.4 s).
- It could not be downloaded in the build environment (media.tenor.com is unreachable there), so it is **not** in this project and nothing is hotlinked or embedded (Tenor's embed script is third-party code and would break the no-tracking / works-offline rules).
- Licence: Tenor GIFs are user-uploaded; reuse rights were not verified. Fine for a personal gift; check before publishing more widely.
- To use it: save the GIF as `public/cat/happy-cat-dance.gif`, then in `src/content/birthday.ts` set `cat.idle` to `"/cat/happy-cat-dance.gif"` and `cat.happy` to `null`. (Tested with a stand-in GIF of the same filename. The 1.4 MB original is worth shrinking first, e.g. with ezgif.com's optimizer.)

## Fonts (all SIL Open Font License 1.1, bundled in `src/app/fonts/`)
- Silkscreen — The Silkscreen Project Authors
- Caveat — The Caveat Project Authors
- Courier Prime — The Courier Prime Project Authors

All other artwork (cake, note, chat window, calendar, envelope, bunting, pixel icons) is original SVG made for this project.
