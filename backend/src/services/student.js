import { StatusCodes } from "http-status-codes";
import studentRepository from "../repository/student.js";
import ClientError from "../utility/errors/clientError.js";
import dataSyncService from "./dataSync.js";

export async function getStudentsService(params){
    /*
    Retrieves a list of students based on the provided parameters.
    param -> params - An object containing query parameters for pagination and sorting.
    returns : [
        {
            _id: "12345",
            name: "John Doe",
            codeforcesHandle: "johndoe",
            email: "sample@gmail.com",
            currentRating: 1500,
            maxRating: 1600,
            lastSynced: "2023-10-01T12:00:00Z"
        },
        ...
    ]
    */
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
    /*
    Retrieves a student by their ID.
    param -> id - The ID of the student to be retrieved.
    returns : {
        _id: "12345",
        name: "John Doe",
        codeforcesHandle: "johndoe",
        email: "sample@gmail.com",
        currentRating: 1500,
        maxRating: 1600,
        lastSynced: "2023-10-01T12:00:00Z"
    }
    */
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
    /*
    Creates a new student.
    param -> student - An object containing student details.
    returns : {
        _id: "12345",
        name: "John Doe",
        codeforcesHandle: "johndoe",
        email: "sample@gmail.com",
    }
    */
    try{
        const newStudent = await studentRepository.create(student);
        await dataSyncService(newStudent._id, newStudent.codeforcesHandle);
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
    /*
    Updates an existing student.
    param -> student - An object containing updated student details.
    returns : {
        _id: "12345",
        name: "John Doe",
        codeforcesHandle: "johndoe",
        email: "sample@gmail.com",
        currentRating: 1500,
        maxRating: 1600,
        lastSynced: "2023-10-01T12:00:00Z"
    }
    */
    try{
        const updatedStudent = await studentRepository.update(student._id, student);
        await dataSyncService(updatedStudent._id, updatedStudent.codeforcesHandle);
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
    /*
    Deletes a student by their ID.
    param -> student - An object containing the ID of the student to be deleted.
    returns : {
        message: "Student deleted successfully"
    }
    */
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
