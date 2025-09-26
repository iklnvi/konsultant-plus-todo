import React from 'react';
import type {
	Status,
	TodoType,
	UpdateTodoType,
} from '../../types/TodoType';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	todo?: TodoType;
	mode: 'edit' | 'status' | 'create';
	onSave: (data: UpdateTodoType | { status: Status }) => void;
}

export default function Modal({
	isOpen,
	onClose,
	todo,
	mode,
	onSave,
}: ModalProps) {
	const [formData, setFormData] = React.useState({
		title: todo?.title || '',
		description: todo?.description || '',
		deadline: todo?.deadline || '',
		status: todo?.status || ('backlog' as Status),
	});

	React.useEffect(() => {
		if (todo) {
			setFormData({
				title: todo.title,
				description: todo.description,
				deadline: todo.deadline,
				status: todo.status,
			});
		}
	}, [todo]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (mode === 'status') {
			onSave({ status: formData.status });
		} else {
			onSave({
				id: todo?.id || 0,
				...formData,
			});
		}

		onClose();
	};

	if (!isOpen) return null;

	return (
		<div
			style={{
				position: 'fixed',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: 'rgba(0, 0, 0, 0.5)',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				zIndex: 1000,
			}}
		>
			<div
				style={{
					backgroundColor: 'var(--card-bg)',
					padding: 'var(--padding)',
					borderRadius: 'var(--border-radius)',
					minWidth: '400px',
					maxWidth: '90vw',
				}}
			>
				<h3 style={{ margin: '0 0 var(--gap) 0' }}>
					{mode === 'edit'
						? 'Редактировать задачу'
						: mode === 'status'
						? 'Сменить статус'
						: 'Новая задача'}
				</h3>

				<form onSubmit={handleSubmit}>
					{mode !== 'status' && (
						<>
							<div style={{ marginBottom: 'var(--gap)' }}>
								<label
									htmlFor="title"
									style={{ display: 'block', marginBottom: '0.5rem' }}
								>
									Заголовок
								</label>
								<input
									id="title"
									type="text"
									value={formData.title}
									onChange={(e) =>
										setFormData({
											...formData,
											title: e.target.value,
										})
									}
									required
									style={{
										width: '100%',
										padding: '0.5rem',
										borderRadius: '4px',
										border: '1px solid var(--border-color)',
										backgroundColor: 'var(--bg)',
										color: 'var(--text-color)',
									}}
								/>
							</div>

							<div style={{ marginBottom: 'var(--gap)' }}>
								<label
									htmlFor="description"
									style={{ display: 'block', marginBottom: '0.5rem' }}
								>
									Описание
								</label>
								<textarea
									id="description"
									value={formData.description}
									onChange={(e) =>
										setFormData({
											...formData,
											description: e.target.value,
										})
									}
									style={{
										width: '100%',
										padding: '0.5rem',
										borderRadius: '4px',
										border: '1px solid var(--border-color)',
										backgroundColor: 'var(--bg)',
										color: 'var(--text-color)',
										minHeight: '100px',
										resize: 'vertical',
									}}
								/>
							</div>

							<div style={{ marginBottom: 'var(--gap)' }}>
								<label
									htmlFor="deadline"
									style={{ display: 'block', marginBottom: '0.5rem' }}
								>
									Дедлайн
								</label>
								<input
									id="deadline"
									type="datetime-local"
									value={formData.deadline}
									onChange={(e) =>
										setFormData({
											...formData,
											deadline: e.target.value,
										})
									}
									style={{
										width: '100%',
										padding: '0.5rem',
										borderRadius: '4px',
										border: '1px solid var(--border-color)',
										backgroundColor: 'var(--bg)',
										color: 'var(--text-color)',
									}}
								/>
							</div>
						</>
					)}

					<div style={{ marginBottom: 'var(--gap)' }}>
						<label
							htmlFor="status"
							style={{ display: 'block', marginBottom: '0.5rem' }}
						>
							Статус
						</label>
						<select
							id="status"
							value={formData.status}
							onChange={(e) =>
								setFormData({
									...formData,
									status: e.target.value as Status,
								})
							}
							style={{
								width: '100%',
								padding: '0.5rem',
								borderRadius: '4px',
								border: '1px solid var(--border-color)',
								backgroundColor: 'var(--bg)',
								color: 'var(--text-color)',
							}}
						>
							<option value="backlog">Бэклог</option>
							<option value="inProgress">В работе</option>
							<option value="done">Выполнено</option>
						</select>
					</div>

					<div
						style={{
							display: 'flex',
							gap: 'var(--gap)',
							justifyContent: 'flex-end',
						}}
					>
						<button
							type="button"
							onClick={onClose}
							style={{
								padding: '0.5rem 1rem',
								border: '1px solid var(--border-color)',
								borderRadius: '4px',
								backgroundColor: 'transparent',
								color: 'var(--text-color)',
								cursor: 'pointer',
							}}
						>
							Отмена
						</button>
						<button
							type="submit"
							style={{
								padding: '0.5rem 1rem',
								border: 'none',
								borderRadius: '4px',
								backgroundColor: 'var(--accent-primary)',
								color: 'white',
								cursor: 'pointer',
							}}
						>
							Сохранить
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
