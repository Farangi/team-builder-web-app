import { Router } from 'express';
import { getOptimalTeam } from '../controllers/team';

const router = Router();

// Get optimal team
router.get('/', getOptimalTeam)

export default router;
