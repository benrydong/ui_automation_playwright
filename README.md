# ui_automation_playwright

## Overview

Automated UI testing project using [Playwright](https://playwright.dev/) for end-to-end testing of a hotel booking web application.

## Project Structure

- `tests/pages/`: Page Object Models (e.g., `homePage.js`, `reservationPage.js`)
- `tests/testcases/ui/`: UI test specs (e.g., `bookRoom.spec.js`, `homePageTests.spec.js`)
- `tests/fixtures/`: Test data in JSON format
- `utils/`: Utility functions
- `playwright.config.js`: Playwright configuration
- `playwright-report/`: Test reports and traces

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Installation

```sh
npm install
```

### Running Tests

You can use the following npm scripts defined in `package.json`:

| Script                  | Description                                 |
|-------------------------|---------------------------------------------|
| `npm run test:qa`       | Run all tests in QA environment             |
| `npm run test:stage`    | Run all tests in Staging environment        |
| `npm run test:prod`     | Run all tests in Production environment     |
| `npm run test:qa:negative` | Run negative tests in QA environment    |
| `npm run test:stage:sanity` | Run sanity tests in Staging environment |
| `npm run test:prod:smoke`  | Run smoke tests in Production environment|

Or use Playwright directly:

```sh
npx playwright test
```

#### Retry Logic: CI vs Local

- **CI (Continuous Integration):**
  - Tests are automatically retried on failure (see `CI=true` in scripts). This helps reduce flakiness in automated pipelines.
- **Local:**
  - By default, tests are not retried when running locally. You can enable retries by setting the `CI` environment variable or configuring retries in `playwright.config.js`.

### Viewing Reports

After running tests, open the HTML report:

```sh
npx playwright show-report
```

## Writing Tests

- Use the Page Object Model in `tests/pages/` for maintainable test code.
- Example usage: see `tests/testcases/ui/bookRoom.spec.js`.

## Useful Commands

- Run all tests: `npx playwright test`
- Run a specific test: `npx playwright test tests/testcases/ui/bookRoom.spec.js`
- Debug mode: `npx playwright test --debug`

## License

MIT