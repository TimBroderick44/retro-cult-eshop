import React, { useState, useEffect, useContext } from "react";
import Game from "../Game/Game.jsx";
import style from "./GamesGrid.module.scss";
import { CartContext } from "../../context/CartContext";
import { SearchContext } from "../../context/SearchContext.jsx";
import { useNavigate } from "react-router-dom";
import handCursorUrl from "../../assets/images/FF7Cursor.png";
import moveSoundUrl from "../../assets/sounds/FF7CursorMove.mp3";
import PSLogo from "../../assets/images/PSLogo.png";

const GamesGrid = ({ games, setGames }) => {
    const [sortCriteria, setSortCriteria] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [genreFilterVisible, setGenreFilterVisible] = useState(false);
    const [hoveredFilterIndex, setHoveredFilterIndex] = useState(null);
    const [hoveredGenreIndex, setHoveredGenreIndex] = useState(null);
    const [hoveredESRBIndex, setHoveredESRBIndex] = useState(null);
    const [moveSound, setMoveSound] = useState(null);
    const [topGenres, setTopGenres] = useState([]);
    const [selectedEsrbRating, setSelectedEsrbRating] = useState(null);
    const [esrbRatingFilterVisible, setEsrbRatingFilterVisible] =
        useState(false);
    const [esrbRatings, setEsrbRatings] = useState([]);
    const { cartTotal } = useContext(CartContext);
    const { currentPage, setCurrentPage } = useContext(SearchContext);

    const navigate = useNavigate();

    // When the user clicks on genre, other windows are closed and genre window is opened
    const handleGenreClick = (genre) => {
        setEsrbRatingFilterVisible(false);
        setSelectedGenre(genre);
        setGenreFilterVisible(!genreFilterVisible);
    };

    // When the user clicks on ESRB rating, other windows are closed and ESRB rating window is opened
    const handleESRBClick = (rating) => {
        setGenreFilterVisible(false);
        setSelectedEsrbRating(rating);
        setEsrbRatingFilterVisible(!esrbRatingFilterVisible);
    };

    // When the user clicks on a game, the game page is opened (i.e. the user is navigated to the game page)
    const handleSelectGame = (game) => {
        navigate(`/RetroCult/games/${game.slug}`, { state: { game } });
    };

    useEffect(() => {
        const audio = new Audio(moveSoundUrl);
        setMoveSound(audio);
    }, []);

    // There was no way to get all genres to fit so this limits it to the top 10 genres
    // Afterwards, all genres will appear.
    useEffect(() => {
        const genreCount = {};
        games.forEach((game) => {
            game.genres.forEach((genre) => {
                genreCount[genre] = (genreCount[genre] || 0) + 1;
            });
        });
        const sortedGenres = Object.entries(genreCount).sort(
            (a, b) => b[1] - a[1]
        );
        setTopGenres(sortedGenres.slice(0, 10).map((genre) => genre[0]));
    }, [games]);

    // This useEffect hook is used to get all the ESRB ratings from the games and store them in a set
    useEffect(() => {
        const esrbRatings = new Set(
            games.map((game) => game.esrb_rating).filter((rating) => rating)
        );
        setEsrbRatings(Array.from(esrbRatings));
    }, [games]);

    // This useEffect hook is used to sort the games based on the selected genre, ESRB rating, and sort criteria.
    useEffect(() => {
        let sortedFilteredGames = [...games];

        // Filters based on genre
        if (selectedGenre) {
            sortedFilteredGames = sortedFilteredGames.filter((game) =>
                game.genres.includes(selectedGenre)
            );
        }

        // Filters based on ESRB rating
        if (selectedEsrbRating) {
            sortedFilteredGames = sortedFilteredGames.filter(
                (game) => game.esrb_rating === selectedEsrbRating
            );
        }

        // The easier set of filters to implement
        if (sortCriteria) {
            sortedFilteredGames.sort((a, b) => {
                switch (sortCriteria) {
                    case "rating":
                        return b.rating - a.rating;
                    case "metacritic":
                        return b.metacritic - a.metacritic;
                    case "price highest":
                        return (
                            Math.max(...b.price.map((p) => p.amount)) -
                            Math.max(...a.price.map((p) => p.amount))
                        );
                    case "price lowest":
                        return (
                            Math.min(...a.price.map((p) => p.amount)) -
                            Math.min(...b.price.map((p) => p.amount))
                        );
                    default:
                        return 0;
                }
            });
        }
        setGames(sortedFilteredGames);
        // Reset the current page to 1 when the games are sorted
        setCurrentPage(1);
    }, [sortCriteria, selectedGenre, selectedEsrbRating]);

    const gamesPerPage = 6;
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
            <div className={style.flex}>
                <div className={style.gridContainer}>
                    <div className={style.filtersContainer}>
                        <h2>Filters:</h2>
                        {/* // Map each of them into a div element with the filter name
                    // Some of them have onClick events */}
                        <div className={style.filters}>
                            {[
                                "Rating",
                                "Metacritic",
                                "Price Highest",
                                "Price Lowest",
                                "ESRB",
                                "Genre",
                            ].map((filter, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        setSortCriteria(filter.toLowerCase());
                                        if (filter === "Genre") {
                                            setEsrbRatingFilterVisible(false);
                                            setGenreFilterVisible(
                                                !genreFilterVisible
                                            );
                                        }
                                        if (filter === "ESRB") {
                                            setGenreFilterVisible(false);
                                            setEsrbRatingFilterVisible(
                                                !esrbRatingFilterVisible
                                            );
                                        }
                                    }}
                                    onMouseEnter={() => {
                                        setHoveredFilterIndex(index);
                                        moveSound?.play();
                                    }}
                                    onMouseLeave={() =>
                                        setHoveredFilterIndex(null)
                                    }
                                    className={style.filterItem}
                                >
                                    {hoveredFilterIndex === index && (
                                        <img
                                            src={handCursorUrl}
                                            className={style.handCursor}
                                            alt="Cursor"
                                        />
                                    )}
                                    {filter}
                                </div>
                            ))}
                            {/* Map over and show all genres applicable */}
                            {genreFilterVisible && (
                                <div className={style.genres}>
                                    {topGenres.map((genre, index) => (
                                        <div
                                            key={genre}
                                            onClick={() =>
                                                handleGenreClick(genre)
                                            }
                                            onMouseEnter={() => {
                                                setHoveredGenreIndex(index);
                                                moveSound.play();
                                            }}
                                            onMouseLeave={() =>
                                                setHoveredGenreIndex(null)
                                            }
                                            className={style.genreItem}
                                        >
                                            {hoveredGenreIndex === index && (
                                                <img
                                                    src={handCursorUrl}
                                                    className={style.handCursor}
                                                    alt="Cursor"
                                                />
                                            )}
                                            {genre}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {/* Map over and show all ESRB ratings applicable */}
                            {esrbRatingFilterVisible && (
                                <div className={style.esrbRatings}>
                                    {esrbRatings.map((rating, index) => (
                                        <div
                                            key={rating}
                                            onClick={() =>
                                                handleESRBClick(rating)
                                            }
                                            onMouseEnter={() => {
                                                setHoveredESRBIndex(index);
                                                moveSound.play();
                                            }}
                                            onMouseLeave={() =>
                                                setHoveredESRBIndex(null)
                                            }
                                            className={style.ESRBItem}
                                        >
                                            {hoveredESRBIndex === index && (
                                                <img
                                                    src={handCursorUrl}
                                                    className={style.handCursor}
                                                    alt="Cursor"
                                                />
                                            )}
                                            {rating}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={style.grid}>
                        {currentGames.map((game) => (
                            <Game
                                key={game.id}
                                game={game}
                                onClick={() => handleSelectGame(game)}
                            />
                        ))}
                    </div>
                    {/* Use  the cart context to get the total cart price */}
                    <div className={style.time}>
                        <p>Total Cart Price: ${cartTotal}</p>
                    </div>
                    <div className={style.store}>
                        <img
                            src={PSLogo}
                            alt="Logo"
                        />
                        Retro Cult Games
                    </div>
                    <div className={style.pagination}>
                        <button onClick={prevPage} disabled={currentPage === 1}>
                            Previous
                        </button>
                        <button
                            onClick={nextPage}
                            disabled={
                                currentPage * gamesPerPage >= games.length
                            }
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GamesGrid;
