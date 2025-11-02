import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCharacters } from '../../services/disneyApi.js';

const initialState = {
	items: [], // Initial state of Redux store
	page: 1,
	pageSize: 50,
	totalPages: 0,
	info: null,
	status: 'idle',
	error: null,
	search: '',
	sortAsc: true,
	filterHasTvShow: false,
};

export const loadCharacters = createAsyncThunk(
	'characters/load',
	async (_, { getState }) => {
		const state = getState().characters;
		const data = await fetchCharacters({
			page: state.page,
			pageSize: state.pageSize,
			name: state.search || undefined,
		});
		return data;
	}
);

const charactersSlice = createSlice({
	name: 'characters',
	initialState,
	reducers: {
		setPage(state, action) {
			state.page = action.payload;
		},
		setPageSize(state, action) {
			state.pageSize = action.payload;
			state.page = 1;
		},
		setSearch(state, action) {
			state.search = action.payload;
			state.page = 1;
		},
		toggleSort(state) {
			state.sortAsc = !state.sortAsc;
		},
		setHasTvShow(state, action) {
			state.filterHasTvShow = action.payload;
			state.page = 1;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadCharacters.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(loadCharacters.fulfilled, (state, action) => {
				state.status = 'succeeded';
				const docs = action.payload.data;
				// Store only unfiltered, sorted items - filtering happens in selectors
				const sortedItems = [...docs].sort((a, b) => {
					const an = (a.name || '').toLowerCase();
					const bn = (b.name || '').toLowerCase();
					if (an < bn) return state.sortAsc ? -1 : 1;
					if (an > bn) return state.sortAsc ? 1 : -1;
					return 0;
				});
				state.items = sortedItems;
				state.totalPages = action.payload.info?.totalPages || 0;
				state.info = action.payload.info || null;
			})
			.addCase(loadCharacters.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error?.message || 'Failed to load characters';
			});
	},
});

export const { setPage, setPageSize, setSearch, toggleSort, setHasTvShow } = charactersSlice.actions;
export default charactersSlice.reducer;


