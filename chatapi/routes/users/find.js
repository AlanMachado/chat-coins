var Users = require('../../model/users');

module.exports = (req, res) => {
    Users
        .find()
        .then(users => {
            if (!users || users.length === 0) {
                return res.status(404).json({
                    status: false,
                    users
                });
            }

            return res.status(200).json({
                status: true,
                users
            });
        })
        .catch(err => {
            return res.status(500).json({
                status: false,
                err
            });
        });
}