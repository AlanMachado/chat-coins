
module.exports = (app, passport) => {
    app.use('/users', passport.authenticate('jwt', {session: false}), require('./routes/users'));
    app.use('/rooms', require('./routes/rooms'));
    app.use('/login', require('./routes/login'));
}