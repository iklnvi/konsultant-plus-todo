import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './slices/todo/todoSlice';
import themeReducer from './slices/theme/themeSlice';

export const store = configureStore({
	reducer: {
		todo: todoReducer,
		theme: themeReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
