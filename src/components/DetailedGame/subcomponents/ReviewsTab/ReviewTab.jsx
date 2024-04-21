import React from "react";
import style from "./ReviewTab.module.scss";

const ReviewsTab = ({ extras }) => {
    if (!extras || !extras.ratings) {
        return (
            <div className={style.reviewsContainer}>No ratings available.</div>
        );
    }

    const getColor = (title) => {
        switch (title.toLowerCase()) {
            case "exceptional":
                return "#13E17B";
            case "recommended":
                return "#1466FF";
            case "skip":
                return "#FFAAAA";
            case "meh":
                return "red";
            default:
                return "#747474";
        }
    };

    // If there are extra ratings, map through them and display a title, count, bar background, colored bar and a percentage.
    // The percentage is calculated by dividing the rating.percent by 100 and multiplying it by 250 (the width of the bar).

    return (
        <div className={style.reviewsContainer}>
            <h3>Here's what our customers are saying:</h3>
            {extras && extras.ratings && extras.ratings.length > 0 ? (
                extras.ratings.map((rating) => (
                    <div key={rating.id} className={style.ratingRow}>
                        <div className={style.ratingInfo}>
                            <span className={style.ratingTitle}>
                                {rating.title}:
                            </span>
                            <span className={style.ratingCount}>
                                ({rating.count})
                            </span>
                        </div>
                        <div className={style.ratingBarContainer}>
                            <div
                                className={style.ratingBar}
                                style={{
                                    width: `${(rating.percent / 100) * 250}px`,
                                    backgroundColor: getColor(rating.title),
                                }}
                            />
                        </div>
                        <span className={style.ratingPercent}>
                            ({rating.percent}%)
                        </span>
                    </div>
                ))
            ) : (
                <span className={style.noReviews}>
                    No review data available. Sorry....
                </span>
            )}
        </div>
    );
};

export default ReviewsTab;