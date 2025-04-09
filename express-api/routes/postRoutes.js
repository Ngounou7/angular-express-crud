const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();

router.route("/").get(postController.getAllArticles).post(postController.createNewArticle);

router.route("/:id").get(postController.findById);

module.exports = router;