var Users = require('../../model/users');
var jwt = require('jsonwebtoken');

module.exports = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            message: 'Something is not right with your input'
        });
    }

    Users
        .authenticate()(req.body.email, req.body.password, (err, user, option) => {
            if (err) {
                return res.send('Error ' + err);
            }
            return req.login(user, err => {
                if (err) {
                    return res.status(404).json({message: 'User not found'});
                }

                const token = jwt.sign({id: user._id, email: user.email}, '1234');
                return res.json({user: user.name, token});
            });
        })

}