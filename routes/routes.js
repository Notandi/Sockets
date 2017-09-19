module.exports = function() {
    var app = require('express');
    var router = app.Router();


    router.get('/', function(req, res, next) {
      res.render('index', { title: 'Express' });
    });

    /*router.get('/new', function(req, res, next) {
      res.render('index2', { title: 'Express' });
    });

    router.get('/room/:id',function(req, res, next) {
      res.render('room')
    })*/

    return router;
}
