import dotenv from 'dotenv';

dotenv.config();

export const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;

export const CODEFORCES_API_URL = "https://codeforces.com/api/";

export const INACTIVE_DAYS_THRESHOLD = 7;

export const EMAIL = process.env.EMAIL;

export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;