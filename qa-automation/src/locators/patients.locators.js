module.exports = {
    // left sidebar
    patientsTab: '//button[@data-tooltip-id="menu-item-recordings-tooltip" and .//span[text()="Patients"]]',
  
    // Patients list page
    searchInput: '//input[contains(@placeholder,"Search for patients")]',

    patientRowByName: (name) => `//p[@id='note-item-head-title' and text()="${name}"]`,

    // Row that contains the patient name
    rowByName: (name) => `//p[@id="note-item-head-title" and normalize-space(text())="${name}"]`,
    // "three dots" menu button inside the row
    rowMenuBtnIn: '//i[contains(@class,"bi-three-dots-vertical")]',

    // Context menu item
    deletePatientItem: '//div[normalize-space(.)="Delete Patient"]',

    // Confirm popup + OK
    confirmPopupTitle: '//div[contains(@class,"popup-title") and normalize-space(.)="Confirm"]',
    confirmOkBtn: '//button[normalize-space(.)="OK"]',
    // Inside patient view
    notesTab: '//*[self::a or self::button or self::span][normalize-space(.)="Notes"]',
  
    // HPI section text block (grab the block right under the HPI header)
    hpiBlock: '//h3[normalize-space(.)="History of Present Illness (HPI)"]/following::*[self::div or self::section or self::p][1]'
  };
  