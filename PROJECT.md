# Orion’s Expedition / Orion 的失落文明

## Approved visual standard
The realistic Moonlit Letter moon door and atmospheric background are the minimum visual quality for every future mission. Create original mission-specific artwork with ImageGen: believable materials, cinematic lighting, environmental depth, and a child-friendly sense of treasure and mystery. Integrate finished artwork into the main scene and background; verify desktop/mobile framing and readable bilingual controls in the browser before release. Each game should have its own setting while matching this quality. Preserve progressive hidden hints and reliable sigil collection. Record artwork prompts in ARTWORK.md and store optimized assets in the repository.

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
| moon | 月光下的密信 | Caesar cipher; encryption and decryption | moonlight / 月光 | Playable |
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
The hub, gate and Moonlit Letter are implemented. Eight mission cards describe planned games and must not be represented as playable. Build those games in future requests. Do not create accounts, paid features, leaderboards, or a backend without a new requirement.

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
