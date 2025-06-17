import { CODEFORCES_API_URL } from "../../utility/constant.js";
export default async function getUserSubmissionsService(handle) {
    /*
        Fetches the user submissions from Codeforces API.
        param {string} handle - The Codeforces handle of the user.
        returns : [
            {
                "id": 123456789,
                "contestId": 1234,
                "problem": {
                    "contestId": 1234,
                    "index": "A",
                    "name": "Problem Name",
                    "type": "PROGRAMMING",
                    "points": 1000
                },
                "creationTimeSeconds": 1620000000,
                "relativeTimeSeconds": 3600,
                "verdict": "OK",
                "testset": "TESTS",
                "passedTestCount": 10,
                "timeConsumedMillis": 1000,
                "memoryConsumedBytes": 102400
            },
            ...
        ]
    */
    try {
        const response = await fetch(`${CODEFORCES_API_URL}user.status?handle=${handle}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.status !== "OK") {
            throw new Error(`API error! status: ${data.status}`);
        }
        return data.result;
    } catch (error) {
        console.log("Error fetching user submissions:", error);
        throw error;
    }
}

