# Orion’s Expedition / Orion 的失落文明

Treasure and mystery games for learning computing and maths, in one repository.

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

Read [PROJECT.md](PROJECT.md) for the story and architecture, and [AGENTS.md](AGENTS.md) for development rules. Eight more missions are planned. Add each future game under `dist/games/` and reuse `dist/shared/`.

The former standalone orion-hash history is preserved in this repository’s merge history.

## Collection reset and puzzle target
The shared progress record also includes `hashTarget` (integer 0–9; legacy records default to 0). Reset all sigils clears rewards and chooses a target different from the previously saved target. The in-game Restart adventure button has been removed. A fresh game visit loads that target; open tabs and restored pages synchronize it, clear current attempts, and hide hints. Language and other browser data remain unchanged. Failed collection-reset saves leave both rewards and target unchanged.

## Passcode clearing
After submitting a code, clear the input after two seconds without resetting the puzzle, result, or reward. New typing/keypad input cancels the pending clear so it never erases a fresh attempt. There is no in-game Restart adventure button. Relock keeps the current puzzle; only the hub’s full collection reset requests a different saved target.

- [The Moonlit Letter — Caesar cipher](https://teze3808.github.io/orion-games/games/orion-cipher/)

Run `node tests/cipher.cjs` for the three-stage cipher, language, rewards and reset checks. Daily mission history is in [RELEASES.md](RELEASES.md).
