import dotenv from 'dotenv';

export default function loadConfig() {
    /*
    Loads environment variables from a .env file into process.env.
    This is useful for managing configuration settings in a secure and flexible way.
    */
    dotenv.config();
}