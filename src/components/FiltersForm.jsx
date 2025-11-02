import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { setSearch } from '../features/characters/charactersSlice.js';

// Debounce 
function useDebounce(value, delay) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => clearTimeout(handler); // Clear timeout if value changes before delay ends
	}, [value, delay]);

	return debouncedValue;
}

export default function FiltersForm() {
	const dispatch = useDispatch();
	const [inputValue, setInputValue] = useState('');

	const debouncedSearch = useDebounce(inputValue, 300);

	useEffect(() => {
		dispatch(setSearch(debouncedSearch));
	}, [debouncedSearch, dispatch]); // Dispatch search action only when debounced value changes

	return (
		<TextField
			className="search-input"
			label="Search characters"
			variant="outlined"
			value={inputValue}
			onChange={(e) => setInputValue(e.target.value)}
			fullWidth
		/>
	);
}