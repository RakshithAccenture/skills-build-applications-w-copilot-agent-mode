import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { API_URL, DEFAULT_PORT, MONGODB_URI } from './config.ts';
import usersRoute from './routes/users.ts';
import teamsRoute from './routes/teams.ts';
import activitiesRoute from './routes/activities.ts';
import leaderboardRoute from './routes/leaderboard.ts';
import workoutsRoute from './routes/workouts.ts';

const app = express();
const port = Number(process.env.PORT ?? DEFAULT_PORT);

app.use(cors({ origin: API_URL }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-tracker-backend', apiUrl: API_URL });
});

app.use('/api/users', usersRoute);
app.use('/api/teams', teamsRoute);
app.use('/api/activities', activitiesRoute);
app.use('/api/leaderboard', leaderboardRoute);
app.use('/api/workouts', workoutsRoute);

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log(`Connected to MongoDB at ${MONGODB_URI}`);
  app.listen(port, () => {
    console.log(`OctoFit Tracker backend running on http://localhost:${port}`);
  });
}

main().catch((error) => {
  console.error('Failed to start server', error);
  process.exit(1);
});
