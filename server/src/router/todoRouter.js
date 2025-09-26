const express = require('express');
const { Todo } = require('../../models');

const todoRouter = express.Router();

todoRouter
	.get('/', async (req, res) => {
		try {
			const todos = await Todo.findAll();
			res.status(200).json(todos);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	})
	.post('/', async (req, res) => {
		try {
			const { title, description, status, deadline } = req.body;
			const newTodo = await Todo.create({
				title,
				description,
				status,
				deadline,
			});
			res.status(201).json(newTodo);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	});

todoRouter
	.delete('/:id', async (req, res) => {
		try {
			const { id } = req.params;
			const todo = await Todo.findByPk(id);
			if (!todo) {
				return res.status(404).json({ error: 'Todo not found' });
			}
			await todo.destroy();
			res.status(204).end();
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	})
	.patch('/:id', async (req, res) => {
		try {
			const { id } = req.params;
			const { title, description, status, deadline } = req.body;
			const todo = await Todo.findByPk(id);
			if (!todo) {
				return res.status(404).json({ error: 'Todo not found' });
			}
			todo.title = title;
			todo.description = description;
			todo.status = status;
			todo.deadline = deadline;
			await todo.save();
			res.status(200).json(todo);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	});

todoRouter.patch('/:id/status', async (req, res) => {
	try {
		const { id } = req.params;
		const { status } = req.body;

		// проверим, что статус валидный
		const allowedStatuses = ['backlog', 'inProgress', 'done'];
		if (!allowedStatuses.includes(status)) {
			return res.status(400).json({ error: 'Invalid status value' });
		}

		const todo = await Todo.findByPk(id);
		if (!todo) {
			return res.status(404).json({ error: 'Todo not found' });
		}

		todo.status = status;
		await todo.save();

		res.status(200).json(todo);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

module.exports = todoRouter;
