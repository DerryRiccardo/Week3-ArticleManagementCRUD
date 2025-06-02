import ArticleModel from "../models/articleModel.js";
import Joi from "joi";

class ArticleController {
	static async getAllPublishedArticles(req, res) {
		try {
			const article = await ArticleModel.getAllPublished();

			res.status(200).json({
				success: true,
				message: "Published articles retrieved successfully",
				data: article,
				count: article.length,
			});
		} catch (err) {
			res.status(500).json({
				success: false,
				message: "Failed to retrieve published articles",
				error: err.message,
			});
		}
	}

	static async getAllArticles(req, res) {
		try {
			const article = await ArticleModel.getAll();

			res.status(200).json({
				success: true,
				message: "All articles retrieved successfully",
				data: article,
				count: article.length,
			});
		} catch (err) {
			res.status(500).json({
				success: false,
				message: "Failed to retrieve articles",
				error: err.message,
			});
		}
	}

	static async createArticle(req, res) {
		const scheme = Joi.object({
			title: Joi.string().required(),
			content: Joi.string().required(),
			author: Joi.string().required(),
		});

		try {
			await scheme.validateAsync(req.body);
			
			const article = await ArticleModel.create(req.body);

			res.status(201).json({
				success: true,
				message: "Article created successfully",
				data: article,
			});
		} catch (err) {
			if (err.isJoi) {
				return res.status(400).json({
					success: false,
					message: "Title, content, and author are required",
				});
			}

			res.status(400).json({
				success: false,
				message: "Failed to create article",
				error: err.message,
			});
		}
	}

	static async updateArticle(req, res) {
		const scheme = Joi.object({
			title: Joi.string().optional(),
			content: Joi.string().optional(),
			author: Joi.string().optional(),
			published: Joi.boolean().optional(),
		});

		try {
			await scheme.validateAsync(req.body);

			const article = await ArticleModel.update(req.params.id, req.body);

			res.status(200).json({
				success: true,
				message: "Article updated successfully",
				data: article,
			});
		} catch (err) {
			if (err.isJoi) {
				return res.status(400).json({
					success: false,
					message: "Invalid data format",
				});
			}

			const status = err.message === "Article not found" ? 404 : 400;
			res.status(status).json({
				success: false,
				message: "Failed to update article",
				error: err.message,
			});
		}
	}

	static async deleteArticle(req, res) {
		try {
			await ArticleModel.delete(req.params.id);

			res.status(200).json({
				success: true,
				message: "Article deleted successfully",
			});
		} catch (err) {
			const status = err.message === "Article not found" ? 404 : 500;
			res.status(status).json({
				success: false,
				message: "Failed to delete article",
				error: err.message,
			});
		}
	}

	static async publishArticle(req, res) {
		try {
			const article = await ArticleModel.publish(req.params.id);

			res.status(200).json({
				success: true,
				message: "Article published successfully",
				data: article,
			});
		} catch (err) {
			const status = err.message === "Article not found" ? 404 : 500;
			res.status(status).json({
				success: false,
				message: "Failed to publish article",
				error: err.message,
			});
		}
	}

	static async searchArticleByTitle(req, res) {
		try {
			const { q } = req.query;

			if (!q) {
				return res.status(400).json({
					success: false,
					message: "Search query is required",
				});
			}

			const article = await ArticleModel.searchByTitle(q);

			res.status(200).json({
				success: true,
				message:
					article.length > 0
						? "Search completed successfully"
						: "No articles found matching your search",
				data: article,
				query: q,
				count: article.length,
			});
		} catch (err) {
			res.status(500).json({
				success: false,
				message: "Search failed",
				error: err.message,
			});
		}
	}
}

export default ArticleController;
