# Orion’s Expedition / Orion 的失落文明

## Purpose
Build an expandable collection of treasure, mystery, and puzzle games that teach Orion computing and mathematics through discovery. The story is a lost civilization whose mysteries yield unique sigils (符印). New islands and missions can keep joining the world; ten is the initial collection, not a permanent limit.

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
| moon | 月光下的密信 | Caesar cipher; encryption and decryption | moonlight / 月光 | Planned |
| tower | 星燈塔 | Binary representation | starlight / 星光 | Planned |
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
Buildless HTML, CSS, and JavaScript. All public assets live in `dist/`.
- `index.html`, `hub.css`, `hub.js`: mission hub and collection.
- `missions.js`: trusted, static mission registry; unique IDs, title, story, topic, sigil, symbol, optional `href`. Absence of `href` means planned, not playable.
- `progress.js`: shared `OrionProgress.read()`, `.has(id)`, `.earn(id)` API.
- `orion-hash/`: Git submodule containing the separate hash game repository. Its `dist/index.html` is published independently at https://teze3808.github.io/orion-hash/.
- `dist/gate.png`: shared generated artwork used by the hub.
- `.github/workflows/pages.yml`: automatic deployment of `dist` on main pushes.

## Progress contract
Browser-local storage only, explicitly requested for collecting sigils. Key: `orion-expedition-progress-v1`; shape: `{version:1,sigils:["echo"]}`. Stable sigil IDs must never be renamed or reused for a different achievement. Unknown IDs are preserved for future compatibility. Rewards are idempotent. Restarting a mission clears its session, not earned sigils. No cross-device sync is promised. Clearing browser data removes saved progress. Corrupt/unavailable storage must not break gameplay; failed saves produce an honest in-session reward message. Never store names, passwords, contact information, or analytics.

## Adding a mission
1. Define an independent story, one learning objective, exact success/reward criteria, and three optional hint levels.
2. Implement each game in its own topic-named repository/subfolder, with public assets under its `dist`; use relative URLs for GitHub Pages subpath compatibility.
3. Include navigation back to `https://teze3808.github.io/orion-games/`, accessible keyboard/touch controls, and shared progress handling.
4. Award its stable sigil only after the defined challenge is verified.
5. Add/update the registry entry; supply `href` only once fully playable and checked.
6. Verify hub counts, reward persistence, replay, mobile layout, and return navigation. Add a row here; do not hardcode a ten-mission cap.

## Hosting and development
Repository: https://github.com/teze3808/orion-games
Primary public site: https://teze3808.github.io/orion-games/
Run: `python3 -m http.server 8765 --directory dist`.
GitHub Pages is the user-selected host; keep all new publication here. The hash subproject retains legacy `.openai/hosting.json` metadata, not the active publishing target. The old Sites URL is not kept in sync.

## Scope and next work
The hub and gate are implemented. Nine mission cards describe planned games and must not be represented as playable. Build those games in future requests. Do not create accounts, paid features, leaderboards, or a backend without a new requirement.

## Repository structure
The master repository is `orion-games`. The first topic repository is `orion-hash`, tracked as a Git submodule at `orion-hash/`. Clone with `git clone --recurse-submodules`. Commit game edits within the game repository and push them there, then update the master submodule pointer. The master Pages workflow publishes only the hub’s `dist`, not nested games. Game links are explicit GitHub Pages URLs.

Both Pages sites share the origin `https://teze3808.github.io`, so the same localStorage key preserves the collection across them. `dist/progress.js` is the canonical progress contract; games carry a compatible copy for independent hosting. Keep copies compatible when changing it.

## English and Traditional Chinese
All user-facing content must support English (`en`) and Traditional Chinese (`zh-Hant`), including mission stories, controls, status messages, rewards, progressive hints, parent explanations, accessibility labels, and page titles. Both pages use `dist/i18n.js`; keep the copies compatible. Persist the preference under `orion-expedition-language`, shared on the GitHub Pages origin. Browser language determines the first visit; stored preference takes precedence. Switching language must preserve the current puzzle, hint depth, input, and sigils. Every future mission must meet this requirement before becoming playable.

## Reset collection
The hub provides a bilingual “Reset all sigils / 重設所有符印” button with confirmation. It resets the entire browser-local collection, including unknown/future sigil IDs, through `OrionProgress.reset()`. Cancellation changes nothing. It preserves language preferences and other browser data. Save failure leaves the collection unchanged and reports failure. Open game tabs refresh their reward display on the storage event; gameplay can earn rewards again afterward. This explicit full-collection reset is the exception to the normal rule that replay/restart preserves earned sigils.
