import { createAsyncThunk } from '@reduxjs/toolkit';
import todoService from '../../../services/todoService';
import type {
	CreateTodoType,
	UpdateTodoType,
} from '../../../types/TodoType';

// GET все задачи
export const getTodosThunk = createAsyncThunk(
	'todos/getTodosThunk',
	async () => todoService.getTodos(),
);

// GET задача по ID
export const getTodoByIdThunk = createAsyncThunk(
	'todos/getTodoByIdThunk',
	async (id: number) => todoService.getTodoById(id),
);

// POST создание задачи
export const createTodoThunk = createAsyncThunk(
	'todos/createTodoThunk',
	async (data: CreateTodoType) => todoService.createTodo(data),
);

// PUT обновление задачи
export const updateTodoThunk = createAsyncThunk(
	'todos/updateTodoThunk',
	async ({ id, updates }: { id: number; updates: UpdateTodoType }) =>
		todoService.updateTodo(id, updates),
);

// DELETE удаление задачи
export const deleteTodoThunk = createAsyncThunk(
	'todos/deleteTodoThunk',
	async (id: number) => todoService.deleteTodo(id),
);

// GET задачи по статусу
export const getTodosByStatusThunk = createAsyncThunk(
	'todos/getTodosByStatusThunk',
	async (status: 'backlog' | 'inProgress' | 'done') =>
		todoService.getTodosByStatus(status),
);

// GET просроченные задачи
export const getOverdueTodosThunk = createAsyncThunk(
	'todos/getOverdueTodosThunk',
	async () => todoService.getOverdueTodos(),
);

// PATCH изменение статуса задачи
export const changeTodoStatusThunk = createAsyncThunk(
	'todos/changeTodoStatusThunk',
	async ({
		id,
		status,
	}: {
		id: number;
		status: 'backlog' | 'inProgress' | 'done';
	}) => todoService.changeTodoStatus(id, status),
);
