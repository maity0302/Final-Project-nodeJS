const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');

router.get('/signup', userController.signup);

module.exports = router;