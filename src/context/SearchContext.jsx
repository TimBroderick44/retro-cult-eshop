import React, { createContext, useState } from "react";

export const SearchContext = createContext({
    searchTerm: "",
    setSearchTerm: () => {},
});

export const SearchProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [hasSearched, setHasSearched] = useState(false);
    

    const onSearch = (term) => {
        setHasSearched(true);
        setSearchTerm(term);
        setCurrentPage(1);
    };

    return (
        <SearchContext.Provider
            value={{
                searchTerm,
                onSearch,
                hasSearched,
                setSearchTerm,
                currentPage,
                setCurrentPage,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export default SearchProvider;
