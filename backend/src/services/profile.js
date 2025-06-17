import { StatusCodes } from "http-status-codes";

import contestHistoryRepository from "../repository/contestHistory.js";
import studentRepository from "../repository/student.js";
import ClientError from "../utility/errors/clientError.js";
import dataSyncService from "./dataSync.js";
import userSubmissionRepository from "../repository/userSubmissions.js";

export async function getContestHistoryService(studentId) {
    /*
    Retrieves the contest history for a student by their ID.
    param -> studentId - The ID of the student whose contest history is to be retrieved.
    returns : {
        studentId: "12345",
        contestHistory: [
            {
                contestId: 1234,
                contestName: "Codeforces Round #1234",
                ratingUpdateTimeSeconds: 1620000000,
                rank: 10,
                rating: 1500,
                oldRating: 1400
            },
            ...
        ]
    }
    */
    try {
        const contestHistory = await contestHistoryRepository.get({studentId});
        if (!contestHistory) {
            throw new ClientError({
                statusCode: StatusCodes.NOT_FOUND,
                message: "Contest history not found",
                explanation: `No contest history found for student with ID ${studentId}`
            });
        }
        return contestHistory;
    }
    catch (error) {
        console.error("Error in getContestHistoryServices:", error);
        throw {
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
            explanation: error.message
        };
    }
}

export async function updateHandleService(id, handle) {
    /*
    Updates the Codeforces handle for a student.
    param -> id - The ID of the student whose handle is to be updated.
    param -> handle - The new Codeforces handle to be set.
    returns : {
        newHandle: "new_handle"
    }
    */
    try {
        const updatedStudent = await studentRepository.update(id, { codeforcesHandle:handle });
        await dataSyncService(id, handle);
        return { newHandle: handle };
    }
    catch (error) {
        console.error("Error in updateHandleService:", error);
        throw {
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
            explanation: error.message
        };
    }
}

export async function getSubmissionsService(studentId) {
    /*
    Retrieves the user submission history for a student by their ID.
    param -> studentId - The ID of the student whose submission history is to be retrieved.
    returns : {
        studentId: "12345",
        submissions: [
            {
                id: 123456789,
                contestId: 1234,
                problem: {
                    contestId: 1234,
                    index: "A",
                    name: "Problem Name",
                    type: "PROGRAMMING",
                    points: 1000
                },
                creationTimeSeconds: 1620000000,
                relativeTimeSeconds: 3600,
                verdict: "OK",
                testset: "TESTS",
                passedTestCount: 10,
                timeConsumedMillis: 1000,
                memoryConsumedBytes: 102400
            },
            ...
        ]
    }
    */
    try {
        const submissions = await userSubmissionRepository.get({studentId});
        if (!submissions) {
            throw new ClientError({
                statusCode: StatusCodes.NOT_FOUND,
                message: "Submission history not found",
                explanation: `No submission history found for student with ID ${studentId}`
            });
        }
        return submissions;
    }
    catch (error) {
        console.error("Error in getUserSubmissionService:", error);
        throw {
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
            explanation: error.message
        };
    }

}
