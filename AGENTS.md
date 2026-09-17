# Orion Hash — agent instructions

Read this repository’s PROJECT.md and the master project’s PROJECT.md/AGENTS.md when available. This folder is a separate Git repository nested as a submodule in orion-games.

- Work on the hash mission here; mission hub changes belong in the parent master repository.
- Preserve the treasure/mystery atmosphere, independent access, hidden progressive hints, and accessible keyboard/touch controls.
- The Echo Sigil requires three distinct accepted codes other than 1234. Do not award for duplicate inputs or the original code.
- Preserve the `echo` sigil ID and `orion-expedition-progress-v1` storage key/schema. Restart must not erase saved progress. Preserve unknown IDs and handle unavailable/corrupt storage gracefully.
- Keep `dist/progress.js` compatible with the master’s canonical helper.
- Use Traditional Chinese for Chinese content; preserve English technical terms where helpful.
- Keep static assets inside dist and relative URLs for assets. Link to https://teze3808.github.io/orion-games/ for the mission map.
- Test affected gameplay, reward, storage, and navigation paths. Never expose solution hints on initial gameplay screens.
- Commit and push requested game changes here, verify GitHub Pages deployment, then update the master’s submodule pointer.
- GitHub Pages at /orion-hash/ is the authorized host. Do not publish to legacy Sites or change visibility without a request.
- Never commit credentials, personal school information, or analytics. Preserve unrelated user edits.
