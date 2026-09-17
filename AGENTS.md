# Orion Hash — agent instructions

Read this repository’s PROJECT.md and the master project’s PROJECT.md/AGENTS.md when available. This folder is a separate Git repository nested as a submodule in orion-games.

- Work on the hash mission here; mission hub changes belong in the parent master repository.
- Preserve the treasure/mystery atmosphere, independent access, hidden progressive hints, and accessible keyboard/touch controls.
- Award the Echo Sigil on any successful opening, including 1234. Award idempotently; never award on invalid or rejected inputs. Preserve collision counting as an optional learning challenge.
- Preserve the `echo` sigil ID and `orion-expedition-progress-v1` storage key/schema. Restart must not erase saved progress. Preserve unknown IDs and handle unavailable/corrupt storage gracefully.
- Keep `dist/progress.js` compatible with the master’s canonical helper.
- Use Traditional Chinese for Chinese content; preserve English technical terms where helpful.
- Keep static assets inside dist and relative URLs for assets. Link to https://teze3808.github.io/orion-games/ for the mission map.
- Test affected gameplay, reward, storage, and navigation paths. Never expose solution hints on initial gameplay screens.
- Commit and push requested game changes here, verify GitHub Pages deployment, then update the master’s submodule pointer.
- GitHub Pages at /orion-hash/ is the authorized host. Do not publish to legacy Sites or change visibility without a request.
- Never commit credentials, personal school information, or analytics. Preserve unrelated user edits.

## English and Traditional Chinese
All user-facing content must support English (`en`) and Traditional Chinese (`zh-Hant`), including mission stories, controls, status messages, rewards, progressive hints, parent explanations, accessibility labels, and page titles. Both pages use `dist/i18n.js`; keep the copies compatible. Persist the preference under `orion-expedition-language`, shared on the GitHub Pages origin. Browser language determines the first visit; stored preference takes precedence. Switching language must preserve the current puzzle, hint depth, input, and sigils. Every future mission must meet this requirement before becoming playable.

## Reset collection
The hub provides a bilingual “Reset all sigils / 重設所有符印” button with confirmation. It resets the entire browser-local collection, including unknown/future sigil IDs, through `OrionProgress.reset()`. Cancellation changes nothing. It preserves language preferences and other browser data. Save failure leaves the collection unchanged and reports failure. Open game tabs refresh their reward display on the storage event; gameplay can earn rewards again afterward. This explicit full-collection reset is the exception to the normal rule that replay/restart preserves earned sigils.

## Mission cards and new puzzles
Available mission cards are clickable across their entire area with keyboard link support; planned missions remain inactive. The hash game starts with target 0 and original 1234. Every Restart adventure generates a target hash different from the previous target and a matching four-digit original code. Acceptance, hidden hints, worked examples, and parent notes must use the current target. Relock retains the same puzzle for collision exploration; restarting preserves collected sigils and hides hints again.
