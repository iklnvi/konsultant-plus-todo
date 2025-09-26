export type Status = 'backlog' | 'inProgress' | 'done';

export interface TodoType {
	id: number;
	title: string;
	description: string;
	status: Status;
	deadline: string;
	createdAt: string;
	updatedAt: string;
}

export type CreateTodoType = Omit<
	TodoType,
	'id' | 'createdAt' | 'updatedAt'
>;

export type UpdateTodoType = Partial<
	Omit<TodoType, 'id' | 'createdAt'>
> & {
	id: number;
};

export const STATUSES = {
	BACKLOG: 'backlog',
	IN_PROGRESS: 'inProgress',
	DONE: 'done',
} as const;

export interface StatusBadge {
	label: string;
	color: string;
	icon: string;
}

export type StatusDisplay = {
	[key in Status]: StatusBadge;
};

export const STATUS_DISPLAY: StatusDisplay = {
	backlog: { label: 'Бэклог', color: 'gray', icon: 'backpack' },
	inProgress: { label: 'В работе', color: 'blue', icon: 'progress' },
	done: { label: 'Выполнено', color: 'green', icon: 'circle-check' },
};
