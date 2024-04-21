import React from "react";
import ReccommendedGamesGrid from "../../../RecommendedGamesGrid/ReccommendedGamesGrid.jsx";
import useRecommendedGames from "../../../../hooks/useReccommendedGames/useReccommendedGames.jsx";


const ReccommendTab = ( {game}) => {
    const recommendedGames = useRecommendedGames(game);

    return (
    <>
        {recommendedGames.length > 0 ? ( 
        <ReccommendedGamesGrid games={recommendedGames} />
        ) : (
            <p>We haven't any reccommendations! Sorry!</p>
        )}
    </>
    );
}

export default ReccommendTab;
