import { CODEFORCES_API_URL } from "../../utility/constant.js";
export default async function getProfileDetailsService(handle){
    /*
        Fetches the profile details of a user from Codeforces API.
        param {string} handle - The Codeforces handle of the user.
        returns : {
            "handle": "user_handle",
            "rating": 1500,
            "maxRating": 1600,
            "rank": "Pupil",
            "maxRank": "Expert",
            "organization": "Codeforces",
            "titlePhoto": "//userpic.codeforces.com/1234567890/title/12345.jpg"
        }
    */
    try{
        const response = await fetch(`${CODEFORCES_API_URL}user.info?handles=${handle}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.status !== "OK") {
            throw new Error(`API error! status: ${data.status}`);
        }
        return data.result[0];
    }
    catch(error){
        console.log("Error fetching profile details:", error);
        throw error;
    }
}