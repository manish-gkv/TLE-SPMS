import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import GetRatingWiseQuestions from '../../utility/getRatingWiseQuestions';

export default function RatingWiseQuestions(props) {
    const {userSubmissionData} = props;
    const data = GetRatingWiseQuestions(userSubmissionData.submissions);
    return (
        <>
            <div className="bg-white dark:bg-gray-900 p-1 sm:p-4 rounded-lg shadow-sm h-80">
                <h2 className="text-center text-lg font-semibold mb-4">Rating Wise Questions</h2>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis dataKey={"rating"} />
                        <YAxis dataKey={"count"}/>
                        <Bar
                            dataKey="count"
                            fill="skyblue"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}

/*
data = [
    { rating: 800, count: 5 },
    { rating: 900, count: 10 },
    { rating: 1000, count: 15 },
    // ...
]
*/