import React, { useEffect } from 'react';
import {
	useAppDispatch,
	useAppSelector,
} from '../../redux/hooks/hooks';
import { toggleTheme } from '../../redux/slices/theme/themeSlice';
import classes from './style.module.scss';
import { IconMoon, IconSun } from '@tabler/icons-react';

export default function Switch() {
	const theme = useAppSelector((s) => s.theme.current);
	const dispatch = useAppDispatch();

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
	}, [theme]);

	return (
		<div onClick={() => dispatch(toggleTheme())}>
			{theme === 'dark' ? (
				<IconSun color="var(--orange-300)" />
			) : (
				<IconMoon color="var(--dimmed)" />
			)}
		</div>
	);
}
