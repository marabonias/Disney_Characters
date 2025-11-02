import { useState, useEffect } from 'react';
import { Grid, Box, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../components/DataTable.jsx';
import CharacterModal from '../components/CharacterModal.jsx';
import PieFilmsChart from '../components/PieFilmsChart.jsx';
import FiltersForm from '../components/FiltersForm.jsx';
import { loadCharacters } from '../features/characters/charactersSlice.js';
import { selectFilteredCharacters } from '../features/characters/charactersSelectors.js';

export default function Dashboard() {
	const [selected, setSelected] = useState(null);
	const dispatch = useDispatch();
	const characters = useSelector(selectFilteredCharacters);
	const { status, error } = useSelector((s) => s.characters);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(loadCharacters());
		}
	}, [dispatch, status]);

	if (status === 'failed') {
		return (
			<Box>
				<Alert severity="error">Error loading characters: {error}</Alert>
			</Box>
		);
	}

	return (
		<Box>
			<Box mb={2}>
				<FiltersForm />
			</Box>
			<Grid container spacing={2} alignItems="flex-start">
				<Grid item xs={12} md={8}>
					<DataTable onSelectRow={setSelected} />
				</Grid>
				<Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'flex-start', marginLeft: 'auto', marginRight: 'auto' }}>
					<PieFilmsChart characters={characters} />
				</Grid>
			</Grid>
			<CharacterModal open={!!selected} onClose={() => setSelected(null)} character={selected} />
		</Box>
	);
}


