import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './features/characters/charactersSlice.js';

const store = configureStore({
	reducer: {
		characters: charactersReducer,
	},
});

export default store;





