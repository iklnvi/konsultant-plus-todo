import { useEffect } from 'react';
import type { Status, TodoType } from '../../types/TodoType';

interface MenuProps {
	isOpen: boolean;
	position: { x: number; y: number };
	onClose: () => void;
	onEdit: () => void;
	onDelete: () => void;
	onChangeStatus: () => void;
}

export default function Menu({
	isOpen,
	position,
	onClose,
	onEdit,
	onDelete,
	onChangeStatus,
}: MenuProps) {
	useEffect(() => {
		const handleClickOutside = () => {
			if (isOpen) onClose();
		};

		document.addEventListener('click', handleClickOutside);
		return () =>
			document.removeEventListener('click', handleClickOutside);
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div
			style={{
				position: 'fixed',
				top: position.y,
				left: position.x,
				backgroundColor: 'var(--card-bg)',
				border: '1px solid var(--border-color)',
				borderRadius: 'var(--border-radius)',
				padding: '0.5rem 0',
				minWidth: '150px',
				boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
				zIndex: 1001,
			}}
			onClick={(e) => e.stopPropagation()}
		>
			<button
				onClick={onEdit}
				style={{
					width: '100%',
					padding: '0.5rem 1rem',
					border: 'none',
					backgroundColor: 'transparent',
					color: 'var(--text-color)',
					textAlign: 'left',
					cursor: 'pointer',
				}}
				onMouseEnter={(e) =>
					(e.currentTarget.style.backgroundColor =
						'var(--bg-secondary)')
				}
				onMouseLeave={(e) =>
					(e.currentTarget.style.backgroundColor = 'transparent')
				}
			>
				Редактировать
			</button>

			<button
				onClick={onChangeStatus}
				style={{
					width: '100%',
					padding: '0.5rem 1rem',
					border: 'none',
					backgroundColor: 'transparent',
					color: 'var(--text-color)',
					textAlign: 'left',
					cursor: 'pointer',
				}}
				onMouseEnter={(e) =>
					(e.currentTarget.style.backgroundColor =
						'var(--bg-secondary)')
				}
				onMouseLeave={(e) =>
					(e.currentTarget.style.backgroundColor = 'transparent')
				}
			>
				Сменить статус
			</button>

			<div
				style={{
					height: '1px',
					backgroundColor: 'var(--border-color)',
					margin: '0.25rem 0',
				}}
			/>

			<button
				onClick={onDelete}
				style={{
					width: '100%',
					padding: '0.5rem 1rem',
					border: 'none',
					backgroundColor: 'transparent',
					color: '#e74c3c',
					textAlign: 'left',
					cursor: 'pointer',
				}}
				onMouseEnter={(e) =>
					(e.currentTarget.style.backgroundColor =
						'var(--bg-secondary)')
				}
				onMouseLeave={(e) =>
					(e.currentTarget.style.backgroundColor = 'transparent')
				}
			>
				Удалить
			</button>
		</div>
	);
}
