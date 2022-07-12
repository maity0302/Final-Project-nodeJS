const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  uploadSingleFile,
  uploadMultipleFiles,
} = require("../util/uploadImage");

universityController = require("../app/controllers/UniversityController");

router.get("/search", universityController.search);
router.get("/create", universityController.create);
router.post(
  "/store",
  (req, res, next) => {
    uploadMultipleFiles(req, res, (err) => {
      if (
        (!err instanceof multer.MulterError &&
          err.code === "LIMIT_UNEXPECTED_FILE") ||
        err
      ) {
        res.render("error");
      } else {
        next();
      }
    });
  },
  universityController.store
);
router.get("/:id/edit", universityController.edit);
router.put(
  "/:id",
  (req, res, next) => {
    uploadMultipleFiles(req, res, (err) => {
      if (
        (!err instanceof multer.MulterError &&
          err.code === "LIMIT_UNEXPECTED_FILE") ||
        err
      ) {
        res.render("error");
      } else {
        next();
      }
    });
  },
  universityController.update
);
router.delete("/:id", universityController.delete);
router.get("/:slug", universityController.show);

module.exports = router;
