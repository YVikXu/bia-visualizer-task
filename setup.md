# Embed BIA-InW in Qualtrics

1. Create your own GitHub copy using Fork. Enable GitHub Pages under Settings → Pages → Deploy from a branch → main → / (root).
2. Keep both app HTML files in the project main folder. Use body-visualizer.html for dimension guides or body-visualizer-noline.html without guides. Test the full published link.
3. Before the assessment block in Survey Flow, add the names in all-fields.txt. These are 90 body result fields and 2 technical recovery fields, not 92 body measurements. Leave initial values blank; do not reset these fields later in the flow.
4. Put a Text / Graphic question on its own survey page. Paste question.html in its HTML/source editor. Replace data-app-url with your full published app link. It defaults to the no-guides version.
5. Paste all of question.js in the question JavaScript editor, replacing its default callbacks. The allowed site is read from the app link. Keep the response and survey piped-text identifiers in the HTML.
6. Preview and complete test-checklist.md. Save a test response and inspect its exported values before publishing your survey.

## Results
The supplied connection writes 90 selected fields. For each body it saves 7 final SVG scores, 7 initial SVG scores, 7 final slider settings, 7 initial slider settings, entered height in cm and visible duration in seconds. Prefixes are cbs (current), ibs (ideal), rbs (reasonable); init_ means starting values. See embedded-data-fields.txt for exact names.

The standalone CSV contains more values. To select a different result set, update BOTH the app's biaResults function and the field/validation list in question.js, including its expected field count. Simply creating extra Qualtrics fields does not make the app send them. Keep recovery information regardless of the analysis fields you select.

## Saving and returning
bia_state holds the figure, random starting values, original arm reference, height and exact unit conversion information, current page, visible time and confirmation/completion state. bia_complete marks successful completion. These are technical fields.

Progress is passed to the survey during the task and cached on the survey site in this browser, tied to the existing survey response identifier. GitHub does not receive response values. The app-to-survey acknowledgement confirms in-page readback, not a server save. Clicking Qualtrics Next submits the page to Qualtrics. Unsubmitted cross-device recovery is not supported. Clearing browser data or unavailable browser storage can prevent unsubmitted recovery. Saved responses may resume according to the survey's own settings; test your exact configuration.

Do not put response IDs or answers in the hosted app URL. The connection sends them through a checked frame message; it accepts messages only from the app's frame and site. Never use one shared cache key for all participants.

## Layout
The embedded app places the figure left and sliders right at widths of 600px or more. Narrow portrait screens show a rotate-phone suggestion and a stacked layout with a sticky figure. Web pages cannot reliably force phone rotation. Test actual phones and native touch input before allowing them.

## Updates
Leave your GitHub copy unchanged during data collection. Updating a Pages file changes every survey using that file address, without republishing Qualtrics. Test updates at a separate address first.

## Validation status
Desktop Chrome Qualtrics Preview was tested: validation, real mouse adjustment, completion gating, 90 nonempty exported fields, return from the next page, and embedded-frame reload. Simulated portrait and landscape widths were also checked. Physical phone touch input and unsubmitted cross-device recovery are not validated; cross-device draft recovery is not provided. Block Preview refresh starts a new response, which correctly gets a new figure. Check your survey resume settings and response expiry; restoration only applies to the same still-open response.
