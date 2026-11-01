# MELBCUPSIM · THE DETERMINISTIC CUP 🏇

MELBCUPSIM is a digital preservation and computational simulation project, not a gambling product. Its purpose is to make racing history playable, reproducible and educational.

**A playable, NES-inspired Melbourne Cup race simulator in pure web standards.** Static HTML, CSS, Canvas 2D and JavaScript ES modules. No build step, no external packages, no backend and no betting.

**[Play on GitHub Pages](https://qsolkcb.github.io/MELBCUPSIM/)** · [Source](https://github.com/QSOLKCB/MELBCUPSIM)

## Features

- **Historical preservation:** 11 races, spanning **1861–2025**. The 1988 Empire Rose and 2005 Makybe Diva Cups include documented full-field finishing orders. The six other historic additions are explicitly marked **TOP 3**: they depict only verified podium finishers, not entire fields. The 2023–25 replays remain intact. All intermediate motion is synthetic.
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

## Historic archive extension — v0.2.0

| Year | Finish positions represented | Archive scope | Evidence |
|---|---|---|---|
| 1861 | Archer, Mormon, Prince | Top three of 17 | [Australian Heritage Database](https://www.agriculture.gov.au/sites/default/files/documents/flemington.pdf) |
| 1930 | Phar Lap, Second Wind, Shadow King | Top three of 15 | [Racing and Sports](https://www.racingandsports.com.au/news/racing/melbourne-cup/0001-01-01/previous-melbourne-cup-winners/670826) |
| 1983 | Kiwi, Noble Comment, Mr Jazz | Top three of 24 | [Victoria Racing Club](https://www.vrc.com.au/racing/group-1-honour-board/) |
| 1987 | Kensei, Empire Rose, Rosedale | Top three of 21 | [Races.com.au](https://www.races.com.au/melbourne-cup/melbourne-cup-history/past-winners/1981-to-1990-melbourne-cup/) |
| 1988 | Empire Rose, Natski, Na Botto… | Full 22 | [Published full field](https://en.wikipedia.org/wiki/1988_Melbourne_Cup) + [VRC corroboration](https://www.vrc.com.au/racing/melbourne-cup-winners-honour-roll/1981-2000/) |
| 1989 | Tawrrific, Super Impose, Kudz | Top three of 23 | [Races.com.au](https://www.races.com.au/melbourne-cup/melbourne-cup-history/past-winners/1981-to-1990-melbourne-cup/) |
| 1990 | Kingston Rule, The Phantom, Mr Brooker | Top three of 24 | [Racing and Sports](https://www.racingandsports.com.au/news/racing/melbourne-cup/0001-01-01/previous-melbourne-cup-winners/670826) |
| 2005 | Makybe Diva, On A Jeune, Xcellent… | Full 24 | [Furlong Files](https://www.furlongfiles.com/melbourne-cup/results/?cup=2005) |

**Scope guarantee:** A TOP 3 exhibit shows three verified finishers from a historically larger field. It is *not* a three-runner historical race. No unsourced names or finishing places are invented; what-if mode is disabled for partial fields. Historical movement remains a deterministic visual reconstruction, not observed sectional or tracking data.

**1988 caveat:** The complete 22-place order comes from a secondary published field table. Empire Rose's victory and Natski's runner-up placing are independently corroborated by VRC; the entire order has not yet been reconciled against a primary race-book or Cavanough's complete historical results. [State Library Victoria](https://guides.slv.vic.gov.au/melbournecup/fields) identifies those archival resources. Older Cups also used period-specific distances and track layouts; the app's 3200-metre diagram is a universal schematic display, not an exact restoration.

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
