# Before collecting data

- Check the chosen app version and allowed desktop/phone layouts.
- Confirm no height entry or height validation appears on any body page. Confirm unchanged bodies require confirmation.
- Complete all three bodies. Next must stay hidden until results are accepted by the survey page.
- Complete a clearly marked synthetic response through the published link, not only Preview. Filter to its unique Response ID before exporting, and exclude it from research analyses.
- Inspect all 87 numeric result fields, plus bia_state and bia_complete. Compare observed starting/final controls, recalculated SVG scores and elapsed-time state.
- Check initial loading, ordinary page navigation, returning and refreshing on the published link. A blank Loading frame is a separate failure even if the values can later be recovered.
- Change sliders, refresh the same response, and compare all values, starting figures, page and elapsed time.
- Complete the app, go to the next survey page and return if your survey permits it.
- Repeated Finish/Next clicks must not replace initial values or count time twice.
- Start a separate response. It must not load another response's figure.
- Test with browser storage unavailable. Do not promise recovery of unsubmitted drafts in that case.

The app-to-survey acknowledgement confirms values were accepted in the survey page's memory. Qualtrics saves the page to its server when Next submits it. Before that, draft recovery uses the same browser. Unsubmitted cross-device recovery is not provided.

- Test v60 with a new response. An old height-enabled saved draft must produce a clear recovery error rather than being silently reset.
