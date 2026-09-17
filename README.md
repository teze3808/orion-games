# Orion’s Expedition / Orion 的失落文明

An expanding world of independent treasure, mystery, and puzzle missions for learning computing and mathematics.

[Choose a mission](https://teze3808.github.io/orion-games/)

## Projects

- `dist/`: mission hub and browser-local sigil collection.
- [`orion-hash/`](https://github.com/teze3808/orion-hash): hash-collision game, tracked as a Git submodule and independently published at https://teze3808.github.io/orion-hash/.

The hash mission is playable. Nine additional stories are planned; new games can be added without imposing an order or changing existing rewards.

Clone with `git clone --recurse-submodules https://github.com/teze3808/orion-games.git`. Serve the hub with `python3 -m http.server 8766 --directory dist`.

Read [PROJECT.md](PROJECT.md) for the story, mission registry, rewards, and architecture, and [AGENTS.md](AGENTS.md) for development instructions. Commit game edits within their repository first, then update the master’s submodule pointer. Main pushes publish the hub through GitHub Pages.

## English and Traditional Chinese
All user-facing content must support English (`en`) and Traditional Chinese (`zh-Hant`), including mission stories, controls, status messages, rewards, progressive hints, parent explanations, accessibility labels, and page titles. Both pages use `dist/i18n.js`; keep the copies compatible. Persist the preference under `orion-expedition-language`, shared on the GitHub Pages origin. Browser language determines the first visit; stored preference takes precedence. Switching language must preserve the current puzzle, hint depth, input, and sigils. Every future mission must meet this requirement before becoming playable.

## Reset collection
The hub provides a bilingual “Reset all sigils / 重設所有符印” button with confirmation. It resets the entire browser-local collection, including unknown/future sigil IDs, through `OrionProgress.reset()`. Cancellation changes nothing. It preserves language preferences and other browser data. Save failure leaves the collection unchanged and reports failure. Open game tabs refresh their reward display on the storage event; gameplay can earn rewards again afterward. This explicit full-collection reset is the exception to the normal rule that replay/restart preserves earned sigils.
