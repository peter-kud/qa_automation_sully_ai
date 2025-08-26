/**
 * Dashboard page locators
 * TODO: Update data-testid values after DOM inspection
 */
const dashboardLocators = {
  // Patient search and creation
  patientSearchInput: '//input[@placeholder="Search or create patient..."]',
  createNewPatientBtn: '//span[contains(text(),"Create new patient")]',
  
  // Alternative selectors if XPath doesn't work
  patientSearchInputAlt: 'input[placeholder*="Search or create patient"], input[placeholder*="patient"]',
  createNewPatientBtnAlt: 'button:has-text("Create new patient"), span:has-text("Create new patient"), .create-patient-btn',
  
  // Dashboard elements
  dashboard: '[data-testid="dashboard"], .dashboard, main',
  startRecordingBtn: '[data-testid="start-recording-btn"], button:has-text("Start Recording")',
};

module.exports = dashboardLocators;
