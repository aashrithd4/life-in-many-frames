# A Life in Many Frames

Sai Ashrith Gavini's cinematic, responsive React + Vite portfolio.

## Development

```sh
npm ci
npm run dev
npm run build
npm run preview
```

## Editing

Update `src/content.js` for chapter content, verified achievements, LinkedIn URL, and a public contact email. Empty contact fields remain unlinked. Do not add confidential work or unverified claims. The hero artwork is based on the supplied portrait and approved visual reference.

## Deployment

Public repository: `aashrithd4/life-in-many-frames`. Vite base: `/life-in-many-frames/`.
Select Settings → Pages → Source → GitHub Actions. Each push to `main` builds and deploys with `.github/workflows/deploy.yml`. The workflow uses `npm ci` and the committed lockfile.

Accessibility includes semantic sections, keyboard focus, skip navigation, expanded menu state, image descriptions, and reduced motion. All navigation is on-page, so no route fallback is needed.
