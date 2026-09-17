# Agent instructions — Orion’s Expedition

Read `PROJECT.md` before changing this project. These instructions apply to this game repository, not the parent HKBUAS school organizer.

## Preserve the experience
- Keep the world centered on treasure, mystery, and puzzle discovery.
- Every available mission is independently accessible. Never introduce sequential unlocks or sigil paywalls.
- Keep solutions, original codes, and teaching explanations hidden on initial gameplay screens. Provide progressive optional hints through a discreet but accessible rune button.
- Use Traditional Chinese, not Simplified Chinese, for new Chinese text. Retain official English concept names where helpful.
- Do not claim a planned game is playable. Coming-soon cards must not link to broken routes or empty games.
- Preserve the orion-hash subproject and all unrelated user changes.

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

## Subprojects
- Each game has a topic-specific repository and nested Git submodule. `orion-hash/` is the first.
- Commit/push within a changed game first, then commit its submodule pointer in the master. Never flatten nested Git history.
- The hub is published at `/orion-games/`; hash gameplay is published at `/orion-hash/`. Keep navigation consistent.
- Shared progress relies on the same GitHub Pages origin and stable storage schema. Keep master and game progress helpers compatible.

## English and Traditional Chinese
All user-facing content must support English (`en`) and Traditional Chinese (`zh-Hant`), including mission stories, controls, status messages, rewards, progressive hints, parent explanations, accessibility labels, and page titles. Both pages use `dist/i18n.js`; keep the copies compatible. Persist the preference under `orion-expedition-language`, shared on the GitHub Pages origin. Browser language determines the first visit; stored preference takes precedence. Switching language must preserve the current puzzle, hint depth, input, and sigils. Every future mission must meet this requirement before becoming playable.
