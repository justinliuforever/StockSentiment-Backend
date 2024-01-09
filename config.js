import dotenv from 'dotenv';
dotenv.config();

export const PORT = 5555;
export const mongoDBURL = process.env.MONGO_DBURL

export const POLYGON_API_KEY = process.env.POLYGON_API_KEY;
export const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
export const CHAT_GPT_API_KEY = process.env.CHAT_GPT_API_KEY;
