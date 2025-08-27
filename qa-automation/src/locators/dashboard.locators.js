module.exports = {
  // Dashboard shell
  dashboard: 'main, [data-testid*="dashboard"]',

  // Patient search + create
  patientSearchInput: 'input[placeholder*="Search"], input[placeholder*="patient"]',
  createNewPatientBtn: '//span[contains(text(),"Create new patient")]',

  // Start In-Person Visit
  startInPersonBtn: '//span[normalize-space(.)="Start In-Person Visit"]',

  // target the pill text exactly (avoids small red "Recording")
  recordingPill:    '//span[normalize-space(.)="Recording (Click to Pause)"]',
  pauseRecordingBtn:'//span[normalize-space(.)="Recording (Click to Pause)"]',

  generateNoteBtn:  '//span[normalize-space(.)="Generate Note"]',

  transcriptArea:   '//textarea[@id="speech-transcript"]',
};
