import { RouterProvider } from 'react-router-dom';
import useAppRouter from './components/hooks/useAppRouter';
import { useAppDispatch } from './redux/hooks/hooks';
import { useEffect } from 'react';
import { getTodosThunk } from './redux/slices/todo/todoThunk';

function App() {
	const dispatch = useAppDispatch();
	const router = useAppRouter();

	useEffect(() => {
		void dispatch(getTodosThunk());
	}, [dispatch]);

	return <RouterProvider router={router} />;
}

export default App;
