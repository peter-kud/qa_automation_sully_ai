const ActionUtils = require('../utils/actionUtils');
const WaitUtils = require('../utils/waitUtils');
const CommonUtils = require('../utils/commonUtils');
const authLocators = require('../locators/auth.locators');

/**
 * Login page object - independent class without inheritance
 */
class LoginPage {
  constructor(page) {
    this.page = page;
    this.actions = new ActionUtils(page);
    this.waits = new WaitUtils(page);
    this.common = new CommonUtils(page);
  }

  /**
   * Open login page
   */
  async openLoginPage() {
    const baseUrl = process.env.BASE_URL || 'https://app.sully.ai';
    await this.actions.navigateTo(baseUrl, 'login page');
    await this.waits.waitForPageLoad('login page to load');
  }

  /**
   * Enter email in email field
   * @param {string} email - Email to enter
   */
  async enterEmail(email) {
    await this.actions.fillText(authLocators.emailInput, email, 'email input field');
  }

  /**
   * Enter password in password field
   * @param {string} password - Password to enter
   */
  async enterPassword(password) {
    await this.actions.fillText(authLocators.passwordInput, password, 'password input field');
  }

  /**
   * Click on login button
   */
  async clickLoginButton() {
    await this.actions.click(authLocators.submitBtn, 'login button');
  }

  /**
   * Wait for dashboard to be visible after login
   */
  async waitForDashboard() {
    await this.waits.waitForVisible(authLocators.dashboard, 'dashboard content');
  }

  /**
   * Check if error message is visible
   * @returns {Promise<boolean>} True if error message is visible
   */
  async hasErrorMessage() {
    return await this.actions.isVisible(authLocators.errorMessage, 'error message', 5000);
  }

  /**
   * Get error message text
   * @returns {Promise<string>} Error message text
   */
  async getErrorMessageText() {
    return await this.actions.getText(authLocators.errorMessage, 'error message');
  }

  /**
   * Verify dashboard is visible
   */
  async verifyDashboardVisible() {
    await this.common.verifyVisible(authLocators.dashboard, 'dashboard content');
  }
}

module.exports = LoginPage;

