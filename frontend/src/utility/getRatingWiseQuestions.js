export default function GetRatingWiseQuestions(submissionData) {
    const mp = new Map();
    const questionSet = new Set();
    submissionData.forEach(submission => {
        if (submission.verdict === "OK" && !questionSet.has(String(submission.contestId) + submission.problem.index && submission.problem.rating) ){
            questionSet.add(String(submission.contestId) + submission.problem.index);
            mp.set(submission.problem.rating, (mp.get(submission.problem.rating) || 0) + 1);
        }
    });
    const ratingWiseQuestions = [];
    for (let [rating, count] of mp.entries()) {
        ratingWiseQuestions.push({
            rating: rating,
            count: count
        });
    }
    return ratingWiseQuestions.sort((a, b) => a.rating - b.rating);
}