const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');
const { uploadSingleFile, uploadMultipleFiles} = require('../util/uploadImage');

router.get('/profile',meController.profile);
router.post('/edit',uploadSingleFile.single('image'), meController.edit);
module.exports = router;