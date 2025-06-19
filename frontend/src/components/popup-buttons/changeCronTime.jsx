import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../utility/constants";
import { toast } from "react-toastify";

function submitButtonHandler(cronTime, setIsOpen) {
    
    return async () => {
        setIsOpen(false);
        try {
            const response = await fetch(API_BASE_URL + '/sync-time', {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({ cronTime }),
            });
            if (!response.ok) {
                console.error("Error syncing cron time");
                toast.error("Error syncing cron time")
                return;
            }
            const data = await response.json();
            console.log("Cron time updated successfully:", data.cronTime);
            toast.success("cron-time changed");
        } catch (error) {
            console.error("Error updating cron time:", error);
            toast.error("Error updating cron time");
        }
    };
}

export default function ChangeCronTime() {
    const [isOpen, setIsOpen] = useState(false);
    const [cronTime, setCronTime] = useState("15 * * * 0");
    const [submitOn, setSubmitOn] = useState(false);
    useEffect(() => {
        async function fetchCronTime() {
            try {
                const response = await fetch(API_BASE_URL + '/get-cron-time');
                if (!response.ok) {
                    console.error("Error fetching cron time");
                    return;
                }
                const json = await response.json();
                setCronTime(json.data.cronTime);
            } catch (error) {
                console.error("Error fetching cron time:", error);
            }
        }
        fetchCronTime();
    }, []);
    useEffect(() => {
        async function validateCronTime() {
            try {
                const response = await fetch(API_BASE_URL + '/validate-cron-time', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify({ cronTime: cronTime }),
                });
                if (!response.ok) {
                    setSubmitOn(false);
                    console.error("Error validating cron time");
                    return;
                }
                const data = await response.json();
                console.log("Cron time is valid:", data.cronTime);
                setSubmitOn(true);
            } catch (error) {
                console.error("Error validating cron time:", error);
                
            }
        }
        validateCronTime();
    }, [cronTime]);
    return (
        <>
        <button
            className="mt-2 p-2 bg-blue-200 dark:bg-gray-800 rounded"
            onClick={() => setIsOpen(true)}
        >
            Change Cron Time
        </button>
        {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
                <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg">
                    <h2 className="text-lg font-semibold mb-4">Change Cron Time</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        M H D M W
                    </p>
                    <input
                        type="text"
                        value={cronTime}
                        onChange={(e) => setCronTime(e.target.value)}
                        placeholder="Enter cron time (e.g., '15 * * * 0')"
                        required
                        className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full mb-4 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Cron time must be in the format "minute hour day month weekday"
                        <br />
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            eg: "15 * * * 0" - This means at 15 minutes past every hour on Sunday
                        </span>
                    </p>
                    <div className="flex justify-end">
                        <button
                            className={"mr-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"}
                            disabled={!submitOn}
                            onClick={submitButtonHandler(cronTime, setIsOpen)}
                        >
                            Submit
                        </button>
                        <button
                            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-600 rounded"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>  
            </div>
        )}    
        </>
    );
}