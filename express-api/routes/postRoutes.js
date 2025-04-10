const express = require("express");
const postController = require("../controllers/postController");
const upload = require('../config/multer-config');
const router = express.Router();

router.route("/").get(postController.getAllArticles);

router.route("/").post(upload.single('urlimg'), postController.createNewArticle);

router.route("/:id").get(postController.findById);

router.route("/update/:id").put(upload.single('urlimg'), postController.update);

router.route("/delete/:id").delete(postController.deleteById);

module.exports = router;