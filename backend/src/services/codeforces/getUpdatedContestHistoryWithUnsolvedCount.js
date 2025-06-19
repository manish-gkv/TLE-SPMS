export default function getUpadtedContestHistoryWithUnsolvedCount(userSubmissionHistory, contestHistory, problemSet){
    /*
    This function updates the contest history with the count of unsolved problems for each contest.
    param -> userSubmissionHistory - The submission history of the user.
    param -> contestHistory - The contest history of the user.
    param -> problemSet - The set of problems available.
    returns : An array of updated contest history objects with unsolved questions count.
    */

    const updatedContestHistory = [];
    contestHistory.forEach(contest => {
        const contestProblems = problemSet.filter(
            problem => problem.contestId === contest.contestId
        );
        const solvedSet = new Set();
        userSubmissionHistory.forEach(submission => {
            if (
                submission.contestId === contest.contestId &&
                submission.verdict === "OK"
            ) {
                solvedSet.add(submission.problem.index);
            }
        });
        const solvedCount = solvedSet.size;
        const unsolvedCount = contestProblems.length - solvedCount;
        updatedContestHistory.push({
            contestId: contest.contestId,
            contestName: contest.contestName,
            rank: contest.rank,
            newRating: contest.newRating,
            oldRating: contest.oldRating,
            unsolvedQuestions: unsolvedCount,
            ratingUpdateTimeSeconds: contest.ratingUpdateTimeSeconds
        });
    });
    return updatedContestHistory;
}