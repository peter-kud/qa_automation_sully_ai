const ActionUtils = require('../utils/actionUtils');
const WaitUtils = require('../utils/waitUtils');
const CommonUtils = require('../utils/commonUtils');
const dashboardLocators = require('../locators/dashboard.locators');

/**
 * Dashboard page object - independent class without inheritance
 */
class DashboardPage {
  constructor(page) {
    this.page = page;
    this.actions = new ActionUtils(page);
    this.waits = new WaitUtils(page);
    this.common = new CommonUtils(page);
  }

  /**
   * Wait for dashboard to be visible
   */
  async waitForDashboard() {
    await this.waits.waitForVisible(dashboardLocators.dashboard, 'dashboard content');
  }

  /**
   * Verify dashboard is visible
   */
  async verifyDashboardVisible() {
    await this.common.verifyVisible(dashboardLocators.dashboard, 'dashboard content');
  }

  /**
   * Wait for patient search input to be visible
   */
  async waitForPatientSearchInput() {
    await this.waits.waitForVisible(dashboardLocators.patientSearchInput, 'patient search input');
  }

  /**
   * Type random patient name in search input
   * @param {string} patientName - Patient name to type
   */
  async typePatientName(patientName) {
    await this.actions.fillText(dashboardLocators.patientSearchInput, patientName, 'patient search input');
  }

  /**
   * Click on Create New Patient button
   */
  async clickCreateNewPatient() {
    await this.actions.click(dashboardLocators.createNewPatientBtn, 'create new patient button');
  }

  /**
   * Complete patient creation flow
   * @param {string} patientName - Patient name to create
   */
  async createNewPatient(patientName) {
    await this.waitForPatientSearchInput();
    await this.typePatientName(patientName);
    await this.clickCreateNewPatient();
  }

  /**
   * Verify start recording button is visible
   */
  async verifyStartRecordingButtonVisible() {
    await this.common.verifyVisible(dashboardLocators.startRecordingBtn, 'start recording button');
  }
}

module.exports = DashboardPage;
