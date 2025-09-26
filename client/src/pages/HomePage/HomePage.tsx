import React from 'react';
import { useAppSelector } from '../../redux/hooks/hooks';
import InputForm from '../../components/InputForm/InputForm';
import Card from '../../components/Card/Card';
import { getBadgeByStatus } from '../../lib/getBadgeByStatus';

export default function HomePage() {
	const data = useAppSelector((s) => s.todo.data);

	console.log(data);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: 'var(--gap)',
				padding: 'var(--padding)',
				width: '100%',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<h3>Add new todo</h3>
			<InputForm />

			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: 'var(--gap)',
					width: '40vw',
				}}
			>
        <h1>Бэклог</h1>
				{data
					.filter((el) => el.status === 'backlog')
					.map((el) => (
						<Card data={el} />
					))}
			</div>

			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: 'var(--gap)',
					width: '40vw',
				}}
			>
        <h1>В работе</h1>
				{data
					.filter((el) => el.status === 'inProgress')
					.map((el) => (
						<Card data={el} />
					))}
			</div>

			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: 'var(--gap)',
					width: '40vw',
				}}
			>
        <h1>Выполнено</h1>
				{data
					.filter((el) => el.status === 'done')
					.map((el) => (
						<Card data={el} />
					))}
			</div>
		</div>
	);
}
