import { StatusCodes } from 'http-status-codes';
import cronScheduler from '../services/cron.js';
import { customErrorResponse } from '../utility/common/responseObject.js';

export default async function syncTime(req, res) {
    try {
        const { cronTime } = req.body;
        if (!cronTime) {
            return res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse({message: 'Cron time is required'}));  
        }
        
        if (!cronScheduler.validateCronTime(cronTime)) {
            return res.status(400).json(customErrorResponse({message: 'Invalid cron time format', explanation: 'Cron time must be in the format "minute hour day month weekday"'}));
        }
        cronScheduler.setCronTime(cronTime);
        cronScheduler.schedule();
        console.log(`Cron time set to: ${cronTime}`);
        return res.status(200).json({ message: 'Cron time set successfully', cronTime });
    } catch (error) {
        console.error('Error syncing time:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}