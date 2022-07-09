const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');

router.get('/list-university', adminController.list);

module.exports = router;