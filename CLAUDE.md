# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

This is a personal homepage built with Angular 21 and Angular Material, following standard Angular conventions (standalone components, services, `app.routes.ts`, `app.config.ts`), built with strict TDD. The project rules live in the docs imported below; they are binding, not suggestions.

## Commands

```bash
npm ci                  # install; fails unless Node 24 / npm 11 (engine-strict)
npm start               # dev server on http://localhost:4200
npm run verify          # format check, lint, build, tests: what CI runs
npm run build           # production build; any warning fails it
npm run lint            # angular-eslint; warnings fail it
npm run format          # Prettier, rewriting files
npm run test:ci         # Karma once, headless Chrome
```

## Working Rules for Claude

- **TDD is mandatory.** Write a failing test, run it and confirm it fails, then write the minimum code to pass, then refactor without touching `expect`s. Never write implementation code first. A test that passes immediately because the behavior already exists is a coverage test: prove it can fail by temporarily breaking the code (never the assertion), and report it (see [TESTING.md](TESTING.md#tests-that-pass-on-the-first-run)).
- **Small steps.** After every file change or test run, stop and evaluate the next step. Don't generate large amounts of code at once or anticipate future requirements.
- **Follow the standard Angular structure.** New components go in their own folder via `ng generate component`; routes go only in `app.routes.ts`, providers only in `app.config.ts`, HTTP in services; use `inject()`.
- **Specs** use `describe(Class) > describe(member) > it('should …')` with `// Arrange // Act // Assert`. Before adding a test, read the existing `beforeEach` so you don't duplicate setup.
- **Never weaken enforcement to get green.** If lint, the build or a test fails, fix the code. Don't add `eslint-disable`, turn off a rule, raise a budget, relax `tsconfig.json`, or allow a CommonJS dependency unless the user agrees.
- **Run `npm run verify`** before declaring a change done.
- **Use Conventional Commits** for commit messages and PR titles (see [CONTRIBUTING.md](CONTRIBUTING.md#commit-messages)).

## Reference

`src/app/game/game.component.spec.ts` is the closest to the test conventions: nested `describe` per member, randomized data, `fakeAsync` for timers. New specs also add the `// Arrange // Act // Assert` markers it lacks.

## Known Gaps

Most existing specs only check `should create`, and none use the Arrange/Act/Assert markers yet. They predate these docs. Bring a spec up to the conventions when you change the code it covers. Don't use the existing ones as a template.

## Project Docs

@README.md
@CONTRIBUTING.md
@TESTING.md
@REVIEW.md
