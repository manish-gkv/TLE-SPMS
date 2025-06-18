export default function GetUserRatingHistory(userContestHistory) {
    const mp = new Map();
    userContestHistory.map(contest => {
        const date = new Date(contest.ratingUpdateTimeSeconds * 1000);
        const formattedDate = date.toISOString().split('T')[0];
        mp.set(formattedDate, contest.newRating);
    }); 
    const ratingHistory = [];
    for (let [date, rating] of mp.entries()) {
        ratingHistory.push({
            date: date,
            rating: rating
        });
    }
    return ratingHistory.sort((a, b) => a.date - b.date);
    
}