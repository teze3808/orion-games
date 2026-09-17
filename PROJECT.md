# Orion Hash / 古城的密碼門

## Role
This topic-specific game is a subproject of Orion’s Expedition. The master mission hub, story roadmap, and collection live in the `orion-games` repository. This repository owns only the hash-collision treasure-gate game.

- Game repository: https://github.com/teze3808/orion-hash
- Game: https://teze3808.github.io/orion-hash/
- Master repository: https://github.com/teze3808/orion-games
- Mission hub: https://teze3808.github.io/orion-games/
- Local location: `work/orion-games/orion-hash/`, tracked as a Git submodule by the master.

## Learning and play
Orion explores a treasure gate with a four-digit keypad. The teaching hash sums digits modulo 10. Original code: 1234; accepted hash: 0. Leading zeroes are allowed. Different accepted codes collide with the original. The original itself is not a collision.

Earn the Echo Sigil / 回聲符印 (`echo`) on the first successful gate opening, including the original code. The sigil is awarded once; additional collision discovery is optional. All games remain independently accessible. Restart clears session attempts but never removes earned sigils. Hints, calculations, and parent explanations start hidden behind the discreet rune.

## Files and progress
`dist/index.html` is the game entrypoint; `style.css`, `game.js`, and `gate.png` implement the game. `gate.html` redirects older direct game links to the new entrypoint. `progress.js` is a compatible copy of the master’s progress helper.

Storage key: `orion-expedition-progress-v1`. Shape: `{version:1,sigils:["echo"]}`. Never rename stable IDs or erase unknown IDs. Both master and game run on `https://teze3808.github.io`, so localStorage is shared across their paths. Collection data stays in that browser only; no cross-device sync. A storage failure must not interrupt gameplay or falsely promise persistence.

## Development and publishing
Buildless HTML/CSS/JavaScript. Run `python3 -m http.server 8765 --directory dist` from this repository. Keep game asset paths relative. The mission-map link points to the master Pages URL.

Push main to deploy `dist` through `.github/workflows/pages.yml`. After a game commit, update the master repository’s submodule pointer. The legacy `.openai/hosting.json` is not the active deployment target. GitHub Pages is the user-selected host.

## Validation
Check input validation, accepted/rejected codes, collision uniqueness, reward threshold, replay, hidden hints, storage persistence/failure, and navigation. Keep the toy hash explanation accurate: this is not a real password security system.

## English and Traditional Chinese
All user-facing content must support English (`en`) and Traditional Chinese (`zh-Hant`), including mission stories, controls, status messages, rewards, progressive hints, parent explanations, accessibility labels, and page titles. Both pages use `dist/i18n.js`; keep the copies compatible. Persist the preference under `orion-expedition-language`, shared on the GitHub Pages origin. Browser language determines the first visit; stored preference takes precedence. Switching language must preserve the current puzzle, hint depth, input, and sigils. Every future mission must meet this requirement before becoming playable.

## Reset collection
The hub provides a bilingual “Reset all sigils / 重設所有符印” button with confirmation. It resets the entire browser-local collection, including unknown/future sigil IDs, through `OrionProgress.reset()`. Cancellation changes nothing. It preserves language preferences and other browser data. Save failure leaves the collection unchanged and reports failure. Open game tabs refresh their reward display on the storage event; gameplay can earn rewards again afterward. This explicit full-collection reset is the exception to the normal rule that replay/restart preserves earned sigils.

## Mission cards and new puzzles
Available mission cards are clickable across their entire area with keyboard link support; planned missions remain inactive. The hash game starts with target 0 and original 1234. Every Restart adventure generates a target hash different from the previous target and a matching four-digit original code. Acceptance, hidden hints, worked examples, and parent notes must use the current target. Relock retains the same puzzle for collision exploration; restarting preserves collected sigils and hides hints again.
