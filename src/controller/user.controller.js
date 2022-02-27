const db = require('../db');

class UserController {
	async createUser(req, res) {
		try {
			const { name, surname } = req.body;
			const newPerson = await db.query(`INSERT INTO person (name, surname) VALUES ($1, $2) RETURNING *`, [name, surname]);
			res.status(200).json({
				status: 200,
				message: "Пользователь успешно создан",
				result: newPerson.rows[0]
			});
		} catch (error) {
			res.status(500).json({
				status: 500,
				message: error
			})
		}
	}

	async getUsers(req, res) {
		try {
			const users = await db.query("SELECT * FROM person");
			res.status(200).json({
				status: 200,
				message: "Вы успешно получили всех пользователей",
				result: users.rows
			})
		} catch (error) {
			res.status(500).json({
				status: 500,
				message: error
			})
		}
	}

	async getUserById(req, res) {
		try {
			const { id } = req.params;
			const user = await db.query("SELECT * FROM person WHERE id = $1", [id]);
			res.status(200).json({
				status: 200,
				message: "Успешное получение пользователя",
				result: user.rows[0]
			})
		} catch (error) {
			res.status(500).json({
				status: 500,
				message: error
			})
		}
	}

	async updateUser(req, res) {
		try {
			const { id, name, surname } = req.body;
			let user = await db.query("UPDATE person set name = $1, surname = $2 where id = $3 RETURNING *", [name, surname, id])
			res.status(200).json({
				status: 200,
				message: "Успешное обновление пользователя",
				result: user.rows[0]
			})
		} catch (error) {
			res.status(500).json({
				status: 500,
				message: error
			})
		}
	}

	async deleteUserById(req, res) {
		try {
			const { id } = req.params;
			const user = await db.query(`DELETE FROM person WHERE id = $1`, [id]);
			res.status(200).json({
				status: 200,
				message: "Пользователь успешно удалён",
				result: user.rows[0]
			})
		} catch (error) {
			res.status(500).json({
				status: 500,
				message: error
			})
		}
	}
}

module.exports = new UserController();