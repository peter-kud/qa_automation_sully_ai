const { test } = require('@playwright/test');
const TestHelpers = require('../src/utils/testHelpers');
const DashboardPage = require('../src/pages/DashboardPage');

test.describe('In-Person Visit → transcript verification', () => {
  test('record → pause → Generate Note → check transcript', async ({ page }) => {
    const t = new TestHelpers(page);
    const dash = new DashboardPage(page);

    await t.login();
    await dash.verifyDashboardVisible();

    const name = t.generateRandomPatientName();
    await dash.createNewPatient(name);

    // Start “recording” (fake mic feeds your WAV due to the browser flag)
    await dash.startInPersonVisit();

    await page.waitForTimeout(25_000);
    // Pause recording and generate note
    await dash.pauseRecording();
    await dash.waitGenerateNoteVisible();
    await dash.clickGenerateNoteButton();

    // Verify expected content (from ENV or default)
    const expected = process.env.TRANSCRIPT_TEXT || 'headaches for the past month';
    await dash.expectTranscriptContains(expected, 30_000);
  });
});
