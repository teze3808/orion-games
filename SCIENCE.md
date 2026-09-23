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
