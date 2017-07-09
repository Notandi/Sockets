module.exports = function(io) {
    var app = require('express');
    var router = app.Router();

    io.on('connection', function (socket) {

      socket.on('insertTextAt', function (data) {
        console.log("text insertion");
        socket.broadcast.emit('insertTextAt', data);
      });

    });

    router.get('/', function(req, res, next) {
      res.render('index', { title: 'Express' });
    });

    return router;
}
