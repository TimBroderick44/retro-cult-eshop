import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext.jsx";
import style from "./SearchBar.module.scss";

const SearchBar = () => {

    const navigate = useNavigate();
    const { onSearch, setSearchTerm } = useContext(SearchContext);
    const [inputValue, setInputValue] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        onSearch(inputValue);
        setInputValue("");
        navigate("/games");
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <form onSubmit={onSubmit} className={style.form}>
            <div>
                <div className={style.search}>
                    <input
                        className={style.input}
                        type="text"
                        placeholder="Search"
                        name="search"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <button className={style.button}>
                        <img
                            className={style.btnIcon}
                            src="/google.svg"
                            alt="google magnifying glass icon"
                        />
                    </button>
                </div>
            </div>
        </form>
    );
};

export default SearchBar;
