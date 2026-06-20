import dotenv from 'dotenv';

dotenv.config();

export const DEFAULT_PORT = 8000;
export const CODESPACE_NAME = process.env.CODESPACE_NAME?.trim();
export const API_URL = process.env.API_URL ?? (
  CODESPACE_NAME
    ? `https://${CODESPACE_NAME}-8000.githubpreview.dev`
    : `http://localhost:${DEFAULT_PORT}`
);
export const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
