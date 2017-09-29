var file = require('../models/file')
var WebSocket = require('ws');

const websockets = function (server) {

  var wss = new WebSocket.Server({ server });


  wss.on( 'connection',(ws) => {
    console.log('Client connected');

    var data = { "_id" : 1 , "data" : "abcd" };

    file.create(data, (err, small) => {
      if (err) console.log(err);
      // saved!
    });

    console.log(data);

    file.findOne({"_id": 1},(err, found) => {
      if (err) console.log(err);
      console.log(found);
    });

    ws.on('close', () => console.log('Client.disconnected') );

    ws.on('message', (data) => {
      wss.clients.forEach( (client) => {

        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(data);
        }

      });
    });

  });

}




module.exports = websockets;
