export default function GetUserHeatMapValues(submissions) {
    const mp = new Map();
    submissions.forEach(submission => {
        const date = new Date(submission.creationTimeSeconds* 1000);
        const dateString = date.toISOString().split('T')[0];
        mp.set(dateString, (mp.get(dateString) || 0) + 1);
    });
    const heatMapValues = [];
    for (let [date, count] of mp.entries()) {
        heatMapValues.push({
            date: new Date(date),
            count: count
        });
    }
    return heatMapValues;
}