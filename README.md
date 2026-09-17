# Orion & the Treasure Gate

A small browser game for discovering hash collisions. Enter four digits to try opening an ancient treasure gate. A discreet ✧ rune opens progressive hints and a parent guide.

The deliberately weak teaching hash adds the digits and takes the result modulo 10. Codes with hash 0 open the gate. This is an educational game, not a real security system.

## Play

https://teze3808.github.io/orion-lock/

## Run locally

Serve `dist` with any static web server, for example:

```sh
python3 -m http.server 8765 --directory dist
```

Open http://localhost:8765/.

## Files

- `dist/index.html`: game interface and hidden teaching notes
- `dist/style.css`: responsive styling
- `dist/game.js`: game logic
- `dist/gate.png`: AI-generated temple artwork

GitHub Actions publishes `dist` to GitHub Pages on pushes to `main`.
