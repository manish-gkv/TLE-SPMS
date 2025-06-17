import { CODEFORCES_API_URL } from "../../utility/constant.js";

export default async function getRatedContestHistoryDetailsService(handle) {
    /*
        Fetches the rated contest history of a user from Codeforces API.
        param {string} handle - The Codeforces handle of the user.
        returns : [
            {
                "contestId": 1234,
                "contestName": "Codeforces Round #1234",
                "ratingUpdateTimeSeconds": 1620000000,
                "rank": 10,
                "rating": 1500,
                "oldRating": 1400
            },
            ...
        ]
    */
    try {
        const response = await fetch(`${CODEFORCES_API_URL}user.rating?handle=${handle}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.status !== "OK") {
            throw new Error(`API error! status: ${data.status}`);
        }
        return data.result;
    }
    catch (error) {
        console.log("Error fetching profile details:", error);
        throw error;
    }

}