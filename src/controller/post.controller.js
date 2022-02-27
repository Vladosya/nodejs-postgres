const db = require('../db');

class PostController {
	async createPost(req, res) {
		try {
			const { title, content, user_id } = req.body;
			console.log("user_id: --> ", user_id);
			const newPost = await db.query(`INSERT INTO post (title, content, user_id) VALUES ($1, $2, $3) RETURNING *`, [title, content, user_id]);
			res.status(200).json({
				status: 200,
				message: "Пост успешно создан",
				result: newPost.rows[0]
			});
		} catch (error) {
			res.status(500).json({
				status: 500,
				message: error
			})
		}
	}

	async getPosts(req, res) {
		try {
			const { id } = req.query;
			const posts = await db.query("SELECT * from post where user_id = $1", [id]);
			res.status(200).json({
				status: 200,
				message: "Вы успешно получили все посты",
				result: posts.rows
			})
		} catch (error) {
			res.status(500).json({
				status: 500,
				message: error
			})
		}
	}

	async deletePostById(req, res) {
		try {
			const { id } = req.params;
			const post = await db.query("DELETE FROM post where id = $1", [id])
			res.status(200).json({
				status: 200,
				message: "Пост успешно удалён",
				result: post.rows[0]
			})
		} catch (error) {
			res.status(500).json({
				status: 500,
				message: error
			})
		}
	}
}

module.exports = new PostController();