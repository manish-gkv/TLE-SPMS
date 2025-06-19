export default function GetTotalSolved(submissions) {
    /*
    Calculates the total number of problems solved by a student based on their submissions.
    param -> submissions - Array of submission objects.
    returns -> Total number of unique problems solved.
    */

    const solvedProblems = new Set();

    submissions.map(submission => {
        if (submission.verdict === "OK") {
            solvedProblems.add(submission.problem.contestId + submission.problem.index);
        }
    });

    return solvedProblems.size;
    
}