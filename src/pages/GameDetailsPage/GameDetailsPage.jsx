import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import DetailedGameLoader from "../../components/DetailedGameLoader/DetailedGameLoader.jsx";
import { fetchGamesBySlug } from "../../services/game-service";

const GameDetailsPage = () => {
    const location = useLocation();
    const { slug } = useParams();
    const [game, setGame] = useState(location.state?.game);
    const [loading, setLoading] = useState(!location.state?.game);
    const [error, setError] = useState(null);

    // If there is no game in the location state, fetch the game by slug (from the URL)
    // If there is a game in the location state, use that game

    // Regardless of whether the game is fetched from the location state or the API, show the DetailedGameLoader component

    useEffect(() => {
        if (slug) {
            setLoading(true);
            setError(null);
            fetchGamesBySlug(slug)
                .then((fetchedGame) => {
                    setGame(fetchedGame);
                })
                .catch((error) => {
                    setError(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [slug]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error.message}</div>;
    }

    if (!game) {
        return <div>Game not found.</div>;
    }

    return (
        <DetailedGameLoader
            game={game}
            onClose={() => {
            }}
        />
    );
};

export default GameDetailsPage;
