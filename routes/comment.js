const express = require('express');
const router = express.Router();

const commentController = require('../app/controllers/CommentController');

router.put('/:id/report', commentController.report);
router.post('/', commentController.add);

module.exports = router;