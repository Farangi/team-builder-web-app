import { Router } from 'express';
import { addPlayer, deletePlayer, getPaginatedPlayers } from '../controllers/player';

const router = Router();

// Get paginated players
router.get('/', getPaginatedPlayers);

// Add a player
router.post('/', addPlayer);

// Delete a player
router.delete('/:id', deletePlayer);

export default router;
