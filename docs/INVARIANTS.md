# MELBCUPSIM invariants — v0.1.0

- Browser runtime: static HTML, CSS, JS ES modules and Canvas 2D. No analytics, requests, server, packages, dependencies or gambling interface.
- Deterministic simulation: all gameplay values derive from a versioned model and user-supplied seed, through a local xorshift32 PRNG and fixed integer-centimetre positions. Browser animation time controls *display only*, never the timeline.
- Replay mode is a **result reconstruction**, not video, GPS telemetry, official sectionals or a scientific recreation of the race. Its final places exactly match the preserved 2023–2025 results, including shared 16th in 2025 and 2023 DNF. Intermediate movement is invented.
- What-if mode is fictional. Its per-horse ternary attributes (-1, 0, +1) are seeded synthetic values and must never be represented as historical equine performance data. Weather in this mode is a user-defined scenario.
- Explicit provenance: result data link to original published source URLs in the repo and the UI. The 2025 dead heat is recorded as equal place 16 for two runners.
- No promises of predictive skill, payouts or usable betting forecasts. No real-money wagering.
- Each export contains the deterministic settings, model version, input archive URL, resulting order, five positional checkpoints and SHA-256 of the canonical complete timeline where Web Crypto is available. Importers can independently recompute the hash; the receipt does not purport to be externally timestamped.
- Track visual is an approximate stylized oval and does not claim to match the Flemington geometry or 3200m path precisely.
- All race positions are monotonic, integer centimetres, bounded by 0..320000. Timelines are 421 states, ticks 0..420. Date, random clock time and real-time networking are not model inputs.
- Changes to physics, PRNG, source archive, canonical serialization or rounding require an engine version bump and test fixtures to preserve compatibility.
