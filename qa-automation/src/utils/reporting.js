const { allure } = require('allure-playwright');

/**
 * Wrapper for Allure step reporting
 * @param {string} name - Step name
 * @param {Function} fn - Function to execute
 * @returns {Promise<any>} Result of the function
 */
async function step(name, fn) {
  try {
    return await allure.step(name, async () => {
      return await fn();
    });
  } catch (err) {
    // Fallback if Allure is not available
    console.log(`Step: ${name}`);
    return await fn();
  }
}

/**
 * Attach artifacts on test failure
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {Error} err - Error that occurred
 */
async function attachOnFail(page, err) {
  try {
    // Attach screenshot
    const screenshot = await page.screenshot();
    await allure.attachment('screenshot.png', screenshot, 'image/png');
    
    // Attach current URL
    const url = page.url();
    await allure.attachment('current-url.txt', url, 'text/plain');
    
    // Attach console logs if available
    const logs = await page.evaluate(() => {
      return window.console.logs || [];
    }).catch(() => []);
    
    if (logs.length > 0) {
      await allure.attachment('console-logs.json', JSON.stringify(logs, null, 2), 'application/json');
    }
  } catch (attachErr) {
    // Silently fail attachment to avoid masking original error
    console.warn('Failed to attach failure artifacts:', attachErr.message);
  }
}

module.exports = {
  step,
  attachOnFail
};
