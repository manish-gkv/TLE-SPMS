import mongoose from 'mongoose';
import {MONGODB_CONNECTION_STRING} from '../utility/constant.js';

export default async function connectDatabase() {
    /*
        Connects to the MongoDB database using the connection string from environment variables.
    */
    try{
        await mongoose.connect(MONGODB_CONNECTION_STRING);
        console.log('Database connected successfully');
    }
    catch(error) {
        console.error('Database connection failed:', error);
    }
}