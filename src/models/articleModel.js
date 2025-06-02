import prisma from "../config/database.js";

class ArticleModel {
	static async getAllPublished() {
		return await prisma.article.findMany({
			where: {
				published: true,
			},
		});
	}

	static async getAll() {
		return await prisma.article.findMany();
	}

	static async getById(id) {
		return await prisma.article.findUnique({
			where: {
				id: parseInt(id),
			},
		});
	}

	static async create(data) {
		const { title, content, author } = data;

		return await prisma.article.create({
			data: { title, content, author },
		});
	}

	static async update(id, data) {
		const existingArticle = await ArticleModel.getById(id);

		if (!existingArticle) {
			throw new Error("Article not found");
		}

		return await prisma.article.update({
			where: {
				id: parseInt(id),
			},
			data,
		});
	}

	static async delete(id) {
		const existingArticle = await ArticleModel.getById(id);

		if (!existingArticle) {
			throw new Error("Article not found");
		}

		return await prisma.article.delete({
			where: {
				id: parseInt(id),
			},
		});
	}

	static async publish(id) {
		const existingArticle = await ArticleModel.getById(id);

		if (!existingArticle) {
			throw new Error("Article not found");
		}

		return await prisma.article.update({
			where: {
				id: parseInt(id),
			},
			data: {
				published: true,
			},
		});
	}

	static async searchByTitle(query) {
		return await prisma.article.findMany({
			where: {
				title: {
					contains: query,
				},
			},
		});
	}
}

export default ArticleModel;
