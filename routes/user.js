const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');

router.get('/signup', userController.signup);
router.get('/login',userController.login);
router.post('/store', userController.store);
module.exports = router;