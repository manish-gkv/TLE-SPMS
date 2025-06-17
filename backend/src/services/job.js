import studentRepository from "../repository/student.js";
import dataSyncService from "./dataSync.js"; 
import getInactivityDayService from "./inactivity.js";
import mailService from "./email.js"; 
import { INACTIVE_DAYS_THRESHOLD } from "../utility/constant.js";

async function jobs() {
    const students = await studentRepository.getAll();
    students.map(async (student)=>{
        await dataSyncService(student._id, student.codeforcesHandle);
        const inactiveDays = await getInactivityDayService(student._id);
        if(inactiveDays >=INACTIVE_DAYS_THRESHOLD){
            mailService(student.email, inactiveDays);
        }
    });
}

export default jobs;