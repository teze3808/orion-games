# Science references and models

## Counterweight Vault (2026-09-22)

Learning objective: use load and distance from a pivot to predict a lever’s initial turning direction and find balanced designs.

Sources checked on 2026-09-22:
- [OpenStax Physics 9.3: Simple Machines](https://openstax.org/books/physics/pages/9-3-simple-machines): lever arms, fulcrum and unequal loads on a seesaw.
- [OpenStax College Physics 2e 9.2: The Second Condition for Equilibrium](https://openstax.org/books/college-physics-2e/pages/9-2-the-second-condition-for-equilibrium): balance of opposing torques.

For a horizontal rigid beam with downward loads, torque magnitude is force × distance from the pivot. Identical blocks, uniform gravity, and equal spacing let us cancel common mass, gravity and spacing factors and compare block count × position. Equal products yield zero net torque. The center support supplies the upward force.

Implementation uses a beam of negligible weight, a frictionless pivot, and loads fixed at marked positions. The displayed ±9° tilt is an explanatory direction indicator, not an integrated motion or physical stopping angle. The beam returns to a held horizontal position whenever the user changes a setting. The generated chamber is story artwork, not a scientific diagram. Glowing seals and the treasure reward are fictional.

Stage solutions: 2 blocks at distance 3; 2 blocks at distance 4; then any two distinct pairs from (2,6), (3,4), (4,3). A correct balanced prediction is required. Automated tests enumerate every selectable configuration against these expected solutions, along with incorrect predictions, duplicate designs, language changes, replay, reset, persistence and failed saves.
