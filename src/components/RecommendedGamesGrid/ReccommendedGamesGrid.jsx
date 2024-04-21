import React, { useState, useEffect, useContext } from "react";
import Game from "../Game/Game.jsx";
import style from "./ReccommendedGamesGrid.module.scss";
import { useNavigate } from "react-router-dom";

const ReccommendedGamesGrid = ({ games }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    // When a user selects a game, navigate to the game's page
    const handleSelectGame = (game) => {
        navigate(`/games/${game.slug}`, { state: { game } });
    };

    // Limit it to 2 games per page
    // Could make pagination a component
    const gamesPerPage = 2;
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

    const nextPage = () => {
        if (currentPage * gamesPerPage < games.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <div className={style.gridContainer}>
                <div className={style.grid}>
                    {currentGames.map((game) => (
                        <Game
                            key={game.id}
                            game={game}
                            onClick={() => handleSelectGame(game)}
                        />
                    ))}
                </div>
                <div className={style.pagination}>
                    <button onClick={prevPage} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <button
                        onClick={nextPage}
                        disabled={currentPage * gamesPerPage >= games.length}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
};

export default ReccommendedGamesGrid;
