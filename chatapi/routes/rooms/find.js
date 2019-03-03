var Rooms = require('../../model/rooms');

module.exports = (req, res) => {
    Rooms
        .find()
        .then(rooms => {
            if (!rooms || rooms.length === 0) {
                return res.status(404).json({
                    status: false,
                    rooms
                });
            }

            return res.status(200).json({
                status: true,
                rooms
            });
        })
        .catch(err => {
            return res.status(500).json({
                status: false,
                err
            });
        });
}