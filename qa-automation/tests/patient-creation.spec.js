const { test, expect } = require('@playwright/test');
const TestHelpers = require('../src/utils/testHelpers');
const DashboardPage = require('../src/pages/DashboardPage');

test.describe('Patient Creation Test', () => {
  test('should login and create new patient successfully', async ({ page }) => {
    const testHelpers = new TestHelpers(page);
    const dashboardPage = new DashboardPage(page);
    
    // Step 1: Login using common method
    await testHelpers.login();
    
    // Step 2: Verify dashboard is visible
    await dashboardPage.verifyDashboardVisible();
    
    // Step 3: Generate random patient name
    const randomPatientName = testHelpers.generateRandomPatientName();
    console.log(`Generated patient name: ${randomPatientName}`);
    
    // Step 4: Create new patient
    await dashboardPage.createNewPatient(randomPatientName);
    
    // Step 5: Verify start recording button is visible (indicates successful patient creation)
    // await dashboardPage.verifyStartRecordingButtonVisible();
    
    // Step 6: Take screenshot for verification
    // await testHelpers.takeScreenshot('patient-created');
    
    // Step 7: Verify we're on the main dashboard
    await dashboardPage.waitForDashboard();
  });
});
