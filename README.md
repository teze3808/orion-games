# Orion Hash — The Treasure Gate

A treasure-gate game for learning hash collisions, part of **Orion’s Expedition**.

- [Play the hash game](https://teze3808.github.io/orion-hash/)
- [Choose a mission / 任務地圖](https://teze3808.github.io/orion-games/)
- [Master project](https://github.com/teze3808/orion-games)

Enter four digits. Discover alternative opening codes. The discreet ✧ rune reveals progressive hints. Open the gate to earn the Echo Sigil / 回聲符印; exploring alternative codes is optional. Progress is saved in the same browser and shared with the mission hub on the same GitHub Pages origin.

The deliberately weak teaching hash is digit sum modulo 10; it is not a real security system.

Run locally with `python3 -m http.server 8765 --directory dist`. GitHub Actions publishes `dist` after pushes to main. Read [PROJECT.md](PROJECT.md) and [AGENTS.md](AGENTS.md) for the learning contract and development rules.

## English and Traditional Chinese
All user-facing content must support English (`en`) and Traditional Chinese (`zh-Hant`), including mission stories, controls, status messages, rewards, progressive hints, parent explanations, accessibility labels, and page titles. Both pages use `dist/i18n.js`; keep the copies compatible. Persist the preference under `orion-expedition-language`, shared on the GitHub Pages origin. Browser language determines the first visit; stored preference takes precedence. Switching language must preserve the current puzzle, hint depth, input, and sigils. Every future mission must meet this requirement before becoming playable.

## Reset collection
The hub provides a bilingual “Reset all sigils / 重設所有符印” button with confirmation. It resets the entire browser-local collection, including unknown/future sigil IDs, through `OrionProgress.reset()`. Cancellation changes nothing. It preserves language preferences and other browser data. Save failure leaves the collection unchanged and reports failure. Open game tabs refresh their reward display on the storage event; gameplay can earn rewards again afterward. This explicit full-collection reset is the exception to the normal rule that replay/restart preserves earned sigils.
