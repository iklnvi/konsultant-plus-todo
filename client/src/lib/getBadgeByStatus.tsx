import {
	STATUS_DISPLAY,
	type Status,
	type StatusBadge,
} from '../types/TodoType';

export const getBadgeByStatus = (status: Status): StatusBadge => {
	return STATUS_DISPLAY[status];
};
