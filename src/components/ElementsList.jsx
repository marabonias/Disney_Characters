import { Box, Paper, Typography, Chip, Stack } from '@mui/material';

export default function ElementsList({ title, items }) {
	return (
		<Box component={Paper} p={2}>
			<Typography variant="h6" gutterBottom>
				{title}
			</Typography>
			<Stack direction="row" gap={1} flexWrap="wrap">
			{(!items || items.length === 0) ? (
		<Typography
			variant="body2"
		>
			No items 
		</Typography>
	) : (
	
		items.map((item, index) => (
			<Chip
				key={item._id}
				label={item}
				variant="outlined"
				size="small"
			/>
		))
	)}
			</Stack>
		</Box>
	);
}





