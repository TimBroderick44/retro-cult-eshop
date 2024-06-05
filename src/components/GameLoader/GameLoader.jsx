import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import GamesGrid from "../GamesGrid/GamesGrid";
import { DataContext } from "../../context/DataContext";
import Loading from "../Loading/Loading"

const GameLoader = () => {
    const [error, setError] = useState(null);
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const { searchTerm, setSearchTerm } = useContext(SearchContext);
    const { allGames } = useContext(DataContext);


    useEffect(() => {
        setLoading(true);
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
        } finally {
            setLoading(false);
        }
    }, [searchTerm, location.search, allGames]);

    return (
        <>
            {loading && <Loading />}
            {!loading && error && <Error message={error} />}
            {!loading && !error && <GamesGrid games={games} setGames={setGames}/>}
        </>
    );
};

export default GameLoader;
