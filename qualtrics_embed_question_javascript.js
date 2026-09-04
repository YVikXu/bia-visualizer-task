Qualtrics.SurveyEngine.addOnload(function () {
  this.hideNextButton();
});

Qualtrics.SurveyEngine.addOnReady(function () {
  var q = this;
  q.hideNextButton();
  var allowedOrigin = '__GITHUB_PAGES_ORIGIN__';

  function setEmbedded(key, value) {
    if (value === undefined || value === null) return;
    if (Qualtrics.SurveyEngine.setEmbeddedData) {
      Qualtrics.SurveyEngine.setEmbeddedData(key, String(value));
    }
    if (Qualtrics.SurveyEngine.setJSEmbeddedData) {
      Qualtrics.SurveyEngine.setJSEmbeddedData(key, String(value));
    }
  }

  function receiveBiaMessage(event) {
    if (allowedOrigin !== '*' && event.origin !== allowedOrigin) return;
    var data = event.data || {};
    if (data.source !== 'bia-inw-visualizer') return;
    Object.keys(data).forEach(function (key) {
      if (key === 'source' || key === 'type') return;
      setEmbedded(key, data[key]);
    });
    if (data.type === 'bia-inw-complete') {
      q.clickNextButton();
    }
  }

  window.addEventListener('message', receiveBiaMessage);
});
