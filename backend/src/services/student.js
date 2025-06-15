import studentRepository from "../repository/student.js";

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
    const student = await studentRepository.getById(id);
    return student;
}

export async function createStudentService(student) {
    try{
        const newStudent = await studentRepository.create(student);
        const studentDeatils = await studentRepository.getById(newStudent._id);
        return studentDeatils;
    }
    catch(error) {
        if (error.code === 11000) {
            throw {
                statusCode: 400,
                message: "Student with this data already exists",
                explanation: "Duplicate key error"
            };
        }
        throw {
            statusCode: 500,
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
            throw {
                statusCode: 400,
                message: "Student with this data already exists",
                explanation: "Duplicate key error"
            };
        }
        throw {
            statusCode: 500,
            message: "Internal server error",
            explanation: error.message
        };
    }
}

export async function deleteStudentService(student) {
    try{
        const response = await studentRepository.delete(student._id);
        if (!response) {
            throw {
                statusCode: 404,
                message: "Student not found",
                explanation: "No student found with the provided ID"
            };
        }
        return response;
    }
    catch(error) {
        console.log("deleteStudentService Error", error);
        if(error.statusCode===404){
            throw error;
        }
        throw {
            statusCode: 500,
            message: "Internal server error",
            explanation: error.message
        };
    }
}
