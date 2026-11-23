# Testing

> Names marked † are illustrative: they show how something would be named or used, but they don't exist in this repository. Code blocks are examples unless they name the file they come from.

## Running Tests

```bash
npm test             # Karma in watch mode: reruns on every save
npm run test:ci      # one run in headless Chrome, as CI does
npm run verify       # format check, lint, build, then tests
```

To focus on one suite while working, temporarily change `describe` to `fdescribe` (or `it` to `fit`). Lint fails on it, because a focused spec silently skips every other test, so change it back before committing.

## Stack

- **Jasmine** for specs and assertions, run by **Karma** through `@angular/build:karma`
- **Angular `TestBed`** to create components and inject services
- **`provideHttpClientTesting()` and `HttpTestingController`** for HTTP. Tests never reach the real network.
- **`fakeAsync` / `tick`** for timers and `interval`s
- **random-test-values** (`Random`) for randomized test data

## Test Driven Development

Every change follows the **Red/Green/Refactor** cycle. Implementation code may not be written without a verified failing test. Tests for behavior that already exists follow [Tests that pass on the first run](#tests-that-pass-on-the-first-run) instead.

### 1. Red: write a failing test

- Add the test to the component's or service's `.spec.ts`, following the [naming rules](#file-organization--naming).
- Use randomized data from `random-test-values` instead of constants, so hardcoded implementations (e.g. `return 0`) can't pass by accident.
- Run it. It **must fail**, for the reason you expect. If the method doesn't exist yet, add a stub that throws (`throw new Error('Not implemented')`) so it compiles, then confirm the failure.

### 2. Green: simplest implementation

- Write the minimum code needed to pass. Don't implement the full algorithm yet; if `add(0, 0)` expects `0`, return `0`. This forces the next test case.
- Run the test. It must pass.

### 3. Refactor: improve structure only

- **Refactoring must never change a test's `expect` statements.** If an expectation has to change, you're in a new Red phase.
- Use expressive names, remove magic strings, extract methods, and move repeated setup into `beforeEach` or a shared helper.

### 4. Iterate

Add the next test case to evolve the logic.

### Tests that pass on the first run

Some tests pass as soon as they're written, because the behavior they check already exists. These are **coverage tests**. They pin down existing behavior; they don't drive new code. They're allowed, under three rules:

1. **Prove the test can fail by breaking the code, never the test.** Temporarily break the behavior it covers, e.g. change the increment from `+ 1` to `+ 2` or request a different URL. Then run the test, watch it fail with a message that names the problem, and restore the code. Don't edit the assertion to see red: that only proves the assertion can fail, not that the test checks the behavior.
2. **Write no production code for it.** If a coverage test fails, it has found a bug, and you're in a normal Red phase.
3. **Say so.** In the commit or PR, note which tests passed on their first run and how each was shown to fail.

If a test passes immediately and no change to the code makes it fail, it isn't checking anything. Fix it or delete it.

## Assertions

- Assert on return values, component state, or rendered output whenever possible.
- Use spies (`toHaveBeenCalledWith`) only where nothing else is observable, e.g. a navigation or a call that leaves the app.
- For HTTP, assert the exact request: `httpTestingController.expectOne(expectedUrl)`, then `flush` a typed response. Call `httpTestingController.verify()` in `afterEach`, so an unexpected request fails the test.

## Test Style

- **Required:** `// Arrange`, `// Act`, `// Assert` comments delimiting each phase.
- **Forbidden:** other inline comments explaining what or why. Extract logic into well-named helper functions instead.
- **Forbidden:** committed `fdescribe`, `fit`, `xdescribe` or `xit`.
- Declare test values with `const`.

```typescript
it("should increase count by 1", () => {
  // Arrange
  const startingCount = Random.Number({ min: 0 });
  component.count = startingCount;

  // Act
  component.increment();

  // Assert
  expect(component.count).toBe(startingCount + 1);
});
```

## File Organization & Naming

- **One spec file per component or service,** next to it: `game.component.ts` → `game.component.spec.ts`.
- **One `describe` per class, and a nested `describe` per method or property under test.** Every scenario for that member is an `it` inside it, named `should <outcome>`, with `when <condition>` where the scenario depends on one. Together they read as a sentence: `GameComponent increment should increase count by 1`.
- Example (`src/app/game/game.component.spec.ts`):
  - `describe('GameComponent')` → `describe('increment')` → `it('should increase count by 1')`
  - `describe('startAutoclicker')` → `it('should increase count by 1 every 1000 ms')`
- Shared setup lives in the outer `beforeEach`. **Before adding a test, read the existing `beforeEach`** so you don't duplicate providers or setup.
- Provide only what the component under test needs (`provideHttpClient()`, `provideHttpClientTesting()`, `provideRouter(routes)`, …), the same way `app.config.ts` does for the app.
