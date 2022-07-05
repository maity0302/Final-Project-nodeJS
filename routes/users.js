var express = require('express');
var router = express.Router();

const usersController = require('../app/controllers/UserController');

router.get('/', usersController.create);

module.exports = router;
