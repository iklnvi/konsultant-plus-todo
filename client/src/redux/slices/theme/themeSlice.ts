import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Theme = 'light' | 'dark';

interface ThemeState {
	current: Theme;
}

const initialState: ThemeState = {
	current: 'light',
};

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		toggleTheme(state) {
			state.current = state.current === 'light' ? 'dark' : 'light';
		},
		setTheme(state, action: PayloadAction<Theme>) {
			state.current = action.payload;
		},
	},
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
