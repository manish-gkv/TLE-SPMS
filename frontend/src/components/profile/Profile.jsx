import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import StudentInfo from "./StudentInfo";
import ContestHistory from "./ContestHistory";
import HeatMap from "./HeatMap";
import RatingWiseQuestions from "./RatingWiseQuestions";
import { API_BASE_URL } from "../../utility/constants";

export default function Profile() {
    const [isPageLoaded, setIsPageLoaded] = useState(false);
    const [userData, setUserData] = useState(null);
    const [userSubmissionData, setUserSubmissionData] = useState(null);
    const [userContestHistory, setUserContestHistory] = useState(null);
    const { id } = useParams();
    useEffect(()=>{
        const fetchData = async (parms) => {
            const response = await fetch(API_BASE_URL+parms);
            if (response.ok) {
                const json = await response.json();
                return json.data;
            } else {
                console.error("Failed to fetch user data");
            }
        }
        const loadAllData = async () => {
            const [userData, submissions, contestHistory] = await Promise.all([
                fetchData('/students/' + id),
                fetchData('/students/' + id + '/submissions'),
                fetchData('/students/' + id + '/contest-history')
            ]);
            //console.log(userData, submissions, contestHistory);
            setUserData(userData);
            setUserSubmissionData(submissions);
            setUserContestHistory(contestHistory.contest);
            setIsPageLoaded(true);;
        }

        loadAllData();
        
    }, []);
    return isPageLoaded ? (
        <>
            <div className="container  mx-auto mt-8 flex flex-col gap-4">
                <StudentInfo student={userData} studentSubmissionData={userSubmissionData}/>
                <HeatMap userSubmissionData={userSubmissionData}/>
                <RatingWiseQuestions userSubmissionData={userSubmissionData}/>
                <ContestHistory contestHistory={userContestHistory}/>
            </div>
            
        </>
    ) : "Loading..."
}