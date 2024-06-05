import React, { createContext, useState, useEffect } from "react";
// import { fetchGames } from "../services/game-service.js";
import FireStoreData from "../config/FirestoreData.json";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    // const [allGames, setAllGames] = useState([]);
    const [allGames, setAllGames] = useState(FireStoreData);
    // If I go over the read limit or for testing purposes, I can use this

    // On mount, fetch all games from the Firestore database
    // Because Firestore has poor search functionality, store all games in the context and do filtering client-side

    // useEffect(() => {
    //         fetchGames().then((data) => {
    //         setAllGames(data);
    //         });
    // }, []);

    return (
        <DataContext.Provider value={{ allGames }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;
