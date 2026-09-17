# Orion Hash — The Treasure Gate

A treasure-gate game for learning hash collisions, part of **Orion’s Expedition**.

- [Play the hash game](https://teze3808.github.io/orion-hash/)
- [Choose a mission / 任務地圖](https://teze3808.github.io/orion-games/)
- [Master project](https://github.com/teze3808/orion-games)

Enter four digits. Discover alternative opening codes. The discreet ✧ rune reveals progressive hints. Find three distinct alternatives to earn the Echo Sigil / 回聲符印. Progress is saved in the same browser and shared with the mission hub on the same GitHub Pages origin.

The deliberately weak teaching hash is digit sum modulo 10; it is not a real security system.

Run locally with `python3 -m http.server 8765 --directory dist`. GitHub Actions publishes `dist` after pushes to main. Read [PROJECT.md](PROJECT.md) and [AGENTS.md](AGENTS.md) for the learning contract and development rules.
