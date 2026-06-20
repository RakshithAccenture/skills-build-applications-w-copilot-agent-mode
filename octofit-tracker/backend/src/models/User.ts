import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    role: { type: String, enum: ['member', 'coach', 'admin'], default: 'member' },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    joinedAt: { type: Date, default: Date.now },
    metrics: {
      totalPoints: { type: Number, default: 0 },
      totalWorkouts: { type: Number, default: 0 },
      totalMinutes: { type: Number, default: 0 },
    },
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);
export default User;
