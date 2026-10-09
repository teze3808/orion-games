# Beyond the Wisdom Heart / 智慧之心以外

Second expedition roadmap · approved planning request: 2026-10-08.

The Wisdom Heart reveals ten paths beyond the ancient city: a submerged harbour, a moon observatory, a buried archive and living gardens. Each keeper has a separate mystery. Orion may explore any released mission in any order; no earlier game or sigil is required.

**Status: The Sunken Harbour is playable (2026-10-09); the other nine missions are planned.** Twenty games are now available. This is the next daily-release queue, not a promise that untested games will ship on fixed dates. Resume an unfinished daily release before starting another; use RELEASES.md to prevent duplicate releases. Keep these IDs stable when implementing them.

## Mission queue

| Order | Mission / 任務 | Primary learning idea | Reserved mission ID | Reserved sigil ID / name |
|---|---|---|---|---|
| 1 | The Sunken Harbour / 沉沒港灣 | Physics: average density and floating | buoyancy | afloat / 浮航 / Afloat |
| 2 | The Nectar Courier / 花蜜信使 | Biology: pollination between flowers | pollination | blossom / 花信 / Blossom |
| 3 | The Mosaic Treasury / 碎片寶藏殿 | Maths: equivalent fractions | fractions | unity / 合一 / Unity |
| 4 | The Crystal Spring / 晶泉的秘密 | Chemistry: dissolving and saturation | solutions | clarity / 澄明 / Clarity |
| 5 | The Whispering Archive / 低語檔案館 | Computing: lossless run-length encoding | compression | memory / 記憶 / Memory |
| 6 | The Moonkeeper’s Observatory / 月相守望台 | Astronomy: Moon phases | moonphases | orbit / 環月 / Orbit |
| 7 | The Sky Crane / 雲端吊塔 | Engineering: pulley force–distance trade-off | pulleys | uplift / 升力 / Uplift |
| 8 | The Fossil Staircase / 化石階梯 | Earth science: relative order of rock layers | strata | deeptime / 遠古 / Deep Time |
| 9 | The Chance Compass / 機遇羅盤 | Maths: probability versus individual outcomes | probability | possibility / 可能 / Possibility |
| 10 | The Winter Lantern / 寒冬之燈 | Science: insulation and heat transfer | insulation | warmth / 暖光 / Warmth |

## 1. The Sunken Harbour / 沉沒港灣 — released 2026-10-09
**Playable:** [Open mission](https://orion-lost-city.onrender.com/games/orion-buoyancy/). Three trials: change mass to float; record sinking and floating at equal mass with different volumes; find the smallest integer volume that floats. Six saved question sets.

**Story:** A treasure ferry waits beneath a ruined harbour arch. Help it carry crystal cargo without sinking. / 廢墟港口的拱門下停着寶藏渡船。幫它運送晶石，避免沉沒。
**Play:** Slide cargo onto a pictured sealed cargo capsule; adjust its mass or outer volume using large handles. Lower it into a tank and watch it float or sink beside a live mass/volume comparison.
**Discovery and reward:** Complete three cargo/volume challenges, including comparing two objects of equal mass but different volume, to earn Afloat. Goals must require comparing density, not memorizing an object's name.
**New questions:** Vary mass, volume and cargo targets; validate that each is solvable.
**Model boundary:** Use sealed objects in one fixed fluid, with average density controlling the result. Do not imply that all heavy objects sink, or model flooding/shape stability as if density alone explains them.

## 2. The Nectar Courier / 花蜜信使
**Story:** The orchard keeper’s seed chest is silent. Follow a small pollinator between flowers to restore the orchard’s message. / 果園守護者的種子寶箱沉寂了。跟隨小小傳粉者，把花朵之間的訊息重新連起來。
**Play:** Guide a pictured pollinator to collect pollen from anthers and transfer it to a receptive stigma on a compatible flower. Show the pollen as visible grains; tap-to-select is an alternative to dragging.
**Discovery and reward:** Complete three compatible pollen transfers with different flower arrangements to earn Blossom; finish by identifying which transfer reached the stigma.
**New questions:** Shuffle flower positions and compatible species choices.
**Model boundary:** Pollination is pollen transfer, not fertilization itself. Do not instantly depict a fruit as guaranteed, or imply that every plant needs an insect or a different individual plant. Select and document a suitable example species at implementation.

## 3. The Mosaic Treasury / 碎片寶藏殿
**Story:** Three broken mosaics hide a golden door. Restore the glowing area even when the pieces change size. / 三幅破碎拼畫藏着金色大門。碎片大小改變了，也要拼回相同的發光部分。
**Play:** Drag equal-area fraction tiles into matching whole panels. Split or join pieces; the target and filled area appear side by side.
**Discovery and reward:** Match three targets using equivalent fractions, including one target represented in two different ways, to earn Unity.
**New questions:** Change target fractions and available partitions while retaining enough pieces.
**Model boundary:** Compare fractions of equal-sized wholes; avoid accidental unequal-area pieces or implying that bigger denominators always mean bigger fractions.

## 4. The Crystal Spring / 晶泉的秘密
**Story:** A spring keeper left a cloudy crystal bowl and three sealed messages. Discover how much crystal can dissolve. / 泉水守護者留下混濁晶碗和三封密信。找出水中能溶解多少晶石。
**Play:** Add measured portions of a virtual soluble solid to water, stir to equilibrium and watch dissolved particles and remaining solid. Compare water amounts at the same temperature.
**Discovery and reward:** Produce an unsaturated solution, demonstrate solid remaining at saturation, then dissolve a specified remaining amount by adding sufficient water; all three earn Clarity.
**New questions:** Vary water amounts and solid quantities within a documented, consistent model.
**Model boundary:** Dissolved matter does not disappear. Keep temperature fixed, distinguish dissolving rate from equilibrium capacity, and do not teach a universal temperature rule. Choose one substance with sourced solubility or explicitly label fictional model units. Entirely virtual; no tasting or mixing instructions.

## 5. The Whispering Archive / 低語檔案館
**Story:** A narrow message tube leads into a sealed library. Pack repeated rune patterns into shorter messages without losing a single rune. / 細小傳訊管通往封閉圖書館。把重複符文縮成短訊，同時保留每一個符文。
**Play:** Group adjacent identical symbols into a symbol-and-count token; expand tokens with a tap to compare the restored message with the original.
**Discovery and reward:** Encode one message exactly, decode another, then choose whether raw or encoded form is smaller for a third under the displayed storage rule. Earn Memory only when all reconstructions and the comparison are correct.
**New questions:** Generate varied runs, including alternating symbols that compress poorly.
**Model boundary:** Define token cost explicitly. Run-length encoding is lossless, but does not always save space; do not confuse compression with encryption.

## 6. The Moonkeeper’s Observatory / 月相守望台
**Story:** The observatory’s lunar lock has forgotten the Moon’s changing face. Rebuild its three missing sky views. / 天文台的月亮鎖忘記了月亮的變化。重建三幅遺失的天空景象。
**Play:** Drag the Moon around an overhead Sun–Earth–Moon model; a separate Earth-view window shows the illuminated fraction visible to the observer.
**Discovery and reward:** Match three target phases, including distinguishing waxing from waning through direction of motion, to earn Orbit.
**New questions:** Vary target phases and starting orbital positions.
**Model boundary:** Ordinary phases arise from viewing geometry, not Earth’s shadow. State the viewing convention, keep sunlight direction consistent and label distances/sizes as not to scale. Avoid accidentally simulating an eclipse at every new/full Moon.

## 7. The Sky Crane / 雲端吊塔
**Story:** A treasure lift hangs below a tower in the clouds. Build a pulley system the keeper can pull. / 寶藏升降台懸在雲端高塔下。組合滑輪，讓守護者能把寶藏拉起。
**Play:** Choose from clearly pictured fixed and movable pulley arrangements; drag a rope handle. Compare pull force and rope distance with the load’s rise.
**Discovery and reward:** Lift three loads to their marks under stated force limits and demonstrate the longer pull needed by a force-saving arrangement to earn Uplift.
**New questions:** Change load, lift height and allowable force, with validated feasible configurations.
**Model boundary:** Use ideal massless ropes/pulleys without friction. Count supporting rope segments correctly; a fixed pulley changes direction but does not reduce ideal force. Less force is not free energy.

## 8. The Fossil Staircase / 化石階梯
**Story:** A buried staircase crosses the city’s stone memory. Reassemble its layers to find where an ancient cache belongs. / 埋藏的階梯穿過古城的石頭記憶。重組岩層，找出古老寶匣所在的一層。
**Play:** Slide illustrated layer cards into a vertical column using deposition clues. Compare older/younger relationships and position a treasure marker between two events.
**Discovery and reward:** Correctly reconstruct three undisturbed layer sequences and their relative event order to earn Deep Time.
**New questions:** Shuffle layer cards and treasure-event clues; ensure a unique intended order or accept every order supported by the clues.
**Model boundary:** Apply superposition only to explicitly undisturbed sedimentary sequences. This establishes relative order, not numerical ages; fossils are clues, not exact clocks. Faults, overturning and intrusions are outside the initial model.

## 9. The Chance Compass / 機遇羅盤
**Story:** The navigator’s compass chooses a passage by drawing a coloured gem. Investigate which passage it is most likely to choose. / 航海家的羅盤抽取彩色寶石來選通道。調查它最可能指向哪一條路。
**Play:** Place coloured gems in a transparent virtual bag; compare theoretical chances, then run animated repeated draws with replacement and see a simple tally.
**Discovery and reward:** Build three bags satisfying probability targets, including one equal-chance design, and correctly compare chances to earn Possibility. Random draw outcomes themselves never determine whether the player wins.
**New questions:** Change colour totals and feasible target ratios.
**Model boundary:** Every gem is equally likely, draws replace the gem, and trials are independent. More likely does not mean certain; short runs need not match exact proportions. No wagers or gambling rewards.

## 10. The Winter Lantern / 寒冬之燈
**Story:** A warm crystal lantern must survive a snowy journey to the city gate. Choose a jacket that slows its cooling. / 溫暖晶燈要穿過雪地到達城門。選擇外套，讓它慢一點冷卻。
**Play:** Wrap identical virtual containers in different insulation, hold other conditions constant, and compare animated temperature curves over the same simulated duration.
**Discovery and reward:** Complete three fair comparisons, identify the better insulator from evidence, and meet a warmth target under the documented model to earn Warmth.
**New questions:** Vary starting temperature, thickness choices and time targets while keeping each comparison fair and solvable.
**Model boundary:** Insulation slows heat transfer; it does not generate heat. Use a clearly simplified cooling model with fixed ambient conditions, and do not present invented material constants as measured facts. No real hot-water experiment is required.

## Shared implementation requirements
- Keep the suggested subject order for variety, but a documented implementation blocker may justify choosing another planned mission.
- Each game is a separate 5–10 minute adventure with a clear first action, pictured controls, forgiving retry and one meaningful sigil criterion.
- Use original realistic ImageGen scenery, one top artwork/progress display, experiment-left/results-right tablet layout, and phone stacking. Preserve 44px touch targets and keyboard/tap alternatives for dragging.
- Use shared English/Traditional Chinese, progress and discovery helpers. Provide three progressively revealed rune hints and an understandable animated completion explanation.
- Every full replay and collection reset selects a different solvable question set; replay preserves earned sigils. Do not change existing storage keys or IDs.
- Research authoritative sources and record them in SCIENCE.md before implementing scientific behavior. The model boundaries above are design constraints, not substitutes for source verification.
- Keep this roadmap in documentation until a mission is complete and checked. Add its hub card, href, variant bank and discovery lesson only when playable. Do not create empty routes or awardable placeholders.
- Update this file’s status, PROJECT.md and RELEASES.md with each actual release; publish through the existing Render service only.
