const { step, attachOnFail } = require('./reporting');

/**
 * Login utilities with built-in reporting
 */
class LoginUtils {
  constructor(loginPage) {
    this.loginPage = loginPage;
  }

  /**
   * Complete login process with all steps
   * @param {string} email - User email
   * @param {string} password - User password
   */
  async login(email, password) {
    return await step(`Complete login process for ${email}`, async () => {
      try {
        // Step 1: Open login page
        await this.loginPage.openLoginPage();
        
        // Step 2: Enter email
        await this.loginPage.enterEmail(email);
        
        // Step 3: Enter password
        await this.loginPage.enterPassword(password);
        
        // Step 4: Click login button
        await this.loginPage.clickLoginButton();
        
        // Step 5: Wait for dashboard
        await this.loginPage.waitForDashboard();
        
        // Step 6: Verify dashboard is visible
        await this.loginPage.verifyDashboardVisible();
        
      } catch (err) {
        await attachOnFail(this.loginPage.page, err);
        throw err;
      }
    });
  }

  /**
   * Verify login was successful
   */
  async verifyLoginSuccess() {
    return await step('Verify login was successful', async () => {
      try {
        await this.loginPage.verifyDashboardVisible();
      } catch (err) {
        await attachOnFail(this.loginPage.page, err);
        throw err;
      }
    });
  }

  /**
   * Check for login errors
   * @returns {Promise<boolean>} True if error exists
   */
  async checkForLoginErrors() {
    return await step('Check for login errors', async () => {
      try {
        return await this.loginPage.hasErrorMessage();
      } catch (err) {
        await attachOnFail(this.loginPage.page, err);
        return false;
      }
    });
  }
}

module.exports = LoginUtils;

