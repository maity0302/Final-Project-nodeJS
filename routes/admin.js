const express = require("express");
const router = express.Router();
const multer = require("multer");

const adminController = require("../app/controllers/AdminController");
const { uploadSingleFile, uploadMultipleFiles } = require("../util/uploadImage");

router.get("/list-university", adminController.list);
router.get('/comments', adminController.listcomments);
router.get("/create", adminController.create);
router.post('/:id/verify', adminController.verifyComment);
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
  adminController.store
);
router.get("/:id/edit", adminController.edit);
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
  adminController.update
);
router.delete("/:id/delete", adminController.deleteComment);
router.delete("/:id", adminController.delete);

module.exports = router;
