import React, { useEffect, useState, useRef } from "react";
import DetailedGame from "../DetailedGame/DetailedGame";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";
import { fetchExtraData } from "../../services/game-service";


const DetailedGameLoader = ({ game, onClose }) => {
    const [gameDetails, setGameDetails] = useState(null);
    const [ extras, setExtras ] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("description");

    const detailedRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                // If expandedRef.current is not null and the event target is not within the expandedRef.current (i.e. the expanded book)
                // TODO: NOT WORKING 
                detailedRef.current &&
                !detailedRef.current.contains(event.target)
            ) {
                onClose();
            }
        };

        // Add event listener for mousedown and call handleClickOutside
        document.addEventListener("mousedown", handleClickOutside);

        // Set overflow to hidden to prevent scrolling
        document.body.style.overflow = "hidden";

        // Return a cleanup function to remove the event listener and set overflow back to visible
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);

            // Set overflow back to visible
            document.body.style.overflow = "";
        };
    }, [onClose]);

    useEffect(() => {
        if (game) {
            setLoading(true);
            fetchExtraData(game.id)
                .then((data) => {
                    setExtras(data);
                    setGameDetails(game);
                    setError(null); 
                })
                .catch((error) => {
                    setError(error.message);
                })
                .finally(() => setLoading(false));             
        }
    }, [game]); 

    return (
        <>
            {loading && <Loading />}
            {!loading && error && <Error message={error} />}
            {!loading && !error && gameDetails && (
                <DetailedGame
                    game={gameDetails}
                    extras={extras}
                    onClose={() => setSelectGame(null)}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    detailedRef={detailedRef}
                />
            )}
        </>
    );
};

export default DetailedGameLoader;
