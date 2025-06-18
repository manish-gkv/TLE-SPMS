import Filter from "../utility/Filter";

export default function StudentInfo(props) {
    const { student, studentSubmissionData } = props;
    const filterOptions = [
        { value: "all", label: "All" },
        { value: "7", label: "last 7 days" },
        { value: "30", label: "last 30 days" },
        { value: "90", label: "last 90 days" }
    ];
    return (
        <>
            <div className="col-span-2 justify-between items-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm dark:shadow-gray-800/50">
                <h2 className="text-xl text-center font-semibold mb-6 text-gray-800 dark:text-gray-200">
                    Problem Solving Data
                </h2>

                <div className="mb-6">
                    <Filter options={filterOptions} filterId={"STudentDataFilter"} />
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
                                {student.totalSolved || 0}
                            </p>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Average Rating</p>
                            <p className="font-medium text-gray-800 dark:text-gray-200">
                                {student.avgRating || 0}
                            </p>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Problems/Day</p>
                            <p className="font-medium text-gray-800 dark:text-gray-200">
                                {student.avgppd || 0}
                            </p>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg sm:col-span-2">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Most Difficult Problem Solved</p>
                            <p className="font-medium text-gray-800 dark:text-gray-200">
                                {student.mdps || 0} rating
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}