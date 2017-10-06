const database = require('./database');
const WebSocket = require('ws');

const websockets = function (server) {

  let wss = new WebSocket.Server({ server });


  wss.on( 'connection',(ws) => {
    db = new database();

    console.log('Client connected');


    ws.on('close', () => console.log('Client.disconnected') );

    ws.on('message', (msg) => {

      let message = JSON.parse(msg);

      if (message.type === "update"){

      } else if (message.type === "reqUpdate"){

      } else if (message.type === "init"){

        db.getById(message.id).then(
          (result) => {
            let message = {version: result.version, data: result.data, type:"init"};
            ws.send(JSON.stringify(message));
          }
        )

      }


    });

  });

}




module.exports = websockets;
