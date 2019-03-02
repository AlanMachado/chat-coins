const Rooms = require('./../../schemas/rooms')

module.exports = (req, res) => {
    Rooms
        .find()
        .then(rooms => {
            return res.render('rooms/index', {
                title: 'Rooms - ChatCoins Admin',
                rooms,
                user_logged: req.user
            })
        })
        .catch(error => {
            return res.send('Error: ' + error);
        })
}