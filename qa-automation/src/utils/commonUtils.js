const { step, attachOnFail } = require('./reporting');

/**
 * Common utilities with built-in reporting
 */
class CommonUtils {
  constructor(page) {
    this.page = page;
  }

  /**
   * Verify element contains expected text
   * @param {string} selector - Element selector
   * @param {string} expectedText - Expected text
   * @param {string} description - Description for reporting
   */
  async verifyTextContains(selector, expectedText, description) {
    return await step(`Verify ${description} contains '${expectedText}'`, async () => {
      try {
        await this.page.locator(selector).waitFor({ state: 'visible' });
        const text = await this.page.locator(selector).textContent();
        if (!text || !text.includes(expectedText)) {
          throw new Error(`Expected '${expectedText}' but found '${text || ''}'`);
        }
      } catch (err) {
        await attachOnFail(this.page, err);
        throw err;
      }
    });
  }

  /**
   * Verify element is visible
   * @param {string} selector - Element selector
   * @param {string} description - Description for reporting
   */
  async verifyVisible(selector, description) {
    return await step(`Verify ${description} is visible`, async () => {
      try {
        await this.page.locator(selector).waitFor({ state: 'visible' });
      } catch (err) {
        await attachOnFail(this.page, err);
        throw err;
      }
    });
  }

  /**
   * Take screenshot
   * @param {string} description - Description for reporting
   */
  async takeScreenshot(description = 'current page') {
    return await step(`Take screenshot of ${description}`, async () => {
      try {
        return await this.page.screenshot();
      } catch (err) {
        await attachOnFail(this.page, err);
        throw err;
      }
    });
  }

  /**
   * Get current URL
   * @param {string} description - Description for reporting
   * @returns {Promise<string>} Current URL
   */
  async getCurrentUrl(description = 'current page') {
    return await step(`Get ${description} URL`, async () => {
      try {
        return this.page.url();
      } catch (err) {
        await attachOnFail(this.page, err);
        throw err;
      }
    });
  }

  /**
   * Wait for specific time
   * @param {number} milliseconds - Time to wait
   * @param {string} description - Description for reporting
   */
  async waitForTime(milliseconds, description = `${milliseconds}ms`) {
    return await step(`Wait for ${description}`, async () => {
      try {
        await this.page.waitForTimeout(milliseconds);
      } catch (err) {
        await attachOnFail(this.page, err);
        throw err;
      }
    });
  }
}

module.exports = CommonUtils;

