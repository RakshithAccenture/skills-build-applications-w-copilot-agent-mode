import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

export async function connectDatabase(): Promise<typeof mongoose> {
  return mongoose.connect(MONGODB_URI);
}

export default mongoose;
