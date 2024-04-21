import { collection, query, getDocs, limit, where } from "firebase/firestore";
import { db } from "../config/firestore";

export const fetchGames = async (searchTerm = "") => {
    try {
        const gamesCollectionRef = collection(db, "playstation-games");
        const q = query(gamesCollectionRef); 

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            throw new Error("No games found.");
        }

        const searchTermLower = searchTerm.toLowerCase();
        const games = querySnapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter(
                (game) =>
                    searchTerm === "" ||
                    game.name.toLowerCase().includes(searchTermLower)
            );

        return games;
    } catch (error) {
        console.error("Error fetching games:", error);
        throw new Error("An error has occurred. Please try again!");
    }
};

// Accesses the game collection in Firestore and fetches the game with the provided slug (unique identifier)
export const fetchGamesBySlug = async (slug) => {
    const gamesCollectionRef = collection(db, "playstation-games");
    const q = query(gamesCollectionRef, where("slug", "==", slug));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        throw new Error("No game found with the provided slug.");
    }

    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))[0];
};

// Some data is absent from the Firestore database, so fetch additional data from the RAWG API
export const fetchExtraData = async (gameId) => {
    const response = await fetch(  
        `https://api.rawg.io/api/games/${gameId}?key=46b422d5728b4c709486ad1b9d892539`
    );

    if (!response.ok) {
        console.error("Failed to fetch game details");
        throw new Error("An error occurred with the RAWG API. Please refresh and try again.");
    }

    const gameDescription = await response.json();
    return gameDescription;
};
