import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    intensity: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    durationMinutes: { type: Number, required: true },
    exercises: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const Workout = mongoose.model('Workout', workoutSchema);
export default Workout;
