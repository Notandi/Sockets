var database = require('./database');
var WebSocket = require('ws');

const websockets = function (server) {

  var wss = new WebSocket.Server({ server });


  wss.on( 'connection',(ws) => {
    db = new database();

    console.log('Client connected');
    db.getById(1).then(
      (result) => {
        message = {version: result.version, data: result.data, type:"init"};
        ws.send(JSON.stringify(message));
      }
    )

    ws.on('close', () => console.log('Client.disconnected') );

    ws.on('message', (msg) => {
      if (data.type === "update"){

      } else if (data.type === "reqUpdate"){

        db.getById(1).then(
          (result) => {
            ws.send(result.data);
          }
        )

      } else if (data.type === ""){

      }


    });

  });

}




module.exports = websockets;
