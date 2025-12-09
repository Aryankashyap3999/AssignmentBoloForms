import mongoose from 'mongoose';
import { DB_URL } from './serverConfig.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
}