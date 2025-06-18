import { StatusCodes } from "http-status-codes";

import codeforces from "./codeforces/codeforces.js";

import studentRepository from "../repository/student.js";
import contestHistoryRepository from "../repository/contestHistory.js";
import userSubmissionRepository from "../repository/userSubmissions.js";
import inactivityRepository from "../repository/inactivity.js";

import ClientError from "../utility/errors/clientError.js";


export default async function dataSyncService(id, handle) {
    /*
    Synchronizes student data with Codeforces.
    param -> id - The ID of the student whose data is to be synchronized.
    param -> handle - The Codeforces handle of the student.
    */
    try {
        const profileDetails = await codeforces.getProfileDetails(handle);
        //console.log("Profile Details:", profileDetails);
        await studentRepository.update(id, {
            currentRating: profileDetails.rating,
            maxRating: profileDetails.maxRating,
            lastSynced: new Date(),
        });

        const contestHistory = await codeforces.getRatedContestHistoryDetails(handle);
        //console.log(contestHistory);
        await contestHistoryRepository.findAndUpdate(
            { studentId: id },
            {
                contest: contestHistory,
            }
        );

        const userSubmissionHistory = await codeforces.getUserSubmissions(handle);
        //console.log(userSubmissionHistory);
        await userSubmissionRepository.findAndUpdate(
            { studentId: id },
            {
                submissions: userSubmissionHistory,
            }
        );

        await inactivityRepository.findAndUpdate(
            { studentId: id },
            {
                lastSubmissionTime: new Date(userSubmissionHistory.length > 0 ? userSubmissionHistory[0].creationTimeSeconds*1000 : null),
            }
        );
        console.log("Data sync successful for handle:", handle);
    }
    catch (error) {
        console.log("Error in dataSyncService:", error);
        if( error.statusCode) {
            throw new ClientError({
                statusCode: error.statusCode,
                message: error.message,
                explanation: error.explanation
            });
        }
        throw {
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
            explanation: error.message
        };
    }
}