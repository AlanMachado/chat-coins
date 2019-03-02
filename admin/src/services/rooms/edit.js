const Rooms = require('./../../schemas/rooms')

module.exports = (req, res) => {
    Rooms.findOne({
        slug: req.params.slug
    }).then(room => {
        if(!room) {
            return res.sendStatus(404);
        }

        return res.render('rooms/edit', {
            title: 'Edit Room - ChatCoins',
            room,
            user_logged: req.user
        });
    }).catch(error => {
        return res.send('Error: ' + error);
    })

}