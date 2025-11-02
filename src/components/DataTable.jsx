import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	loadCharacters,
	setPage,
	setPageSize,
	toggleSort,
	setHasTvShow,
} from '../features/characters/charactersSlice.js';
import { selectFilteredCharacters } from '../features/characters/charactersSelectors.js';
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TablePagination,
	Paper,
	FormControlLabel,
	Switch,
	IconButton,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const columns = [
	{ id: 'index', label: '#', minWidth: 50, align: 'center', sticky: 'right' },
	{ id: 'name', label: 'Name', minWidth: 200 },
	{ id: 'tvShows', label: 'TV Shows', minWidth: 100, align: 'center' },
	{ id: 'videoGames', label: 'Video Games', minWidth: 120, align: 'center' },
	{ id: 'allies', label: 'Allies', minWidth: 80, align: 'center' },
	{ id: 'enemies', label: 'Enemies', minWidth: 80, align: 'center' },	
];

export default function DataTable({ onSelectRow }) {
	const dispatch = useDispatch();
	const items = useSelector(selectFilteredCharacters);
	const { page, pageSize, totalPages, status, search, sortAsc, filterHasTvShow, info } =
		useSelector((s) => s.characters);		
		
	useEffect(() => {
		dispatch(loadCharacters());
	}, [dispatch, page, pageSize, search, sortAsc]);

	const handleChangePage = (event, newPage) => {
		dispatch(setPage(newPage + 1));
	};

	const handleChangeRowsPerPage = (event) => {
		dispatch(setPageSize(+event.target.value));
	};

	const totalCount = totalPages > 0 ? totalPages * pageSize : items.length;

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<Box display="flex" gap={2} alignItems="center" p={2} pb={1} justifyContent="flex-end">
				<FormControlLabel
					control={<Switch checked={filterHasTvShow} onChange={(e) => dispatch(setHasTvShow(e.target.checked))} />}
					label="Has TV show"
				/>
			</Box>
			<TableContainer sx={{ maxHeight: 600 }}>
				<Table stickyHeader aria-label="sticky table" size="small">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align || 'left'}
									style={{ minWidth: column.minWidth }}
									sx={
										column.sticky === 'right'
											? {
													position: 'sticky',
													right: 0,
													backgroundColor: 'background.paper',
													zIndex: 3,
											  }
											: { backgroundColor: 'background.paper' }
									}
								>
									{column.id === 'name' ? (
										<Box display="inline-flex" alignItems="center" gap={0.5}>
											{column.label}
											<IconButton
												size="small"
												onClick={() => dispatch(toggleSort())}
												sx={{ ml: 0.5 }}
											>
												{sortAsc ? (
													<ArrowUpwardIcon fontSize="small" />
												) : (
													<ArrowDownwardIcon fontSize="small" />
												)}
											</IconButton>
										</Box>
									) : (
										column.label
									)}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{status === 'loading' && (
							<TableRow>
								<TableCell colSpan={6} align="center">
									Loading…
								</TableCell>
							</TableRow>
						)}
						{status === 'succeeded' && items.length === 0 && (
							<TableRow>
								<TableCell colSpan={6} align="center">
									No results
								</TableCell>
							</TableRow>
						)}
						{items.map((c, index) => (
							<TableRow
								hover
								role="checkbox"
								tabIndex={-1}
								key={c._id}
								sx={{ cursor: 'pointer' }}
								onClick={() => onSelectRow?.(c)}
							>
								{columns.map((column) => {
									let value = '';
									if (column.id === 'name') {
										value = c.name || '';
									} else if (column.id === 'tvShows') {
										value = Array.isArray(c.tvShows) ? c.tvShows.length : 0;
									} else if (column.id === 'videoGames') {
										value = Array.isArray(c.videoGames) ? c.videoGames.length : 0;
									} else if (column.id === 'allies') {
										value = Array.isArray(c.allies) ? c.allies.join(', ') : '';
									} else if (column.id === 'enemies') {
										value = Array.isArray(c.enemies) ? c.enemies.join(', ') : '';
									} else if (column.id === 'index') {
										value = (page - 1) * pageSize + index + 1;
									}
									return (
										<TableCell
											key={column.id}
											align={column.align || 'left'}
											sx={
												column.sticky === 'right'
													? {
															position: 'sticky',
															right: 0,
															backgroundColor: 'background.paper',
															zIndex: 2,
													  }
													: {}
											}
										>
											{value}
										</TableCell>
									);
								})}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 20, 50, 100, 200, 500]}
				component="div"
				count={totalCount}
				rowsPerPage={pageSize}
				page={page - 1}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}


