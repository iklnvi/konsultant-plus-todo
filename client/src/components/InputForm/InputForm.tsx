export default function InputForm() {
	return (
		<div
			style={{
				display: 'flex',
				gap: 'var(--gap)',
				width: '40vw',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<input
				placeholder="Complete test task"
				style={{
					padding: 'var(--padding)',
					borderRadius: 'var(--border-radius)',
					border: '1px solid var(--orange-300)',
					width: '100%',
					color: 'var(--main-text-color)',
				}}
			/>
			<button
				style={{
					padding: 'var(--padding)',
					backgroundColor: 'var(--orange-300)',
					color: 'var(--main-text-color)',
					borderRadius: 'var(--border-radius)',
					border: 'none',
					fontWeight: 'bold',
				}}
				type="submit"
			>
				Add
			</button>
		</div>
	);
}
