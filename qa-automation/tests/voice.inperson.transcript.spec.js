const { test } = require('@playwright/test');
const TestHelpers   = require('../src/utils/testHelpers');
const DashboardPage = require('../src/pages/DashboardPage');
const PatientsPage  = require('../src/pages/PatientsPage');

test.describe('In-Person Visit → transcript + HPI verification', () => {
  let createdPatients = [];
  let t, dash, pts;

  test.beforeEach(async ({ page }) => {
    t   = new TestHelpers(page);
    dash = new DashboardPage(page);
    pts  = new PatientsPage(page);

    await t.login();
    await dash.verifyDashboardVisible();
  });

  test.afterAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const p = new PatientsPage(page);

  for (const name of createdPatients) {
    try {
      await p.deletePatientByName(name);
    } catch (e) {
      console.warn(`Cleanup skip: could not delete "${name}" → ${e.message}`);
    }
  }

  await context.close();
});

  test('record → pause → Generate Note → check transcript → (patients list later)', async ({ page }) => {
    const name = t.generateRandomPatientName();
    createdPatients.push(name);

    await dash.createNewPatient(name);

    await dash.startInPersonVisit();
    await page.waitForTimeout(25_000); // static wait to let fake audio play

    await dash.pauseRecording();
    await dash.waitGenerateNoteVisible();
    await dash.clickGenerateNoteButton();

    const expectedTranscript = process.env.TRANSCRIPT_TEXT || 'headaches for the past month';
    await dash.expectTranscriptContains(expectedTranscript, 30_000);

    // navigate to Patients and open our patient
    await pts.openPatients();

    // await pts.openPatientByName(patientName);
    // open Notes tab and verify HPI keywords
    // const expectedHpi = process.env.HPI_TEXT || "heartache yesterday after having a coffee";
    // await pts.expectHpiContains(expectedHpi);
  });
});
