# Beyond the Wisdom Heart / 智慧之心以外

Second expedition roadmap · approved planning request: 2026-10-08.

The Wisdom Heart reveals ten paths beyond the ancient city: a submerged harbour, a moon observatory, a buried archive and living gardens. Each keeper has a separate mystery. Orion may explore any released mission in any order; no earlier game or sigil is required.

**Status: All ten second-expedition missions are playable through Winter Lantern (2026-10-18).** Twenty-nine games are available. Future daily releases should extend the story with distinct ideas across subjects; the completed roadmap is not a stopping point. Use RELEASES.md to prevent duplicate releases.

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

## 2. The Nectar Courier / 花蜜信使 — released 2026-10-10
**Playable:** [Open mission](https://orion-lost-city.onrender.com/games/orion-pollination/). Three flower deliveries, six saved journeys, Blossom Sigil.
**Story:** The orchard keeper’s seed chest is silent. Follow a small pollinator between flowers to restore the orchard’s message. / 果園守護者的種子寶箱沉寂了。跟隨小小傳粉者，把花朵之間的訊息重新連起來。
**Play:** Guide a pictured pollinator to collect pollen from anthers and transfer it to a receptive stigma on a compatible flower. Show the pollen as visible grains; tap-to-select is an alternative to dragging.
**Discovery and reward:** Complete three compatible pollen transfers with different flower arrangements to earn Blossom; finish by identifying which transfer reached the stigma.
**New questions:** Shuffle flower positions and compatible species choices.
**Model boundary:** Pollination is pollen transfer, not fertilization itself. Do not instantly depict a fruit as guaranteed, or imply that every plant needs an insect or a different individual plant. Select and document a suitable example species at implementation.

## 3. The Mosaic Treasury / 碎片寶藏殿 — released 2026-10-11
**Playable:** [Open mission](https://orion-lost-city.onrender.com/games/orion-fractions/). Tap/keyboard tiles with selectable equal partitions; three seals, two distinct final representations, six journeys.
**Story:** Three broken mosaics hide a golden door. Restore the glowing area even when the pieces change size. / 三幅破碎拼畫藏着金色大門。碎片大小改變了，也要拼回相同的發光部分。
**Play:** Choose an equal partition and tap or keyboard-toggle tiles. Equal-sized target and working panels show areas together. Changing the partition starts a blank panel while retaining recorded matches.
**Discovery and reward:** Match three targets using equivalent fractions, including one target represented in two different ways, to earn Unity.
**New questions:** Change target fractions and available partitions while retaining enough pieces.
**Model boundary:** Compare fractions of equal-sized wholes; avoid accidental unequal-area pieces or implying that bigger denominators always mean bigger fractions.

## 4. The Crystal Spring / 晶泉的秘密

Released 2026-10-12: `games/orion-solutions/`.
**Story:** A spring keeper left a cloudy crystal bowl and three sealed messages. Discover how much crystal can dissolve. / 泉水守護者留下混濁晶碗和三封密信。找出水中能溶解多少晶石。
**Play:** Add measured portions of a virtual soluble solid to water, stir to equilibrium and watch dissolved particles and remaining solid. Compare water amounts at the same temperature.
**Discovery and reward:** Produce an unsaturated solution, demonstrate solid remaining at saturation, then dissolve a specified remaining amount by adding sufficient water; all three earn Clarity.
**New questions:** Vary water amounts and solid quantities within a documented, consistent model.
**Model boundary:** Dissolved matter does not disappear. Keep temperature fixed, distinguish dissolving rate from equilibrium capacity, and do not teach a universal temperature rule. Choose one substance with sourced solubility or explicitly label fictional model units. Entirely virtual; no tasting or mixing instructions.

## 5. The Whispering Archive / 低語檔案館

Released 2026-10-13: `games/orion-compression/`.
**Story:** A narrow message tube leads into a sealed library. Pack repeated rune patterns into shorter messages without losing a single rune. / 細小傳訊管通往封閉圖書館。把重複符文縮成短訊，同時保留每一個符文。
**Play:** Group adjacent identical symbols into a symbol-and-count token; expand tokens with a tap to compare the restored message with the original.
**Discovery and reward:** Encode one message exactly, decode another, then choose whether raw or encoded form is smaller for a third under the displayed storage rule. Earn Memory only when all reconstructions and the comparison are correct.
**New questions:** Generate varied runs, including alternating symbols that compress poorly.
**Model boundary:** Define token cost explicitly. Run-length encoding is lossless, but does not always save space; do not confuse compression with encryption.

## 6. The Moonkeeper’s Observatory / 月相守望台

Released 2026-10-14: `games/orion-moonphases/`. Eight saved journeys, three phase matches, drag and keyboard controls.
**Story:** The observatory’s lunar lock has forgotten the Moon’s changing face. Rebuild its three missing sky views. / 天文台的月亮鎖忘記了月亮的變化。重建三幅遺失的天空景象。
**Play:** Drag the Moon around an overhead Sun–Earth–Moon model; a separate Earth-view window shows the illuminated fraction visible to the observer.
**Discovery and reward:** Match three target phases, including distinguishing waxing from waning through direction of motion, to earn Orbit.
**New questions:** Vary target phases and starting orbital positions.
**Model boundary:** Ordinary phases arise from viewing geometry, not Earth’s shadow. State the viewing convention, keep sunlight direction consistent and label distances/sizes as not to scale. Avoid accidentally simulating an eclipse at every new/full Moon.

## 7. The Sky Crane / 雲端吊塔

Released 2026-10-15: `games/orion-pulleys/`. Six saved journeys; three lifts with fixed/movable pulley comparison.
**Story:** A treasure lift hangs below a tower in the clouds. Build a pulley system the keeper can pull. / 寶藏升降台懸在雲端高塔下。組合滑輪，讓守護者能把寶藏拉起。
**Play:** Choose from clearly pictured fixed and movable pulley arrangements; drag a rope handle. Compare pull force and rope distance with the load’s rise.
**Discovery and reward:** Lift three loads to their marks under stated force limits and demonstrate the longer pull needed by a force-saving arrangement to earn Uplift.
**New questions:** Change load, lift height and allowable force, with validated feasible configurations.
**Model boundary:** Use ideal massless ropes/pulleys without friction. Count supporting rope segments correctly; a fixed pulley changes direction but does not reduce ideal force. Less force is not free energy.

## 8. The Fossil Staircase / 化石階梯 — released 2026-10-16
**Playable:** [Open mission](https://orion-lost-city.onrender.com/games/orion-strata/). Three four-layer reconstructions plus event positions; six saved journeys.

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

## 10. The Winter Lantern / 寒冬之燈 — released 2026-10-18
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

## Continuing expedition — 2026-10-19
The Mirror Garden / 鏡影花園 is released at `games/orion-reflection/`: mathematics, reflection symmetry. Stable mission `reflection`, sigil `twinlight` / 雙光. Thirty games now playable. New independent subject ideas continue after the ten-mission roadmap.

## Continuing expedition — 2026-10-20
The Star Post / 星光郵局 is playable at `games/orion-packets/`. Computing: ordered reassembly, duplicate data and retransmission. Mission `packets`, sigil `delivery` / 傳訊. Thirty-one games available.


2026-10-21: Continuing expedition adds Atom Treasury, a playable chemistry atom-conservation puzzle. Continue varied daily missions beyond the original roadmap.


### 2026-10-23 — Moonwing Archive (playable)
Biology: use observable features and a dichotomous identification key. Three visitors, eight fictional beetles, six journeys; Insight / 明察 Sigil. Continues the subject mix beyond the completed roadmap. Next releases remain open to distinct science, engineering, mathematics and computing ideas.


### 2026-10-24 — Garden of Measures (playable)
Mathematics: distinguish area from perimeter with three rectangle challenges. Six saved journeys; Measure / 量度 Sigil. Continues the expanding subject mix.


### 2026-10-25 — Magnet Ferry (playable)
Physics: magnetic poles, attraction/repulsion and evidence-based identification. Six journeys; Compass / 磁向 Sigil. Continues the expanding subject mix.


## Star Map Vault — 2026-10-26
Mission/variant `coordinates` (six saved journeys), sigil `wayfinder` / Wayfinder / 尋路. Locate two reversed ordered pairs and then a displacement destination. All three exact points required; sliders accept whole numbers 0–5. X increases right, Y increases up; points sit on crossings and the origin is bottom-left. The gold diamond marks the final starting point, not the answer. Preserve accessible sliders, bilingual hidden/dismissible hints and completion discovery, shared replay/reset, unknown IDs and honest failed-save retry. This flat puzzle map is not an astronomical coordinate chart.


## Cloud Cargo Vault — 2026-10-27
Mission/variant `stack` (six saved journeys), sigil `skyhold` / Skyhold / 雲藏. Plan loading so three batches unload in the requested order. Push adds at the top; undo and unloading remove only the top. Require a full load before delivery and all three exact output sequences before reward. Prevent duplicate/missing crates and loading/undo during unloading. Retry resets only the current batch; replay and full reset choose a different saved journey. Preserve bilingual hidden clues/discovery and shared reward/save contracts. The load-all then unload-all restriction belongs to this puzzle; general stacks allow interleaving operations. Crates represent data, not a physical safety model.


## Colour Spring — 2026-10-28
Mission/variant `dilution` (six saved journeys), sigil `tint` / Tint / 彩泉. Match a reference concentration, dilute with a fixed dissolved amount to half concentration, then prepare a larger batch at the same concentration. Require all three seals. Compare exact amount/volume ratios; accept every valid larger mixture. Dilution cannot reduce the starting volume or change solute amount. Preserve bilingual hidden clues, shared discovery, saved non-repeating replay/reset, unknown sigils and honest save retry. All solute is dissolved and evenly mixed in this ideal model; volume means final solution volume, not water alone. Shading is illustrative, not a measured colour scale.


## Echo Cavern — 2026-10-29
Mission/variant `echo` (six saved journeys), sigil `resonance` / Resonance / 鳴響. Restore three wall distances by matching recorded echo return times. Slider steps represent 17 metres; bounds are 17–170 m. Use the ideal fixed air speed 340 m/s and round-trip time 2d/v. Require all three correct chambers before reward. Moving the slider clears the old reading; retry keeps the same target. Preserve bilingual hidden clues/discovery, non-repeating saved replay/reset, unknown sigils and honest save retry. The silent pulse animation is illustrative and slowed, not a stopwatch. One ideal reflection only; real caves and temperature-dependent sound speed are outside the model. Lake artwork does not imply underwater sonar.


## Butterfly Conservatory — 2026-10-30
Mission/variant `butterfly` (six saved journeys), sigil `renewal` / Renewal / 蛻變. Restore three illustrated life-cycle mosaics, starting from different requested stages. Each picture is used once; order follows egg → caterpillar → chrysalis → adult, with adult → egg explicitly marked as a new generation. Undo and clear support exploration; require all three mosaics before reward. Preserve shared bilingual hints, discovery, idempotent rewards, save retry, non-repeating replay and collection reset. Generic drawings omit larval instars, durations and species differences; no specimen handling is required.


## Ramp Treasury — 2026-10-31
Mission/variant `ramp` (six saved journeys), sigil `ascent` / Ascent / 登高. Design three shortest whole-metre ramps within pulling-force limits. Sloping length is 2–10 m, height 1 m and weight 120 N; ideal steady force is 120/L. Require all three designs. Longer-than-needed ramps give informative retry feedback. Preserve shared bilingual clues/discovery, saved non-repeating replay/reset, unknown sigils and honest save recovery. The model omits friction and acceleration; N is force, not mass. Decorative mountain artwork is not a safety plan.


## Gem Caravans — 2026-11-01
Mission/variant `caravan` (six saved journeys), sigil `sharing` / Sharing / 均分. Split two whole-number gem inventories into the greatest number of identical packs with no leftovers. Slider accepts 1–12 packs. Every pack has the same red count and the same blue count; red and blue counts need not equal each other. Require all three inventories. Display each pack and colour-specific remainders live; distinguish leftover failures from valid but non-maximal splits. Preserve bilingual clues/discovery, saved non-repeating replay/reset, unknown sigils and honest save recovery. Box capacity, physical gem size and transport costs are outside this arithmetic model.


## Twin Lantern Vault — 2026-11-02
Mission/variant `xor` (six saved journeys), sigil `switchlight` / Switchlight / 轉光. Toggle a four-bit mask to transform an incoming lantern pattern into the target using bitwise XOR. Require all three exact patterns before reward. Each toggle changes one corresponding bit; toggling twice restores it. Preserve numeric on/off labels, keyboard/touch switches, bilingual hidden dismissible hints and completion discovery, saved non-repeating replay/reset, unknown sigils and honest save recovery. Lanterns model data bits, not physical light mixing or a wiring circuit; this puzzle is not secure encryption.


## Inkkeeper’s Archive — 2026-11-03
Mission/variant `ink` (six saved journeys), sigil `spectrum` / Spectrum / 色譜. Identify the ingredients of three fictional inks by comparing finished paper chromatograms with three known dye standards. Ruby, Amber and Sapphire have distinct spots at 2, 5 and 8 cm from the origin; the solvent front is 10 cm. All three exact ingredient sets required. Keep labelled distances, accessible symbols, reversible dye selection, bilingual hidden clues/discovery, shared replay/reset, unknown sigils and honest save retry. Same paper/solvent throughout. Real substances may overlap; a matching spot alone does not prove identity. This is a virtual comparison, not a real-time separation or chemical recipe.


## Dawn Observatory — 2026-11-04
Mission/variant `dawn` (six saved journeys), sigil `daybreak` / Daybreak / 破曉. Rotate Earth with a slider or forward-turn button to match three observations of sunrise, noon, sunset or midnight. View from above the North Pole, Sun on the right, anticlockwise rotation, observer on the equator. Require all three observations. Preserve bilingual hidden clues and completion discovery, saved non-repeating replay/reset, unknown sigils and honest save recovery. Fixed sunlight, no tilt, atmosphere, seasons or orbital motion; not to scale. Positions represent local solar phases, not time-zone clock readings.


## The Walled Garden / 圍牆花園 — 2026-11-05
Six saved journeys of three rectangular planting beds. A fixed number of unit fence pieces encloses a changing number of unit squares. Both orientations of a correct rectangle earn credit. The third bed uses the largest area for its fence length. Award Moonflower / 月華 only after all three beds. Model assumes whole positive side lengths, negligible wall thickness and one seed per unit square.


## The Lantern Ferry / 燈火渡輪 — 2026-11-06
Mission/variant queue (six saved journeys); unique Boarding / 登船 sigil, boarding. Join at the back and board from the front. Arrivals and departures may interleave, and boarded travellers cannot join again. Three exact ticket sequences earn the sigil. Undo removes the latest waiting arrival as an explicitly documented puzzle-editing aid, not a queue operation. One FIFO line, no priority system or physical capacity simulation. Preserve bilingual hints, discovery overlay, saved replay/reset, unknown sigils and save-failure recovery.


## The Springkeeper’s Gate / 彈簧守護者之門 — 2026-11-07
Mission/variant `springs` (six saved journeys); unique `elastic` / Elastic / 彈力 sigil. Adjust pulling force from 0 to 12 N to align three spring tips with target extensions. Stages use stiffnesses 1, 2 and 3 N/cm; extension equals force divided by stiffness. Extension means extra length, not total spring length. Model shows static equilibrium within the proportional range, with no oscillation, friction or permanent deformation. Require three successful alignments before awarding. Preserve bilingual hidden clues and discovery, saved non-repeating replay/reset, unknown sigils and honest save recovery.


## The Prime Gem Archive / 質數寶石檔案館 — 2026-11-08
Mission/variant `primes` (six saved journeys); unique `indivisible` / Primeheart / 質心 sigil. Classify three gem counts using rectangular arrays. A composite answer requires an observed filled rectangle with both dimensions greater than one; a prime answer requires testing every offered row count (2 through n−1). The number 1 is neither; 2 is prime and has no intermediate row counts. Preserve exact gem counts and visibly empty dashed spaces, bilingual hidden clues/discovery, saved non-repeating replay/reset, unknown sigils and save recovery. Every tray must be classified correctly before reward. This is positive whole-number factor exploration, not a fast primality algorithm; decorative gem sizes do not affect counts.


## The Pea Keeper’s Conservatory / 豌豆守護者的溫室 — 2026-11-09
Mission/variant `inheritance` (six saved journeys), sigil `heritage` / Heritage / 傳承. Restore three 2×2 offspring charts by combining the top and side parent alleles. Tap or keyboard-cycle each box through blank, PP, Pp and pp; require all four exact combinations in all three crosses. P is dominant purple and p recessive white in this simplified single-gene pea flower model. Every box represents one equally likely gamete combination, not one guaranteed plant in a batch of four. Preserve bilingual hints/discovery, focus after cell cycling, saved non-repeating replay/reset, unknown sigils and honest save retry. No real breeding or handling of specimens is required.


## The Indicator Lantern Lab / 指示燈籠實驗室 — 2026-11-10
Mission/variant `ph` (six saved journeys), sigil `indicator` / Indicator / 辨色. Test three fictional aqueous samples per lantern and select the acidic, neutral, then alkaline sample. Require all three readings and the correct selection in each of three stages. At 25 °C, below pH 7 is acidic, 7 neutral and above 7 alkaline. Readings start hidden; bottles have identical untested appearance. Category colours are symbolic, not a real indicator chart. Preserve bilingual progressive clues/discovery, keyboard focus, non-repeating replay/reset, unknown sigils and honest save recovery. No real chemical handling, mixing or drinking is required.

## The Harbour Bell Tower / 海港雙鐘樓 — 2026-11-11
Both bells chime at minute zero. Move the clock through whole minutes and find the first later shared chime in each of three locks. Only the smallest positive common multiple opens a lock. Six saved journeys use stable mission ID `bells` and award `unison` / 齊鳴 once. The latest five positive chimes for each bell remain visible in the log.
