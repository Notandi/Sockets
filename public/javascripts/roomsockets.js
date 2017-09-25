var textArea;
var HOST = location.origin.replace(/^http/, 'ws')
var ws = new WebSocket(HOST);

// Handles the socket messages sent to the client
ws.onmessage = ( (message) => {

  console.log(message.data);
  data = JSON.parse(message.data);
  highlight = data.highlight;
  key = data.key;
  line = data.line;
  ch = data.ch;
  startLine = data.startLine;
  startCh = data.startCh;
  endLine = data.endLine;
  endCh = data.endCh;

  if (key.length > 1){

    if (highlight === true){
      if (key === "Enter"){
        key = '\n';
        textArea.replaceRange(key, {startLine, startCh}, {endLine, endCh});
      }
      if (key === "Backspace"){
        textArea.replaceRange("", {line : startLine, ch : startCh}, {line : endLine,ch : endCh});
      }
      if (key === "Delete"){
        textArea.replaceRange("", {line : startLine, ch : startCh},{line : endLine, ch : endCh});
      }

    } else {
      if (key === "Enter"){
        key = '\n';
        textArea.replaceRange(key, {line, ch});
      }
      if (key === "Backspace"){
        textArea.replaceRange("", {line, ch: ch +1}, {line, ch});
      }
      if (key === "Delete"){
        textArea.replaceRange("", {line, ch},{line, ch : ch + 1});
      }
    }

  } else {
    textArea.replaceRange(key, {line, ch});
  }

})

// Sets up CodeMirror on the front end and all the keylisteners
// sends data through WebSocket's
window.onload= function(){
  textArea = CodeMirror(document.body, {autofocus: true,lineNumbers: true});
  var startLine = 0;
  var startCh = 0;
  var endLine = 0;
  var endCh = 0;
  var highlight = false;
  var modifier = false;
  var shiftmodifier = false;

  document.getElementsByClassName("CodeMirror")[0].addEventListener("mousedown",function(e) {
    startLine = textArea.getCursor().line;
    startCh = textArea.getCursor().ch;
  });

  document.getElementsByClassName("CodeMirror")[0].addEventListener("mouseup",function(e) {
    endLine = textArea.getCursor().line;
    endCh = textArea.getCursor().ch;
    highlight = true;
  });

  document.getElementsByClassName("CodeMirror")[0].addEventListener("keydown", function(e){

    if (e.key === "Alt" || e.key === "Control") modifier = true;

    if (e.key === "Shift") {
      shiftmodifier = true;
      startLine = textArea.getCursor().line;
      startCh = textArea.getCursor().ch;
    }

    if (e.key ===  "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" ||e.key === "ArrowRigt"){
      if (shiftmodifier){
        endLine = textArea.getCursor().line;
        endCh = textArea.getCursor().ch;
      }
    }
    line = textArea.getCursor().line;
    ch = textArea.getCursor().ch;
    key = e.key;
    data = {
      line,
      ch,
      key,
      startLine,
      startCh,
      endLine,
      endCh,
      highlight
    };
    if (!modifier) ws.send(JSON.stringify(data));
    highlight = false;
  });

  document.getElementsByClassName("CodeMirror")[0].addEventListener("keyup",function(e){

    if (e.key === "Alt" || e.key === "Control") modifier = false;

    if (e.key === "Shift") {
      shiftmodifier = false;
      highlight = true;
    }

  })
}
