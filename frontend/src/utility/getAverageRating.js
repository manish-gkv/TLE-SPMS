export default function GetAverageRating(submissions) {
    /*
    Calculates the average rating based on the submissions.
    param -> submissions - Array of submission objects.
    returns -> Average rating or null if no submissions are present.
    */

    let totalRating = 0;
    let count = 0;
    const set = new Set();
    submissions.forEach(submission => {
        if (submission.verdict === "OK" && submission.problem.rating && !set.has(submission.problem.contestId + submission.problem.index)) {
            set.add(submission.problem.contestId + submission.problem.index);
            totalRating += submission.problem.rating;
            count++;
        }
    });

    return count > 0 ? (totalRating / count).toFixed(2) : null;
    
}