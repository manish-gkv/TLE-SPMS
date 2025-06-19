import getProblemSet from "./getProblemSet.js";
import getProfileDetailsService from "./getProfileDetails.js";
import getRatedContestHistoryDetailsService from "./getRatedContestHistoryDetails.js";
import getUserSubmissionsService from "./getUserSubmissions.js";
import getUpadtedContestHistoryWithUnsolvedCount from "./getUpdatedContestHistoryWithUnsolvedCount.js";

const codeforces = {
    /**
     * Codeforces API Service
     * This module provides functions to interact with the Codeforces API.
     * It includes methods to fetch user profile details, rated contest history,
     * unsolved problem count, and user submissions.
     */
    getProfileDetails: getProfileDetailsService,
    getRatedContestHistoryDetails: getRatedContestHistoryDetailsService,
    getUserSubmissions: getUserSubmissionsService,
    getProblemSet:getProblemSet,
    getUpadtedContestHistoryWithUnsolvedCount: getUpadtedContestHistoryWithUnsolvedCount
}

export default codeforces;

