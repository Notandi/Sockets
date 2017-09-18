module.exports = function(io) {
    var app = require('express');
    var router = app.Router();
    var nsp = io.of('/new');
    nsp.on('connection', function (socket) {
      socket.on('insertTextAt', function (data) {
        console.log("text insertion");
        socket.broadcast.emit('insertTextAt', data);
      });

    });

    io.on('connection', function (socket) {

      socket.on('insertTextAt', function (data) {
        console.log("text insertion");
        socket.broadcast.emit('insertTextAt', data);
      });

    });

    router.get('/', function(req, res, next) {
      res.render('index', { title: 'Express' });
    });

    router.get('/new', function(req, res, next) {
      res.render('index2', { title: 'Express' });
    });

    router.get('/room/:id',function(req, res, next) {
      res.render('room')
    })

    return router;
}
