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


## Lantern Circuit — 2026-09-27
Objective: infer whether each lamp has an uninterrupted path between the two battery terminals. The first panel puts two switches in one loop; later panels use separate lamp branches, then a common supply switch. Every available switch configuration is checked against an independent graph-traversal oracle in `tests/circuits.cjs`.

Sources checked 2026-09-27: [U.S. Energy Information Administration, Batteries, circuits and transformers](https://www.eia.gov/energyexplained/electricity/batteries-circuits-and-transformers.php), section “Electricity travels in circuits”, supports the complete path and open/closed switch explanation. [BBC Bitesize Physics podcast transcript](https://bam.files.bbci.co.uk/bam/live/content/zn263qt/transcript) distinguishes one series loop from parallel branches. No quantitative brightness claims are made.

Simplifications: ideal battery, ideal wires and switches, identical functional lamps, steady on/off results only. No resistance values, battery depletion, heat, current magnitude or transients are simulated. Gold indicates a complete path through a lit lamp; it is not a visualization of moving charge. Battery polarity is shown but no direction of current is animated. Every current path includes a lamp; users cannot create a short circuit. The generated lantern gallery is atmosphere, not a wiring guide. Star-chart magic and sigils are fictional. This is entirely virtual and requires no real electrical equipment.

## The Bridge of Truth — 2026-09-28
Objective: infer AND, inclusive OR and unary NOT from complete input/output evidence. Source checked 2026-09-28: [Microsoft MakeCode — Boolean](https://makecode.microbit.org/blocks/logic/boolean). AND is true only when both inputs are true; OR is true when either or both are true; NOT reverses its single input. The model maps gem present/absent to true/false and permission to cross to the output. NOT uses only socket A; B is absent and cannot affect its result. Each guardian requires all four two-input combinations, or both single-input combinations, before a rule choice can earn a seal. Repeated tests do not count as new evidence. All three correctly identified rules earn the Truth Sigil.

Six permutations change guardian order without changing logical meanings. This is a Boolean reasoning model, not a simulation of structural engineering, electricity or physical gem properties. The owls, bridge movement and sigil are story magic. Wrong rules permit unlimited correction; no prediction gate or time limit. Unit tests compare all truth table rows to an independent expected table, cover all six orders in both languages, and test persistence/reset/save failure. Existing future sigils are preserved.

## The Cloudkeeper’s Vault — 2026-09-29
Sources checked: [USGS Condensation](https://www.usgs.gov/water-science-school/science/condensation-and-water-cycle), [USGS Evaporation](https://www.usgs.gov/water-science-school/science/evaporation-and-water-cycle), and [USGS water-cycle diagram](https://water.usgs.gov/edu/watercycle-kids-beg.html). The mission teaches water’s solid, liquid and gaseous forms; melting, freezing, evaporation and condensation. Evaporation does not require boiling; water vapour is invisible. Clouds contain droplets or ice crystals. The same water remains water after its form changes.

This is an abstract full-transition model. Warm & wait advances ice → liquid → vapour; cool & wait reverses this route. Each action includes enough energy transfer and time for the selected complete change, not a fixed temperature increment. No temperatures, pressure, volume, mixtures of phases, phase equilibrium, heat capacities or rates are calculated. No matter escapes the virtual system. Direct solid/gas transitions are explicitly outside the model. Dot pictures symbolize invisible vapour, not visible droplets. The chamber and treasure are fantasy, not instructions for heating sealed vessels. No real experiment is requested.

Six permutations define three start/target pairs around a cycle. Each journey requires all four adjacent phase changes across its three trials. Reward requires reaching and storing all three target forms; a wrong form cannot earn a seal. Tests independently check every warming/cooling transition, all six journey solutions, rewards, storage failures and reset synchronization.

## Crystal Express / 水晶列車站 — 2026-09-30
Primary objective: arrange a finite list by a stated numerical order, using comparisons and pairwise swaps. Equal values are allowed side by side. Ascending is nondecreasing, descending is nonincreasing. The validator checks every adjacent pair; a pairwise swap preserves every original item.
Source reviewed: [CS Unplugged: Sorting Algorithms](https://classic.csunplugged.org/activities/sorting-algorithms/), accessed 2026-09-30. Supports ordering lists and comparing sorting methods. Gameplay and explanatory wording are original; no source artwork copied.
Scope: freely chosen swaps, not a prescribed selection/bubble sorting algorithm. The displayed log counts performed exchanges only; it does not count mental comparisons, computational complexity or minimum moves. Equal-labelled carriages are interchangeable for the reward; stable sorting is not taught. Six variants change numbers, retaining the task structures. The crystal train is fiction, not a railway mechanics simulation.
