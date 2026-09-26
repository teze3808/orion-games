# Science references and models

## Counterweight Vault (2026-09-22)

Learning objective: use load and distance from a pivot to predict a lever’s initial turning direction and find balanced designs.

Sources checked on 2026-09-22:
- [OpenStax Physics 9.3: Simple Machines](https://openstax.org/books/physics/pages/9-3-simple-machines): lever arms, fulcrum and unequal loads on a seesaw.
- [OpenStax College Physics 2e 9.2: The Second Condition for Equilibrium](https://openstax.org/books/college-physics-2e/pages/9-2-the-second-condition-for-equilibrium): balance of opposing torques.

For a horizontal rigid beam with downward loads, torque magnitude is force × distance from the pivot. Identical blocks, uniform gravity, and equal spacing let us cancel common mass, gravity and spacing factors and compare block count × position. Equal products yield zero net torque. The center support supplies the upward force.

Implementation uses a beam of negligible weight, a frictionless pivot, and loads fixed at marked positions. The displayed ±9° tilt is an explanatory direction indicator, not an integrated motion or physical stopping angle. The beam returns to a held horizontal position whenever the user changes a setting. The generated chamber is story artwork, not a scientific diagram. Glowing seals and the treasure reward are fictional.

Stage solutions: 2 blocks at distance 3; 2 blocks at distance 4; then any two distinct pairs from (2,6), (3,4), (4,3). A correct balanced prediction is required. Automated tests enumerate every selectable configuration against these expected solutions, along with incorrect predictions, duplicate designs, language changes, replay, reset, persistence and failed saves.

## Crystal Alchemist’s Workshop (2026-09-23)

Sources consulted on 2026-09-23:
- [Penn State MRSEC: Mystery Mix](https://www.mrsec.psu.edu/education-outreach/public/museum-kits/materials-matter/mystery-mix): magnetic iron and nonmagnetic silica sand.
- [Royal Society of Chemistry: Separating sand and salt by filtering and evaporation](https://edu.rsc.org/experiments/separating-sand-and-salt-by-filtering-and-evaporation/386.article): educational source for separating insoluble sand from salt solution, then recovering salt by evaporation (search-indexed text; direct page returned 405).
- [RSC filtration teaching infographic](https://edu.rsc.org/infographics/how-to-teach-filtration-evaporation-and-crystallisation-at-11-14/4022681.article): filter retains sand; dissolved solute remains with liquid, and evaporation can recover solute.

The model tracks ingredients across working vessel, magnet tray, filter and air. It conserves each ingredient within a trial. Quartz sand is insoluble, iron magnetic, and salt initially dissolved in the final sample. Filters do not catch dissolved salt. Evaporation moves water to air as vapour, leaving solids; it does not destroy water. This idealized model ignores losses, solubility limits, impurities, apparatus handling and elapsed evaporation time. A dry mixture cannot be separated by this liquid-filtration tool. Fresh sample resets discard the trial, not matter within a trial. No physical experiments, flames, chemicals or drinking are requested. Filtered water is not necessarily potable. The cabinet glow and alchemist story are fantasy. Ingredient labels are schematic, not visible grains of dissolved salt.

Automated tests cover all stage goals, incorrect ordering and recovery, bilingual hints, save failure/retry, idempotent rewards, reload and collection reset.

## Starlight Tower (2026-09-24)
Source checked: [CS Unplugged — Binary numbers](https://www.csunplugged.org/en/topics/binary-numbers/), University of Canterbury Computer Science Education Research Group. Binary uses two states/digits; computers encode different kinds of information using bits. Our original lamp puzzles apply binary place values 8, 4, 2, 1.

The model represents only non-negative integers 0–15 with four bits, most significant bit on the left. Each lit lamp contributes its position value; unlit lamps contribute zero. All 16 patterns have distinct values. Leading zeroes retain the four-lamp display without changing the number. The game does not model signed integers, fractions, electrical circuits or transmission timing. Lamps and a rising star path are narrative devices, not a claim about computer hardware. Worked examples and these simplifications are available in bilingual completion notes.

Reward criteria: 0101 sent for 5; 1010 sent for 10; answer 13 for the fixed received pattern 1101. Tests independently enumerate all 16 values and cover retries, invalid input, fixed received lamps, language changes, reward persistence, idempotency, reset and storage failure.

## Sleeping Seed Vault — biology (2026-09-25)
Learning objective: distinguish germination from healthy seedling development, and isolate the tested variable in a comparison. This is an idealized bean model, not a universal model for all seeds.

Sources checked 2026-09-25:
- [University of Illinois Extension, Great Plant Escape: Germination](https://web.extension.illinois.edu/gpe/case3/c3facts3.html): water, oxygen and suitable temperature; species-dependent light requirements; dry conditions and oxygen limitations from excessive watering.
- [Science Centre Singapore, Ready Steady Science: Life Cycle of a Plant](https://www.science.edu.sg/docs/default-source/scs-documents/resources/ready-steady-science/ready-steady-science---life-cycle-of-a-plant.pdf?sfvrsn=d616df59_4): bean germination and light/dark comparisons. Scope its bean example to this model; do not generalize absence of light requirements to all seeds.
- [Arizona State University, Watching Seeds Germinate](https://askabiologist.asu.edu/content/pocket-seed-viewer): bean/pea observation using moist rather than dripping media and matched light/dark comparisons.
- [RHS, How to help a poorly houseplant](https://www.rhs.org.uk/plants/types/houseplants/how-to-help-a-poorly-houseplant): insufficient light can produce pale, weak and spindly growth.

Model: viable matching beans; same starting stage, soil, suitable warmth, ventilation and time. Moist seeds sprout in either light condition; persistent dryness or flooding prevents successful growth in the modeled trial. Moist seedlings become green with suitable light and pale/elongated without it. This categorical model does not calculate growth rate, survival probability, exact water volume or a real elapsed number of days. The pictures show states, not precise colour/size predictions for each environment. The exposed seed is a visual symbol, not planting-depth advice. Waterlogging is treated as sustained, not a brief soak. Germination uses seed reserves; leafy growth needs light for photosynthesis. Other species have different dormancy and light requirements. Virtual growing time is compressed; cabinet glow and sigil are fantasy.

Fair-test criterion: final A is a moist lit seed. Only moist dark B is accepted, with the prediction that both sprout. Identical light is rejected even when both sprout, and dry/flooded B is not accepted as a controlled test of light. Stage 1 locks lighting; stage 2 locks moisture. No real chemical handling or living specimens are required.

## The Mist Keeper — ordered search (2026-09-26)
Source: [NIST Dictionary of Algorithms and Data Structures: Binary search](https://xlinux.nist.gov/dads/HTML/binarySearch.html), checked 2026-09-26. Binary search repeatedly checks a midpoint of ordered data and keeps the appropriate half. The game uses contiguous integer cave numbers and one fixed target per shore. Feedback always compares numbers, not geographic directions; “higher” means a larger number. A failed guess removes itself plus the impossible side. Selecting either middle of an even interval is valid. Floor-midpoint search finds every target among 8, 16 and 32 caves within 4, 5 and 6 queries respectively; exhaustive tests verify this bound. Any evidence-consistent search can earn the reward; efficiency is optional discovery, not a penalty. Boats, cave art and clearing mist provide story context; the ordered button chart is the abstract computational model. No claim is made that actual caves form an ordered search structure.
