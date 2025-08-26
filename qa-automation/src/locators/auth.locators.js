/**
 * Authentication page locators
 * TODO: Update data-testid values after DOM inspection
 */
const authLocators = {
  // Login form elements
  emailInput: 'input[name="email"], input[placeholder="Email"]',
  passwordInput: 'input[name="password"], input[placeholder="Password"]',
  submitBtn: 'button[type="submit"]:has-text("Login")',
  
  // Error messages
  errorMessage: '[role="alert"], .alert-error, .error-message',
  
  // Success indicators
  dashboard: '[data-testid="start-recording-btn"], button:has-text("Start Recording"), main',
};

module.exports = authLocators;
