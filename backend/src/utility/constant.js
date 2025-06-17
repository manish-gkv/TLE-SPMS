import dotenv from 'dotenv';

dotenv.config();

export const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;

export const CODEFORCES_API_URL = "https://codeforces.com/api/";
