module.exports = function(io) {
    var app = require('express');
    var router = app.Router();

    io.on('connection', function (socket) {


      socket.on('LogThis', function (data) {
        console.log("stuff");
        socket.broadcast.emit('LogThis', data);
      });


    });

    router.get('/', function(req, res, next) {
      res.render('index', { title: 'Express' });
    });

    return router;
}
