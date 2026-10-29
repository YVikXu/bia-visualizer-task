# Embed BIA-InW in Qualtrics

1. Create your own GitHub copy using Fork. Enable GitHub Pages under Settings → Pages → Deploy from a branch → main → / (root).
2. Keep both app HTML files in the project main folder. Both addresses currently serve the same no-height/no-guides v60 app; the height-free guides release is pending. Test the full published link.
3. Before the assessment block in Survey Flow, add the names in all-fields.txt. These are 87 body result fields and 2 technical recovery fields, not 89 body measurements. Leave initial values blank; do not reset these fields later in the flow.
4. Put a Text / Graphic question on its own survey page. Paste question.html in its HTML/source editor. Replace data-app-url with your full published app link. It defaults to the no-guides version.
5. Paste all of question.js in the question JavaScript editor, replacing its default callbacks. The allowed site is read from the app link. Keep the response and survey piped-text identifiers in the HTML.
6. Preview and complete test-checklist.md. Save a test response and inspect its exported values before publishing your survey.

## Results
The supplied connection writes 87 selected fields. For each body it saves 7 final SVG scores, 7 initial SVG scores, 7 final slider settings, 7 initial slider settings, visible duration in seconds. Prefixes are cbs (current), ibs (ideal), rbs (reasonable); init_ means starting values. See embedded-data-fields.txt for exact names.

The standalone CSV contains more values. To select a different result set, update BOTH the app's biaResults function and the field/validation list in question.js, including its expected field count. Simply creating extra Qualtrics fields does not make the app send them. Keep recovery information regardless of the analysis fields you select.

## Saving and returning
bia_state holds the figure, random starting values, original arm reference, current page, visible time and confirmation/completion state. bia_complete marks successful completion. These are technical fields.

Progress is passed to the survey during the task and cached on the survey site in this browser, tied to the existing survey response identifier. GitHub does not receive response values. The app-to-survey acknowledgement confirms in-page readback, not a server save. Clicking Qualtrics Next submits the page to Qualtrics. Unsubmitted cross-device recovery is not supported. Clearing browser data or unavailable browser storage can prevent unsubmitted recovery. Saved responses may resume according to the survey's own settings; test your exact configuration.

Do not put response IDs or answers in the hosted app URL. The connection sends them through a checked frame message; it accepts messages only from the app's frame and site. Never use one shared cache key for all participants.

## Layout
The question connection widens this survey page only. Labels and sliders share a row. At widths of 600px or more, the figure stays left and controls right; on landscape phones the figure panel is smaller. Narrow portrait screens use two separate rows: a fixed figure above a scrolling control panel, without overlap. Very small screens or larger text may still need scrolling within the controls. Web pages cannot reliably force phone rotation. Test actual phones and native touch input before allowing them.

## Updates
Leave your GitHub copy unchanged during data collection. Updating a Pages file changes every survey using that file address, without republishing Qualtrics. Test updates at a separate address first.

## Updating a height-enabled survey
Keep the iframe URL, but replace its question JavaScript with the current question.js and update the result-field selection to 87 fields. The three *_height_cm fields are no longer written. Preserve historical response data; do not delete collected answers. Keep bia_state and bia_complete. Publish after testing a new response. Old schema-1 drafts are rejected without overwriting their saved state; this version uses schema 2 and a separate browser cache namespace.

## Validation status
See [integration-checks.md](integration-checks.md) for current v60 tests and the separately labelled historical height-enabled live test. Physical phone touch/mobile loading and your exact survey settings require separate checks. Cross-device unsubmitted draft recovery is not provided.
