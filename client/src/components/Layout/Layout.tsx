import { Outlet } from 'react-router-dom';
import Loader from '../HOC/Loader';
import { useAppSelector } from '../../redux/hooks/hooks';

export default function Layout() {
	const loading = useAppSelector((s) => s.todo.loading);

	return (
		<Loader loading={loading} type="spinner">
			<>
				<div
					style={{
						display: 'flex',
						width: '100%',
						justifyContent: 'center',
						alignItems: 'center',
						padding: 'var(--padding)',
					}}
				>
					<h1>TODO</h1>
				</div>
				<Outlet />
			</>
		</Loader>
	);
}
