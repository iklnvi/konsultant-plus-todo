import { useAppSelector } from '../../redux/hooks/hooks';
import InputForm from '../../components/InputForm/InputForm';
import Card from '../../components/Card/Card';
import classes from './style.module.scss';

export default function HomePage() {
	const data = useAppSelector((s) => s.todo.data);

	return (
		<div className={classes.wrapper}>
			<h3 className={classes.title}>Add new todo</h3>
			<InputForm />

			{data.length < 1 ? (
				<div className={classes.no_data}>
					<p className={classes.title}>Данных нет</p>
				</div>
			) : (
				<>
					<div className={classes.container}>
						<h1 className={classes.title}>Бэклог</h1>
						{(() => {
							const filteredData = data.filter(
								(el) => el.status === 'backlog',
							);
							if (filteredData.length === 0)
								return (
									<div className={classes.no_data}>
										<p className={classes.title}>Данных нет</p>
									</div>
								);
							return filteredData.map((el) => (
								<Card key={el.id} data={el} />
							));
						})()}
					</div>
					<div className={classes.container}>
						<h1 className={classes.title}>В работе</h1>
						{(() => {
							const filteredData = data.filter(
								(el) => el.status === 'inProgress',
							);
							if (filteredData.length === 0)
								return (
									<div className={classes.no_data}>
										<p className={classes.title}>Данных нет</p>
									</div>
								);
							return filteredData.map((el) => (
								<Card key={el.id} data={el} />
							));
						})()}
					</div>

					<div className={classes.container}>
						<h1 className={classes.title}>Выполнено</h1>
						{(() => {
							const filteredData = data.filter(
								(el) => el.status === 'done',
							);
							if (filteredData.length === 0)
								return (
									<div className={classes.no_data}>
										<p className={classes.title}>Данных нет</p>
									</div>
								);
							return filteredData.map((el) => (
								<Card key={el.id} data={el} />
							));
						})()}
					</div>
				</>
			)}
		</div>
	);
}
