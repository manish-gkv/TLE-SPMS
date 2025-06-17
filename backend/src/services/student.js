import { StatusCodes } from "http-status-codes";
import studentRepository from "../repository/student.js";
import ClientError from "../utility/errors/clientError.js";

export async function getStudentsService(params){
    let students;
    if(params.isPaginated){
        students =await studentRepository.getPaginated({page:parseInt(params.page),limit:parseInt(params.limit), sort:{[params.sortBy]: params.order === "asc" ? 1 : -1}});
        
    }
    else {
        students =await studentRepository.getAll({sort:{[String(params?.sortBy)]: params?.order === "asc" ? 1 : -1}});
    }
    return students;
}

export async function getStudentByIdService(id){
    try{
        const student = await studentRepository.getById(id);
        if (!student) {
            throw new ClientError({
                statusCode: StatusCodes.NOT_FOUND,
                message: "Student not found",
                explanation: `No student found with ID ${id}`
            });
        }
        return student;
    }
    catch(error){
        console.log("getStudentByIdService Error", error);
        throw error;
    }
}

export async function createStudentService(student) {
    try{
        const newStudent = await studentRepository.create(student);
        const studentDeatils = await studentRepository.getById(newStudent._id);
        return studentDeatils;
    }
    catch(error) {
        if (error.code === 11000) {
            throw new ClientError({
                statusCode: StatusCodes.BAD_REQUEST,
                message: "Student with this data already exists",
                explanation: "Duplicate key error"
            });
        }
        throw {
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
            explanation: error.message
        };
    }
    
}

export async function updateStudentService(student){
    try{
        const updatedStudent = await studentRepository.update(student._id, student);
        return updatedStudent;
    }
    catch(error) {
        console.log("updateStudentService Error", error);
        if (error.code === 11000) {
            throw new ClientError({
                statusCode: StatusCodes.BAD_REQUEST,
                message: "Student with this data already exists",
                explanation: "Duplicate key error"
            });
        }
        throw {
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
            explanation: error.message
        };
    }
}

export async function deleteStudentService(student) {
    try{
        const response = await studentRepository.delete(student._id);
        if (!response) {
            throw new ClientError({
                statusCode: StatusCodes.NOT_FOUND,
                message: "Student not found",
                explanation: "No student found with the provided ID"
            });
        }
        return response;
    }
    catch(error) {
        console.log("deleteStudentService Error", error);
        if(error.statusCode===404){
            throw error;
        }
        throw {
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
            explanation: error.message
        };
    }
}
