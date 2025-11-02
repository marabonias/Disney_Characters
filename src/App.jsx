import { Container, Box, Typography } from '@mui/material';
import Dashboard from './pages/Dashboard.jsx';

export default function App() {
	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', py: 3 }}>
			<Container maxWidth="xl" sx={{ width: '100%' }}>
				<Box py={3}>
					<Typography variant="h4" gutterBottom className="dashboard-title" sx={{ mb: 2 }}>
						Disney Characters 
					</Typography>
					<Dashboard />
				</Box>
			</Container>
		</Box>
	);
}


