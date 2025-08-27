const { step, attachOnFail } = require('./reporting');

/**
 * Action utilities with built-in reporting
 */
class ActionUtils {
  constructor(page) {
    this.page = page;
  }

  /**
   * Click on element
   * @param {string} selector - Element selector
   * @param {string} description - Description for reporting
   */
  async click(selector, description) {
    return await step(`Click on ${description}`, async () => {
      try {
        await this.page.locator(selector).click();
      } catch (err) {
        await attachOnFail(this.page, err);
        throw err;
      }
    });
  }

  /**
   * Type text into element
   * @param {string} selector - Element selector
   * @param {string} value - Text to type
   * @param {string} description - Description for reporting
   */
  async typeText(selector, value, description) {
    return await step(`Type '${value}' into ${description}`, async () => {
      try {
        const element = this.page.locator(selector);
        await element.fill(''); // Clear first
        await element.type(value, { delay: 10 });
      } catch (err) {
        await attachOnFail(this.page, err);
        throw err;
      }
    });
  }

  /**
   * Fill element with text (replaces existing content)
   * @param {string} selector - Element selector
   * @param {string} value - Text to fill
   * @param {string} description - Description for reporting
   */
  async fillText(selector, value, description) {
    return await step(`Fill '${value}' into ${description}`, async () => {
      try {
        await this.page.locator(selector).fill(value);
      } catch (err) {
        await attachOnFail(this.page, err);
        throw err;
      }
    });
  }

  /**
   * Navigate to URL
   * @param {string} url - URL to navigate to
   * @param {string} description - Description for reporting
   */
  async navigateTo(url, description) {
    return await step(`Navigate to ${description}`, async () => {
      try {
        await this.page.goto(url);
      } catch (err) {
        await attachOnFail(this.page, err);
        throw err;
      }
    });
  }

  /**
   * Get element text content
   * @param {string} selector - Element selector
   * @param {string} description - Description for reporting
   * @returns {Promise<string>} Element text content
   */
  async getText(selector, description) {
    return await step(`Get text from ${description}`, async () => {
      try {
        await this.page.locator(selector).waitFor({ state: 'visible' });
        return await this.page.locator(selector).textContent();
      } catch (err) {
        await attachOnFail(this.page, err);
        throw err;
      }
    });
  }

  /**
   * Check if element is visible
   * @param {string} selector - Element selector
   * @param {string} description - Description for reporting
   * @param {number} timeout - Timeout in milliseconds
   * @returns {Promise<boolean>} True if element is visible
   */
  async isVisible(selector, description, timeout = 5000) {
    return await step(`Check if ${description} is visible`, async () => {
      try {
        return await this.page.locator(selector).isVisible({ timeout });
      } catch (err) {
        await attachOnFail(this.page, err);
        return false;
      }
    });
  }
}

module.exports = ActionUtils;

