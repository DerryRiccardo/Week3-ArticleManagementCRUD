import express from "express";

import ArticleController from "../controllers/articleController.js";

const router = express.Router();

router.get("/", ArticleController.getAllPublishedArticles);
router.get("/all", ArticleController.getAllArticles);
router.get("/search", ArticleController.searchArticleByTitle);
router.post("/", ArticleController.createArticle);
router.put("/:id", ArticleController.updateArticle);
router.delete("/:id", ArticleController.deleteArticle);
router.patch("/:id/publish", ArticleController.publishArticle); // patch karena cuman ngubah data dikit bukan seluruhnya

export default router;