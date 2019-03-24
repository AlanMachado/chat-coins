var express = require('express');
var router = express.Router();

router.post('/', require('./auth'));

module.exports = router;