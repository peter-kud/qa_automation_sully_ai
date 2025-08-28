const ActionUtils = require('../utils/actionUtils');
const WaitUtils   = require('../utils/waitUtils');
const CommonUtils = require('../utils/commonUtils');
const L = require('../locators/patients.locators');

class PatientsPage {
  constructor(page) {
    this.page   = page;
    this.actions = new ActionUtils(page);
    this.waits   = new WaitUtils(page);
    this.common  = new CommonUtils(page);
  }

  // open Patients section from the left sidebar
  async openPatients() {
    await this.actions.click(L.patientsTab, 'patients tab');
  }
  // Type patient name in search
  async searchByName(name) {
    await this.actions.fillText(L.searchInput, name, 'patients search input');
    await this.waits.waitForVisible(L.rowByName(name), `row: ${name}`);
  }
  // Open row menu (…) for a patient
  async openRowMenu(name) {
    await this.waits.waitForVisible(L.rowMenuBtnIn(name), 'three dots menu');
    await this.actions.click(L.rowMenuBtnIn(name), 'three dots menu');
  }
  // Click "Delete Patient" in the menu
  async clickDeletePatientInMenu() {
    await this.waits.waitForVisible(L.deletePatientItem, 'delete patient item');
    await this.actions.click(L.deletePatientItem, 'delete patient item');
  }

  // Confirm delete pop-up
  async confirmDeletion() {
    await this.waits.waitForVisible(L.confirmPopupTitle, 'confirm popup');
    await this.actions.click(L.confirmOkBtn, 'confirm OK button');
  }

  // Full flow: search → … menu → Delete → OK
  async deletePatientByName(name) {
    await this.openPatients();
    await this.searchByName(name);
    await this.openRowMenu(name);
    await this.clickDeletePatientInMenu();
    await this.confirmDeletion();
    // Optional: wait the row disappears
    await this.page.waitForSelector(L.rowByName(name), { state: 'detached', timeout: 30_000 });
  }
  // search by patient name and open row
  async openPatientByName(name) {
    // await this.actions.fillText(L.searchInput, name, 'patients search');
    await this.waits.waitForVisible(L.patientRowByName(name), `patient row: ${name}`);
    await this.actions.click(L.patientRowByName(name), `open patient: ${name}`);
  }

  // open Notes tab inside patient view
  async openNotesTab() {
    await this.actions.click(L.notesTab, 'notes tab');
    await this.waits.waitForVisible(L.hpiBlock, 'HPI block');
  }

  // In PatientsPage.js
async expectHpiContains(textSnippet) {
    // Short locator for the HPI paragraph
    const locator = this.page.locator(`//p[contains(., "${textSnippet}")]`);
  
    // Assert it is visible (means text is found)
    await expect(locator).toBeVisible({
      timeout: 30_000
    });
  }
  
}

module.exports = PatientsPage;
