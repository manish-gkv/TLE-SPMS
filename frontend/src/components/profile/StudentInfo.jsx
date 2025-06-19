import { useState, useEffect } from "react";
import GetTotalSolved from "../../utility/getTotalSolved";
import Filter from "../utility/Filter";
import GetMostDifficultRating from "../../utility/getMostDifficultRating";
import GetAverageRating from "../../utility/getAverageRating";
import GetProblemSolvedPerDayCount from "../../utility/getProblemSolvedPerDayCount";
import { API_BASE_URL } from "../../utility/constants";
import { toast } from "react-toastify";


const days = {
    all: null,
    7: 7,
    30: 30,
    90: 90
};

function SyncNowButtonHandler(_id, handle, setIsSyncing) {
    return (
        async () => {
            setIsSyncing(true);
            toast.info("Syncing data, please wait...")
            try {
                const response = await fetch(API_BASE_URL+`/students/${_id}/sync-data`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ handle: handle }) 
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Sync successful:', data);
                toast.success("Sync successful! Reload the Page for see changes",

                );


            } catch (error) {
                console.error('Error during sync:', error);
                toast.error(error.message)
            }
            finally {
                setIsSyncing(false);
            }
        }
    )
}

export default function StudentInfo(props) {
    const [isSyncing, setIsSyncing] = useState(false);
    const { student, studentSubmissionData } = props;
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [filteredSubmissions, setFilteredSubmissions] = useState(studentSubmissionData.submissions || []);
    const filterOptions = [
        { value: "all", label: "All" },
        { value: "7", label: "last 7 days" },
        { value: "30", label: "last 30 days" },
        { value: "90", label: "last 90 days" }
    ];

    useEffect(() => {

        const filterDays = days[selectedFilter];
        const data = studentSubmissionData.submissions.filter((submission) => {
            if (!submission.creationTimeSeconds) return false; // Skip date is not available
            const submissionDate = new Date(submission.creationTimeSeconds * 1000);
            if (!filterDays) return true;
            const currentDate = new Date();
            const diffTime = Math.abs(currentDate - submissionDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return !filterDays || diffDays <= filterDays;
        });
        setFilteredSubmissions(data);
    }, [selectedFilter, studentSubmissionData]);

    return (
        <>
            <div className="col-span-2 justify-between items-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm dark:shadow-gray-800/50">
                <h2 className="text-xl text-center font-semibold mb-6 text-gray-800 dark:text-gray-200">
                    Problem Solving Data
                </h2>

                <div className="mb-6">
                    <Filter
                        options={filterOptions}
                        filterId={"STudentDataFilter"}
                        onFilterChange={(value) => setSelectedFilter(value)}
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
                    <div className="flex flex-col items-center gap-3 w-full sm:w-auto">
                        <div className="w-32 h-32 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden border-2 border-gray-200 dark:border-gray-600">
                            <img
                                src="/user.png"
                                alt="Student Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h1 className="text-lg font-bold text-gray-700 dark:text-gray-300">
                            {student.name || "Student Name"}
                        </h1>
                        <button
                            className="mt-2 p-2 bg-blue-200 dark:bg-gray-800 rounded disabled:hover:bg-blue-300 dark:disabled:hover:bg-gray-700 dark:text-gray-200 shadow-sm disabled:opacity-50"
                            disabled={isSyncing}
                            type="button"
                            onClick={SyncNowButtonHandler(student._id, student.codeforcesHandle, setIsSyncing)}
                        >
                            SyncNow
                        </button>
                        <h1 className="text-sm text-gray-500 dark:text-gray-400">
                            last sync <br /> {(student.lastSynced && new Date(student.lastSynced).toLocaleString()) || "Never"}
                        </h1>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Handle</p>
                            <p className="font-medium text-gray-800 dark:text-gray-200">
                                {student.codeforcesHandle || "userHandle"}
                            </p>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Current Rating</p>
                            <p className="font-medium text-gray-800 dark:text-gray-200">
                                {student.currentRating || 0}
                            </p>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Maximum Rating</p>
                            <p className="font-medium text-gray-800 dark:text-gray-200">
                                {student.maxRating || 0}
                            </p>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Solved</p>
                            <p className="font-medium text-gray-800 dark:text-gray-200">
                                {GetTotalSolved(filteredSubmissions) || 0}
                            </p>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Average Rating</p>
                            <p className="font-medium text-gray-800 dark:text-gray-200">
                                {GetAverageRating(filteredSubmissions) || 0}
                            </p>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Problems/Day</p>
                            <p className="font-medium text-gray-800 dark:text-gray-200">
                                {days[selectedFilter] ? (GetTotalSolved(filteredSubmissions)/days[selectedFilter]).toFixed(5): GetProblemSolvedPerDayCount(filteredSubmissions)}
                            </p>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg sm:col-span-2">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Most Difficult Problem Solved</p>
                            <p className="font-medium text-gray-800 dark:text-gray-200">
                                {GetMostDifficultRating(filteredSubmissions) || 0} rating
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}