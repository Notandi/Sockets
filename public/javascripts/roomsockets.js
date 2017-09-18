var socket = io('/new');
var textArea;
window.onload= function(){
  textArea = CodeMirror(document.body, {autofocus: true,lineNumbers: true});
  document.getElementsByClassName("CodeMirror")[0].addEventListener("keydown", function(e){
    line = textArea.getCursor().line;
    ch = textArea.getCursor().ch;
    key = e.key;
    data = {
      line,
      ch,
      key
    };
    socket.emit("insertTextAt", data);
  });

}

socket.on('insertTextAt', function (data) {
  console.log(data);
  key = data.key;
  line = data.line;
  ch = data.ch;
  if (key.length > 1){
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
  } else {
    textArea.replaceRange(key, {line, ch});
  }
});

socket.on('connect', function () {
    console.log('success');
});

socket.on('error', function (data) {
    console.log(data || 'error');
});

socket.on('connect_failed', function (data) {
    console.log(data || 'connect_failed');
});