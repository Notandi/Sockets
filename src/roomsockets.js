let textArea;
const HOST = location.origin.replace(/^http/, 'ws')
const ws = new WebSocket(HOST);
let CodeMirror = require('codemirror');
let id = 1;
let oldText;
let newText;

// Sends the first message to retrieve the data for the id
ws.onopen= () => {

  let initmessage = {id: id, type:"init"};

  ws.send(JSON.stringify(initmessage));

}

// Handles the socket messages sent to the client from the server
ws.onmessage = (msg) => {
  let message = JSON.parse(msg.data);

  if (message.type === "init" ){

    textArea.setValue(message.data);
    oldText = textArea.getValue();

  } else if (message.type === "reqUpdate"){

  } else if (message.type === "update"){

  }

}

// Sets up CodeMirror on the front end and listens to changes to it
// sends change data to the server using websockets
window.onload= () => {

  textArea = CodeMirror(document.body, {autofocus: true,lineNumbers: true});

  oldText = textArea.getValue();

  document.getElementsByClassName("CodeMirror")[0].addEventListener("keyup", (e) => {

    newText = textArea.getValue();

    let onp = require('./onp.js');

    let diff = new onp.Diff(oldText, newText);
    diff.compose();
    console.log("editdistance:" + diff.editdistance());
    console.log("lcs:" + diff.getlcs());
    console.log("ses");

    let i   = 0;
    let ses = diff.getses();

    for (i=0;i<ses.length;++i) {
      console.log(i);
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
