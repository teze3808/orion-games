# Orion’s Expedition / Orion 的失落文明

Treasure and mystery games for learning mathematics, computing, chemistry, biology, engineering, and broader science, in one repository.

- [Mission hub](https://teze3808.github.io/orion-games/)
- [Treasure Gate — hash collisions](https://teze3808.github.io/orion-games/games/orion-hash/)

```text
dist/
  index.html              Mission hub
  missions.js             Mission registry
  shared/                 Language, sigil storage, artwork
  games/orion-hash/        Treasure Gate
```

English and Traditional Chinese are supported throughout. Progress and language are saved in the same browser. The hub can reset the collection with confirmation. The hash mission awards the Echo Sigil on any successful opening; resetting all sigils in the hub changes its target hash.

Clone normally; there are no submodules. Run `python3 -m http.server 8765 --directory dist`. Push `main` to deploy the entire site through GitHub Pages. Run `node tests/language-and-rewards.cjs` for behavior checks.

Read [PROJECT.md](PROJECT.md) for the story and architecture, and [AGENTS.md](AGENTS.md) for development rules. Seven more missions are planned in the initial collection; new science adventures can join alongside them. Add each future game under `dist/games/` and reuse `dist/shared/`.

The former standalone orion-hash history is preserved in this repository’s merge history.

## Collection reset and puzzle target
The shared progress record also includes `hashTarget` (integer 0–9; legacy records default to 0). Reset all sigils clears rewards and chooses a target different from the previously saved target. The in-game Restart adventure button has been removed. A fresh game visit loads that target; open tabs and restored pages synchronize it, clear current attempts, and hide hints. Language and other browser data remain unchanged. Failed collection-reset saves leave both rewards and target unchanged.

## Passcode clearing
After submitting a code, clear the input after two seconds without resetting the puzzle, result, or reward. New typing/keypad input cancels the pending clear so it never erases a fresh attempt. There is no in-game Restart adventure button. Relock keeps the current puzzle; only the hub’s full collection reset requests a different saved target.

- [The Moonlit Letter — Caesar cipher](https://teze3808.github.io/orion-games/games/orion-cipher/)

Run `node tests/cipher.cjs` for the three-stage cipher, language, rewards and reset checks. Daily mission history is in [RELEASES.md](RELEASES.md).

- [The Counterweight Vault — levers and balance](https://teze3808.github.io/orion-games/games/orion-levers/)

Three missions are now playable. Run `node tests/levers.cjs` for prediction, lever physics, distinct solutions, bilingual state, and progress checks. See [SCIENCE.md](SCIENCE.md) for science sources and model limitations.

- [The Crystal Alchemist’s Workshop — separating mixtures](https://teze3808.github.io/orion-games/games/orion-mixtures/)

Run `node tests/mixtures.cjs` for chemistry, wrong-order retries, bilingual state, rewards and storage checks. Five missions are playable.

- [The Starlight Tower — binary place value](https://teze3808.github.io/orion-games/games/orion-binary/)

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
[Play the numbered sea-cave mystery](https://teze3808.github.io/orion-games/games/orion-mist/). Learn ordered search and discover binary search through higher/lower clues across three shores. Earn the Mist / 迷霧 sigil; eight new-question sets support replay and reset. Seven missions are playable; six remain planned. Tests: `node tests/mist.cjs`.
