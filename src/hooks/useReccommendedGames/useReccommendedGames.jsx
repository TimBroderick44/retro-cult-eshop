import { useState, useEffect, useContext } from "react";
import { DataContext } from "../../context/DataContext.jsx";

// Wanted to practice using hooks and context to create a custom hook
// Used for getting recommended games based on the current game

const useRecommendedGames = (currentGame) => {
    const [recommendedGames, setRecommendedGames] = useState([]);
    const { allGames } = useContext(DataContext);

    useEffect(() => {
        if (!currentGame) {
            setRecommendedGames([]);
            return;
        }

        // Get 10 games with similar genres and high metacritic score and is not he same game
        const recommended = allGames
            .filter(
                (game) =>
                    game.genres.some((genre) =>
                        currentGame.genres.includes(genre)
                    ) &&
                    game.metacritic > 80 &&
                    game.id !== currentGame.id 
            )
            .slice(0, 10); 

        setRecommendedGames(recommended);
    }, [currentGame, allGames]);

    return recommendedGames;
};

export default useRecommendedGames;
