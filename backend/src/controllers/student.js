import { StatusCodes } from "http-status-codes";

import { createStudentService } from "../services/student.js";
import { successResponse, customErrorResponse, internalErrorResponse } from "../utility/common/responseObject.js";
import { 
    getStudentsService , 
    updateStudentService, 
    deleteStudentService
} from "../services/student.js";

export async function getStudents(req, res){
    try {
        if(req.query.page && req.query.limit){
            req.query.isPaginated = true;
        }
        const students = await getStudentsService(req.query);
        return res.status(StatusCodes.OK).json(successResponse(students, "Students fetched successfully"));

    } catch (error) {
        console.log(error);
        if (error.statusCode) {
            res.status(error.statusCode).json(customErrorResponse(error));
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
        }
    }
}

export function getStudentById(req, res){
    
}

export async function createStudent(req, res){
    try{
        const response = await createStudentService(req.body);
        return res.status(StatusCodes.CREATED).json(successResponse(response, "Student created successfully"));
    }
    catch(error){
        console.log(error);
        if(error.statusCode){
            res.status(error.statusCode).json(customErrorResponse(error));
        }
        else{
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
        }
    }
}

export async function updateStudent(req, res){
    try{
        const response = await updateStudentService(req.body);
        return res.status(StatusCodes.OK).json(successResponse(response, "Student updated successfully"));
    }
    catch(error){
        console.log(error);
        if(error.statusCode){
            res.status(error.statusCode).json(customErrorResponse(error));
        }
        else{
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
        }
    }
}
export async function deleteStudent(req, res){
    try{
        const response = await deleteStudentService(req.body);
        return res.status(StatusCodes.OK).json(successResponse(response, "Student deleted successfully"));
    }
    catch(error){
        console.log(error);
        if(error.statusCode){
            res.status(error.statusCode).json(customErrorResponse(error));
        }
        else{
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
        }
    }
}
