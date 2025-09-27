import { useEffect } from 'react';
import classes from './style.module.scss';

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
				top: position.y,
				left: position.x,
			}}
			className={classes.wrapper}
			onClick={(e) => e.stopPropagation()}
		>
			<button onClick={onEdit} className={classes.button}>
				Редактировать
			</button>

			<button onClick={onChangeStatus} className={classes.button}>
				Сменить статус
			</button>

			<div className={classes.divider} />

			<button onClick={onDelete} className={classes.delete}>
				Удалить
			</button>
		</div>
	);
}
