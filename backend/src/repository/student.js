import Student from "../schema/student.js";
import crudRepository from "./crudRepository.js";

const studentRepository = {

    ...crudRepository(Student),

    getPaginated: async function(params){
        const students = await Student.find().sort({...params.sort}).skip((params.page - 1) * params.limit).limit(params.limit);
        return students;
    }
};

export default studentRepository;