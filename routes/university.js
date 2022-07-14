const express = require("express");
const router = express.Router();

universityController = require("../app/controllers/UniversityController");

router.get("/search", universityController.search);
router.get("/:slug", universityController.show);

module.exports = router;
