import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.ts';
import Team from '../models/Team.ts';
import Activity from '../models/Activity.ts';
import Workout from '../models/Workout.ts';
import LeaderboardEntry from '../models/LeaderboardEntry.ts';

// Seed the octofit_db database with test data
dotenv.config();

const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

async function seed() {
  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB for seeding:', mongoUri);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
  ]);

  console.log('Cleared existing octofit_db collections.');

  const teams = await Team.create([
    { name: 'Pacific Pace', description: 'A motivated coastal running team.' },
    { name: 'Midtown Movers', description: 'Team focused on daily consistency and strength.' },
  ]);

  const users = await User.create([
    {
      name: 'Ava Brooks',
      email: 'ava.brooks@example.com',
      role: 'member',
      team: teams[0]._id,
      metrics: { totalPoints: 920, totalWorkouts: 24, totalMinutes: 980 },
    },
    {
      name: 'Noah Patel',
      email: 'noah.patel@example.com',
      role: 'coach',
      team: teams[0]._id,
      metrics: { totalPoints: 1120, totalWorkouts: 30, totalMinutes: 1100 },
    },
    {
      name: 'Mia Chen',
      email: 'mia.chen@example.com',
      role: 'member',
      team: teams[1]._id,
      metrics: { totalPoints: 850, totalWorkouts: 20, totalMinutes: 760 },
    },
  ]);

  teams[0].members = [users[0]._id, users[1]._id];
  teams[1].members = [users[2]._id];
  await Promise.all(teams.map((team) => team.save()));

  const workouts = await Workout.create([
    {
      title: 'Sunrise Strength Circuit',
      description: 'Full-body strength session with core and mobility work.',
      intensity: 'high',
      durationMinutes: 45,
      exercises: ['push-ups', 'kettlebell swings', 'planks', 'box jumps'],
    },
    {
      title: 'Recovery Ride',
      description: 'Light cycling workout for active recovery.',
      intensity: 'low',
      durationMinutes: 35,
      exercises: ['easy spin', 'cadence drills'],
    },
    {
      title: 'HIIT Endurance Blast',
      description: 'High-intensity interval training to boost conditioning.',
      intensity: 'high',
      durationMinutes: 30,
      exercises: ['burpees', 'sprint intervals', 'mountain climbers'],
    },
  ]);

  const activities = await Activity.create([
    {
      user: users[0]._id,
      type: 'Running',
      durationMinutes: 42,
      caloriesBurned: 520,
      distanceKm: 8.4,
      date: new Date(Date.now() - 1000 * 60 * 60 * 24),
      notes: 'Morning tempo run along the coast.',
    },
    {
      user: users[1]._id,
      type: 'Strength Training',
      durationMinutes: 55,
      caloriesBurned: 610,
      distanceKm: 0,
      date: new Date(Date.now() - 1000 * 60 * 60 * 48),
      notes: 'Heavy compound lifts followed by core conditioning.',
    },
    {
      user: users[2]._id,
      type: 'Cycling',
      durationMinutes: 34,
      caloriesBurned: 400,
      distanceKm: 16.2,
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      notes: 'Recovery ride with focus on cadence.',
    },
  ]);

  await LeaderboardEntry.create([
    {
      user: users[1]._id,
      team: teams[0]._id,
      score: 1120,
      rank: 1,
    },
    {
      user: users[0]._id,
      team: teams[0]._id,
      score: 920,
      rank: 2,
    },
    {
      user: users[2]._id,
      team: teams[1]._id,
      score: 850,
      rank: 3,
    },
  ]);

  console.log('Inserted teams:', teams.length);
  console.log('Inserted users:', users.length);
  console.log('Inserted workouts:', workouts.length);
  console.log('Inserted activities:', activities.length);
  console.log('Inserted leaderboard entries.');

  await mongoose.disconnect();
  console.log('Seeding complete and disconnected from MongoDB.');
}

seed().catch((error) => {
  console.error('Seed script failed:', error);
  process.exit(1);
});
