import type { AxiosInstance } from 'axios';
import axiosInstance from '../axiosInstance';
import type {
	TodoType,
	CreateTodoType,
	UpdateTodoType,
} from '../types/TodoType';

class TodoService {
	constructor(private client: AxiosInstance) {}

	async getTodos(): Promise<TodoType[]> {
		try {
			const response = await this.client.get('/getTodo');
			return response.data;
		} catch (error) {
			console.log(error);
			return Promise.reject(error);
		}
	}

	async getTodoById(id: TodoType['id']): Promise<TodoType> {
		try {
			const response = await this.client.get(`/getTodo/${id}`);
			return response.data;
		} catch (error) {
			console.log(error);
			return Promise.reject(error);
		}
	}

	async createTodo(todo: CreateTodoType): Promise<TodoType> {
		try {
			const response = await this.client.post('/getTodo', todo);
			return response.data;
		} catch (error) {
			console.log(error);
			return Promise.reject(error);
		}
	}

	async updateTodo(
		id: TodoType['id'],
		updates: UpdateTodoType,
	): Promise<TodoType> {
		try {
			const response = await this.client.put(
				`/getTodo/${id}`,
				updates,
			);
			return response.data;
		} catch (error) {
			console.log(error);
			return Promise.reject(error);
		}
	}

	async deleteTodo(id: TodoType['id']): Promise<number> {
		try {
			await this.client.delete(`/getTodo/${id}`);
			return id;
		} catch (error) {
			console.log(error);
			return Promise.reject(error);
		}
	}

	async getTodosByStatus(
		status: 'backlog' | 'inProgress' | 'done',
	): Promise<TodoType[]> {
		try {
			const response = await this.client.get('/getTodo', {
				params: { status },
			});
			return response.data;
		} catch (error) {
			console.log(error);
			return Promise.reject(error);
		}
	}

	async getOverdueTodos(): Promise<TodoType[]> {
		try {
			const response = await this.client.get('/getTodo/overdue');
			return response.data;
		} catch (error) {
			console.log(error);
			return Promise.reject(error);
		}
	}

	async changeTodoStatus(
		id: TodoType['id'],
		status: 'backlog' | 'inProgress' | 'done',
	): Promise<TodoType> {
		try {
			const response = await this.client.patch(
				`/getTodo/${id}/status`,
				{ status },
			);
			return response.data;
		} catch (error) {
			console.log(error);
			return Promise.reject(error);
		}
	}

	async searchTodos(query: string): Promise<TodoType[]> {
		try {
			const response = await this.client.get('/getTodo/search', {
				params: { q: query },
			});
			return response.data;
		} catch (error) {
			console.log(error);
			return Promise.reject(error);
		}
	}

	async reorderTodos(todoIds: number[]): Promise<TodoType[]> {
		try {
			const response = await this.client.patch('/getTodo/reorder', {
				todoIds,
			});
			return response.data;
		} catch (error) {
			console.log(error);
			return Promise.reject(error);
		}
	}
}

const todoService = new TodoService(axiosInstance);

export default todoService;
