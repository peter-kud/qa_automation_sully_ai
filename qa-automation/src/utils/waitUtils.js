const { step, attachOnFail } = require('./reporting');

/**
 * Wait utilities with built-in reporting
 */
class WaitUtils {
  constructor(page) {
    this.page = page;
  }

  /**
   * Wait for element to be visible
   * @param {string} selector - Element selector
   * @param {string} description - Description for reporting
   * @param {number} timeout - Timeout in milliseconds
   */
  async waitForVisible(selector, description, timeout = 30000) {
    return await step(`Wait for ${description} to be visible`, async () => {
      try {
        await this.page.locator(selector).waitFor({ state: 'visible', timeout });
      } catch (err) {
        await attachOnFail(this.page, err);
        throw err;
      }
    });
  }

  /**
   * Wait for element to be hidden
   * @param {string} selector - Element selector
   * @param {string} description - Description for reporting
   * @param {number} timeout - Timeout in milliseconds
   */
  async waitForHidden(selector, description, timeout = 30000) {
    return await step(`Wait for ${description} to be hidden`, async () => {
      try {
        await this.page.locator(selector).waitFor({ state: 'hidden', timeout });
      } catch (err) {
        await attachOnFail(this.page, err);
        throw err;
      }
    });
  }

  /**
   * Wait for element to contain text
   * @param {string} selector - Element selector
   * @param {string} expectedText - Expected text
   * @param {string} description - Description for reporting
   * @param {number} timeout - Timeout in milliseconds
   */
  async waitForText(selector, expectedText, description, timeout = 30000) {
    return await step(`Wait for ${description} to contain '${expectedText}'`, async () => {
      try {
        await this.page.locator(selector).waitFor(
          () => this.page.locator(selector).textContent().then(text => 
            text && text.includes(expectedText)
          ),
          { timeout }
        );
      } catch (err) {
        await attachOnFail(this.page, err);
        throw err;
      }
    });
  }

  /**
   * Wait for page to load
   * @param {string} description - Description for reporting
   */
  async waitForPageLoad(description = 'page to load') {
    return await step(`Wait for ${description}`, async () => {
      try {
        await this.page.waitForLoadState('domcontentloaded');
      } catch (err) {
        await attachOnFail(this.page, err);
        throw err;
      }
    });
  }
}

module.exports = WaitUtils;
