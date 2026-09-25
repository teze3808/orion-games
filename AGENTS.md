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
- Keep public assets in `dist`; use relative paths so `/orion-games/` works on GitHub Pages.
- Treat the registry as developer-authored data. If external/user content is introduced, render it safely rather than interpolating untrusted HTML.
- Support keyboard, touch, visible focus, readable type, reduced motion, mobile widths, and accessible dialogs/status announcements.
- Keep secrets and personal/school information out of the public repository. No telemetry or third-party account requirements.

## Validation and delivery
- Check JavaScript syntax and relative asset/page references.
- Test meaningful success, failure, invalid input, duplicate rewards, restart, reload persistence, and corrupted/unavailable storage paths when affected.
- Confirm hints begin hidden and only appear after explicit interaction.
- Verify mission navigation and registry counts; do not add tests that merely mirror styling.
- Update PROJECT.md and README.md when behavior, scope, storage, or deployment changes.
- GitHub Pages is the authorized host. Commit and push requested website updates to `main`; inspect the resulting deployment before reporting the live update as complete.
- Never deploy to the legacy Sites host or change repository visibility without a user request.
- Report what is playable versus planned, the live URL, and any material limitations accurately.

## Games in one repository
- Store games under `dist/games/<topic-name>/` as ordinary tracked files; no submodules or separate game repositories.
- Load shared language and progress helpers from `dist/shared/`; do not duplicate them.
- Commit/push all changes in this master repository. One Pages workflow publishes the hub and games together.
- Use relative links for game navigation and shared assets; hash gameplay is at `/orion-games/games/orion-hash/`.
- Preserve the imported hash history and stable storage keys.

## English and Traditional Chinese
All user-facing content must support English (`en`) and Traditional Chinese (`zh-Hant`), including mission stories, controls, status messages, rewards, progressive hints, parent explanations, accessibility labels, and page titles. All pages use `dist/shared/i18n.js`. Persist the preference under `orion-expedition-language`, shared on the GitHub Pages origin. Browser language determines the first visit; stored preference takes precedence. Switching language must preserve the current puzzle, hint depth, input, and sigils. Every future mission must meet this requirement before becoming playable.

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
