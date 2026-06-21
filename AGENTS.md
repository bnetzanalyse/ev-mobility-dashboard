# Agent Guide

Use this file as the quick-start map for future coding agents working in this
repo.

## Start Here

- Read `README.md` for the product overview and common commands.
- Read `docs/agent-guide.md` before changing UI, theme, data paths, deployment,
  or generated data.
- Read `docs/operators-ui.md` before touching the Operators surface.
- Read `docs/deployment.md` before changing Vite config, asset paths, GitHub
  Actions, or anything under `public/`.

## Non-Negotiables

- Do not resurrect deleted design handoff/devlog files. The old
  `claude-designed/` and `devlog/` artifacts were intentionally removed.
- Keep the Operators UI restrained: hairline dividers, neutral tokens, sparse
  emphasis, no card-heavy dashboard redesign.
- Use semantic tokens from `src/index.css` for color. Avoid raw one-off color
  utilities in components.
- Keep light mode close to the original Claude mockup and dark mode quiet,
  charcoal, and operational.
- Preserve GitHub Pages support. Data and asset paths must work under
  `/ev-mobility-dashboard/`.
- Run `npm test`, `npm run lint`, and `npm run build` before committing code.

## Current Live Site

`https://ta-nwar.github.io/ev-mobility-dashboard/`

