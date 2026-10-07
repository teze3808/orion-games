# Agent instructions — Orion’s Expedition

## Required visual quality for future games
For every future game, match or exceed the approved Moonlit Letter artwork update (moon-door.jpg and ARTWORK.md). Use the built-in ImageGen tool, following its skill, for original mission-specific realistic cinematic artwork and an atmospheric treasure/mystery environment. Integrate the artwork into the main scene and a coherent background, with detailed believable materials, moonlight or other story-appropriate lighting, depth and a welcoming child-friendly mood. Do not ship placeholder geometric scenery as the finished visual. Keep controls and text readable, hints hidden, and both English and Traditional Chinese polished. Verify the actual artwork loads, desktop and mobile crops preserve the focal subject, and success feedback fits the scene. Save generated assets inside the repository, optimize delivery, and record prompts in ARTWORK.md. Use the Moonlit Letter as the quality reference, while giving each mission its own setting and identity.

Read `PROJECT.md` before changing this project. These instructions apply to this game repository, not the parent HKBUAS school organizer.

## Preserve the experience
- Keep the world centered on treasure, mystery, and puzzle discovery.
- Every available mission is independently accessible. Never introduce sequential unlocks or sigil paywalls.
- Keep solutions, original codes, and teaching explanations hidden on initial gameplay screens. Provide progressive optional hints through a discreet but accessible rune button.
- Use Traditional Chinese, not Simplified Chinese, for new Chinese text. Retain official English concept names where helpful.
- Do not claim a planned game is playable. Coming-soon cards must not link to broken routes or empty games.
- Preserve the orion-hash subproject and all unrelated user changes.

## Subject scope and mission planning
- Build for mathematics, computing, chemistry, biology, engineering, and broader science, including physics, astronomy, Earth science, and environmental science.
- Treat the original ten missions as an expandable starting collection. Introduce new subjects alongside existing plans; do not wait for the computing/maths roadmap to finish.
- Choose a varied subject mix across releases. Cross-disciplinary missions are welcome with one explicit primary learning objective.
- Teach through observation, prediction, virtual experimentation, evidence, and design iteration. Preserve the shared treasure/mystery world and the approved visual quality across every subject.
- Verify scientific claims using authoritative educational or primary sources and record references in the mission documentation. Explain consequential model simplifications in optional learning/parent notes, and keep story magic distinct from scientific explanations.
- Use child-appropriate virtual chemistry and biology activities. Do not require real-world handling of chemicals or living specimens to complete a mission.
- Keep proposed science missions marked as ideas/planned until implemented and validated; preserve stable IDs and progress for existing games.

## Learning and reward correctness
- Each mission needs one explicit learning objective and a meaningful, testable sigil criterion.
- Distinguish an input collision from reusing the same input. Avoid presenting weak teaching hashes/ciphers as secure.
- Failure should offer another attempt; no lost lives, shame, forced timers, or punitive streaks.
- Award sigils idempotently through `OrionProgress`. Restart/replay must not erase collection data.
- Preserve existing storage keys, stable mission/sigil IDs, and unknown saved IDs. Use a migration for any necessary schema change.
- Storage failures must not crash the game or falsely promise a saved reward.

## Implementation
- Use the static stack unless a requested capability requires more. No unnecessary frameworks or dependencies.
- Mission definitions belong in `dist/missions.js`; derive collection and availability counts from the registry.
- Keep public assets in `dist`; use relative paths so Render root hosting and local previews work.
- Treat the registry as developer-authored data. If external/user content is introduced, render it safely rather than interpolating untrusted HTML.
- Support keyboard, touch, visible focus, readable type, reduced motion, mobile widths, and accessible dialogs/status announcements.
- Keep secrets and personal/school information out of the public repository. No telemetry or third-party account requirements.

## Validation and delivery
- Check JavaScript syntax and relative asset/page references.
- Test meaningful success, failure, invalid input, duplicate rewards, restart, reload persistence, and corrupted/unavailable storage paths when affected.
- Confirm hints begin hidden and only appear after explicit interaction.
- Verify mission navigation and registry counts; do not add tests that merely mirror styling.
- Update PROJECT.md and README.md when behavior, scope, storage, or deployment changes.
- Render is the authorized host. Commit and push requested website updates to `main`; inspect the Render deployment before reporting the live update as complete. GitHub hosts the source repository and CI only. Do not re-enable GitHub Pages.
- Never deploy to the legacy Sites host or change repository visibility without a user request.
- Report what is playable versus planned, the live URL, and any material limitations accurately.

## Games in one repository
- Store games under `dist/games/<topic-name>/` as ordinary tracked files; no submodules or separate game repositories.
- Load shared language and progress helpers from `dist/shared/`; do not duplicate them.
- Commit/push all changes in this master repository. One Pages workflow publishes the hub and games together.
- Use relative links for game navigation and shared assets; hash gameplay is at `/orion-games/games/orion-hash/`.
- Preserve the imported hash history and stable storage keys.

## English and Traditional Chinese
All user-facing content must support English (`en`) and Traditional Chinese (`zh-Hant`), including mission stories, controls, status messages, rewards, progressive hints, parent explanations, accessibility labels, and page titles. All pages use `dist/shared/i18n.js`. Persist the preference under `orion-expedition-language`, shared on the current hosting origin. Browser language determines the first visit; stored preference takes precedence. Switching language must preserve the current puzzle, hint depth, input, and sigils. Every future mission must meet this requirement before becoming playable.

## Reset collection
The hub provides a bilingual “Reset all sigils / 重設所有符印” button with confirmation. It resets the entire browser-local collection, including unknown/future sigil IDs, through `OrionProgress.reset()`. Cancellation changes nothing. It preserves language preferences and other browser data. Save failure leaves the collection unchanged and reports failure. Open game tabs refresh their reward display on the storage event; gameplay can earn rewards again afterward. This explicit full-collection reset is the exception to the normal rule that replay/restart preserves earned sigils.

## Mission cards and new puzzles
Available mission cards are clickable across their entire area with keyboard link support; planned missions remain inactive. With no saved puzzle, the hash game starts with target 0 and original 1234. Reset all sigils in the hub generates a target hash different from the previous target; the game loads that saved target and a matching original code. Acceptance, hidden hints, worked examples, and parent notes must use the current target. Relock retains the same puzzle for collision exploration; restarting preserves collected sigils and hides hints again.

## Collection reset and puzzle target
The shared progress record also includes `hashTarget` (integer 0–9; legacy records default to 0). Reset all sigils clears rewards and chooses a target different from the previously saved target. The in-game Restart adventure button has been removed. A fresh game visit loads that target; open tabs and restored pages synchronize it, clear current attempts, and hide hints. Language and other browser data remain unchanged. Failed collection-reset saves leave both rewards and target unchanged.

## Passcode clearing
After submitting a code, clear the input after two seconds without resetting the puzzle, result, or reward. New typing/keypad input cancels the pending clear so it never erases a fresh attempt. There is no in-game Restart adventure button. Relock keeps the current puzzle; only the hub’s full collection reset requests a different saved target.

## iPad play layout — 2026-09-25
All playable missions use the shared tablet workbench: session seal progress at the top, the experiment and touch controls on the left, and readings, observations, rewards and compact story artwork on the right. Keep these two columns at iPad portrait and landscape widths (700px and above); phones stack experiment then results. Chemistry collection trays appear in the result panel. Preserve at least 44px touch targets, keyboard alternatives and hidden hints. The hub shows the sigil collection above the mission introduction. Future missions should use `shared/play-layout.css` and `shared/play-layout.js` or follow the same arrangement. Check both languages at 768×1024 and 1024×768, as well as phone width. Progress shows seals completed in this play session; collection remains browser-persistent.

## Direct balance and top scene — 2026-09-25
All six mission pictures now sit directly above the top progress bar, retaining their live scene status and seal displays; experiments remain on the left and results on the right for tablets. Future missions must follow this arrangement. The Counterweight Vault shows live tilt without predictions or a release button. Release a drag or finish a slider adjustment at balance to record it. Drag horizontally for position, vertically up/down for block count on the final seal; sliders and +/− remain accessible alternatives. Cancelled drags restore both settings and cannot earn a seal. The final challenge still requires two distinct balanced designs.

## Random challenges on reset — 2026-09-25
Reset all sigils now atomically changes the hash target and a persistent variant for every other playable mission, excluding each immediately previous variant. Existing collections without variant fields use the original questions. Replay chooses a different variant for that mission without erasing sigils. Reloads retain saved questions; language changes and unrelated rewards do not reroll them. Open tabs synchronize on storage/pageshow. Failed collection resets change neither questions nor rewards. When replay storage is blocked, the new variant works for that session but cannot persist across reloads.

Variant banks: Moonlit Letter (10 message/shift sets), Starlight Tower (10 number sets), Counterweight Vault (5 solvable load sets, each with two or more final balanced designs), Crystal Workshop (3 material/collection-goal sets), Sleeping Seed Vault (2 contrasting comparison sets). Hints, pictured goals and success checks derive from the selected set in both languages. Science variants reuse the documented material properties and bean model; they change experimental conditions or collection goals, not scientific rules. Taking a fresh chemistry sample retries the current problem; relocking the hash gate retains the puzzle for collision exploration. Future games must provide non-repeating reset variants, solvability checks, and generated hints before publication.

Mist Keeper adds eight persistent three-shore target sets. Retry keeps the current target; full replay and collection reset change every shore target. Preserve interval-based elimination, unlimited attempts, and three-boat sigil criteria.

Lantern Circuit adds six persistent circuit sets and sigil `spark`. Preserve complete-loop correctness and separate branch versus shared-switch behavior. Highlight only paths through lit lamps; never imply an open branch carries current. This is an ideal on/off model, not a brightness/current simulation. Panel retry retains the problem; replay/reset changes the full set without changing physical rules.

## One visible progress display — 2026-09-27
All games show progress in the top artwork only. The duplicate counter/bar row beneath it is visually hidden, with its text retained for screen readers. Viewport-fitted games reclaim the removed row for play space. Future missions must follow this single visible progress arrangement.


## Completion discoveries — 2026-09-27
All eight playable missions open a child-friendly bilingual discovery dialog on session completion. Shared `discovery.js` / `discovery.css` provide three illustrated animated steps, a short explanation and an optional thinking question. Examples are labelled; they do not claim to be the current randomized question. The dialog does not award or save rewards. It appears once per completed session, can be closed with Escape or the visible controls, and can be reopened from results. Replay or collection reset hides it until completion again. The hash game shows it on the first opening and keeps it available during collision exploration.

Use native modal focus containment, an in-dialog language switch, 44px controls, manual back/next, pause/replay, and a scrollable small-screen layout. Automatic steps run once, seven seconds apart; reduced-motion users get manual steps by default. No third-party video, accounts or network requests are needed. Future games must provide a similarly understandable post-completion explanation, keeping it hidden before success. Science explanations retain the model limits documented in SCIENCE.md.

## Bridge of Truth — 2026-09-28
The planned `bridge` mission is playable at `games/orion-logic/`, sigil `truth`. Keep AND, inclusive OR and single-input NOT accurate; NOT ignores and hides B. Require every input combination and correct rule identification before awarding each seal. Repeated combinations cannot fill new evidence rows. Six persistent permutations change whole-mission guardian order on replay/full reset without altering truth tables. Keep the post-completion discovery lesson, shared helpers, saved-sigil retry and one visible progress display in the artwork.

## Water forms — 2026-09-29
`orion-water` uses sigil `transformation` and six persistent three-trial journeys. Preserve the distinction between invisible water vapour and cloud droplets; label dot illustrations as a model. Warming/cooling represents complete changes with sufficient time, not fixed temperature steps. No pressure, volume, mixed phases or direct solid/gas transitions are simulated. Each journey includes all four adjacent phase changes. Keep all three target-form stores necessary for reward and preserve existing collection/reset/discovery helpers.

## Crystal Express — 2026-09-30
Mission `train` uses the `sort` variant key (six sets) and stable `order` sigil. Keep ascending/descending comparisons inclusive of equal values. All three trains must be correct before reward; any valid swap sequence is accepted. Retry restores the same current train, replay changes labels while retaining sigils, and collection reset uses the shared helpers. Preserve keyboard/touch two-carriage selection, cancellation by selecting the same carriage, bilingual generated hints and completion discovery. Do not describe the swap log as comparison cost or an optimality score.

## Prism Lantern Vault — 2026-10-01
Mission/variant `light` uses six sets and sigil `radiance`. Preserve exact additive RGB outcomes and all-three-seal reward. Fixed balanced lights: red+green yellow, red+blue magenta, green+blue cyan, all white, none dark. Keep colour names beside swatches and on/off text with toggle semantics. Never imply these are paint-mixing rules or a prism dispersion simulation. Preserve shared reset, storage-failure honesty, bilingual hints and post-completion discovery.

## Gem Balance preservation
Keep `balance` as both mission and sigil ID. Equal-arm pans compare `gems × guessed value + extra blocks` with the given total. This is substitution in an equality model, not changing a real gemstone’s mass. All three puzzles must pass before award. Keep six non-repeating reset/replay sets, accessible slider and buttons, hidden clues, bilingual completion lesson and honest failed-save retry.

## Sunstone Courtyard — 2026-10-03
Keep `shadows` mission/variant and `sunshadow` sigil stable. Four cardinal light directions map to opposite shadows; low/high light maps to long/short. Require both attributes for all three seals before award. Preserve eight reset/replay sets, shared progress and bilingual discovery. This is a freely movable virtual parallel light, not a Sun-path, season or clock simulation. Keep the pillar fixed, the ground level, the dashed target visually distinct, and qualitative length labels available without relying on shape alone.

## Mission-map background — 2026-10-03
The hub opens with the collection and mission cards, without the introductory hero panel or separate Treasure Gate call-to-action. Reuse the approved lost-city gate artwork as a full-viewport decorative background, with dark readable panels and responsive framing. Keep every available mission independently clickable and retain bilingual controls.

## Visible sigil overview — 2026-10-03
The mission title/count and sigil collection share one compact panel. Show all sigils directly as small labelled icons, with gold and a check mark for collected sigils and accessible bilingual collection states. No disclosure hides the collection. Reset all sigils sits beside the language selector in the top header; preserve its confirmation and shared reset behavior.

## Icon-only sigils — 2026-10-03
Sigils are 44px icon buttons without permanent name labels. Hover, keyboard focus or tapping reveals the bilingual name, collection state, mission title and story in a tooltip. Hover/focus adds a soft glow and lift; reduced motion disables movement. Escape dismisses descriptions. Preserve gold/check-mark earned indicators and the header reset control.

## Clockwork Fox — 2026-10-04
Preserve mission/variant `fox`, eight sets, and `footprint` sigil. Commands use absolute screen directions and repeat one movement one to three times. Check every expanded step for collision; never jump hedges. Success requires ending at the treasure after all commands in all three gardens, not merely touching it. Repeats are optional, and valid nonoptimal routes are welcome. Cancel pending run callbacks on stop, reset, replay and pagehide; language changes must preserve the running program. Keep both languages, shared discovery/progress and one top artwork progress display.

## Gearkeeper’s Vault — 2026-10-05
Keep `gears` mission/variant (six sets) and `motion` sigil stable. Model external spur gears: fixed 12-tooth clockwise driver, output 6/12/24 teeth giving 2×/1×/½× speed. Each mesh reverses direction; adding one simple idler restores driver direction without changing output speed ratio. Require both attributes for all three seals. Preserve pause/reduced-motion support, numeric/direction labels, shared reset/replay/progress and bilingual discovery. Artwork is decorative; do not imply the simplified tooth shapes are a manufacturing design.

## Broken Star Signal — 2026-10-06
Preserve `signal` mission/variant (eight sets) and `starspeech` sigil. Even parity includes all four data bits and the checking bit. One odd number of flips triggers an alarm; an even number does not. Never equate no alarm with unchanged data or claim single-row parity can locate/repair an error. All three experiments are required. Count distinct final differences, not clicks; changing a lamp invalidates the previous test. Preserve shared reset/replay, bilingual hidden hints and completion discovery.

## Living Tapestry — 2026-10-07
Preserve `foodchains` mission/variant (six sets), `connection` sigil, and all-three-habitat reward. Arrows point from food to consumer, never toward an animal’s prey. Show the three documented chains as examples, not full diets or food webs. No population forecasts or universal claims that all ecosystems begin with sunlight. Reset/replay changes the whole habitat order and card layout; individual chains recur. Preserve touch/keyboard card selection and removal, hidden progressive hints, both languages, shared discovery and storage failure handling.
