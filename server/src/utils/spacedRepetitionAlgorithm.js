
function calculateNextReview(reviewData) {
    const { successful, optimal, time, assistance } = reviewData;

    let daysToReview = 0;

    // Success condition
    if (!successful) {
      daysToReview += 3; // Penalize for failure
    }
  
    // Optimal score (the lower the score, the more penalty)
    daysToReview += (5 - optimal); // Reverse the optimal score
    
    // Time taken (higher time means more penalty)
    daysToReview += time;
    
    // Assistance needed (higher assistance means more penalty)
    daysToReview += assistance;
    
    // Optional: Ensure the review is at least 1 day later
    return Math.max(daysToReview, 1);
}

module.exports = calculateNextReview;