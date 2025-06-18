import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import GetUserRatingHistory from "../../utility/getUserRatingHistory";
export default function RatingChange(params) {
    const {userContestHistory} = params;
    const data =  GetUserRatingHistory(userContestHistory);
    return (
        <>
            <div className="bg-white dark:bg-gray-900 px-4 py-12 rounded-lg shadow-sm h-80">
                <h2 className="text-center text-lg font-semibold mb-4">Rating Change Graph</h2>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <XAxis dataKey={"date"} />
                        <YAxis dataKey={"rating"}/>
                        <Line
                            dataKey="rating"
                            stroke="skyblue"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}

/*data = [
    {date:"2024-09-14T16:35:00.000Z", rating: 1500},
    {date:"2024-09-15T16:35:00.000Z", rating: 1550},
]*/