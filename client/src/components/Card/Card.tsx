import React, { useCallback, useState } from 'react';
import type {
	Status,
	TodoType,
	UpdateTodoType,
} from '../../types/TodoType';
import {
	IconBackpack,
	IconCircleCheck,
	IconDots,
	IconProgress,
} from '@tabler/icons-react';
import { getBadgeByStatus } from '../../lib/getBadgeByStatus';
import Menu from '../Menu/Menu';
import Modal from '../Modal/Modal';
import { useAppDispatch } from '../../redux/hooks/hooks';
import {
	deleteTodoThunk,
	updateTodoThunk,
	changeTodoStatusThunk,
} from '../../redux/slices/todo/todoThunk';

type PropsType = {
	data: TodoType;
};

export default function Card({ data }: PropsType) {
	const dispatch = useAppDispatch();
	const [contextMenu, setContextMenu] = useState<{
		isOpen: boolean;
		position: { x: number; y: number };
	}>({
		isOpen: false,
		position: { x: 0, y: 0 },
	});

	const [modal, setModal] = useState<{
		isOpen: boolean;
		mode: 'edit' | 'status' | 'create';
	}>({
		isOpen: false,
		mode: 'edit',
	});

	const icon = useCallback((status: Status) => {
		switch (getBadgeByStatus(status).icon) {
			case 'backpack':
				return <IconBackpack color="red" />;
			case 'progress':
				return <IconProgress color="var(--orange-700)" />;
			case 'circle-check':
				return <IconCircleCheck color="green" />;
			default:
				return <IconBackpack />;
		}
	}, []);

	const handleMenuOpen = (e: React.MouseEvent) => {
		e.stopPropagation();
		setContextMenu({
			isOpen: true,
			position: { x: e.clientX, y: e.clientY },
		});
	};

	const handleMenuClose = () => {
		setContextMenu({ isOpen: false, position: { x: 0, y: 0 } });
	};

	const handleEdit = () => {
		setModal({ isOpen: true, mode: 'edit' });
		handleMenuClose();
	};

	const handleStatusChange = () => {
		setModal({ isOpen: true, mode: 'status' });
		handleMenuClose();
	};

	const handleDelete = () => {
		if (
			window.confirm('Вы уверены, что хотите удалить эту задачу?')
		) {
			dispatch(deleteTodoThunk(data.id));
		}
		handleMenuClose();
	};

	const handleSave = (
		updatedData: UpdateTodoType | { status: Status },
	) => {
		if ('status' in updatedData) {
			dispatch(
				changeTodoStatusThunk({
					id: data.id,
					status: updatedData.status,
				}),
			);
		} else {
			dispatch(
				updateTodoThunk({ id: data.id, updates: updatedData }),
			);
		}
		setModal({ isOpen: false, mode: 'edit' });
	};

	return (
		<>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: 'var(--gap)',
					padding: 'var(--padding)',
					borderRadius: 'var(--border-radius)',
					backgroundColor: 'var(--card-bg)',
					position: 'relative',
					cursor: 'pointer',
				}}
				onClick={() => setModal({ isOpen: true, mode: 'edit' })}
			>
				<div
					style={{
						display: 'flex',
						width: '100%',
						justifyContent: 'space-between',
						alignItems: 'center',
						color: 'var(--main-text-color)',
					}}
				>
					<h3 style={{ margin: 0 }}>{data.title}</h3>
					<div
						style={{
							display: 'flex',
							gap: 'var(--gap)',
							alignItems: 'center',
						}}
					>
						{icon(data.status)}
						<IconDots
							color="var(--orange-300)"
							onClick={handleMenuOpen}
							style={{ cursor: 'pointer' }}
						/>
					</div>
				</div>
				<p style={{ margin: 0 }}>{data.description}</p>
				<p style={{ margin: 0 }}>
					Закончить до: {new Date(data.deadline).toLocaleDateString()}
				</p>
			</div>

			<Menu
				isOpen={contextMenu.isOpen}
				position={contextMenu.position}
				onClose={handleMenuClose}
				onEdit={handleEdit}
				onDelete={handleDelete}
				onChangeStatus={handleStatusChange}
			/>

			<Modal
				isOpen={modal.isOpen}
				onClose={() => setModal({ isOpen: false, mode: 'edit' })}
				todo={data}
				mode={modal.mode}
				onSave={handleSave}
			/>
		</>
	);
}
