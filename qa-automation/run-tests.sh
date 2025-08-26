#!/bin/bash

# QA Automation Test Runner
# This script runs tests and generates all reports (Allure, Playwright, Video)

echo "Starting QA Automation Test Suite..."

# 1. Clean old reports
echo "Cleaning old reports..."
rm -rf reports/allure-results reports/allure-report reports/test-output reports/videos reports/screenshots reports/traces

# Create necessary directories
echo "Creating report directories..."
mkdir -p reports/test-output reports/videos reports/screenshots reports/traces

# 2. Run tests (automatically uses config/playwright.config.js)
echo "Running tests..."
npx playwright test

# 3. Verify results files were created
echo "Checking test results..."
if [ -d "reports/allure-results" ] && [ "$(ls -A reports/allure-results)" ]; then
    echo "Allure results found:"
    ls -la reports/allure-results | head -5
else
    echo "No Allure results found!"
    exit 1
fi

# Check for other report types
echo "Checking for other report types..."
if [ -d "reports/test-output" ]; then
    echo "Playwright test results found:"
    ls -la reports/test-output | head -3
fi

if [ -d "reports/videos" ]; then
    echo "Videos found:"
    ls -la reports/videos | head -3
fi

if [ -d "reports/screenshots" ]; then
    echo "Screenshots found:"
    ls -la reports/screenshots | head -3
fi

if [ -d "reports/traces" ]; then
    echo "Traces found:"
    ls -la reports/traces | head -3
fi

# 4. Generate Allure report
echo "Generating Allure report..."
allure generate reports/allure-results --clean -o reports/allure-report

# 5. Open Allure report
echo "Opening Allure report..."
allure open reports/allure-report

echo "Test execution completed successfully!"
echo "Reports location: reports/"
echo "Allure report: reports/allure-report/index.html"
echo "Videos: reports/videos/"
echo "Screenshots: reports/screenshots/"
echo "Traces: reports/traces/"
