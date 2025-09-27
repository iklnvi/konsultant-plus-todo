import { Outlet } from 'react-router-dom';
import Loader from '../HOC/Loader';
import { useAppSelector } from '../../redux/hooks/hooks';
import classes from './style.module.scss';
import Switch from '../Switch/Switch';

export default function Layout() {
	const loading = useAppSelector((s) => s.todo.loading);

	return (
		<Loader loading={loading} type="spinner">
			<>
				<div className={classes.wrapper}>
					<div className={classes.header}>
						<h1 className={classes.title}>TODO</h1>
						<Switch />
					</div>
				</div>
				<Outlet />
			</>
		</Loader>
	);
}
