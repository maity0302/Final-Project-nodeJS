const express = require("express");
const router = express.Router();

universityController = require("../app/controllers/UniversityController");
const { isLoggedOut, isLoggedIn, checkAdmin } = require('../util/auth');

router.get("/search", universityController.search);
router.post('/upvoted',isLoggedIn, universityController.upvote);
router.post('/downvoted',isLoggedIn, universityController.downvote);
router.get("/:slug", universityController.show);

module.exports = router;
