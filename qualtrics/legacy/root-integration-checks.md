# Integration checks — 28 October 2026

Checked in desktop Chrome against a Qualtrics draft, without publishing the survey:

- No-guides app loads inside the BIA-InW block.
- Qualtrics Next stays hidden before assessment completion.
- Missing height is blocked; unchanged figures require confirmation.
- Actual mouse dragging changes the figure and slider value.
- All three bodies can be completed; survey Next appears after in-page result readback.
- Next submits the page and advances to the following questionnaire.
- Returning from the next page restores all 21 final sliders, centimeter precision, feet/inches input and completion.
- Reloading the app frame restores the unsubmitted draft without a new random figure.
- Refreshing a Block Preview produces a different Qualtrics response identifier and a fresh figure, as expected for a new response.
- A full Preview test response was exported: all 90 result fields were present and nonempty, with bia_complete = 1. Representative values: cbs_height_cm = 170.123456, ibs_height_cm = 175, rbs_height_cm = 171.45 from 5 ft 7.5 in, cbs_wa = 48 after mouse adjustment.
- Exported values were recalculated from the saved recovery state using the original scoring code in a controlled offline test. Drawing path sampling in that test approximates the browser: tolerance was 0.001 for Head SVG scores and 0.00000001 for other fields. All comparisons passed.
- Browser widths representing portrait and landscape phones select the intended single-column/side-by-side layouts and rotation suggestion.

Controlled tests also check 90-field mapping, preservation of original random values and arm reference, exact unit conversion, excluded away-time, completion recovery, message origin/frame/channel checks, stale messages, rejected writes, and separation of different responses.

## Limits

A result acknowledgement confirms in-page acceptance, not a server save. Survey Next submits the page. Unsubmitted drafts depend on storage in the same browser and an unchanged response identifier. Browser data removal, response expiry and the survey resume settings can prevent recovery. Cross-device draft recovery is not provided.

The preview wrapper itself sometimes showed a blank page when reloaded. Testing the app frame reload and the same-response return separately avoided confusing a new Preview response with recovery of the original response.

Real phone touch, different browsers, and your own exact survey settings need testing before data collection. No survey was published during these checks. Temporary test buttons were removed from the draft and are absent from the supplied files.
