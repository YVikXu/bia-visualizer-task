# BIA-InW Body Visualizer Task

This repository hosts the browser-based BIA-InW body visualizer task for use as a standalone web app or embedded inside Qualtrics.

## GitHub Pages

After GitHub Pages is enabled for this repository, the app is available at:

```text
https://<github-username>.github.io/bia-visualizer-task/
```

## Qualtrics Embed

Use a Text / Graphic question in Qualtrics.

1. In the question HTML/source view, paste `qualtrics_embed_question_html.html`.
2. Replace `__GITHUB_PAGES_URL__` with the final GitHub Pages URL for `index.html`.
3. In the question JavaScript editor, paste `qualtrics_embed_question_javascript.js`.
4. Replace `__GITHUB_PAGES_ORIGIN__` with the origin only, for example `https://<github-username>.github.io`.
5. Add the Embedded Data fields listed in `qualtrics_embedded_data_fields.txt` to Survey Flow before the block.

The app sends results to Qualtrics with `window.postMessage`. Qualtrics stores them as Embedded Data fields such as `cbs_*`, `ibs_*`, and `rbs_*`.

## Data

The GitHub Pages app is static. It does not store participant data on GitHub. Participant responses are written into Qualtrics Embedded Data when the app is embedded in a Qualtrics survey.
