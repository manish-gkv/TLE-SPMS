export default function GetProblemSolvedPerDayCount(submissions) {
    /*
    Calculates the number of problems solved per day based on the submissions.
    param -> submissions - Array of submission objects.
    returns -> An object where keys are dates and values are counts of problems solved on those dates.
    */

    const dateSet = new Set();
    const problemSet = new Set();

    submissions.map(submission => {
        if (submission.verdict === "OK" && !problemSet.has(submission.problem.contestId + submission.problem.index)) {
            problemSet.add(submission.problem.contestId + submission.problem.index);
            const date = new Date(submission.creationTimeSeconds * 1000);
            dateSet.add(date);
        }
    });

    submissions.sort((a, b) => a.creationTimeSeconds - b.creationTimeSeconds);
    let minDate = new Date(submissions[0].creationTimeSeconds * 1000);
    let maxDate = new Date(submissions[submissions.length - 1].creationTimeSeconds * 1000);

    const totalDays = Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24)) + 1;

    const problemsPerDay = (problemSet.size / totalDays).toFixed(5);

    return problemsPerDay;

}