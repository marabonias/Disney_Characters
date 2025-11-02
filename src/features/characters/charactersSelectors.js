import { createSelector } from '@reduxjs/toolkit';

// Memoized selector for filtered and sorted characters
export const selectFilteredCharacters = createSelector(
	[
		(state) => state.characters.items,
		(state) => state.characters.filterHasTvShow,
		(state) => state.characters.sortAsc,
	],
	(items, filterHasTvShow, sortAsc) => {
		let filtered = items;
		
		// Apply filter if needed
		if (filterHasTvShow) {
			filtered = items.filter((c) => Array.isArray(c.tvShows) && c.tvShows.length > 0);
		}
		
		// Apply sort (items are already sorted from API, but re-sort filtered results)
		return [...filtered].sort((a, b) => {
			const an = (a.name || '').toLowerCase();
			const bn = (b.name || '').toLowerCase();
			if (an < bn) return sortAsc ? -1 : 1;
			if (an > bn) return sortAsc ? 1 : -1;
			return 0;
		});
	}
);

