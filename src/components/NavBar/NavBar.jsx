import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar.jsx";
import style from "./NavBar.module.scss";
import trolley from "../../assets/images/trolley.png";
import user from "../../assets/images/user.png";
import PSLogo from "../../assets/images/PSLogo.png";

const NavBar = () => {

    return (
        <nav className={style.nav}>
            <NavLink className={style.store} to="/retro-cult-eshop">
                    <img
                        src= {PSLogo}
                        alt="Logo"
                    />
                    <p className={style.storeName}>Retro Cult Games</p>
            </NavLink>
            <SearchBar />
            <div className={style.buttons}>
                <NavLink className={style.cart} to="/cart">
                    <img src={trolley} alt="cart" />
                </NavLink>
                <NavLink className={style.login} to="/login">
                    <img
                        src= {user}
                        alt="login"
                        className={`${style.img} ${style.user}`}
                    />
                </NavLink>
            </div>
        </nav>
    );
};

export default NavBar;
