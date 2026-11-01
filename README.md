# MELBCUPSIM · THE DETERMINISTIC CUP 🏇

MELBCUPSIM is a digital preservation and computational simulation project, not a gambling product. Its purpose is to make racing history playable, reproducible and educational.

**A playable, NES-inspired Melbourne Cup race simulator in pure web standards.** Static HTML, CSS, Canvas 2D and JavaScript ES modules. No build step, no external packages, no backend and no betting.

**[Play on GitHub Pages](https://qsolkcb.github.io/MELBCUPSIM/)** · [Source](https://github.com/QSOLKCB/MELBCUPSIM)

## Features

- **Historical result replay:** 2023 (Without A Fight), 2024 (Knight's Choice) and 2025 (Half Yours). Published finishing orders are fixed; animated sectional motion is synthetic, never claimed as observed.
- **What-if races:** seeded synthetic performance profiles coded in balanced ternary (-1/0/+1), Good/Soft/Heavy scenarios and runner-specific aggressive/balanced/conservative tactics. Results are entertainment, not predictions.
- **Arcade:** 8-bit pixel horses with jockey silks, top-down circuit, leaderboard, commentary, speed, pause, tick advance, seek, and a follow-horse selector.
- **Proof-friendly:** integer centimetre state, deterministic PRNG, fixed 420-tick horizon, shared-config links, downloadable JSON evidence and SHA-256 of the canonical complete race timeline. Identical settings + model version => identical results.

## Run locally

For ES modules, use any static web server from the repository root, e.g.:

```sh
python3 -m http.server 8000
# then open http://localhost:8000/
```

Or use the GitHub Pages URL above once deployed.

## Tests (optional)

```sh
node --test tests/*.test.mjs
```

Node is used only for built-in, dependency-free regression tests. **The game does not use Node.js.**

## Accuracy contract and sources

| Cup | Preserved result source |
|---|---|
| 2023 | [ABC News — complete finishing order, including DNF](https://www.abc.net.au/news/2023-11-07/melbourne-cup-2023-finishing-order-from-first-to-last/103073154) |
| 2024 | [ABC News — complete finishing order](https://www.abc.net.au/news/2024-11-05/melbourne-cup-2024-finishing-order-from-first-to-last/104557894) |
| 2025 | [ABC News — field and finishing order](https://www.abc.net.au/news/2025-11-01/melbourne-cup-2025-field-horses-form-guide-and-betting/105895400) |

Historical replay enforces **final positions** rather than reconstructing actual split times, routes, stewards' events, or pace. **2025 16th place is a dead heat; 2023 Right You Are did not finish.** Every intermediate position, tactical event, speed and track lane is a generated animation. What-if horse traits are generated synthetic values; they are **not** verified form, probabilities or betting advice.

The default repository [Apache-2.0 license](./LICENSE) is retained. This is an independent retro-style original game; no commercial horse-racing broadcast assets or logos are used.

See [invariants](./docs/INVARIANTS.md) and [roadmap](./docs/ROADMAP.md).

## Deploy

Merge the PR and run **Actions → Verify and publish static arcade → Run workflow**, or push to main. Configure repository Settings → Pages → **GitHub Actions** as the build/deploy source. The workflow verifies regressions before publishing.

### Receipt integrity

A downloaded receipt contains the input settings, source, fixed outcome and sample checkpoints plus a SHA-256 digest calculated over the *entire* deterministic race timeline. SHA-256 verifies equality, not independent timestamping. Publish the digest before a future race to obtain independently verifiable pre-event provenance.

---

Research/gameplay project by QSOL-IMC. Simulation is an entertainment and evidence-format experiment; not a predictor of race results.
