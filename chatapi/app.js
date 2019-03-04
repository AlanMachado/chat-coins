var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');

var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect('mongodb://127.0.0.1:27017/chatcoin_dev', {useNewUrlParser: true});

// we want a property io inside every route.
app.use((req, res, next) => {
    res.io = io;
    next();
});

var sockets = io.sockets;
sockets.on('connection', (socket) => {
    console.log('A new connection has been established');

    socket.on('message room', function(data) {
        socket.broadcast.in(data.room).emit('message room', {
            message: data.message,
            room: data.room
        });
    });

    socket.on('join room', function (data) {
        socket.room = data.room;
        socket.join(socket.room);

        socket.emit('joined room', data);
    });

    socket.on('leave room', function (data) {
        socket.leave(data.room);
        socket.room = '';

        socket.emit('leaved room', true);
    })

});

require('./routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = {
    app,
    server
};
