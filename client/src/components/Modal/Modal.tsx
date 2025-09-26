import React, { useEffect } from 'react';
import type {
	Status,
	TodoType,
	UpdateTodoType,
} from '../../types/TodoType';
import styles from './style.module.scss';

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

	useEffect(() => {
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
		<div className={styles.overlay}>
			<div className={styles.modal}>
				<h3 className={styles.title}>
					{mode === 'edit'
						? 'Редактировать задачу'
						: mode === 'status'
						? 'Сменить статус'
						: 'Новая задача'}
				</h3>

				<form onSubmit={handleSubmit} className={styles.form}>
					{mode !== 'status' && (
						<>
							<div className={styles.formGroup}>
								<p>Title</p>
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
								/>
							</div>

							<div className={styles.formGroup}>
								<p>description</p>
								<textarea
									id="description"
									value={formData.description}
									onChange={(e) =>
										setFormData({
											...formData,
											description: e.target.value,
										})
									}
								/>
							</div>

							<div className={styles.formGroup}>
								<p>Deadline</p>
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
								/>
							</div>
						</>
					)}

					<div className={styles.formGroup}>
						<p>Status</p>
						<select
							id="status"
							value={formData.status}
							onChange={(e) =>
								setFormData({
									...formData,
									status: e.target.value as Status,
								})
							}
						>
							<option value="backlog">Бэклог</option>
							<option value="inProgress">В работе</option>
							<option value="done">Выполнено</option>
						</select>
					</div>

					<div className={styles.actions}>
						<button
							type="button"
							onClick={onClose}
							className={styles.cancel}
						>
							Отмена
						</button>
						<button type="submit" className={styles.save}>
							Сохранить
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
