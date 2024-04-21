import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar.jsx";
import style from "./NavBar.module.scss";

const NavBar = () => {

    return (
        <nav className={style.nav}>
            <NavLink className={style.store} to="/">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Playstation_logo_colour.svg/134px-Playstation_logo_colour.svg.png"
                        alt="Logo"
                    />
                    <p className={style.storeName}>Retro Cult Games</p>
            </NavLink>
            <SearchBar />
            <div className={style.buttons}>
                <NavLink className={style.cart} to="/cart">
                    <img src="/trolley.png" alt="cart" />
                </NavLink>
                <NavLink className={style.login} to="/login">
                    <img
                        src="/user.png"
                        alt="login"
                        className={`${style.img} ${style.user}`}
                    />
                </NavLink>
            </div>
        </nav>
    );
};

export default NavBar;
