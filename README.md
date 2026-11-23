# Homepage

My personal homepage, built with Angular 21 and Angular Material, deployed to GitHub Pages at [fztgreen.dev](https://fztgreen.dev).

## Getting Started

Prerequisites: Node.js 24 and npm 11. `package.json` declares them in `engines`, and `.npmrc` sets `engine-strict`, so `npm install` fails on any other version. `.nvmrc` lets `nvm use` (and CI) pick the same major.

```bash
npm ci              # install exactly what package-lock.json says
npm start           # dev server on http://localhost:4200, reloads on change
npm run verify      # everything CI runs: format check, lint, build, tests
```

## Commands

| Command                | What it does                                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `npm start`            | `ng serve` with the development configuration                                                                      |
| `npm run build`        | Production `ng build`; **fails on any build warning** (see [CONTRIBUTING.md](CONTRIBUTING.md#build-configuration)) |
| `npm test`             | Karma in watch mode, in Chrome                                                                                     |
| `npm run test:ci`      | Karma once, in headless Chrome                                                                                     |
| `npm run lint`         | angular-eslint over `src/**/*.ts` and `src/**/*.html`; warnings fail too                                           |
| `npm run format`       | Prettier, rewriting files                                                                                          |
| `npm run format:check` | Prettier, failing on unformatted files                                                                             |
| `npm run verify`       | `format:check`, `lint`, `build` and `test:ci`, in that order                                                       |

## Continuous Integration

[`.github/workflows/build.yml`](.github/workflows/build.yml) runs on every pull request, on every push to `main`, and weekly. It installs with `npm ci` on the Node version from `.nvmrc`, then runs the same steps as `npm run verify`, followed by `npm audit --omit=dev --audit-level=high` over the dependencies that ship to the browser.

- **Make the `verify` job a required status check** in branch protection for `main`, so a red build can't be merged.
- The weekly run catches newly published security advisories before they fail an unrelated pull request.

## Release

Run `./deploy.ps1` to deploy to GitHub Pages. It calls `ng deploy`, which builds through the Angular builder directly rather than `npm run build`, so run `npm run verify` (or wait for CI on `main`) first.

## Project Layout

The app follows the standard Angular CLI structure: standalone components, one folder per page or widget, services provided in root, and routes and providers in one place each.

```text
homepage/
├── .github/workflows/build.yml  # CI: format, lint, build, test, audit
├── .nvmrc, .npmrc               # Node 24 pin, enforced by engine-strict
├── .editorconfig                # Editor basics: UTF-8, LF, 2 spaces
├── .prettierrc.json             # Formatting, checked in CI
├── eslint.config.js             # Lint rules, checked in CI
├── scripts/
│   └── build-without-warnings.mjs  # ng build that fails on warnings
└── src/
    ├── main.ts                  # Bootstraps AppComponent with appConfig
    ├── styles.scss, _themes.scss, _variables.scss
    └── app/
        ├── app.component.*      # Root shell: router outlet and theme toggle
        ├── app.config.ts        # Application-wide providers
        ├── app.routes.ts        # Every route
        ├── github.service.ts    # Reads project READMEs from the GitHub API
        ├── assets/              # Static files, served at /assets
        ├── projects/            # One folder per component: .ts, .html, .scss, .spec.ts
        │   └── models/          # Types used by that feature
        └── …
```

## Project Docs

- [CONTRIBUTING.md](CONTRIBUTING.md): structure, clean code, build configuration, workflow, commit messages
- [TESTING.md](TESTING.md): TDD protocol and test conventions
- [REVIEW.md](REVIEW.md): code review checklist
- [CLAUDE.md](CLAUDE.md) and [AGENTS.md](AGENTS.md): instructions for AI coding agents
