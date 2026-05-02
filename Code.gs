/**
 * Google Apps Script — receiver for the "Where Does Sex Live?" survey.
 *
 * Setup:
 *  1. Open the destination Google Sheet
 *  2. Extensions → Apps Script → paste this whole file in
 *  3. Deploy → New deployment → Web app
 *       Execute as: Me
 *       Who has access: Anyone
 *  4. Copy the resulting Web app URL into index.html (SHEET_ENDPOINT)
 *
 * The expected header row in the sheet (first row, columns A–J):
 *   timestamp | selected_levels | why_humans | why_you | satisfaction | age | gender | relationship | email | user_agent
 */

const COLUMNS = [
  'timestamp',
  'selected_levels',
  'why_humans',
  'why_you',
  'satisfaction',
  'age',
  'gender',
  'relationship',
  'email',
  'user_agent',
];

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // The site sends JSON as text/plain to avoid a CORS preflight.
    const data = JSON.parse(e.postData.contents);

    // Build a row in the canonical column order.
    const row = COLUMNS.map(col => (data[col] !== undefined ? String(data[col]) : ''));

    // Always set timestamp server-side too, in case the client clock is wonky.
    if (!row[0]) row[0] = new Date().toISOString();

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Lets you sanity-check the deployment in a browser.
function doGet() {
  return ContentService
    .createTextOutput("Where Does Sex Live? — receiver is live. POST JSON here.")
    .setMimeType(ContentService.MimeType.TEXT);
}
