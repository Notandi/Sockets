let textArea;
const HOST = location.origin.replace(/^http/, 'ws')
const ws = new WebSocket(HOST);
var CodeMirror = require('codemirror');


// Handles the socket messages sent to the client from the server
ws.onmessage = ( (message) => {

})

// Sets up CodeMirror on the front end and listens to changes to it
// sends change data to the server using websockets
window.onload= () => {

  textArea = CodeMirror(document.body, {autofocus: true,lineNumbers: true});

  let oldText = textArea.getValue();
  let newText;

  document.getElementsByClassName("CodeMirror")[0].addEventListener("keyup",function(e){

    newText = textArea.getValue();
    console.log(oldText);
    console.log(newText);

    var onp = require('./onp.js');

    var diff = new onp.Diff("abcd", "aecd");
    diff.compose();
    console.log("editdistance:" + diff.editdistance());
    console.log("lcs:" + diff.getlcs());
    console.log("ses");

    var i   = 0;
    var ses = diff.getses();
    for (i=0;i<ses.length;++i) {
        if (ses[i].t === diff.SES_COMMON) {
            console.log(" " + ses[i].elem);
        } else if (ses[i].t === diff.SES_DELETE) {
            console.log("-" + ses[i].elem);
        } else if (ses[i].t === diff.SES_ADD) {
            console.log("+" + ses[i].elem);
        }
    }

    oldText = newText;


  })
}
