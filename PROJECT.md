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

Earn the Echo Sigil / 回聲符印 (`echo`) after finding three distinct accepted codes other than 1234 in one session. Duplicate attempts do not count twice. All games remain independently accessible. Restart clears session attempts but never removes earned sigils. Hints, calculations, and parent explanations start hidden behind the discreet rune.

## Files and progress
`dist/index.html` is the game entrypoint; `style.css`, `game.js`, and `gate.png` implement the game. `gate.html` redirects older direct game links to the new entrypoint. `progress.js` is a compatible copy of the master’s progress helper.

Storage key: `orion-expedition-progress-v1`. Shape: `{version:1,sigils:["echo"]}`. Never rename stable IDs or erase unknown IDs. Both master and game run on `https://teze3808.github.io`, so localStorage is shared across their paths. Collection data stays in that browser only; no cross-device sync. A storage failure must not interrupt gameplay or falsely promise persistence.

## Development and publishing
Buildless HTML/CSS/JavaScript. Run `python3 -m http.server 8765 --directory dist` from this repository. Keep game asset paths relative. The mission-map link points to the master Pages URL.

Push main to deploy `dist` through `.github/workflows/pages.yml`. After a game commit, update the master repository’s submodule pointer. The legacy `.openai/hosting.json` is not the active deployment target. GitHub Pages is the user-selected host.

## Validation
Check input validation, accepted/rejected codes, collision uniqueness, reward threshold, replay, hidden hints, storage persistence/failure, and navigation. Keep the toy hash explanation accurate: this is not a real password security system.
