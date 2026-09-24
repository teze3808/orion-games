# Orion’s Expedition / Orion 的失落文明

## Approved visual standard
The realistic Moonlit Letter moon door and atmospheric background are the minimum visual quality for every future mission. Create original mission-specific artwork with ImageGen: believable materials, cinematic lighting, environmental depth, and a child-friendly sense of treasure and mystery. Integrate finished artwork into the main scene and background; verify desktop/mobile framing and readable bilingual controls in the browser before release. Each game should have its own setting while matching this quality. Preserve progressive hidden hints and reliable sigil collection. Record artwork prompts in ARTWORK.md and store optimized assets in the repository.

## Purpose
Build an expandable collection of treasure, mystery, and puzzle games that teach Orion mathematics, computing, chemistry, biology, engineering, and broader science through discovery. The story is a lost civilization whose mysteries yield unique sigils (符印). New islands and missions can keep joining the world; ten is the initial collection, not a permanent limit.

## Learning scope and expansion
The world can grow across disciplines, including physics, astronomy, Earth science, and environmental science. The first ten missions are a starting collection, not a subject boundary or a required release order. New science missions can be added now, alongside the existing roadmap.

| Subject | Possible concepts | Example story direction (not yet playable) |
|---|---|---|
| Mathematics / 數學 | Patterns, measurement, probability, equations | Restore a treasure vault’s balance |
| Computing / 電腦科學 | Algorithms, codes, logic, data | Decode the lost city’s messages |
| Chemistry / 化學 | States of matter, mixtures, separation, particle models | Restore an ancient laboratory through virtual experiments |
| Biology / 生物學 | Plant needs, life cycles, habitats, food webs | Revive a hidden garden and its ecosystem |
| Engineering / 工程 | Structures, gears, mechanisms, design trade-offs | Repair a bridge or water-lifting machine |
| Broader science / 科學 | Light, forces, energy, space, weather, water cycle | Redirect observatory light or investigate a mysterious island |

Choose a varied mix of subjects over time. Missions may combine subjects when one clear learning objective guides the gameplay. Encourage observing, predicting, experimenting, comparing evidence, and improving a design. Keep concepts appropriate for Orion, with explanations that follow discovery. Scientific simulations should state meaningful simplifications in optional notes, distinguish fantasy from scientific facts, and reward reasoning consistent with the model. Record sources supporting scientific claims when implementing a mission. Chemistry and biology adventures use safe virtual experiments; they must not require handling chemicals or living specimens at home.

All subjects retain the same treasure/mystery story, independent mission choice, collectible sigils, realistic generated artwork, hidden hints, bilingual support, and quality checks.

## Product requirements
- A mission-selection home page: choose any available mission in any order.
- Never require earlier missions or a minimum sigil count to enter a game.
- Short adventures, roughly 5–10 minutes, with forgiving retries and no lost lives.
- Discover first; terminology and explanation follow exploration.
- Hints start hidden behind a discreet, keyboard-accessible rune and reveal progressively.
- A distinct sigil rewards a meaningful learning challenge, once per mission. Replay stays available.
- Full English and Traditional Chinese support across the hub and every game.
- Child-friendly mystery, realistic treasure atmosphere, no frightening punishment, advertising, accounts, or purchases.

## Story
A mysterious letter leads Orion to a lost city. Each independent mission reveals one secret and awards a sigil. A clockwork fox may become a recurring companion. Story transitions must not assume another mission was already completed. The Wisdom Heart is one adventure, not an end that prevents future additions.

## Initial mission collection
| Stable mission ID | Story | Learning concept | Sigil ID / name | Status |
|---|---|---|---|---|
| gate | 古城的密碼門 | Hash collisions | echo / 回聲 | Playable |
| moon | 月光下的密信 | Caesar cipher; encryption and decryption | moonlight / 月光 | Playable |
| tower | 星燈塔 | Binary representation | starlight / 星光 | Playable |
| mist | 霧海守望者 | Binary search | mist / 迷霧 | Planned |
| bridge | 石像的真假橋 | AND, OR, NOT | truth / 真理 | Planned |
| fox | 迷路的機械狐狸 | Algorithms, loops, debugging | footprint / 足跡 | Planned |
| balance | 寶石天平室 | Equality and unknown quantities | balance / 平衡 | Planned |
| train | 水晶列車站 | Sorting and comparison cost | order / 秩序 | Planned |
| signal | 被干擾的星空訊號 | Parity and error detection | starspeech / 星語 | Planned |
| maze | 智慧之心的地下迷城 | Weighted graphs and shortest paths | wisdom / 智慧 | Planned |

## Current game and reward
The gate accepts four digits, including leading zeroes. Its teaching hash is digit sum modulo 10; the original code is 1234 and stored hash is 0. Any hash-0 code opens it. Earn the Echo Sigil on the first successful gate opening, including the original code. Finding additional distinct collision codes is an optional learning challenge. Repeated attempts do not award duplicate sigils. The reward goal is shown after opening the gate; the hash rule stays in the hidden notes.

## Architecture
One buildless HTML/CSS/JavaScript repository; all public assets live in `dist/`.
- `dist/index.html`, `hub.css`, `hub.js`: hub and collection.
- `dist/missions.js`: mission registry; an entry without `href` is planned.
- `dist/shared/progress.js`: shared sigil storage API, including reset.
- `dist/shared/i18n.js`: shared language preference and translation helper.
- `dist/shared/gate.png`: shared generated artwork.
- `dist/games/orion-hash/`: hash mission HTML, JavaScript and CSS.
- `.github/workflows/pages.yml`: one deployment of the whole `dist` tree.

## Progress contract
Browser-local storage only, explicitly requested for collecting sigils. Key: `orion-expedition-progress-v1`; shape: `{version:1,sigils:["echo"]}`. Stable sigil IDs must never be renamed or reused for a different achievement. Unknown IDs are preserved for future compatibility. Rewards are idempotent. Restarting a mission clears its session, not earned sigils. No cross-device sync is promised. Clearing browser data removes saved progress. Corrupt/unavailable storage must not break gameplay; failed saves produce an honest in-session reward message. Never store names, passwords, contact information, or analytics.

## Adding a mission
1. Define an independent story, one learning objective, exact success/reward criteria, and three optional hint levels.
2. Implement each game under `dist/games/<topic-name>/`; use relative URLs for GitHub Pages subpath compatibility.
3. Include relative navigation back to the hub (`../../` for a game entrypoint), accessible keyboard/touch controls, and shared progress handling.
4. Award its stable sigil only after the defined challenge is verified.
5. Add/update the registry entry; supply `href` only once fully playable and checked.
6. Verify hub counts, reward persistence, replay, mobile layout, and return navigation. Add a row here; do not hardcode a ten-mission cap.

## Hosting and development
Repository: https://github.com/teze3808/orion-games
Primary public site: https://teze3808.github.io/orion-games/
Run: `python3 -m http.server 8765 --directory dist`.
GitHub Pages is the user-selected host; keep all new publication here. There is no active Sites deployment. The former standalone hash repository is retired.

## Scope and next work
The hub, Treasure Gate, Moonlit Letter, Counterweight Vault, Crystal Alchemist’s Workshop and Starlight Tower are implemented. Seven mission cards describe planned games and must not be represented as playable. Continue those plans while adding chemistry, biology, engineering, and other science missions; the original list need not be completed first. Do not create accounts, paid features, leaderboards, or a backend without a new requirement.

## Repository structure
`orion-games` owns the hub and every game as regular files. There are no submodules or separate game deployments. A normal clone gets the complete project. All edits are committed and pushed here.

Hash game: https://teze3808.github.io/orion-games/games/orion-hash/
The old hash commit history was merged into this repository before retiring its standalone repository. The GitHub Pages origin and storage keys remain unchanged, preserving browser-local progress and language preferences.

## English and Traditional Chinese
All user-facing content must support English (`en`) and Traditional Chinese (`zh-Hant`), including mission stories, controls, status messages, rewards, progressive hints, parent explanations, accessibility labels, and page titles. All pages load the single `dist/shared/i18n.js` helper. Persist the preference under `orion-expedition-language`, shared on the GitHub Pages origin. Browser language determines the first visit; stored preference takes precedence. Switching language must preserve the current puzzle, hint depth, input, and sigils. Every future mission must meet this requirement before becoming playable.

## Reset collection
The hub provides a bilingual “Reset all sigils / 重設所有符印” button with confirmation. It resets the entire browser-local collection, including unknown/future sigil IDs, through `OrionProgress.reset()`. Cancellation changes nothing. It preserves language preferences and other browser data. Save failure leaves the collection unchanged and reports failure. Open game tabs refresh their reward display on the storage event; gameplay can earn rewards again afterward. This explicit full-collection reset is the exception to the normal rule that replay/restart preserves earned sigils.

## Mission cards and new puzzles
Available mission cards are clickable across their entire area with keyboard link support; planned missions remain inactive. With no saved puzzle, the hash game starts with target 0 and original 1234. Reset all sigils in the hub generates a target hash different from the previous target; the game loads that saved target and a matching original code. Acceptance, hidden hints, worked examples, and parent notes must use the current target. Relock retains the same puzzle for collision exploration; restarting preserves collected sigils and hides hints again.

## Collection reset and puzzle target
The shared progress record also includes `hashTarget` (integer 0–9; legacy records default to 0). Reset all sigils clears rewards and chooses a target different from the previously saved target. The in-game Restart adventure button has been removed. A fresh game visit loads that target; open tabs and restored pages synchronize it, clear current attempts, and hide hints. Language and other browser data remain unchanged. Failed collection-reset saves leave both rewards and target unchanged.

## Passcode clearing
After submitting a code, clear the input after two seconds without resetting the puzzle, result, or reward. New typing/keypad input cancels the pending clear so it never erases a fresh attempt. There is no in-game Restart adventure button. Relock keeps the current puzzle; only the hub’s full collection reset requests a different saved target.

## Moonlit Letter — 2026-09-21
`dist/games/orion-cipher/` teaches Caesar encryption and decryption through two decoded letters (EAST at shift 3, MOON at shift 7) and an encoded reply (FOX → KTC at shift 5). To earn `moonlight`, align the wheel correctly and submit the correct answer in all three stages. The wheel previews the transformation. Hints are hidden and progressive; full teaching notes appear after completion. English and Traditional Chinese share the same A–Z puzzle, with translated vocabulary clues. Replay preserves sigils; collection reset clears the mission session on storage sync. Failed saving offers a retry without claiming persistence.

Daily releases are recorded in RELEASES.md by Asia/Hong_Kong date to avoid duplicate daily missions.

## Counterweight Vault — 2026-09-22
- Mission `levers`, sigil `ingenuity` / Ingenuity / 巧思; playable at `games/orion-levers/`.
- Learning objective: predict and balance the turning effects of loads using both mass and distance from a pivot.
- Three stages: equal loads (2 × 3), unequal loads (4 × 2 versus 2 × distance), then two distinct balanced designs against 3 × 4. A seal requires a correct prediction of balance and an actually balanced configuration. Repeating one final design does not count twice.
- Controls adjust identical block count and equal-spacing positions; a labeled SVG is the functional model over a generated realistic vault environment. The initial beam is explicitly held level; release shows only the direction of initial tilt, not a physical trajectory or final angle. Failed predictions are logged, without penalty.
- The model neglects beam weight and pivot friction and assumes common gravity. Optional bilingual notes explain these simplifications and separate fantasy rewards from science. Sources and validation: `SCIENCE.md`.
- Shared language/progress APIs preserve prior sigils. Replay preserves rewards; full collection reset restarts this mission on storage/pageshow synchronization. Failed reward saves have an explicit retry.

## Crystal Alchemist’s Workshop — released 2026-09-23
Route `games/orion-mixtures/`, mission `mixtures`, sigil `crystal` / Crystal / 晶石. Three virtual chemistry samples teach magnetic separation, filtration and evaporation. Reward requires iron alone on the magnet tray, liquid water separated from sand, then sand in the filter and solid salt in the working vessel. Filtering before evaporation is essential in the final sample. Fresh samples support recovery without penalty. Notes explain ideal separation, water vapour, dissolved salt, and fictional magic. Scientific sources and model boundaries are in SCIENCE.md.

## Starlight Tower — 2026-09-24
- Existing mission `tower` and sigil `starlight` / Starlight / 星光 are now playable at `games/orion-binary/`.
- Objective: represent and decode unsigned four-bit numbers using place values 8, 4, 2, 1.
- Three challenges: send 5 with a live total, send 10 without a live total, then decode fixed pattern 1101 as 13. All three are required for the sigil. Incorrect signals show evidence without penalty; invalid answers never award a reward.
- Four keyboard/touch lamp controls expose on/off state and bit values. The final incoming pattern is read-only. Three progressive hints per challenge; teaching notes appear only after completion.
- Shared language and progress helpers preserve session input across language changes and preserve sigils across replay. Collection reset synchronizes on storage/pageshow; blocked saves have an honest retry.
- Original ImageGen tower scene and mobile crop are recorded in ARTWORK.md; source and model limitations in SCIENCE.md. Tests: `node tests/binary.cjs`.

## Workshop interface update — 2026-09-25
The chemistry mission now guides players through uncovering the sample, dragging a pictured tool onto the jar (or selecting the tool and then tapping the jar) and checking their collection. An illustrated sample jar and collection trays show material locations, including dissolved-salt labels and water vapour. A bilingual live checklist states the collection goals without giving tool solutions. Tools appear after uncovering; the final action changes to “Unlock this seal” when ready. Existing chemistry rules, sigil IDs, hidden hints and saved progress are preserved.

The workshop now uses original realistic inventory pictures for all three tools, a persistent outlined jar drop target, picture-based goal examples and animated material transfers. Pointer events support mouse, pen and touch. Dropping outside the jar, cancelling a gesture or pressing Escape does not run an experiment. Keyboard/tap selection requires explicit jar activation. Reduced-motion mode skips transfers. The tool rack remains beside the jar at phone widths.

## Counterweight controls — 2026-09-25
The right-hand load can be dragged or positioned by tapping the right half of the beam. It snaps to positions 1–6; a native range slider provides touch and keyboard alternatives. Weight count uses +/− buttons and a 1–4 slider, unlocked only for the final seal. Changes clear the previous prediction and tilt before the next test. Cancelled pointer gestures restore the previous distance, prediction and result; the left load stays fixed. Existing balance solutions, distinct-design reward rules and progress storage are unchanged.
