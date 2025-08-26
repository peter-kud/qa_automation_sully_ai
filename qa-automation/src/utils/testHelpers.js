const LoginPage = require('../pages/LoginPage');
const LoginUtils = require('./loginUtils');
const users = require('../fixtures/users.json');

/**
 * Common test helpers for all test files
 */
class TestHelpers {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.loginUtils = new LoginUtils(this.loginPage);
  }

  /**
   * Common login method for all tests
   * @param {string} email - User email (optional, uses env or fixture if not provided)
   * @param {string} password - User password (optional, uses env or fixture if not provided)
   */
  async login(email = null, password = null) {
    const userEmail = email || process.env.EMAIL || users.sully.email;
    const userPassword = password || process.env.PASSWORD || users.sully.password;
    
    await this.loginUtils.login(userEmail, userPassword);
  }

  /**
   * Generate random patient name with QA_Automation prefix
   * @returns {string} Random patient name
   */
  generateRandomPatientName() {
    const timestamp = Date.now();
    const randomNumber = Math.floor(Math.random() * 10000);
    return `QA_Automation_${timestamp}_${randomNumber}`;
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Take screenshot with timestamp
   * @param {string} name - Screenshot name
   */
  async takeScreenshot(name) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await this.page.screenshot({ 
      path: `reports/screenshots/${name}_${timestamp}.png` 
    });
  }
}

module.exports = TestHelpers;
