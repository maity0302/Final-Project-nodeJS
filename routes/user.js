const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');
const { isLoggedOut, isLoggedIn } = require('../util/auth');

router.get('/signup', isLoggedOut, userController.signup);
router.get('/login', isLoggedOut, userController.login);
router.get('/logout', userController.logout);
router.post('/store', userController.store);
router.post('/toLogin', userController.toLogin);
module.exports = router;