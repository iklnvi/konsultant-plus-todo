import React, { type JSX } from 'react';
import classes from './style.module.scss';

type LoaderProps = {
	children: React.ReactNode;
	loading: boolean;
	size?: 'sm' | 'md' | 'lg' | 'xl';
	color?: string;
	overlay?: boolean;
	text?: string;
	className?: string;
	type?: 'spinner' | 'dots' | 'pulse';
};

export default function Loader({
	children,
	loading,
	size = 'md',
	color = 'var(--orange-500)',
	overlay = false,
	text = 'Loading...',
	className = '',
	type = 'spinner',
}: LoaderProps): JSX.Element {
	const sizeMap = {
		sm: '20px',
		md: '40px',
		lg: '60px',
		xl: '80px',
	};

	const renderSpinner = () => {
		switch (type) {
			case 'dots':
				return (
					<div className={classes.dots_loader} style={{ color }}>
						<div></div>
						<div></div>
						<div></div>
					</div>
				);

			case 'pulse':
				return (
					<div
						className={classes.pulse_loader}
						style={{
							width: sizeMap[size],
							height: sizeMap[size],
							backgroundColor: color,
						}}
					></div>
				);

			case 'spinner':
			default:
				return (
					<div
						className={classes.spinner_loader}
						style={{
							width: sizeMap[size],
							height: sizeMap[size],
							borderColor: color,
						}}
					></div>
				);
		}
	};

	if (loading) {
		if (overlay) {
			return (
				<div className={classes.loader_container}>
					{children}
					<div className={`${classes.loader_overlay} ${className}`}>
						<div className={classes.loader_content}>
							{renderSpinner()}
							{text && (
								<span className={classes.loader_text}>{text}</span>
							)}
						</div>
					</div>
				</div>
			);
		}

		return (
			<div className={`${classes.loader_standalone} ${className}`}>
				<div className={classes.loader_content}>
					{renderSpinner()}
					{text && (
						<span className={classes.loader_text}>{text}</span>
					)}
				</div>
			</div>
		);
	}

	return <>{children}</>;
}
