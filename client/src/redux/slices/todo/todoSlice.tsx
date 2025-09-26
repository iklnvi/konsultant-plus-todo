import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type {
	TodoType,
	CreateTodoType,
	UpdateTodoType,
} from '../../../types/TodoType';
import {
	createTodoThunk,
	deleteTodoThunk,
	getTodoByIdThunk,
	getTodosThunk,
	updateTodoThunk,
} from './todoThunk';

interface TodoState {
	data: TodoType[];
	loading: boolean;
	error: string | null;
	chosenTodo: TodoType | null;
}

const initialState: TodoState = {
	data: [],
	loading: false,
	error: null,
	chosenTodo: null,
};

export const todoSlice = createSlice({
	name: 'todo',
	initialState,
	reducers: {
		// Синхронные actions
		setTodos: (state, action: PayloadAction<TodoType[]>) => {
			state.data = action.payload;
		},

		addTodo: (state, action: PayloadAction<CreateTodoType>) => {
			const newId =
				state.data.length > 0
					? Math.max(...state.data.map((todo) => todo.id)) + 1
					: 1;

			const newTodo: TodoType = {
				...action.payload,
				id: newId,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};
			state.data.unshift(newTodo); // Добавляем в начало
		},

		updateTodo: (
			state,
			action: PayloadAction<{ id: number; updates: UpdateTodoType }>,
		) => {
			const todo = state.data.find(
				(todo) => todo.id === action.payload.id,
			);
			if (todo) {
				Object.assign(todo, {
					...action.payload.updates,
					updatedAt: new Date().toISOString(),
				});
			}
		},

		updateTodoStatus: (
			state,
			action: PayloadAction<{
				id: number;
				status: 'backlog' | 'inProgress' | 'done';
			}>,
		) => {
			const todo = state.data.find((t) => t.id === action.payload.id);
			if (todo) {
				todo.status = action.payload.status;
			}
		},

		deleteTodo: (state, action: PayloadAction<number>) => {
			state.data = state.data.filter(
				(todo) => todo.id !== action.payload,
			);
		},

		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},

		setError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload;
		},

		setChosenTodo: (
			state,
			action: PayloadAction<TodoType | null>,
		) => {
			state.chosenTodo = action.payload;
		},

		clearError: (state) => {
			state.error = null;
		},

		// actions
		moveTodoToStatus: (
			state,
			action: PayloadAction<{
				id: number;
				status: 'backlog' | 'inProgress' | 'done';
			}>,
		) => {
			const todo = state.data.find(
				(todo) => todo.id === action.payload.id,
			);
			if (todo) {
				todo.status = action.payload.status;
				todo.updatedAt = new Date().toISOString();
			}
		},

		clearTodos: (state) => {
			state.data = [];
		},
	},
	extraReducers: (builder) => {
		builder
			// Get All Todos
			.addCase(getTodosThunk.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getTodosThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(getTodosThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to load todos';
			})

			// Get Todo By ID
			.addCase(getTodoByIdThunk.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getTodoByIdThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.chosenTodo = action.payload;
			})
			.addCase(getTodoByIdThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to load todo';
			})

			// Create Todo
			.addCase(createTodoThunk.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createTodoThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.data.unshift(action.payload); // Добавляем в начало
			})
			.addCase(createTodoThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to create todo';
			})

			// Update Todo
			.addCase(updateTodoThunk.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateTodoThunk.fulfilled, (state, action) => {
				state.loading = false;
				const index = state.data.findIndex(
					(todo) => todo.id === action.payload.id,
				);
				if (index !== -1) {
					state.data[index] = action.payload;
				}
				// Обновляем chosenTodo если он редактируется
				if (
					state.chosenTodo &&
					state.chosenTodo.id === action.payload.id
				) {
					state.chosenTodo = action.payload;
				}
			})
			.addCase(updateTodoThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to update todo';
			})

			// Delete Todo
			.addCase(deleteTodoThunk.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteTodoThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.data = state.data.filter(
					(todo) => todo.id !== action.payload,
				);
				// Очищаем chosenTodo если удаляем текущую выбранную задачу
				if (
					state.chosenTodo &&
					state.chosenTodo.id === action.payload
				) {
					state.chosenTodo = null;
				}
			})
			.addCase(deleteTodoThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to delete todo';
			});
	},
});

export const {
	setTodos,
	addTodo,
	updateTodo,
	deleteTodo,
	setLoading,
	setError,
	setChosenTodo,
	clearError,
	moveTodoToStatus,
	clearTodos,
} = todoSlice.actions;

export default todoSlice.reducer;
