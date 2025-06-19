import { StatusCodes } from 'http-status-codes';
import cronScheduler from '../services/cron.js';
import { customErrorResponse, successResponse } from '../utility/common/responseObject.js';

export async function syncTime(req, res) {
    try {
        const { cronTime } = req.body;
        if (!cronTime) {
            return res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse({message: 'Cron time is required'}));  
        }
        
        if (!cronScheduler.validateCronTime(cronTime)) {
            return res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse({message: 'Invalid cron time format', explanation: 'Cron time must be in the format "minute hour day month weekday"'}));
        }
        cronScheduler.setCronTime(cronTime);
        cronScheduler.schedule();
        console.log(`Cron time set to: ${cronTime}`);
        return res.status(StatusCodes.OK).json(successResponse({message: 'Cron time updated successfully', cronTime}));
    } catch (error) {
        console.error('Error syncing time:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerErrorResponse({message: 'Internal server error'}));
    }
}

export async function validateCronTime(req, res) {
    try {
        const { cronTime } = req.body;
        if (!cronTime) {
            return res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse({message: 'Cron time is required'}));  
        }
        
        if (!cronScheduler.validateCronTime(cronTime)) {
            return res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse({message: 'Invalid cron time format', explanation: 'Cron time must be in the format "minute hour day month weekday"'}));
        }
        
        return res.status(StatusCodes.OK).json(successResponse({message: 'Cron time is valid', cronTime}));
    } catch (error) {
        console.error('Error validating cron time:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerErrorResponse({message: 'Internal server error'}));
    }
}