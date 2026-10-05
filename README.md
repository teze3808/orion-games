# Orion’s Lost City / Orion 的失落古城

Treasure and mystery games for learning mathematics, computing, chemistry, biology, engineering, and broader science, in one repository.

- [Mission hub](https://orion-lost-city.onrender.com/)
- [Treasure Gate — hash collisions](https://orion-lost-city.onrender.com/games/orion-hash/)

```text
dist/
  index.html              Mission hub
  missions.js             Mission registry
  shared/                 Language, sigil storage, artwork
  games/orion-hash/        Treasure Gate
```

English and Traditional Chinese are supported throughout. Progress and language are saved in the same browser. The hub can reset the collection with confirmation. The hash mission awards the Echo Sigil on any successful opening; resetting all sigils in the hub changes its target hash.

Clone normally; there are no submodules. Run `python3 -m http.server 8765 --directory dist`. Push `main` to auto-deploy the entire site through Render after its build-time regression checks. Run `node tests/language-and-rewards.cjs` for behavior checks.

Read [PROJECT.md](PROJECT.md) for the story and architecture, and [AGENTS.md](AGENTS.md) for development rules. Seven more missions are planned in the initial collection; new science adventures can join alongside them. Add each future game under `dist/games/` and reuse `dist/shared/`.

The former standalone orion-hash history is preserved in this repository’s merge history.

## Collection reset and puzzle target
The shared progress record also includes `hashTarget` (integer 0–9; legacy records default to 0). Reset all sigils clears rewards and chooses a target different from the previously saved target. The in-game Restart adventure button has been removed. A fresh game visit loads that target; open tabs and restored pages synchronize it, clear current attempts, and hide hints. Language and other browser data remain unchanged. Failed collection-reset saves leave both rewards and target unchanged.

## Passcode clearing
After submitting a code, clear the input after two seconds without resetting the puzzle, result, or reward. New typing/keypad input cancels the pending clear so it never erases a fresh attempt. There is no in-game Restart adventure button. Relock keeps the current puzzle; only the hub’s full collection reset requests a different saved target.

- [The Moonlit Letter — Caesar cipher](https://orion-lost-city.onrender.com/games/orion-cipher/)

Run `node tests/cipher.cjs` for the three-stage cipher, language, rewards and reset checks. Daily mission history is in [RELEASES.md](RELEASES.md).

- [The Counterweight Vault — levers and balance](https://orion-lost-city.onrender.com/games/orion-levers/)

Three missions are now playable. Run `node tests/levers.cjs` for prediction, lever physics, distinct solutions, bilingual state, and progress checks. See [SCIENCE.md](SCIENCE.md) for science sources and model limitations.

- [The Crystal Alchemist’s Workshop — separating mixtures](https://orion-lost-city.onrender.com/games/orion-mixtures/)

Run `node tests/mixtures.cjs` for chemistry, wrong-order retries, bilingual state, rewards and storage checks. Five missions are playable.

- [The Starlight Tower — binary place value](https://orion-lost-city.onrender.com/games/orion-binary/)

Run `node tests/binary.cjs` for all 16 lamp patterns, encoding/decoding challenges, invalid answers, bilingual state, rewards and reset checks.

Workshop UI (2026-09-25): illustrated materials, large tool cards, a live treasure checklist and a guided uncover → experiment → check flow. Drag a tool onto the jar, or tap/select a tool and then activate the jar. Realistic tool pictures, picture goals and material-transfer animations show the experiment.

Counterweight Vault: drag the glowing right-hand stack along the beam, tap a position, or use the position slider. The final seal adds +/− and a draggable weight-count slider. Both controls support keyboard input and English/繁體中文.

Moonlit Letter: drag the inner alphabet ring to rotate the cipher wheel. The outer alphabet stays fixed. Use ±1 buttons or keyboard arrows for precise alignment; the complete letter-pair table remains available on request.

## iPad play layout — 2026-09-25
All playable missions use the shared tablet workbench: session seal progress at the top, the experiment and touch controls on the left, and readings, observations, rewards and compact story artwork on the right. Keep these two columns at iPad portrait and landscape widths (700px and above); phones stack experiment then results. Chemistry collection trays appear in the result panel. Preserve at least 44px touch targets, keyboard alternatives and hidden hints. The hub shows the sigil collection above the mission introduction. Future missions should use `shared/play-layout.css` and `shared/play-layout.js` or follow the same arrangement. Check both languages at 768×1024 and 1024×768, as well as phone width. Progress shows seals completed in this play session; collection remains browser-persistent.

Tablet results stay visible during experiment scrolling, with their own scroll area for long observations. The hub’s full sigil collection and reset controls are under “View sigils & reset options”. Browser QA covered all five missions in English and Traditional Chinese at 768×1024 and 1024×768, plus the stacked 390px phone layout. Verified chemistry separation and progress, lever drag and balance, cipher live mapping, binary signal success, and gate opening. These are browser viewport checks, not a physical iPad Safari test.

## Sleeping Seed Vault / 沉睡種子寶庫
Play `games/orion-seeds/` to investigate water, light and fair comparisons with pictured bean seeds and seedlings. Earn the Verdant / 青翠 sigil by completing three predicted trials. Uses the shared tablet layout and English/Traditional Chinese helpers. Run `node tests/seeds.cjs`; scientific assumptions and references are in SCIENCE.md. Six missions are playable; seven remain planned.

## Direct balance and top scene — 2026-09-25
All six mission pictures now sit directly above the top progress bar, retaining their live scene status and seal displays; experiments remain on the left and results on the right for tablets. Future missions must follow this arrangement. The Counterweight Vault shows live tilt without predictions or a release button. Release a drag or finish a slider adjustment at balance to record it. Drag horizontally for position, vertically up/down for block count on the final seal; sliders and +/− remain accessible alternatives. Cancelled drags restore both settings and cannot earn a seal. The final challenge still requires two distinct balanced designs.

Counterweight Vault now uses a viewport-fitted tablet workbench at widths ≥700px and heights ≥600px. Picture, progress, beam, controls and current result fit together; optional hints, logs and notes expand in the result panel. Smaller screens retain natural scrolling for accessible controls.

## Random challenges on reset — 2026-09-25
Reset all sigils now atomically changes the hash target and a persistent variant for every other playable mission, excluding each immediately previous variant. Existing collections without variant fields use the original questions. Replay chooses a different variant for that mission without erasing sigils. Reloads retain saved questions; language changes and unrelated rewards do not reroll them. Open tabs synchronize on storage/pageshow. Failed collection resets change neither questions nor rewards. When replay storage is blocked, the new variant works for that session but cannot persist across reloads.

Variant banks: Moonlit Letter (10 message/shift sets), Starlight Tower (10 number sets), Counterweight Vault (5 solvable load sets, each with two or more final balanced designs), Crystal Workshop (3 material/collection-goal sets), Sleeping Seed Vault (2 contrasting comparison sets). Hints, pictured goals and success checks derive from the selected set in both languages. Science variants reuse the documented material properties and bean model; they change experimental conditions or collection goals, not scientific rules. Taking a fresh chemistry sample retries the current problem; relocking the hash gate retains the puzzle for collision exploration. Future games must provide non-repeating reset variants, solvability checks, and generated hints before publication.

## The Mist Keeper / 霧海守望者
[Play the numbered sea-cave mystery](https://orion-lost-city.onrender.com/games/orion-mist/). Learn ordered search and discover binary search through higher/lower clues across three shores. Earn the Mist / 迷霧 sigil; eight new-question sets support replay and reset. Seven missions are playable; six remain planned. Tests: `node tests/mist.cjs`.


## The Lantern Circuit / 星燈迴路
[Play](https://orion-lost-city.onrender.com/games/orion-circuits/) — physics through complete circuits, branch switches and a shared switch. Match three pictured lamp patterns for the Spark / 火花 sigil. Six randomized puzzle sets, bilingual hidden hints and a tablet workbench. Eight missions are now playable; six remain planned. `node tests/circuits.cjs` checks circuit truth tables independently, all variants, rewards and reset/storage behavior.

All eight games use the top artwork for visible progress; the duplicate progress row has been removed from the visual layout.
The Treasure Gate now shares the collection’s top artwork, compact story, teal/gold workbench and viewport-fitted tablet layout.


## Completion discoveries — 2026-09-27
All eight playable missions open a child-friendly bilingual discovery dialog on session completion. Shared `discovery.js` / `discovery.css` provide three illustrated animated steps, a short explanation and an optional thinking question. Examples are labelled; they do not claim to be the current randomized question. The dialog does not award or save rewards. It appears once per completed session, can be closed with Escape or the visible controls, and can be reopened from results. Replay or collection reset hides it until completion again. The hash game shows it on the first opening and keeps it available during collision exploration.

Use native modal focus containment, an in-dialog language switch, 44px controls, manual back/next, pause/replay, and a scrollable small-screen layout. Automatic steps run once, seven seconds apart; reduced-motion users get manual steps by default. No third-party video, accounts or network requests are needed. Future games must provide a similarly understandable post-completion explanation, keeping it hidden before success. Science explanations retain the model limits documented in SCIENCE.md.

### New mission: The Bridge of Truth / 石像的真假橋
Play `games/orion-logic/`: test gems, compare bridge outcomes and discover AND, OR and NOT to collect the Truth Sigil. Includes original cinematic owl-bridge artwork, full English/Traditional Chinese, tablet layout, saved randomized guardian order and a child-friendly animated completion explanation. Nine missions are playable. Run `node tests/logic.cjs` for the logic/persistence checks; `node tests/discovery.cjs` covers all nine completion lessons.

### The Cloudkeeper’s Vault / 雲守者的水之密庫
`games/orion-water/` explores ice, liquid water and invisible water vapour through virtual warming/cooling. Earn the Transformation / 幻化 Sigil across three target forms. Includes six saved randomized journeys, bilingual play, realistic mountain-observatory art and an animated completion lesson. Ten missions are now playable. Test with `node tests/water.cjs`.

## September 30: The Crystal Express
[Play the sorting mission](https://orion-lost-city.onrender.com/games/orion-sort/): tap two carriages to swap numbers into ascending or descending order. Three trains earn the Order / 秩序 Sigil. Bilingual, keyboard/touch friendly, six saved question sets and a completion explanation. Eleven missions are playable; four remain planned. Run `node tests/sort.cjs` for its behavioral checks.

## October 1: The Prism Lantern Vault
[Play the light-mixing mission](https://orion-lost-city.onrender.com/games/orion-light/): switch red, green and blue lanterns to match three glowing seals and earn the Radiance / 光華 Sigil. Six saved question sets, bilingual touch/keyboard controls and a completion explanation. Twelve missions playable, four planned. Test with `node tests/light.cjs`.

### The Gem Balance / 寶石天平室
Play `games/orion-balance/`: test a mystery gem’s value with a live balance, then solve extra-block and equal-pair puzzles to collect the Balance / 平衡 sigil. Six reset variants, English/Traditional Chinese, touch/keyboard controls and a completion explanation. The hub now has thirteen playable missions and three planned stories.

### The Sunstone Courtyard / 日影石庭
Play `games/orion-shadows/`: move virtual sunlight around a pillar and raise/lower it to discover shadow direction and length. Match three outlines to earn the Sunshadow / 日影 sigil. Eight replay/reset sets, English/Traditional Chinese, original cinematic artwork, tablet controls and a completion explanation. The hub now offers fourteen playable missions and three planned stories.

## Render hosting — 2026-10-03
The public site is **Orion’s Lost City / Orion 的失落古城**, https://orion-lost-city.onrender.com/. Source remains `teze3808/orion-games`, branch `main`; the working copy remains `/Users/vincent/Documents/ChatGPT/HKBUAS/work/orion-games`. Render service `srv-db060c9srm7s73e7vsq0` publishes `dist` and runs every `tests/*.cjs` before deployment. Automatic deploys are enabled on commit. `render.yaml` records the matching configuration; the service was created directly, not as a linked Blueprint. `.github/workflows/ci.yml` provides checks only; the Pages publishing workflow has been removed. Future releases must verify Render deployment status and the live hub/game, not GitHub Pages. The daily 09:00 Asia/Hong_Kong automation is retained with the new publication destination. The user explicitly chose to start fresh on Render. Browser saves on the old GitHub origin are not imported or cleared; storage keys on Render stay stable.

## Mission-map background — 2026-10-03
The hub opens with the collection and mission cards, without the introductory hero panel or separate Treasure Gate call-to-action. Reuse the approved lost-city gate artwork as a full-viewport decorative background, with dark readable panels and responsive framing. Keep every available mission independently clickable and retain bilingual controls.

## Visible sigil overview — 2026-10-03
The mission title/count and sigil collection share one compact panel. Show all sigils directly as small labelled icons, with gold and a check mark for collected sigils and accessible bilingual collection states. No disclosure hides the collection. Reset all sigils sits beside the language selector in the top header; preserve its confirmation and shared reset behavior.

## Icon-only sigils — 2026-10-03
Sigils are 44px icon buttons without permanent name labels. Hover, keyboard focus or tapping reveals the bilingual name, collection state, mission title and story in a tooltip. Hover/focus adds a soft glow and lift; reduced motion disables movement. Escape dismisses descriptions. Preserve gold/check-mark earned indicators and the header reset control.

## Clockwork Fox — 2026-10-04
Play [The Clockwork Fox](https://orion-lost-city.onrender.com/games/orion-fox/): plan a route, add arrow commands and repeats, and watch a brass fox find three treasures. Learn sequencing, counted repetition and debugging; earn the Footprint / 足跡 sigil. Eight replay/reset sets, bilingual explanations, original cinematic garden art and tablet-friendly controls. Fifteen missions are now playable; two remain planned.

## Gearkeeper’s Vault — 2026-10-05
[Play the Gearkeeper’s Vault](https://orion-lost-city.onrender.com/games/orion-gears/). Swap output wheels and add a middle gear to learn how gears change direction and speed. Restore three seals to collect the Motion / 傳動 sigil. Includes six replay/reset sets, bilingual hints and completion explanation, original cinematic workshop art and tablet-friendly controls. Sixteen missions are playable; two remain planned.
