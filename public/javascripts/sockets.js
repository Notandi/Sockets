var socket = io.connect();
window.onload= function(){
  var textArea = CodeMirror(document.body, {autofocus: true});

  document.getElementById("test").addEventListener("click",function(){
    console.log(textArea);
    console.log(textArea.doc);
    socket.emit('LogThis','i click button? yes ?');
  })

}

socket.on('connect', function () {
    console.log('success');
});

socket.on('error', function (data) {
    console.log(data || 'error');
});

socket.on('connect_failed', function (data) {
    console.log(data || 'connect_failed');
});

socket.on('LogThis', function (data) {
    console.log(data || 'connect_failed');
});
