const express = require('express');
const router = express.Router();

universityController = require('../app/controllers/UniversityController');

router.get('/create', universityController.create);
router.post('/store',universityController.store);
router.delete('/:id', universityController.delete);
router.get('/:slug', universityController.show);

module.exports = router;