import { StatusCodes } from 'http-status-codes';
import { 
    getContestHistoryService , 
    getSubmissionsService,
    updateHandleService
} from '../services/profile.js';
import dataSyncService from '../services/dataSync.js';
import { successResponse } from '../utility/common/responseObject.js';
import { customErrorResponse, internalErrorResponse } from '../utility/common/responseObject.js';

export async function getContestHistory(req, res) {
    const studentId = req.params.id;
    try {
        const contestHistory = await getContestHistoryService(studentId);
        return res.status(StatusCodes.OK).json(successResponse(contestHistory, "Contest history fetched successfully"));
    }
    catch (error) {
        console.log("getContestHistory controller Error: ", error);
        if (error.statusCode) {
            res.status(error.statusCode).json(customErrorResponse(error));
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
        }
    }

}

export async function syncData(req, res) {
    
    try {
        const id = req.params.id;
        const handle = req.body.handle;
        await dataSyncService(id, handle);
        return res.status(StatusCodes.OK).json(successResponse({}, "Data sync successful"));
    }
    catch (error) {
        console.log("syncData Controller error: ", error);
        if (error.statusCode) {
            res.status(error.statusCode).json(customErrorResponse(error));
        }
        else if(error instanceof TypeError) {
            res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse({
                statusCode: StatusCodes.BAD_REQUEST,
                message: "Invalid input",
                explanation: error.message
            }));
        }
        else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
        }
    }
}

export async function updateHandle(req, res) {
    try{
        const id = req.params.id;
        const handle = req.body.newHandle;

        const response = await updateHandleService(id, handle);
        return res.status(StatusCodes.OK).json(successResponse(response, "Handle updated and Data Sync successful"));
    }
    catch(error) {
        console.log("syncData Controller error: ", error);
        if (error.statusCode) {
            res.status(error.statusCode).json(customErrorResponse(error));
        }
        else if(error instanceof TypeError) {
            res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse({
                statusCode: StatusCodes.BAD_REQUEST,
                message: "Invalid input",
                explanation: error.message
            }));
        }
        else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
        }
    }
}

export async function getSubmissions(req, res){
    try{
        const studentId = req.params.id;
        const submissions = await getSubmissionsService(studentId);
        return res.status(StatusCodes.OK).json(successResponse(submissions, "Submissions history fetched successfully"));
    }
    catch(error) {
        console.log("getSubmissions controller Error: ", error);
        if (error.statusCode) {
            res.status(error.statusCode).json(customErrorResponse(error));
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
        }
    }
}