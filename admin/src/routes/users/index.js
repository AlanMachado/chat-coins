const express = require('express');
const router = express.Router();
const createRules = require('./../validator/create');
const editRules = require('./../validator/edit');
const removeRules = require('./../validator/remove');
const updateRules = require('./../validator/update');
const isLoggedIn = require('./../middleware/isLoggedIn');


router.get('/', isLoggedIn, require('./../../services/users/index'));
router.get('/new', isLoggedIn, require('./../../services/users/new'));
router.get('/edit/:id', isLoggedIn, require('./../../services/users/edit'));
router.get('/:id', isLoggedIn, require('./../../services/users/show'));
router.post('/', isLoggedIn, createRules, require('./../../services/users/create'));
router.put('/:id', isLoggedIn, require('./../../services/users/update'));
router.patch('/:id', isLoggedIn, require('./../../services/users/update'));
router.delete('/:id', isLoggedIn, require('./../../services/users/remove'));

module.exports = router;