import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Box,
	Typography,
} from '@mui/material';

export default function CharacterModal({ open, onClose, character }) {
	if (!character) return null;
	return (
		<Dialog open={open} onClose={onClose} maxWidth="md" fullWidth className="character-modal">
			<DialogTitle className="character-modal-title">{character.name}</DialogTitle>
			<DialogContent dividers className="character-modal-content">
				<Box className="character-modal-body">
					{character.imageUrl && (
						<img 
							src={character.imageUrl} 
							alt={character.name} 
							className="character-modal-image"
						/>
					)}
					<Box className="character-modal-info">
						<Typography variant="h7" sx={{ fontWeight: 'bold' }}>TV Shows</Typography>
						<Typography variant="body2">{(character.tvShows || []).join(', ') || '—'}</Typography>
						<Typography variant="h7" sx={{ mt: 2, fontWeight: 'bold' }}>
							Video Games
						</Typography>
						<Typography variant="body2">{(character.videoGames || []).join(', ') || '—'}</Typography>
					</Box>
				</Box>
			</DialogContent>
			<DialogActions className="character-modal-actions">
				<Button onClick={onClose}>Close</Button>
			</DialogActions>
		</Dialog>
	);
}


