export default function GetMostDifficultRating(submissions) {
    /*
    Calculates the most difficult rating based on the submissions.
    param -> submissions - Array of submission objects.
    returns -> Most difficult rating or null if no submissions are present.
    */
    
    if (!submissions || submissions.length === 0) {
        return null;
    }

    let rating = 0;

    submissions.map(submission => {
        if (submission.verdict === "OK") {
            const problemRating = submission.problem.rating;
            if (problemRating && problemRating > rating) {
                rating = problemRating;
            }
        }
    });
    return rating;
    
}