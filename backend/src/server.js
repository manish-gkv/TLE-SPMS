import express from 'express';
import cors from 'cors';


import connectDatabase from './config/database.js';
import studentRoutes from './routes/student.js';
import jobs from "./services/job.js";
import cornScheduler from './services/cron.js';
import {syncTime, validateCronTime, getCronTime} from './controllers/sync-time.js';
import { get } from 'mongoose';

const app = express();

app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send('TLE-SPMS Backend is running');
});
app.post('/sync-time', syncTime);
app.get('/get-cron-time', getCronTime);
app.post('/validate-cron-time', validateCronTime);
app.use('/students', studentRoutes);

const startServer = async () => {
    await connectDatabase();
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
    cornScheduler.setJob(jobs);
    cornScheduler.schedule();
};

startServer();