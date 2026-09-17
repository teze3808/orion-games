# Orion’s Expedition / Orion 的失落文明

An expanding world of independent treasure, mystery, and puzzle missions for learning computing and mathematics.

[Choose a mission](https://teze3808.github.io/orion-games/)

## Projects

- `dist/`: mission hub and browser-local sigil collection.
- [`orion-hash/`](https://github.com/teze3808/orion-hash): hash-collision game, tracked as a Git submodule and independently published at https://teze3808.github.io/orion-hash/.

The hash mission is playable. Nine additional stories are planned; new games can be added without imposing an order or changing existing rewards.

Clone with `git clone --recurse-submodules https://github.com/teze3808/orion-games.git`. Serve the hub with `python3 -m http.server 8766 --directory dist`.

Read [PROJECT.md](PROJECT.md) for the story, mission registry, rewards, and architecture, and [AGENTS.md](AGENTS.md) for development instructions. Commit game edits within their repository first, then update the master’s submodule pointer. Main pushes publish the hub through GitHub Pages.
