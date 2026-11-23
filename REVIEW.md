# Code Review Checklist

> Names marked † are illustrative: they show how something would be named or used, but they don't exist in this repository. Code blocks are examples unless they name the file they come from.

Use this checklist when reviewing changes. Each item traces back to a rule in [CONTRIBUTING.md](CONTRIBUTING.md) or [TESTING.md](TESTING.md).

## Enforced Automatically

These rules fail `npm run verify`, so a green run covers them. Don't spend review time re-checking them. Instead, make sure nobody weakened the rule that enforces them (e.g. an `eslint-disable` comment, a rule turned off in `eslint.config.js`, a raised budget, a relaxed `tsconfig.json` flag, or a new `allowedCommonJsDependencies` entry).

| Rule                                                                                                | Enforced by                                                                                     |
| --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Node 24 and npm 11                                                                                  | `engines` + `engine-strict` in `.npmrc`                                                         |
| Formatting, single quotes in TS/JS, LF line endings                                                 | Prettier (`format:check`), `.gitattributes`                                                     |
| Braces on every block, `===` in code and templates, `const` where possible, no unused variables     | ESLint (`curly`, `eqeqeq`, `@angular-eslint/template/eqeqeq`, `prefer-const`, `no-unused-vars`) |
| No `any`                                                                                            | ESLint (`@typescript-eslint/no-explicit-any`)                                                   |
| `inject()` instead of constructor injection; standalone components                                  | ESLint (`@angular-eslint/prefer-inject`, `prefer-standalone`)                                   |
| `_camelCase` private fields; no underscore on private methods or public members                     | ESLint (`@typescript-eslint/naming-convention`)                                                 |
| `app-` component and `app` directive selectors                                                      | ESLint (`@angular-eslint/component-selector`, `directive-selector`)                             |
| No committed `fdescribe`, `fit`, `xdescribe` or `xit`                                               | ESLint (`no-restricted-globals` in `*.spec.ts`)                                                 |
| Template accessibility (alt text, labels, keyboard events, …)                                       | ESLint (`angular.configs.templateAccessibility`)                                                |
| Lint warnings count as failures                                                                     | `maxWarnings: 0` in `angular.json`                                                              |
| Strict types and templates, no unused locals or parameters, extended template diagnostics as errors | `tsconfig.json`                                                                                 |
| No build warnings (bundle budgets, CommonJS modules, Sass deprecations, …)                          | `npm run build` (`scripts/build-without-warnings.mjs`)                                          |
| No high-severity advisories in the dependencies that ship to the browser                            | `npm run audit:prod` (`npm audit --omit=dev --audit-level=high`)                                |

## Structure & Conventions

- [ ] New components are standalone, in their own folder with `.ts`, `.html`, `.scss` and `.spec.ts`.
- [ ] Routes are added in `app.routes.ts` and application-wide providers in `app.config.ts`.
- [ ] HTTP calls and shared logic are in a service, not in a component.
- [ ] HTTP responses and other boundary data have declared types.

## Clean Code

- [ ] Functions are small and names are descriptive; code reads without explanation.
- [ ] Templates stay declarative; anything beyond a simple expression is a named property or method.
- [ ] Comments only explain _why_, or document public-facing APIs; no commented-out code.
- [ ] The change solves the current requirement only, with no speculative code.

## Tests

- [ ] Every behavior change has a test that was written first and seen to fail.
- [ ] Tests that passed on their first run are called out, along with how each was shown to fail by temporarily breaking the code (see [TESTING.md](TESTING.md#tests-that-pass-on-the-first-run)).
- [ ] Assertions check return values, state or rendered output; spies are used only where nothing else is observable.
- [ ] HTTP tests expect the exact URL and call `httpTestingController.verify()`.
- [ ] Test data is randomized with `random-test-values`, not hardcoded.
- [ ] Tests have `// Arrange`, `// Act`, `// Assert` comments and no other explanatory comments.
- [ ] Specs follow `describe(Class) > describe(member) > it('should …')`, with shared setup in `beforeEach` rather than duplicated.
- [ ] No `fdescribe`, `fit`, `xdescribe` or `xit`.
- [ ] Refactor-only changes leave existing `expect` statements untouched.

## Build

- [ ] `npm run verify` passes.
- [ ] Any exception to the build rules is agreed and its _why_ is recorded (see [CONTRIBUTING.md](CONTRIBUTING.md#build-configuration)).
- [ ] The commit messages and PR title are Conventional Commits.
