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
