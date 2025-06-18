import studentRepository from "../repository/student.js";
import dataSyncService from "./dataSync.js";
import getInactivityDayService from "./inactivity.js";
import inactivityRepository from "../repository/inactivity.js";
import mailService from "./email.js";
import { INACTIVE_DAYS_THRESHOLD } from "../utility/constant.js";

async function jobs() {
    /*
    This function is responsible for running scheduled jobs.
    It retrieves all students, syncs their data, checks for inactivity,
    and sends reminder emails if they have been inactive for a specified number of days.
    */
    console.log("Jobs service started at", new Date().toISOString());
    try {
        const students = await studentRepository.getAll();
        students.map(async (student) => {
            await dataSyncService(student._id, student.codeforcesHandle);
            const inactiveDays = await getInactivityDayService(student._id);
            if (inactiveDays >= INACTIVE_DAYS_THRESHOLD) {
                mailService.sendMail(student.email, inactiveDays);
                inactivityRepository.findAndUpdate(
                    { studentId: student._id },
                    { $inc: { reminderSentCount: 1 } }
                );
            }
        });
    } catch (error) {
        console.error("Error in jobs service:", error);
        throw error;

    }
    finally {
        console.log("Jobs service executed successfully at", new Date().toISOString());
    }
}

export default jobs;