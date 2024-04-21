// Function to replace score with stars
export const getStarRating = (rating) => {
    if (rating) {
        // if there is a rating, replace with stars
        const roundedRating = Math.floor(rating);
        return "⭐".repeat(roundedRating);
    }
    return "No rating available";
};
