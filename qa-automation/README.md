# QA Automation Framework - Sully AI

A minimal, production-ready QA automation framework for Web using Playwright + JavaScript with Allure reporting and trace/video capture.

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Allure command line tool

## Installation

```bash
npm ci
```

## Environment Setup

Copy `.env.example` to `.env` and update with your credentials:

```bash
BASE_URL=https://app.sully.ai
EMAIL=your-email@example.com
PASSWORD=your-password
```

## Running Tests

### Complete Test Workflow (Recommended)
```bash
# Run complete test suite with all reports
npm run test:run

# Or use shell script directly
./run-tests.sh
```

### Individual Commands
```bash
# Run tests only
npm test

# Run tests with UI
npm run test:ui

# Clean all reports
npm run clean

# Generate and open reports only
npm run reports
```

## Test Execution & Reporting

### Complete Test Workflow
```bash
# 1. Clean old reports
rm -rf reports/allure-results reports/allure-report reports/test-output

# 2. Run tests (automatically uses config/playwright.config.js)
npx playwright test

# 3. Verify results files were created
ls -la reports/allure-results | head

# 4. Generate and open Allure report
allure generate reports/allure-results --clean -o reports/allure-report
allure open reports/allure-report
```

### Quick Commands
```bash
# Run tests only
npx playwright test

# Generate Allure report
allure generate reports/allure-results --clean -o reports/allure-report

# Open Allure report
allure open reports/allure-report

# Clean all reports
rm -rf reports/*

# Create report directories
mkdir -p reports/test-output reports/videos reports/screenshots reports/traces
```

## Test Structure

- **`tests/patient-creation.spec.js`** - Login and create new patient test

## Report Structure

After running tests, the following reports are generated in the `reports/` folder:

- **`reports/allure-results/`** - Raw Allure data (JSON files)
- **`reports/allure-report/`** - Generated HTML Allure report
- **`reports/test-output/`** - Playwright test results (JSON, screenshots, videos, traces)
- **`reports/screenshots/`** - Test screenshots (if configured)
- **`reports/videos/`** - Test recordings (if configured)  
- **`reports/traces/`** - Playwright traces (if configured)

## Architecture

### Utils (Independent Classes)
- **`actionUtils.js`** - Click, type, navigate actions with reporting
- **`waitUtils.js`** - Wait operations with reporting  
- **`commonUtils.js`** - Verification and common operations with reporting
- **`loginUtils.js`** - High-level login operations with reporting
- **`testHelpers.js`** - Common test methods (login, random names, etc.)
- **`reporting.js`** - Allure step wrapper and failure handling

### Pages (Independent Classes)
- **`LoginPage`** - Login page interactions using utils
- **`DashboardPage`** - Dashboard page interactions using utils

### Locators
- **`auth.locators.js`** - Simple selector strings for login elements
- **`dashboard.locators.js`** - Simple selector strings for dashboard elements

## Key Features

- **No Inheritance** - Each class is independent and focused
- **Built-in Reporting** - Every action automatically logged to Allure
- **Centralized Locators** - Single source of truth for selectors
- **Environment Variables** - All configuration via .env file
- **Modular Utils** - Reusable utility classes for different purposes
- **Common Test Methods** - Shared login and helper methods

## Code Quality Rules

1. **No Inheritance** - Use composition instead of inheritance
2. **Independent Methods** - Each action is a separate method
3. **Environment Variables** - Never hardcode URLs or credentials
4. **Built-in Reporting** - All utils automatically log steps to Allure
5. **Separation of Concerns** - Actions, waits, and verifications in separate utils
6. **Reusable Helpers** - Common methods in testHelpers.js

## Example Usage

```javascript
// Create test helpers
const testHelpers = new TestHelpers(page);

// Login using common method
await testHelpers.login();

// Generate random patient name
const patientName = testHelpers.generateRandomPatientName();

// Use page objects
const dashboardPage = new DashboardPage(page);
await dashboardPage.createNewPatient(patientName);
```

## Troubleshooting

### Common Issues
1. **Environment Variables** - Ensure .env file contains correct credentials
2. **Selector Updates** - After UI changes, update locators in `src/locators/*.js`
3. **Timeout Issues** - Adjust wait timeouts in utils if needed

### Debug Mode
Run tests with UI to debug interactively:
```bash
npm run test:ui
```

## Contributing

1. Keep classes independent and focused
2. Use descriptive Allure step names
3. Prefer `data-testid` over other selector strategies
4. Add TODO comments for selectors that need updating after DOM inspection
5. All utils must include built-in Allure reporting
6. Common test methods go in testHelpers.js
