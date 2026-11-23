# Contributing

> Names marked † are illustrative: they show how something would be named or used, but they don't exist in this repository. Code blocks are examples unless they name the file they come from.

This app follows standard Angular conventions. Keep its structure predictable, so anyone who knows Angular can find their way around. See [README.md](README.md) for the layout and commands, [TESTING.md](TESTING.md) for the required TDD workflow, and [REVIEW.md](REVIEW.md) for what reviewers check.

## Project Structure

- **Standalone components, one folder each.** `ng generate component <name>` creates `<name>/<name>.component.{ts,html,scss,spec.ts}`. Keep that shape: template and styles in their own files, the spec next to the component.
- **Types a feature owns live with it**, e.g. `projects/models/project.model.ts`. Name the file after the type, with a `.model.ts` suffix.
- **Services** are `@Injectable({ providedIn: 'root' })` classes named `<Name>Service` in `<name>.service.ts`. Put HTTP calls and other shared logic in a service, not in a component.
- **Routes** are declared only in `app.routes.ts`.
- **Application-wide providers** are registered only in `app.config.ts`.
- **Dependency injection uses `inject()`**, not constructor parameters (`@angular-eslint/prefer-inject`).
- **Type what crosses a boundary.** HTTP responses get a declared interface (`this._httpClient.get<GithubFileContent>(url)`), and event handlers take the real event type (`Event`, `MatSlideToggleChange`). `any` is a lint error.
- **Selectors** use the `app` prefix: `app-kebab-case` for components and `appCamelCase` for directives.

## Naming

- Classes, interfaces and types are PascalCase, with no `I` prefix (`Project`, not `IProject`).
- Private fields start with an underscore (`private _router = inject(Router)`); private methods and public members don't (`private loadTheme()`, `selectProject()`). Fields only the class uses are `private`. `@typescript-eslint/naming-convention` enforces the underscores.
- Choose descriptive names over short ones. Names say what something does or represents (`selectProject`, `mobileView`), not how it's built (`doWork`, `list2`, `tmp`). Avoid abbreviations and generic names like `Helper`, `Manager`, or `Data`.

## Clean Code

Code is read far more often than it is written, so optimize for the reader.

### Readability

- **Code should read like a sentence.** A caller should be able to follow the flow from method and variable names alone, e.g. `if (this.isBaseStorePage) { this.showMenu(); }`†.
- **Keep functions small.** Each function does one thing at one level of abstraction. When a function needs a section break, or you're tempted to explain a block, extract it into a well-named method.
- **Keep templates declarative.** A template expression that needs more than a property, a call, or a simple comparison belongs in the component as a well-named property or method.

### Comments

Comments should almost never be needed. If code needs a comment to explain _what_ it does, rename or extract until it doesn't.

- **Allowed: comments that explain _why_.** Use them for code that looks wrong or surprising but has to be that way, e.g. a workaround for a library bug, or an ordering a library requires. Link to the issue or docs where possible.
- **Allowed: documentation on public-facing APIs**, such as JSDoc on something other projects consume.
- **Forbidden:** comments that restate the code, commented-out code, and change-log comments. Git keeps the history.

Tests are stricter: only the `// Arrange`, `// Act`, `// Assert` markers are allowed (see [TESTING.md](TESTING.md#test-style)).

## Build Configuration

Every check runs in `npm run verify` and fails on warnings as well as errors. Each tool owns one concern:

| Concern                                  | Configured in                                                       | Enforced by                 |
| ---------------------------------------- | ------------------------------------------------------------------- | --------------------------- |
| Node and npm versions                    | `engines` in `package.json`, `.npmrc`, `.nvmrc`                     | `npm install` / `npm ci`    |
| Formatting                               | `.prettierrc.json`, `.editorconfig`, `.gitattributes`               | `npm run format:check`      |
| Lint rules                               | `eslint.config.js`, `lint.options.maxWarnings: 0` in `angular.json` | `npm run lint`              |
| Type and template strictness             | `tsconfig.json`                                                     | `npm run build`, `npm test` |
| Build warnings (budgets, CommonJS, Sass) | `angular.json`, `scripts/build-without-warnings.mjs`                | `npm run build`             |

- **Node.** `engine-strict` makes `npm install` fail on any Node major other than 24 or any npm major other than 11. Bump `engines` and `.nvmrc` together.
- **Line endings.** `.gitattributes` stores and checks out every text file with LF, on Windows too, so Prettier's `endOfLine` check gives the same result on every machine.
- **TypeScript** runs in `strict` mode with `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`, `noImplicitOverride` and `noPropertyAccessFromIndexSignature`. **Angular** runs with `strictTemplates`, and `extendedDiagnostics.defaultCategory` is `error`, so diagnostics such as a needless `??` (NG8102) fail the build.
- **Build warnings are errors.** The Angular CLI has no switch for this, so `npm run build` runs `ng build` through `scripts/build-without-warnings.mjs`, which fails when the output contains `[WARNING]`.
- **Known exceptions, each with its reason:**
  - `allowedCommonJsDependencies: ["hammerjs"]`: HammerJS ships only as UMD, and the swipe gestures depend on it.
  - The initial-bundle warning budget is 1.25 MB, just above the current size, so growth is noticed. The error budget stays at 2 MB.

**Never weaken enforcement to get a green build.** Don't disable an ESLint rule, add an `eslint-disable` comment, raise a budget, relax a `tsconfig` flag, or add to `allowedCommonJsDependencies` without agreement and a recorded _why_ (in a comment where the file format allows it, otherwise in the list above). [REVIEW.md](REVIEW.md#enforced-automatically) lists every rule and what enforces it.

## Development Workflow

1. **Understand the requirement** before writing anything.
2. **Plan the first failing test.**
3. **Run the Red/Green/Refactor cycle** described in [TESTING.md](TESTING.md), repeating until the feature is complete. Writing implementation code without a verified failing test is not allowed.
4. **Work in small steps.** Don't generate large amounts of code at once, and don't anticipate future requirements. Solve only the current failing test.
5. **Check conformity.** New components and services land in their own folder with the standard file names; routes go in `app.routes.ts` and providers in `app.config.ts`.
6. **Run `npm run verify`** before pushing.

## Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/) for every commit and PR title:

```text
<type>(<optional scope>): <short summary in the imperative>
```

- Common types: `feat`, `fix`, `refactor`, `test`, `docs`, `style`, `build`, `ci`, `chore`.
- Mark breaking changes with `!` after the type (e.g. `feat!: Remove the store page`†) or a `BREAKING CHANGE:` footer.
- Examples: `feat: Add photography gallery`†, `fix(projects): Show an error when a README fails to load`†, `docs: Add clean code rules`†.
