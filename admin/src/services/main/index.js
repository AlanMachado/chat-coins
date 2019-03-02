module.exports = (req, res) => {
    return res.render('main/index', {
        title: 'Chatcoins - admin',
        user_logged: req.user
    });
}