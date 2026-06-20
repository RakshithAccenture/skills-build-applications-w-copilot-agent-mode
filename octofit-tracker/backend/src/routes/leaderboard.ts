import { Router } from 'express';
import LeaderboardEntry from '../models/LeaderboardEntry.ts';

const router = Router();

router.get('/', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find()
    .sort({ rank: 1 })
    .populate('user', 'name email role')
    .populate('team', 'name');
  res.json({ leaderboard });
});

export default router;
