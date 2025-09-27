import { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { createTodoThunk } from '../../redux/slices/todo/todoThunk';
import classes from './style.module.scss';

export default function InputForm() {
	const [value, setValue] = useState('');
	const dispatch = useAppDispatch();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!value.trim()) return;

		const tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);

		dispatch(
			createTodoThunk({
				title: value,
				description: '',
				deadline: tomorrow.toISOString(),
				status: 'backlog',
			}),
		);

		setValue('');
	};

	return (
		<form
			onSubmit={handleSubmit}
			
			className={classes.wrapper}
		>
			<input
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder="Complete test task"
				
				className={classes.input}
			/>
			<button
				
				className={classes.button}
				type="submit"
			>
				Add
			</button>
		</form>
	);
}
