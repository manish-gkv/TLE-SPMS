import inactivityRepository from "../repository/inactivity.js";

export default async function getInactivityDayService(studentId){
    try{
        const inactivity =await inactivityRepository.get({ studentId});
        if (!inactivity) {
            console.log("No inactivity record found for student:", studentId);
            return null;
        }
        const now = new Date();
        const lastSubmissionTime = new Date(inactivity.lastSubmissionTime);
        const inactiveDays = Math.floor((now - lastSubmissionTime) / (1000 * 60 * 60 * 24));
        return inactiveDays;
    }
    catch(error){
        console.error("Error in getInactivityService:", error);
    }
}