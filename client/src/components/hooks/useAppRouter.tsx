import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import HomePage from '../../pages/HomePage/HomePage';

export default function useAppRouter(): ReturnType<
	typeof createBrowserRouter
> {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Layout />,
			children: [
				{
					path: '/',
					element: <HomePage />,
				},
				{
					path: '*',
					element: <Navigate to="/" />,
				},
			],
		},
	]);

	return router;
}
