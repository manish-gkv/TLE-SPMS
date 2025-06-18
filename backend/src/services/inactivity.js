import inactivityRepository from "../repository/inactivity.js";

export default async function getInactivityDayService(studentId){
    /*
    This function calculates the number of days a student has been inactive.
    It retrieves the last submission time from the inactivity repository
    and calculates the difference in days from the current date.
    param -> studentId - The ID of the student whose inactivity is to be checked.
    returns : Integer representing the number of inactive days.
    */
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