import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import GamesGrid from "../../components/GamesGrid/GamesGrid";
import { DataContext } from "../../context/DataContext";

const GameLoader = () => {
    const [error, setError] = useState(null);
    const [games, setGames] = useState([]);

    const location = useLocation();
    const { searchTerm, setSearchTerm } = useContext(SearchContext);
    const { allGames } = useContext(DataContext);


    useEffect(() => {
        // Get the filter query parameter from the URL
        // If no filter is provided, default to an empty string
        const params = new URLSearchParams(location.search);
        const filter = params.get("filter") || "";

        try {
            // Filter the games based on the search term and filter 
            // If no search term is provided, search for all games
            let filteredGames = searchTerm
                ? allGames.filter((game) =>
                      game.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                : allGames;

            // Apply the filter to the games
            switch (filter) {
                case "metacritic":
                    setSearchTerm("");
                    filteredGames = filteredGames
                        .filter((game) => game.metacritic >= 80)
                        .slice(0, 50);
                    break;
                case "sale":
                    setSearchTerm("");
                    filteredGames = filteredGames.filter(
                        (game) =>
                            Math.min(...game.price.map((p) => p.amount)) < 100
                    );
                    break;
                case "favourites":
                    setSearchTerm("");
                    filteredGames = filteredGames.filter(
                        (game) => game.favourite
                    );
                    break;
                case "genre":
                    setSearchTerm("");
                    filteredGames = filteredGames.filter((game) =>
                        game.genres.includes("Action")
                    );
                    break;
                default:
                    break;
            }

            setGames(filteredGames);
        } catch (e) {
            console.error("Error filtering games:", e);
            setError(new Error("Failed to filter games."));
        }
    }, [searchTerm, location.search, allGames]);

    return (
        <>
            {games.length > 0 ? (
                <GamesGrid games={games} setGames={setGames} />
            ) : (
                <div>No games found matching your search criteria.</div>
            )}
            {error && <div>Error: {error.message}</div>}
        </>
    );
};

export default GameLoader;
