Qualtrics.SurveyEngine.addOnReady(function () {
  var q=this, engine=Qualtrics.SurveyEngine;
  var root=q.getQuestionContainer().querySelector('.bia-embed');
  if(!root)return;
  var frame=root.querySelector('.bia-frame'), status=root.querySelector('.bia-status');
  var allowed=new URL(frame.dataset.appUrl).origin;
  var response=root.dataset.response, survey=root.dataset.survey, channel=crypto.randomUUID();
  var prefixes=['cbs','ibs','rbs'], dims=['hd','sh','ar','ch','wa','hi','th'], fields=[];
  prefixes.forEach(function(p){dims.forEach(function(d){fields.push(p+'_'+d+'_svg_score','init_'+p+'_'+d+'_svg_score',p+'_'+d,'init_'+p+'_'+d);});fields.push(p+'_height_cm',p+'_duration_seconds');});
  var ready=false, latest=null, form=root.closest('form'), stopped=false, goingBack=false;
  q.hideNextButton();
  function text(s){status.textContent=s;}
  function gate(){ready=false;q.hideNextButton();}
  // Never share a recovery key across responses. Stop rather than guess an ID.
  if(!response||response.indexOf('$'+'{')>=0||!survey||survey.indexOf('$'+'{')>=0){text('The survey response identifier is unavailable. Please contact the study team.');return;}
  var key='bia-v1:'+survey+':'+response+':'+q.questionId;
  function parse(s){if(!s)return null;try{return JSON.parse(s);}catch(_){throw Error('Saved progress could not be read.');}}
  function readSaved(){
    var server=parse(engine.getEmbeddedData('bia_state')),local=null;
    try{local=parse(localStorage.getItem(key));}catch(e){if(e.name!=='SecurityError'&&e.name!=='QuotaExceededError')throw e;}
    function valid(e){return e&&e.response===response&&e.survey===survey&&e.question===q.questionId&&e.state&&e.state.schema===1;}
    if(server&&!valid(server))throw Error('Saved progress does not match this response.');
    if(local&&!valid(local))throw Error('Cached progress does not match this response.');
    return valid(local)&&(!server||local.state.revision>server.state.revision)?local:server;
  }
  var initial;
  try{initial=readSaved();}catch(e){text(e.message+' Please contact the study team.');return;}
  function write(name,value){engine.setEmbeddedData(name,value);if(String(engine.getEmbeddedData(name))!==String(value))throw Error('Survey could not accept '+name);}
  function receive(event){
    var m=event.data;
    if(stopped||event.origin!==allowed||event.source!==frame.contentWindow||!m||m.source!=='bia-inw-visualizer')return;
    if(m.type==='ready'){frame.contentWindow.postMessage({source:'bia-qualtrics-host',type:'init',channel:channel,state:latest?latest.state:(initial?initial.state:null)},allowed);return;}
    if(m.channel!==channel)return;
    if(m.type==='error'){gate();text(m.message||'Unable to save assessment.');return;}
    if(m.type!=='save'||!m.state||m.state.schema!==1||!Number.isSafeInteger(m.state.revision)||m.state.revision<1)return;
    if(latest&&m.state.revision<latest.state.revision)return;
    if(latest&&m.state.revision===latest.state.revision){frame.contentWindow.postMessage({source:'bia-qualtrics-host',type:'ack',channel:channel,revision:m.state.revision},allowed);return;}
    gate();
    try{
      var values=m.values;
      if(!values||Object.keys(values).length!==90)throw Error('Expected 90 assessment values.');
      fields.forEach(function(f){var v=values[f];if(v!==''&&(typeof v!=='number'||!Number.isFinite(v)))throw Error('Invalid assessment value.');
        if(v!==''&&(/_svg_score$/.test(f)||dims.some(function(d){return f.endsWith('_'+d);} ))&&(v<1||v>100))throw Error('Body value out of range.');
        if(/_height_cm$/.test(f)&&v!==''&&(v<1||v>272))throw Error('Height out of range.');
        if(/_duration_seconds$/.test(f)&&(v<0||v===''))throw Error('Invalid elapsed time.');
        if(m.state.complete&&v==='')throw Error('Incomplete results.');});
      var envelope={response:response,survey:survey,question:q.questionId,state:m.state};
      var encoded=JSON.stringify(envelope);if(encoded.length>19000)throw Error('Saved state is too large.');
      write('bia_complete','0');
      fields.forEach(function(f){write(f,values[f]);});write('bia_state',encoded);
      write('bia_complete',m.state.complete?'1':'0');
      var cached=true;try{localStorage.setItem(key,encoded);}catch(_){cached=false;}
      latest=envelope;
      ready=m.state.complete===true&&m.state.page==='page-thankyou';
      if(ready){q.showNextButton();text('Assessment complete. Click Next below to save this survey page and continue.');}
      else text(cached?'Your progress is saved in this browser. Complete all three bodies to continue.':'Browser recovery is unavailable. Keep this page open until you complete the assessment.');
      frame.contentWindow.postMessage({source:'bia-qualtrics-host',type:'ack',channel:channel,revision:m.state.revision},allowed);
    }catch(e){gate();text('Unable to save assessment: '+e.message+' Please remain on this page.');}
  }
  function preventIncomplete(e){if(!ready&&!goingBack){e.preventDefault();e.stopImmediatePropagation();text('Please complete the assessment and wait for confirmation before continuing.');}}
  function preventNext(e){if(e.target.closest&&e.target.closest('#PreviousButton')){goingBack=true;return;}var b=e.target.closest&&e.target.closest('#NextButton');if(b){goingBack=false;if(!ready)preventIncomplete(e);}}
  if(form)form.addEventListener('submit',preventIncomplete,true);
  document.addEventListener('click',preventNext,true);
  window.addEventListener('message',receive);
  // Widen this survey page only; restore its normal appearance when leaving.
  var layoutStyle=document.createElement('style');
  layoutStyle.textContent='body.bia-survey-page .SkinInner{width:1160px!important;max-width:96%!important}body.bia-survey-page #'+q.questionId+' .QuestionText{padding:8px!important}body.bia-survey-page .bia-status{font-size:12px;line-height:1.35;margin:0 0 8px}';
  document.head.appendChild(layoutStyle);document.body.classList.add('bia-survey-page');
  function resizeFrame(){
    var width=window.innerWidth, height=window.innerHeight;
    // The preview wrapper can retain an old inner-frame height after rotation.
    try{if(window.top!==window){width=Math.min(width,window.top.innerWidth);height=window.top.innerHeight-56;}}catch(_){}
    var visibleHeight=window.visualViewport?window.visualViewport.height:height;
    var landscape=width>=600&&Math.min(height,visibleHeight)<500;
    frame.style.height=(landscape?Math.max(270,Math.min(320,height-20,visibleHeight-12)):Math.max(480,Math.min(820,height-160)))+'px';
  }
  resizeFrame();window.addEventListener('resize',resizeFrame);
  frame.src=frame.dataset.appUrl+'?qualtrics=1&layout=20261028-spacing3';
  engine.addOnPageSubmit(function(type){if(type==='next'&&!ready)return false;});
  engine.addOnUnload(function(){stopped=true;layoutStyle.remove();document.body.classList.remove('bia-survey-page');window.removeEventListener('resize',resizeFrame);window.removeEventListener('message',receive);document.removeEventListener('click',preventNext,true);if(form)form.removeEventListener('submit',preventIncomplete,true);});
});
