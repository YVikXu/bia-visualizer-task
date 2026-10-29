# v60 no-height integration checks — 29 October 2026

## Current release
Both HTML app paths serve the same no-height/no-guides v60 app. The drawing and scoring code comes from the validated standalone file; the separate adapter preserves Qualtrics saving, same-response recovery, and completion gating.

- 87 result fields: 84 body values plus three visible durations; no participant-height fields.
- 21 controlled adapter assertions passed, including exact restoration of all 87 values, initial settings, adjusted figures, original arm reference and frozen completion time.
- Controlled question-host tests passed for 89 total fields (87 results plus bia_state/bia_complete), gating, origin/frame/channel checks, stale messages, failed writes, recovery, and separate-response isolation.
- Schema 2 rejects height-enabled schema-1 drafts without overwriting them. Use a new response for migration testing.
- These are offline tests with controlled DOM/clock and source-based geometry. Browser/Qualtrics v60 checks will be recorded separately after deployment.

## Historical height-enabled validation
The following is retained as a record of the previous 90-field release. It does not validate v60.

# Integration checks — 28 October 2026

## Published survey: saving and numerical checks

One clearly marked synthetic response was completed through the published anonymous survey link in desktop Chrome. The exported file was restricted to that single response. It was a full submitted response, not only an in-page acknowledgement or a Preview.

The 90 values shown in the Qualtrics server-side response detail also matched the single-response CSV exactly.

All **90 result fields** were present, nonempty and numeric; `bia_complete = 1`, and the survey recorded the response as finished.

| Check | Fields | Result |
|---|---:|---|
| Starting slider settings | 21 | Exactly matched values observed in the app before editing |
| Final slider settings | 21 | Exactly matched the deliberately entered settings, including 1 and 100 |
| Starting and final SVG scores | 42 | Passed recalculation from observed settings and the original drawing/scoring functions |
| Entered height in centimeters | 3 | Exactly matched the typed centimeters or the feet/inches conversion |
| Visible time in seconds | 3 | Matched the saved elapsed-time state |
| **Total** | **90** | **Passed the checks above** |

Height test cases: 170.123456 cm; 182.345678 cm; and 5 ft 7.5 in, which exported as 171.45 cm. Switching units preserved the original centimeter precision.

The SVG comparison reconstructed the original arm reference from the independently observed starting slider values. It did not simply compare the export with another copy of the exported result fields. The offline path sampler approximates the browser's SVG geometry: tolerance was 0.001 for Head SVG scores and 0.00000001 for the other SVG scores. The largest observed SVG-score difference was approximately 0.000091541 points. This is a numerical/data-transfer check, not evidence of psychological measurement validity.

Timer fields were checked against the saved elapsed-time state, not an external stopwatch. Separate controlled tests cover visible/away time, pause/resume and completion. The live response's three timer values were 117.629, 12.379 and 22.958 seconds.

After submitting the BIA page, returning and refreshing the same published response preserved all 21 final sliders, height input, selected units and completion. The full survey was then finished and exported. Exclude the marked synthetic response from research analyses. Raw responses, response identifiers and the export are kept locally, not included in this repository.

## Observed loading issue

On two live-page transitions in this Chrome session, the embedded frame initially remained blank at “Loading the body assessment”. Re-entering the page or refreshing the same active response loaded it; saved progress was restored. The cause has not been isolated. The successful export check does **not** establish that loading is consistently reliable. Resolve recurring loading failures in the intended survey/browser environment before collecting data.

## Earlier Preview and controlled checks

- Missing height is blocked; unchanged figures require confirmation.
- Actual mouse dragging changes the figure and slider value.
- Qualtrics Next is hidden before completion and appears after result acceptance.
- Next submits the page and advances to the following questionnaire.
- Reloading the app frame restores the unsubmitted draft with its original random values and arm reference.
- A different response does not reuse the previous response's figure.
- An earlier full Preview response also exported 90 nonempty result fields.
- Desktop slider rows distribute the available space while keeping Next at the bottom. Landscape uses a capped frame and a 6px gap between the last slider and Next. Portrait keeps the figure above a separate scrolling control panel.

Controlled tests also check field mapping, unit conversion, elapsed-time behavior, recovery, message origin/frame/channel checks, stale messages and rejected writes.

## Limits

An app acknowledgement confirms in-page acceptance; survey Next submits the page to the server. Recovery of an unsubmitted draft depends on storage in the same browser and the same still-valid response identifier. Clearing browser data, response expiry or survey resume settings can prevent recovery. Cross-device draft recovery is not provided.

Simulated phone layouts and user-supplied phone screenshots informed the layout work. A systematic test of real phone touch input, mobile loading and every supported browser has not been completed. The survey owner published the tested survey; test your own copy and settings separately.
