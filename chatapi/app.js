var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
var passport = require('passport');
var passportJWT = require("passport-jwt");
var bodyParser = require('body-parser');

var JWTStrategy = passportJWT.Strategy;
var ExtractJWT = passportJWT.ExtractJwt;
var LocalStrategy = require('passport-local').Strategy;

var User = require('./model/users');

var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());


mongoose.connect('mongodb://127.0.0.1:27017/chatcoin_dev', {useNewUrlParser: true});

passport.use('login', new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
        secretOrKey   : '1234'
    },
    (jwtPayload, done) => {
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        try {
            User.findById(jwtPayload.id)
                .then(user => {
                    if (user) {
                        console.log('user found in db in passport');
                        return done(null, user);

                    } else {
                        console.log('user not found');
                        return done(null, false, { message: 'WRONG', jwtPayload });
                    }

                })
                .catch(err => {
                    return done(err);
                });

        }catch (err) {
            return done(err);
        }

    }
));


// we want a property io inside every route.
app.use((req, res, next) => {
    res.io = io;
    next();
});

var sockets = io.sockets;
sockets.on('connection', (socket) => {
    console.log('A new connection has been established');

    socket.on('message room', function(data) {
        socket.broadcast.in(data.room).emit('messaged', {
            message: data.message,
            room: data.room
        });
    });

    socket.on('message user', function (data) {
       socket.broadcast.in(data.user).emit('messaged', {
           message: data.message,
           user: data.user
       });
    });

    socket.on('join user', function (data) {
        socket.user = data.user;
        socket.join(socket.user);

        socket.emit('joined user', data);
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
    });

});

require('./routes')(app, passport);

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
