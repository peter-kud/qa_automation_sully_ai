// src/pages/DashboardPage.js
const ActionUtils = require('../utils/actionUtils');
const WaitUtils = require('../utils/waitUtils');
const CommonUtils = require('../utils/commonUtils');
const L = require('../locators/dashboard.locators');

class DashboardPage {
  constructor(page) {
    this.page = page;
    this.actions = new ActionUtils(page);
    this.waits = new WaitUtils(page);
    this.common = new CommonUtils(page);
  }

  // ----- Dashboard / Patient -----
  async waitForDashboard() {
    await this.waits.waitForVisible(L.dashboard, 'dashboard content');
  }

  async verifyDashboardVisible() {
    await this.common.verifyVisible(L.dashboard, 'dashboard content');
  }

  async waitForPatientSearchInput() {
    await this.waits.waitForVisible(L.patientSearchInput, 'patient search input');
  }

  async typePatientName(patientName) {
    await this.actions.fillText(L.patientSearchInput, patientName, 'patient search input');
  }

  async clickCreateNewPatient() {
    await this.actions.click(L.createNewPatientBtn, 'create new patient button');
  }

  async createNewPatient(patientName) {
    await this.waitForPatientSearchInput();
    await this.typePatientName(patientName);
    await this.clickCreateNewPatient();
  }

  // ----- Recording flow -----
  async startInPersonVisit() {
    await this.actions.click(L.startInPersonBtn, 'start in-person visit');
    await this.waits.waitForVisible(L.recordingPill, 'recording banner');
  }

  async pauseRecording() {
    await this.actions.click(L.pauseRecordingBtn, 'pause recording');
  }

  async waitGenerateNoteVisible() {
    await this.waits.waitForVisible(L.generateNoteBtn, 'generate note button');
  }

  async clickGenerateNoteButton() {
    await this.actions.click(L.generateNoteBtn, 'generate note button');
  }

  // ----- Transcript helpers -----
  async getTranscriptText() {
    const el = this.page.locator(L.transcriptArea);
    await this.waits.waitForVisible(L.transcriptArea, 'transcript area');
    // For <textarea> prefer inputValue; fallback to textContent
    return (await el.inputValue().catch(() => null)) ?? (await el.textContent());
  }

  async expectTranscriptContains(expected, timeoutMs = 20000) {
    const needle = (expected || '').toLowerCase().trim();
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
      const raw = await this.getTranscriptText();
      const hay = (raw || '').toLowerCase();
      if (needle && hay.includes(needle)) return;
      await this.page.waitForTimeout(500);
    }
    throw new Error(`Transcript did not contain:\n---\n${expected}\n--- within ${timeoutMs}ms`);
  }
}

module.exports = DashboardPage;
