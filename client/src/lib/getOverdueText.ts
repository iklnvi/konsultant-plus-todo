export const getOverdueText = (deadline: string) => {
	const now = new Date();
	const end = new Date(deadline);
	const diffMs = now.getTime() - end.getTime();

	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
	if (diffDays > 0) return `${diffDays} дн.`;

	const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
	if (diffHours > 0) return `${diffHours} ч.`;

	const diffMinutes = Math.floor(diffMs / (1000 * 60));
	return `${diffMinutes} мин.`;
};
